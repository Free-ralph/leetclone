import { atom } from "recoil";

const getLocalTheme = () => {
  const localTheme = localStorage.getItem("Leet-theme") as "light" | "dark";
  return localTheme ? JSON.parse(localTheme) : "dark";
};
export const themeState = atom<"dark" | "light">({
  key: "themeState",
  default: getLocalTheme(),
});
