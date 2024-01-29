import { motion as m, AnimatePresence } from "framer-motion";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import CloseIcon from "@mui/icons-material/Close";

const toggleVariant = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const ToggleThemeModes = () => {
  const [toggleModes, setToggleModes] = useState(false);
  const { theme, handleDarkMode, handleLightMode } = useTheme();

  return (
    <main className="relative">
      <div
        onClick={() => setToggleModes((prev) => !prev)}
        className="p-2 bg-gray-300 dark:bg-dark-fill-2 rounded cursor-pointer"
      >
        {!toggleModes ? (
          theme === "dark" ? (
            <DarkModeIcon />
          ) : (
            <WbSunnyIcon />
          )
        ) : (
          <CloseIcon />
        )}
      </div>
      <AnimatePresence>
        {toggleModes && (
          <m.ul
            variants={toggleVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute -left-[4rem] z-10 mt-3 h-[6rem] rounded-md  border-2 bg-gray-300 dark:bg-dark-problem-page-2 border-dark-primary dark:border-white w-[7rem] flex flex-col justify-around overflow-hidden"
          >
            <li
              onClick={() => {
                handleLightMode();
                setToggleModes(!toggleModes);
              }}
              className="w-full py-2 pl-3 hover:bg-orange-500 cursor-pointer"
            >
              <WbSunnyIcon className="scale-[0.8] mr-2" />
              light
            </li>
            <li
              onClick={() => {
                handleDarkMode();
                setToggleModes(!toggleModes);
              }}
              className="w-full py-2 pl-3 hover:bg-orange-500 cursor-pointer"
            >
              <DarkModeIcon className="scale-[0.8] mr-2" />
              dark
            </li>
          </m.ul>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ToggleThemeModes;
