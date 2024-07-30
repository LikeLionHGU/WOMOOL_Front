import React from "react";
import { useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";

function Mypage() {
  const resetAuth = useResetRecoilState(authJwtAtom);

  return (
    <div>
      <button onClick={() => resetAuth()}>로그아웃</button>
    </div>
  );
}

export default Mypage;
