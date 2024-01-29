import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { useAuthSetState } from "../state/atoms/authModelAtom";

const useRefreshToken = () => {
  const setAuth = useAuthSetState();

  const refresh = async () => {
    const res = await axios.get<{ access: string }>("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        access: res.data.access,
        user: jwtDecode(res.data.access),
      };
    });

    return res.data.access;
  };

  return refresh;
};

export default useRefreshToken;
