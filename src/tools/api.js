import { serverRootUrl } from "../constants";

export const fetchBe = (jwtValue, path, method = "GET", body) =>
  new Promise((res, rej) => {
    const initStuff = {
      headers: {},
      method,
    };
    if (body && !["GET", "HEAD"].includes(method)) {
      initStuff.headers["Content-Type"] = "application/json";
      initStuff["body"] = JSON.stringify(body);
    }
    if (jwtValue) initStuff.headers.Authorization = `Bearer ${jwtValue}`;

    fetch(serverRootUrl + path, initStuff)
      .then((doc) =>
        doc.json().then((json) => {
          res(json);
        })
      )

      .catch((err) => rej(err));
  });
