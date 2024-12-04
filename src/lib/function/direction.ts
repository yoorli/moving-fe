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
  const direction_userEditProfile = () => {
    nav('/user/editProfile');
  };
  const direction_userEditInfo = () => {
    nav('/user/editInfo');
  };
  const direction_costCall = () => {
    nav('/user/costCall');
  };

  const direction_pendingCost = () => {
    nav('/user/pendingCost');
  };

  const direction_receivedCost = () => {
    nav('/user/receivedCost');
  };

  const direction_driverCostCall = () => {
    nav('/driver/costCall');
  };

  const direction_costHandler = () => {
    nav('/driver/costHandler');
  };

  const direction_myPgae = () => {
    nav('/driver/myPage');
  };

  return {
    direction_root,
    direction_searchDriver,
    direction_userLogin,
    direction_costCall,
    direction_pendingCost,
    direction_receivedCost,
    direction_userSignup,
    direction_userEditProfile,
    direction_userEditInfo,
    direction_driverCostCall,
    direction_costHandler,
    direction_myPgae,
  };
}
