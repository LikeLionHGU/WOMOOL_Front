import React from "react";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import HomeUnreg from "../components/Home/HomeUnreg";
import HomeCreateUser from "../components/Home/HomeCreateUser";

function Home() {
  const jwtValue = useRecoilValue(authJwtAtom);

  if (jwtValue) {
    return <HomeCreateUser />;
  } else {
    return <HomeUnreg />;
  }
}

export default Home;
