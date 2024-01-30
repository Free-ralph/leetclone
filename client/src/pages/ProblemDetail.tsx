import { useEffect, useState } from "react";
import Navbar from "../components/Nabvar";
import WorkSpace from "../components/workspace/WorkSpace";
import { useOutletProblem } from "./ProblemDetialLayout";
import useSnackBar from "../hooks/useSnackBar";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";
import useIsMobile from "../hooks/useIsmobile";

const ProblemDetail = () => {
  const isMobile = useIsMobile();
  const [success, setSuccess] = useState(false);
  const { problem } = useOutletProblem();
  const [userCode, setUserCode] = useState(() => {
    const code = localStorage.getItem(`code-${problem?.id}`);
    return code ? JSON.parse(code) : problem?.starterCode;
  });
  const { handleSnackMessage } = useSnackBar();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate: addSolvedProblem } = useMutation({
    mutationFn: async (id: string) => {
      await axiosPrivate.get(`problem/solved/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },

    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    // we need to remove the comments before the declaration of the function for it work

    const formattedCode = userCode.slice(
      userCode.indexOf(problem?.starterFunctionName)
    );

    const handlerFunc = problem?.handlerFunction;
    try {
      const cb = new Function(`return ${formattedCode}`)();
      if (typeof handlerFunc === "function") {
        const isSuccess = handlerFunc(cb);

        if (isSuccess) {
          handleSnackMessage("Test cases passed", "success");
          setSuccess(true);
          addSolvedProblem(problem!.id);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
      }
    } catch (err: any) {
      if (err.message == "Error: wrong") {
        handleSnackMessage("Test cases failed", "error");
      } else {
        handleSnackMessage(err.message, "error");
      }
    }
  };

  const handleCodeChange = (code: string) => {
    setUserCode(code);
    localStorage.setItem(`code-${problem?.id}`, JSON.stringify(code));
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${problem?.id}`);
    setUserCode(code ? JSON.parse(code) : problem?.starterCode);
  }, [problem]);

  return (
    <main className="w-screen h-screen flex flex-col dark:bg-dark-problem-page overflow-hidden">
      {!isMobile ? (
        <>
          <Navbar problemPage={true} handleSubmit={handleSubmit} />
          <WorkSpace
            userCode={userCode}
            handleCodeChange={handleCodeChange}
            success={success}
          />
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-center flex-col">
          <span>Hello Code Sensie </span>
          <img
            src="/images/gojo.jpg"
            className="w-[80%] my-3"
            alt="gojo-image"
          />
          Please Switch to a desktop for the best coding experience
        </div>
      )}
    </main>
  );
};

export default ProblemDetail;
