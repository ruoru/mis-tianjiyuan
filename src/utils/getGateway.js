import environments from "../../config/environments";
import Gateway from "./Gateway";

var cachedGateway = null;

function gateway() {
  const environment = environments[process.env.GATEWAY_ENV];
  if (!cachedGateway) {
    cachedGateway = new Gateway(
      {
        api: environment.api
      },
      {
        onUnauthorized: error => {
          localStorage.clear();
          document.cookie = null;
          location.href = `/login`;
        },
        onForbidden: error => {

        }
      }
    );
  }
  return cachedGateway;
}

export default gateway();
