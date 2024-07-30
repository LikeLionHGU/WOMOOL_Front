import React from "react";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import { Navigate } from "react-router-dom";

function LoginProtected({ comp: Comp }) {
  const jwtValue = useRecoilValue(authJwtAtom);

  if (jwtValue) {
    if (typeof Comp === "object") return <>{Comp}</>;
    return <Comp />;
  }

  return <Navigate to="/" />;
}

export default LoginProtected;
