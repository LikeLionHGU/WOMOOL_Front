import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";

function Logincb() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [paramData, setParamData] = useState({});
  const setJwt = useSetRecoilState(authJwtAtom);

  useEffect(() => {
    const result = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    setParamData(result);
    if (result.status === "success") {
      console.log("aa", result.jwt);
      localStorage.setItem("user_jwt", JSON.stringify(result.jwt)); // Incase of strictmode error
      setJwt(result.jwt);
      navigate("/mypage");
    }
  }, []);
  return (
    <div>
      <pre
        style={{
          width: "800px",
          textWrap: "wrap",
          wordBreak: "break-all",
        }}
      >
        {JSON.stringify(paramData, null, 2)}
        <Link to="/mypage">To Mypage</Link>
      </pre>
    </div>
  );
}

export default Logincb;
