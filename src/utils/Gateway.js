import environments from '../../config/environments';
const environment = environments[process.env.GATEWAY_ENV];

class Gateway {
  constructor(domains, options) {
    this.domains = domains;
    this.options = options;
    this.middleware = this.requestMiddleware;
  }

  getCookie () {
    const docCookie = document.cookie, obj = {};

    const arrCookie = docCookie.split(';').forEach(item => {
      const arrItem = item.split('=');
      if(arrItem[0]) {
        obj[arrItem[0]] = arrItem[1];
      }
    })

    return obj;
  }

  generateRequestURL(method = 'GET', path = '/', filter = {}) {
    if (path.indexOf('//') !== 0 && path.indexOf('http://') !== 0 && path.indexOf('https://') !== 0) {
      path = `${this.domains.api}${path}`;
    }
    if(method === 'GET') {
      let query = '', whereFilter = filter.where;
      for (let key in whereFilter) {
        query += `&${key}=${whereFilter[key]}`;
      }
      query = query.substring(1);
      if(query) {
        path = path.indexOf('?') === -1 ? `${path}?${query}` : `${path}&${query}`;
      }
    }
    return path;
  }

  generateRequestOptions(method = 'GET', filter = {}) {
    const { csrftoken } = this.getCookie();
    const options = {
      method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'x-csrftoken': localStorage.getItem('tokenId'),
      },
      mode: 'cors',
    };

    if (method === 'GET') {
      //delete options.headers['x-csrftoken'];
    } else if (method === 'HEAD') {
      
    } else {
      if (window.File && filter instanceof window.File) {
        options.body = filter;
        delete options.headers['Content-Type'];
      } else {
        options.body = JSON.stringify(Object.assign({}, filter.data, filter.where));
      }
    }

    return options;
  }

  async requestAndResponse(fetchURL, fetchOptions) {
    
    const response = await fetch(fetchURL, fetchOptions);
    const status = response.status;

    //delete option
    if(fetchOptions.method === 'DELETE') {
      const body = response.text();
      if(status < 400) {
        return body;
      } else {
        throw new Error(body.error.message); 
      }
    }

    const body = await response.json();

    if ([401, 403].indexOf(status) !== -1) {
      this.onAuthFail(body);
    } else if (!response || response.status >= 400) {
      let error = new Error(body.error.message);
      error.status = status;
      throw error;
    }

    return body;
  }

  async requestMiddleware(method, path, filter = {}) {
    method = method.toUpperCase();
    const url = this.generateRequestURL(method, path, filter);
    const options = this.generateRequestOptions(method, filter);
    return await this.requestAndResponse(url, options);
  }

  onAuthFail(responseBody) {
    const error = Object.assign(new Error(), responseBody);
    if (typeof this.options.onAuthFail === 'function') {
      this.options.onAuthFail(error);
    } else {
      throw new Error(error);
    }
  }

}

export default Gateway;