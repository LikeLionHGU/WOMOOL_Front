import { serverRootUrl } from "../constants";

export const fetchBe = (jwtValue, path, method = "GET", body) =>
  new Promise((res, rej) => {
    fetch(serverRootUrl + path, {
      headers: {
        Authorization: `Bearer ${jwtValue}`,
        "Content-Type": body ? "application/json" : undefined,
      },
      method: method,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((data) =>
        data.json().then((json) => {
          res(json);
        })
      )
      .catch((err) => rej(err));
  });
