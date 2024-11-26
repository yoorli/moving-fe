import { createBrowserRouter } from "react-router-dom";
import RootPage from "./page/root";
import UserLoginPage from "./page/user/login";
import DriverLoginPage from "./page/driver/login";
import UserLayout from "./layout/UserLayout";
import DriverLayout from "./layout/DriverLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "login",
        element: <UserLoginPage />,
      },
      {
        path: "join",
        element: <span>회원가입</span>,
      },
      {
        path: "costCall",
        element: <span>견적 요청</span>,
      },
      {
        path: "searchDirver",
        element: <span>기사님 찾기</span>,
      },
      {
        path: "constHandler",
        element: <span>내 견적 관리</span>,
      },
      {
        path: "profile",
        element: <span>profile</span>,
      },
    ],
  },

  {
    path: "/driver",
    element: <DriverLayout />,
    children: [
      {
        path: "login",
        element: <DriverLoginPage />,
      },
      {
        path: "join",
        element: <span>회원가입</span>,
      },
      {
        path: "costCall",
        element: <span>견적 요청</span>,
      },
      {
        path: "constHandler",
        element: <span>내 견적 관리</span>,
      },
      {
        path: "myPage",
        element: <span>myPage</span>,
      },
    ],
  },
]);

export default router;
