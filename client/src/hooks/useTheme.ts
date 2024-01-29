import { useRecoilState } from "recoil";
import { themeState } from "../state/atoms/themeAtom";
import { useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleDarkMode = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  const handleDarkMode = () => {
    setTheme("dark");
  };
  const handleLightMode = () => {
    setTheme("light");
  };

  useEffect(() => {
    localStorage.setItem("Leet-theme", JSON.stringify(theme));
  }, [theme]);

  return { theme, handleDarkMode, handleLightMode, toggleDarkMode };
};

export default useTheme;
