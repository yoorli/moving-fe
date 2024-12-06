import { createBrowserRouter, Outlet } from 'react-router-dom';
import DriverLayout from './layout/DriverLayout';
import RendingLayout from './layout/RendingLayout';
import UserLayout from './layout/UserLayout';
import DriverLoginPage from './page/driver/login';
import UserLoginPage from './page/user/login';
import UserFavoriteMover from './page/user/favoriteMover';
import PendingCost from './page/user/pendingCost';
import ReceivedCost from './page/user/receivedCost';
import ReceivedCostDetail from './page/user/receivedCostDetail';
import UserSignupPage from './page/user/signup';
import DriverSignupPage from './page/driver/signup';
import DriverCostCallPage from './page/driver/costCall';
import UserMovingReview from './page/user/movingReview';
import UserCostCallPage from './page/user/costCall';
import UserRegisterPage from './page/user/register';
import DriverEditProfilePage from './page/driver/editProfile';
import DriverEditInfoPage from './page/driver/editInfo';
import UserEditInfoPage from './page/user/editInfo';
import UserEditProfilePage from './page/user/editProfile';
import ServiceRandingPage from './page/root';
import DriverRegisterPage from './page/driver/register';
import DriverCostHandlerPage from './page/driver/costHandler';

const router = createBrowserRouter([
  {
    element: <RendingLayout />,
    children: [
      { path: '/', element: <ServiceRandingPage /> },
      {
        path: '/searchDriver',
        element: (
          <span style={{ width: '100%', minHeight: '100vh' }}>기사님 찾기</span>
        ),
      },
      {
        path: '/user/login',
        element: <UserLoginPage />,
      },
      {
        path: '/user/signup',
        element: <UserSignupPage />,
      },
      {
        path: '/driver/login',
        element: <DriverLoginPage />,
      },
      {
        path: '/driver/signup',
        element: <DriverSignupPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        path: 'costCall',
        element: <UserCostCallPage />,
      },
      {
        path: 'searchDriver',
        element: <span>기사님 찾기</span>,
      },
      {
        element: <Outlet />,
        children: [
          {
            path: 'pendingCost',
            element: <PendingCost />,
          },
          {
            path: 'receivedCost',
            element: <ReceivedCost />,
          },
          {
            path: 'receivedCost/:id',
            element: <ReceivedCostDetail />,
          },
        ],
      },
      {
        path: 'favoriteMover',
        element: <UserFavoriteMover />,
      },
      {
        path: 'editProfile',
        element: <UserEditProfilePage />,
      },
      {
        path: 'movingReview',
        element: <UserMovingReview />,
      },
      {
        path: 'editProfile',
        element: <UserEditProfilePage />,
      },
      {
        path: 'editInfo',
        element: <UserEditInfoPage />,
      },
      {
        path: 'register',
        element: <UserRegisterPage />,
      },
    ],
  },
  {
    path: '/driver',
    element: <DriverLayout />,
    children: [
      {
        path: 'costCall',
        element: <DriverCostCallPage />,
      },
      {
        path: 'register',
        element: <DriverRegisterPage />,
      },
      {
        path: 'editProfile',
        element: <DriverEditProfilePage />,
      },
      {
        path: 'editInfo',
        element: <DriverEditInfoPage />,
      },
      {
        path: 'costHandler',
        element: (
          <span>
            <DriverCostHandlerPage />
          </span>
        ),
      },
      {
        path: 'myPage',
        element: <span>myPage</span>,
      },
    ],
  },
]);

export default router;
