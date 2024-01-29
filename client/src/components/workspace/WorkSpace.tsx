import Split from "react-split";
import "./workspace.css";
import ProblemDescription from "./ProblemDescription";
import PlayGround from "./PlayGround";
import useWindowSize from "../../hooks/useWindowSize";
import Confetti from "react-confetti";

type WorkSpaceProps = {
  success: boolean;
  userCode : string;
  handleCodeChange(code: string): void;
};
const WorkSpace = ({ success, handleCodeChange, userCode }: WorkSpaceProps) => {
  const { width, height } = useWindowSize();

  return (
    <main className="h-[calc(100vh-3rem)] w-full">
      <Split
        className="split h-full w-full"
        minSize={0}
        gutterSize={5}
        sizes={[40, 60]}
      >
        <ProblemDescription />
        <PlayGround userCode = {userCode} handleCodeChange={handleCodeChange} />
      </Split>
      {success && (
        <Confetti
          gravity={0.3}
          tweenDuration={4000}
          width={width - 1}
          height={height - 1}
        />
      )}
    </main>
  );
};

export default WorkSpace;
