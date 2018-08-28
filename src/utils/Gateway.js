class Gateway {
  constructor(domains, options) {
    this.domains = domains;
    this.options = options;
    this.formRequest = this.formRequest;
    this.jsonRequest = this.jsonRequest;
  }

  async formRequest(method, path, filter = {}, notWithAuth) {
    method = method.toUpperCase();
    const url = this.generateRequestURL(method, path, filter);
    const options = this.generateRequestOptions(method, filter, 'form', notWithAuth);
    return await this.requestAndResponse(url, options);
  }

  async jsonRequest(method, path, filter = {}, notWithAuth) {
    method = method.toUpperCase();
    const url = this.generateRequestURL(method, path, filter);
    const options = this.generateRequestOptions(method, filter, 'json', notWithAuth);
    return await this.requestAndResponse(url, options);
  }

  getAuthInfo() {
    const docCookie = document.cookie,
      obj = {
        jwToken: localStorage.getItem('jwToken')
      };

    docCookie.split(';').forEach(item => {
      const arrItem = item.split('=');
      if (arrItem[0]) {
        obj[arrItem[0]] = arrItem[1];
      }
    });

    return obj;
  }

  generateRequestOptions(method = 'GET', filter = {}, requestDataType, notWithAuth) {
    const options = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    };

    if (!notWithAuth) {
      const { jwToken } = this.getAuthInfo();
      // personal jwt
      if (!jwToken) {
        this.onFailAuth('no jwToken');
        return;
      }
      // options.credentials = 'include';
      options.headers['Authorization'] = jwToken;
    }

    if (method === 'GET') {
      delete options.headers['Content-Type'];
    } else if (method === 'HEAD') {
    } else {
      const filterData = Object.assign({}, filter.data);

      if (requestDataType === 'form') {
        delete options.headers['Content-Type'];
        let formData = new FormData();
        for (const key in filterData) {
          formData.append(key, filterData[key]);
        }
        options.body = formData;
      } else if (requestDataType === 'json') {
        options.body = JSON.stringify(filterData);
      }
    }

    return options;
  }

  generateRequestURL(method = 'GET', path = '/', filter = {}) {
    if (path.indexOf('//') !== 0 && path.indexOf('http://') !== 0 && path.indexOf('https://') !== 0) {
      path = `${this.domains.api}${path}`;
    }
    if (method === 'GET') {
      let query = '',
        whereFilter = filter.where;
      for (let key in whereFilter) {
        query += `&${key}=${whereFilter[key]}`;
      }
      query = query.substring(1);
      if (query) {
        path = path.indexOf('?') === -1 ? `${path}?${query}` : `${path}&${query}`;
      }
    }
    return path;
  }

  async requestAndResponse(fetchURL, fetchOptions) {
    const response = await fetch(fetchURL, fetchOptions);

    const status = response.status;
    const body = await response.json();

    if (status === 401) {
      this.onFailAuth(body);
    } else if (status === 403) {
      this.onNoAuth(body);
    } else if (!response || status >= 400) {
      let error = new Error(body);
      error.status = status;
      throw error;
    }

    return body;
  }

  onFailAuth(responseBody) {
    const error = Object.assign(new Error(), responseBody);
    if (typeof this.options.onUnauthorized === 'function') {
      this.options.onUnauthorized(error);
    } else {
      throw new Error(error);
    }
  }

  onNoAuth(responseBody) {
    const error = Object.assign(new Error(), responseBody);
    if (typeof this.options.onForbidden === 'function') {
      this.options.onForbidden(error);
    } else {
      throw new Error(error);
    }
  }
}

export default Gateway;
