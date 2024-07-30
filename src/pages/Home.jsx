import React from "react";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import HomeUnreg from "../components/Home/HomeUnreg";
import { Navigate } from "react-router-dom";

function Home() {
  const jwtValue = useRecoilValue(authJwtAtom);

  if (jwtValue) {
    return <Navigate to="/mypage" replace={true} />;
  } else {
    return <HomeUnreg />;
  }
}

export default Home;
