import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { ProfileInterface } from "../types/auth";

const useProblemDataFromProfile = (problemID: string) => {
  const axiosPrivate = useAxiosPrivate();
  const [dbProblemData, setDbProblemData] = useState({
    disliked: false,
    liked: false,
    solved: false,
    isFavourite: false,
  });
  
  const { isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get<{ userProfile: ProfileInterface }>(
          "auth/profile"
        );
        setDbProblemData({
          disliked:
            res.data?.userProfile.dislikedProblems.includes(problemID) || false,
          liked:
            res.data?.userProfile.likedProblems.includes(problemID) || false,
          solved:
            res.data?.userProfile.solvedProblems.includes(problemID) || false,
          isFavourite:
            res.data?.userProfile.starredProblems.includes(problemID) || false,
        });
        return res.data;
      } catch (err) {}
    },
  });

  return { ...dbProblemData, isLoading, setDbProblemData };
};

export default useProblemDataFromProfile;
