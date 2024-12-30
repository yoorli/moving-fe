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

  const direction_driverDetail = (id: number) => {
    nav(`/driver/${id}`);
  };

  const direction_driverEditProfile = () => {
    nav('/driver/editProfile');
  };
  const direction_driverEditInfo = () => {
    nav('/driver/editInfo');
  };
  const direction_pendingCost = () => {
    nav('/user/pendingCost');
  };
  const direction_receivedCost = () => {
    nav('/user/receivedCost');
  };
  const direction_receivedCostDetail = (id: number) => {
    nav(`/user/receivedCost/${id}`);
  };

  const direction_favoriteMover = () => {
    nav('/user/favoriteMover');
  };
  const direction_movingReview = () => {
    nav('/user/movingReview');
  };

  const direction_driverCostCall = () => {
    nav('/driver/costCall');
  };

  const direction_costHandler = () => {
    nav('/driver/costHandler');
  };

  const direction_costDetail = (id: number) => {
    nav(`/driver/costHandler/${id}`);
  };

  const direction_myPgae = () => {
    nav('/driver/myPage');
  };

  return {
    direction_root,
    direction_searchDriver,
    direction_userLogin,
    direction_costCall,
    direction_driverDetail,
    direction_pendingCost,
    direction_receivedCost,
    direction_userSignup,
    direction_userEditProfile,
    direction_userEditInfo,
    direction_driverCostCall,
    direction_receivedCostDetail,
    direction_favoriteMover,
    direction_movingReview,
    direction_costHandler,
    direction_costDetail,
    direction_myPgae,
    direction_driverEditProfile,
    direction_driverEditInfo,
  };
}
