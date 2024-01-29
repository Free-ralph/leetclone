import {
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Problems from "../utils/problems";
import { Problem } from "../types/problem";
import { useEffect, useState } from "react";

type ContextType = {
  problem?: Problem;
};

const ProblemDetialLayout = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setProblem(Problems[id]);
    }
    setLoading(false);
  }, [id]);

  if (!id || !problem) {
    return <main>Not Found</main>;
  }
  if (loading) {
    return <main>...laoding</main>;
  }
  return (
    <main>
      
        <Outlet context={{ problem } satisfies ContextType} />
      
    </main>
  );
};

export function useOutletProblem() {
  return useOutletContext<ContextType>();
}

export default ProblemDetialLayout;
