import DescriptionIcon from "@mui/icons-material/Description";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LockIcon from "@mui/icons-material/Lock";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { DBProblem } from "../../types/problem";
import { useParams } from "react-router-dom";
import { useOutletProblem } from "../../pages/ProblemDetialLayout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery, useMutation } from "@tanstack/react-query";
import useProblemDataFromProfile from "../../hooks/useProblemDataFromProfile";
import useSnackBar from "../../hooks/useSnackBar";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const ProblemDescription = () => {
  const { id } = useParams();
  const [engagements, setEngagements] = useState({
    likes: 0,
    dislikes: 0,
  });
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { handleSnackMessage } = useSnackBar();

  const {
    liked,
    disliked,
    solved,
    isFavourite,
    isLoading: problemDataLoading,
    setDbProblemData,
  } = useProblemDataFromProfile(id!);

  const { mutate: likeProblem } = useMutation({
    mutationFn: async (id: string) => {
      await axiosPrivate.get(`/problem/like/${id}`);
    },
    onError: (err) => {
      console.log(err);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      handleSnackMessage("like operation failed unexpectedly", "error");
    },
  });

  const { mutate: dislikeProblem } = useMutation({
    mutationFn: async (id: string) => {
      await axiosPrivate.get(`/problem/dislike/${id}`);
    },
    onError: (err) => {
      console.log(err);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      handleSnackMessage("disLike operation failed unexpectedly", "error");
    },
  });

  const { mutate: starProblem } = useMutation({
    mutationFn: async (id: string) => {
      await axiosPrivate.get(`/problem/favourite/${id}`);
    },
    onError: (err) => {
      console.log(err);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      handleSnackMessage("star operation failed unexpectedly", "error");
    },
  });

  const { isLoading: dbProblemLoading } = useQuery({
    queryKey: ["problem"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get<{ problem: DBProblem }>(
          `/problem/${id}`
        );
        setEngagements({
          likes: res.data.problem.likes.length,
          dislikes: res.data.problem.dislikes.length,
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleToggleStarredProblems = () => {
    setDbProblemData((prev) => ({
      ...prev,
      isFavourite: !prev.isFavourite,
    }));
    starProblem(id!);
  };

  const handleToggleLike = () => {
    setEngagements((prev) => ({
      dislikes:
        disliked && prev.dislikes > 0 ? prev.dislikes - 1 : prev.dislikes,
      likes: liked && prev.likes > 0 ? prev.likes - 1 : prev.likes + 1,
    }));
    setDbProblemData((prev) => ({
      ...prev,
      liked: !prev.liked,
      disliked: false,
    }));

    likeProblem(id!);
  };

  const handleToggleDislike = () => {
    setEngagements((prev) => ({
      dislikes:
        disliked && prev.dislikes > 0 ? prev.dislikes - 1 : prev.dislikes + 1,
      likes: liked && prev.likes > 0 ? prev.likes - 1 : prev.likes,
    }));
    setDbProblemData((prev) => ({
      ...prev,
      disliked: !prev.disliked,
      liked: false,
    }));

    dislikeProblem(id!);
  };

  const { problem } = useOutletProblem();
  return (
    <main className="relative m-3 mx-1 text-light-text dark:bg-dark-problem-page-2 bg-light-200 rounded-xl overflow-hidden flex flex-col">
      <div className="h-[3rem] w-full bg-light-300 dark:bg-dark-problem-page-alternate p-3">
        <DescriptionIcon /> description
      </div>
      <div className="px-3 py-4 overflow-auto custom-scrollbar">
        <div className="flex justify-between items-center">
          <p className=" dark:text-white text-2xl font-semibold capitalize">
            {problem?.title}
          </p>
          {solved && (
            <span className="text-slate-500 dark:text-slate-300 flex items-center">
              solved <TaskAltIcon className="text-green-500 scale-75" />
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <span className="p-1 px-2 bg-light-300 dark:bg-dark-fill-2 rounded-xl text-sm">
            Easy
          </span>
          <span className="p-1 px-2 bg-light-300 dark:bg-dark-fill-2 rounded-xl text-sm">
            <LocalOfferIcon className="scale-[0.7]" />
            topics
          </span>
          <span className="p-1 px-2 bg-light-300 dark:bg-dark-fill-2 rounded-xl text-sm">
            <LockIcon className="scale-[0.7]" />
            companies
          </span>
          <span className="p-1 px-2 bg-light-300 dark:bg-dark-fill-2 rounded-xl text-sm">
            <EmojiObjectsIcon className="scale-[0.7]" />
            Hint
          </span>
        </div>
        <div className=" mr-4">
          <div
            dangerouslySetInnerHTML={{ __html: problem!.problemStatement }}
          />
        </div>
        <div>
          {problem?.examples.map((example) => {
            return (
              <div key={example.id}>
                <p className="font-bold mt-11">Example {example.id}:</p>
                <div className="flex gap-3 mt-3 text-gray-700 dark:text-gray-300">
                  <div className=" w-[2px] bg-gray-400 dark:bg-dark-fill-2"></div>
                  <div>
                    {example.img && (
                      <img
                        className="my-4"
                        src={example.img}
                        alt={problem?.title + "image"}
                      />
                    )}
                    <strong className="text-lg dark:text-white">Input :</strong>
                    {example.inputText} <br />
                    <strong className="text-lg dark:text-white">
                      Output :
                    </strong>{" "}
                    {example.outputText} <br />
                    <strong className="text-lg dark:text-white">
                      Explanation :
                    </strong>
                    {example.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-7 mb-[4rem]">
          <span className="font-bold">Constriants:</span>
          <ul className="flex flex-col gap-3 mt-4 ml-5">
            <div dangerouslySetInnerHTML={{ __html: problem!.constraints }} />
          </ul>
        </div>
      </div>
      <div className="w-full h-[3rem] p-1 absolute bottom-0 dark:bg-dark-problem-page-2 bg-light-200 flex items-center gap-3">
        <div className="flex gap-[2px] dark:text-gray-400">
          {problemDataLoading && dbProblemLoading ? (
            <div className="animate-pulse flex gap-2">
              <div className="rounded-s-xl h-7 w-10 bg-slate-300 dark:bg-dark-problem-page-alternate"></div>
              <div className="rounded-e-xl h-7 w-10 bg-slate-300 dark:bg-dark-problem-page-alternate  "></div>
            </div>
          ) : (
            <>
              <div
                onClick={handleToggleLike}
                className="flex items-center justify-center bg-light-300 hover:hover:bg-gray-400 dark:bg-dark-problem-page-alternate p-1 rounded-s-xl h-full hover:dark:hover:bg-dark-fill-2 cursor-pointer"
              >
                {liked ? (
                  <ThumbUpIcon className="mr-2 scale-75 text-green-500" />
                ) : (
                  <ThumbUpOffAltIcon className="scale-75" />
                )}
                {engagements.likes > 0 && (
                  <span className="ml-2">{engagements.likes}</span>
                )}
              </div>
              <div
                onClick={handleToggleDislike}
                className="flex items-center justify-center bg-light-300 hover:hover:bg-gray-400 dark:bg-dark-problem-page-alternate p-1 rounded-e-xl h-full hover:dark:hover:bg-dark-fill-2 cursor-pointer"
              >
                {disliked ? (
                  <ThumbDownIcon className="scale-75 text-red-500" />
                ) : (
                  <ThumbDownOffAltIcon className="scale-75" />
                )}
                {engagements.dislikes > 0 && (
                  <span className="ml-2">{engagements.dislikes}</span>
                )}
              </div>
            </>
          )}
        </div>
        <span
          onClick={handleToggleStarredProblems}
          className="cursor-pointer hover:text-light-primary"
        >
          {isFavourite ? (
            <StarIcon className="text-orange-500" />
          ) : (
            <StarOutlineIcon />
          )}
        </span>
      </div>
    </main>
  );
};

export default ProblemDescription;
