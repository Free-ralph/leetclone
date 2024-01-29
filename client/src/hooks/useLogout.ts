import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import useSnackBar from "./useSnackBar";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../state/atoms/authModelAtom";
const useLogout = () => {
  const { handleSnackMessage } = useSnackBar();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authModelState);

  const logoutFn = async () => {
    await axiosPrivate.get("/auth/logout", { withCredentials: true });
  };

  const { mutate: logoutUser } = useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      setAuth({});
      navigate("/auth/login");
      handleSnackMessage("logged out successfuly", "success");
    },
  });

  return logoutUser;
};

export default useLogout;
