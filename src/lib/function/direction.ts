import { useNavigate } from 'react-router-dom';

export default function useDirection() {
  const nav = useNavigate();

  const direction_root = () => {
    nav('/');
  };

  const direction_searchDriver = () => {
    nav('/searchDriver');
  };

  const direction_userLogin = () => {
    nav('/user/login');
  };

  const direction_userSignup = () => {
    nav('/user/signup');
  };

  const direction_pendingCost = () => {
    nav('/user/pendingCost');
  };

  const direction_receivedCost = () => {
    nav('/user/receivedCost');
  };

  return {
    direction_root,
    direction_searchDriver,
    direction_userLogin,
    direction_pendingCost,
    direction_receivedCost,
    direction_userSignup,
  };
}
