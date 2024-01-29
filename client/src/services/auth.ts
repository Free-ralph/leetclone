import axios from "../api/axios";

const login = async (userInput: { username: string; password: string }) => {
  const res = await axios.post<{ access: string }>(
    "/auth/login",
    {
      ...userInput,
    },
    { withCredentials: true }
  );
  return res.data;
};

const register = async (userInput: {
  username: string;
  password: string;
  email: string;
}) => {
  const res = await axios.post<{ access: string }>("/auth/register", {
    ...userInput,
  });
  return res.data;
};
export { login, register };
