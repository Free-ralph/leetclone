import { SyntheticEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../services/auth";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuthSetState } from "../state/atoms/authModelAtom";
import { jwtDecode } from "jwt-decode";
import useSnackBar from "../hooks/useSnackBar";
import axios from "../api/axios";

interface LoginInput {
  username: string;
  password: string;
}
interface RandomUser {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
}

const Login = () => {
  const setAuth = useAuthSetState();
  const { handleSnackMessage } = useSnackBar();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [input, setInput] = useState<LoginInput>({
    username: "",
    password: "",
  });
  const { data: randomUser, isLoading: loadingRandUser } = useQuery({
    queryKey: ["randomUser"],
    queryFn: async () => {
      const res = await axios.get<{ randomFakeUser: RandomUser }>(
        "/auth/randomFakeUser"
      );
      
      return res.data.randomFakeUser;
    },
  });

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: () => login(input),
    onSuccess: (data) => {
      setAuth({ access: data.access, user: jwtDecode(data.access) });
      handleSnackMessage("you've been successfuly logged in", "success");
      navigate(from);
    },
    onError: (err: any) => {
      handleSnackMessage(err.response.data.msg, "error");
    },
  });

  const { mutate: loginRandUser, isPending: isPendingRandUser } = useMutation({
    mutationFn: async () => {
      const res = await axios.get<{ access: string }>(
        `/auth/loginFakeUser/${randomUser?._id}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      setAuth({ access: data.access, user: jwtDecode(data.access) });
      handleSnackMessage("you've been successfuly logged in", "success");
      navigate(from);
    },
    onError: (err: any) => {
      handleSnackMessage(err.response.data.msg, "error");
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    loginUser();
  };

  const LoginWithRandomAcct = () => {
    if (randomUser) {
      setInput({
        username: randomUser.username,
        password: randomUser.password,
      });

      loginRandUser();
    }
  };

  return (
    <main className="mt-14">
      <form
        className="w-[90%] md:w-[60%] lg:w-[40%] px-8 py-12 flex m-auto flex-col gap-4 bg-white dark:text-gray-700 rounded drop-shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <img
            className="w-[5rem] h-[5rem] m-auto"
            src="https://leetcode.com/static/webpack_bundles/images/logo.c36eaf5e6.svg"
          ></img>
        </div>
        <input
          type="text"
          className=""
          placeholder="Username"
          value={input.username}
          required
          onChange={(e) =>
            setInput((prev) => ({ ...prev, username: e.target.value }))
          }
        />

        <input
          type="Password"
          className=""
          placeholder="password"
          value={input.password}
          required
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button
          disabled={isPending || isPendingRandUser}
          type="submit"
          className="button-type-1"
        >
          {isPending || isPendingRandUser ? <Loader color="#fff" /> : "Sign In"}
        </button>
        <div className="w-full flex justify-between flex-col md:flex-row text-gray-500">
          {(randomUser || loadingRandUser) && (
            <div className="items-center flex gap-1 md:gap-3 text-sm md:text-normal">
              use a Random Acct{" "}
              {loadingRandUser ? (
                <Loader height={15} />
              ) : (
                <span
                  onClick={LoginWithRandomAcct}
                  className="text-orange-500 cursor-pointer hover:text-blue-400"
                >
                  {randomUser?.displayName}
                </span>
              )}
            </div>
          )}
          <Link className="" to="/auth/register">
            Sign Up
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
