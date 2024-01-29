import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import useSnackBar from "../hooks/useSnackBar";
interface RegsiterInput {
  username: string;
  email: string;
  password: string;
}

const Regsiter = () => {
  const { handleSnackMessage } = useSnackBar();
  const navigate = useNavigate();
  const [input, setInput] = useState<RegsiterInput>({
    username: "",
    email: "",
    password: "",
  });
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: () => register(input),
    onSuccess: () => {
      handleSnackMessage(
        "Registration was a success, now please log in",
        "success"
      );
      navigate("/auth/login");
    },
    onError: (err: any) => {
      console.log(err.response.data.msg);
      handleSnackMessage(err.response.data.msg, "error");
    },
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser();
  };
  return (
    <main className="mt-14">
      <form
        className="w-[90%] md:w-[60%] lg:w-[30%] px-8 py-12 flex m-auto flex-col gap-4 bg-white dark:text-gray-700 rounded drop-shadow-md"
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
          type="text"
          className=""
          placeholder="E-mail"
          value={input.email}
          required
          onChange={(e) =>
            setInput((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <input
          type="Password"
          className=""
          placeholder="password"
          required
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button type="submit" className="button-type-1">
          {isPending ? <Loader color="#fff" /> : "Sign Up"}
        </button>
        <div className="w-full flex justify-between text-gray-500 ">
          <p>Forgot password?</p>
          <Link to="/auth/login">Log in</Link>
        </div>
      </form>
    </main>
  );
};

export default Regsiter;
