import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Logincb from "./pages/Logincb.jsx";
import Home from "./pages/Home.jsx";
import ApiTest from "./pages/ApiTest.jsx";
import LoginProtected from "./components/LoginProtected.jsx";
import Mypage from "./pages/Mypage.jsx";
import NewUser from "./pages/NewUser.jsx";
import NewUserCup from "./pages/NewUserCup.jsx";
import TestPage from "./pages/TestPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/logincb",
    element: <Logincb />,
  },
  {
    path: "/apitest",
    element: <ApiTest />,
  },
  {
    path: "/newuser",
    element: <NewUser />,
  },
  {
    path: "/newusercup",
    element: <NewUserCup />,
  },
  {
    path: "/mypage",
    element: <LoginProtected comp={Mypage} />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
