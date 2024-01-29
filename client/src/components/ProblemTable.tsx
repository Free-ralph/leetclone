import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { DBProblem } from "../types/problem";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuthValue } from "../state/atoms/authModelAtom";

const ProblemTable = () => {
  const user = useAuthValue();
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoID: "",
  });

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoID: "" });
  };

  const axiosPrivate = useAxiosPrivate();

  const { data: problems, isLoading: isLoadingProblems } = useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      const res = await axios.get<{ problems: DBProblem[] }>("/problem");
      return res.data;
    },
  });

  const {
    data: solvedProblems,
    mutate: getSolvedProblems,
    isPending: isLoadingSolvedProblems,
  } = useMutation({
    mutationFn: async () => {
      const res = await axiosPrivate.get<{ solvedProblems: string[] }>(
        "problem/solved-problems"
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (user.user) getSolvedProblems();
  }, [user]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (isLoadingSolvedProblems || isLoadingProblems) {
    return (
      <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse flex flex-col gap-3">
        {[...Array(15)].map((item, idx) => {
          if (item) {
          }
          return (
            <div
              key={idx}
              className="flex items-center space-x-6 md:space-x-12 mt-4 px-6 md:gap-[2rem]"
            >
              <LoadingSkeleton />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <main className="w-full h-full">
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>

              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Solution
              </th>
            </tr>
          </thead>
          <tbody>
            {problems?.problems?.map((problem, idx) => {
              const difficultyColor =
                problem.difficulty === "easy"
                  ? "text-green-500"
                  : problem.difficulty === "medium"
                  ? "text-orange-500 dark:text-orange-300"
                  : "text-red-500";
              return (
                <tr
                  className={`${
                    idx % 2 == 1 ? "bg-gray-300 dark:bg-dark-layer-1" : ""
                  }`}
                  key={idx}
                >
                  <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                    {solvedProblems?.solvedProblems?.includes(
                      problem.title
                    ) && <CheckCircleIcon />}
                  </th>
                  <td className="px-6 py-4">
                    {problem.link ? (
                      <a
                        className="hover:text-blue-500 delay-75 transition-all"
                        href={problem.link}
                        target="blank"
                      >
                        {problem.title}
                      </a>
                    ) : (
                      <Link
                        to={`problem/${problem.title}`}
                        className="hover:text-blue-500 delay-75 transition-all"
                      >
                        {problem.title}
                      </Link>
                    )}
                  </td>
                  <td className={`px-6 py-4 ${difficultyColor}`}>
                    {problem.difficulty}
                  </td>
                  <td className="px-6 py-4">{problem.category}</td>
                  <td className="px-6 py-4">
                    {problem.videoID ? (
                      <span
                        className="hover:text-red-500 delay-75 transition-all cursor-pointer"
                        onClick={() =>
                          setYoutubePlayer({
                            isOpen: true,
                            videoID: problem.videoID as string,
                          })
                        }
                      >
                        <YouTubeIcon fontSize="large" />
                      </span>
                    ) : (
                      "Coming soon"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {youtubePlayer.isOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
            <div className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"></div>
            <div className="w-full z-50 h-full px-6 relative max-w-4xl">
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="w-full relative">
                  <span onClick={closeModal}>
                    <CloseIcon className="cursor-pointer absolute -top-16 right-0 text-white" />
                  </span>
                  <YouTube
                    videoId={"8-k1C6ehKuw"}
                    loading="lazy"
                    iframeClassName="w-full min-h-[500px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const LoadingSkeleton = () => {
  return (
    <>
      <div className="w-6 h-6 shrink-0 rounded-full bg-slate-300 dark:bg-dark-problem-page-alternate"></div>
      <div className="h-4 md:w-52  w-32  rounded-full bg-slate-300 dark:bg-dark-problem-page-alternate"></div>
      <div className="h-4 md:w-52  w-32 rounded-full bg-slate-300 dark:bg-dark-problem-page-alternate"></div>
      <div className="h-4 md:w-52 w-32 rounded-full bg-slate-300 dark:bg-dark-problem-page-alternate"></div>
      <span className="sr-only">Loading...</span>
    </>
  );
};

export default ProblemTable;
