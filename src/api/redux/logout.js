import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { persistor } from "../redux/store";

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
    persistor.purge(); // Clears persisted state
  };

  return { handleLogout };
};

