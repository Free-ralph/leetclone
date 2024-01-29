import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const [revealMenu, setRevealMenu] = useState(false);
  const logoutUser = useLogout();
  return (
    <div
      onClick={() => {
        logoutUser();
        setRevealMenu(!revealMenu);
      }}
      className="w-full pl-3 cursor-pointer px-2 py-2 rounded dark:bg-orange-400 dark:text-dark-primary hover:bg-gray-200 dark:hover:bg-orange-500 transition-all delay-75"
    >
      <LogoutIcon className="scale-[0.8] md:mr-2" />
      <span className="hidden md:inline">Logout</span>
    </div>
  );
};

export default Logout;
