import { useNavigate } from "react-router-dom";

export default function useDirection() {
  const nav = useNavigate();

  const direction_root = () => {
    nav("/");
  };

  const direction_searchDriver = () => {
    nav("/searchDriver");
  };

  const direction_userLogin = () => {
    nav("/user/login");
  };

  return { direction_root, direction_searchDriver, direction_userLogin };
}
