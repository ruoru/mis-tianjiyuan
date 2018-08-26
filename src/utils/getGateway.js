import environments from '../../config/environments';
import Gateway from './Gateway';

var cachedGateway = null;

function getGateway(options) {
  const environment = environments[process.env.GATEWAY_ENV];
  if (!cachedGateway) {
    cachedGateway = new Gateway({
      api: environment.api,
    }, {
      onAuthFail: error => {
        localStorage.clear();
        document.cookie = null;
        location.href = `http://sso.gowild.top/login/?redirectURL=http:${environment.api}&&authURL=http:${environment.api}/sso_auth/`;
      }
    });
  }
  return cachedGateway;
}

export default getGateway();