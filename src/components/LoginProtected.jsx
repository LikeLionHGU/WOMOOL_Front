import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import { Link, useNavigate } from "react-router-dom";

function LoginProtected({ comp: Comp }) {
  const jwtValue = useRecoilValue(authJwtAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtValue) navigate("/");
  }, []);

  if (jwtValue) {
    if (typeof Comp === "object") return <>{Comp}</>;
    return <Comp />;
  }

  return (
    <div>
      Please redirect <Link to="/">To Home</Link> and Login
    </div>
  );
}

export default LoginProtected;
