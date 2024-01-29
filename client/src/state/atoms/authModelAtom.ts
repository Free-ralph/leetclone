import { AuthInterface } from "../../types/auth";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";

export const authModelState = atom<AuthInterface>({
  key: "authModelState",
  default: {},
});

export const useAuthValue = () => {
  return useRecoilValue(authModelState);
};

export const useAuthSetState = () => {
  return useSetRecoilState(authModelState);
};
