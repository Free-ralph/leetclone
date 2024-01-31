import { Link } from "react-router-dom";
import ToggleThemeModes from "./ToggleThemeModes";
import { useRecoilValue } from "recoil";
import Logout from "./Logout";
import Timer from "./Timer";
import { authModelState } from "../state/atoms/authModelAtom";
import LoginIcon from "@mui/icons-material/Login";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BackupIcon from "@mui/icons-material/Backup";
import { LogoSvgDark, LogoSvgLight } from "./LogoSvg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import problems from "../utils/problems";

type NavbarProps = {
  problemPage?: boolean;
  handleSubmit?(): void;
};

const Nabvar = ({ problemPage, handleSubmit }: NavbarProps) => {
  const auth = useRecoilValue(authModelState);
  const { id } = useParams();
  const [curProblemIdx, setcurProblemIdx] = useState(() => {
    if (id) {
      return problems[id].order;
    }
  });

  const navigate = useNavigate();
  const handleNextProblem = () => {
    if (curProblemIdx) {
      let newIdx = curProblemIdx + 1;
      let newProblem = Object.keys(problems).find(
        (key) => problems[key].order == newIdx
      );
      if (!newProblem) {
        newProblem = Object.keys(problems).find(
          (key) => problems[key].order == 1
        );
        newIdx = 1;
      }
      setcurProblemIdx(newIdx);
      navigate(`/problem/${newProblem}`);
    }
  };

  const handlePrevProblem = () => {
    if (curProblemIdx) {
      let newIdx = curProblemIdx - 1;
      let newProblem = Object.keys(problems).find(
        (key) => problems[key].order == newIdx
      );
      if (!newProblem) {
        newProblem = Object.keys(problems).find(
          (key) => problems[key].order == Object.keys(problems).length
        );
        newIdx = Object.keys(problems).length;
      }
      setcurProblemIdx(newIdx);
      navigate(`/problem/${newProblem}`);
    }
  };

  const handleRandomProblem = () => {
    if (curProblemIdx) {
      let newIdx = Math.floor(Math.random() * Object.keys(problems).length) + 1;
      if(newIdx === curProblemIdx){
        if(newIdx - 1 === 0){
          newIdx ++
        }else{
          newIdx --
        }
      }
      let newProblem = Object.keys(problems).find(
        (key) => problems[key].order == newIdx
      );
      setcurProblemIdx(newIdx);
      navigate(`/problem/${newProblem}`);
    }
  };

  useEffect(() => {}, []);
  return (
    <nav
      className={`w-full h-[3rem] shadow-sm mt-1 ${
        problemPage ? "dark:bg-dark-problem-page" : "dark:bg-dark-alternate"
      }`}
    >
      <div
        className={`${
          problemPage ? "px-5" : "CustomContainer"
        } flex justify-between items-center h-full`}
      >
        <div className="flex items-center">
          <Link to="/" className="h-[1.5rem]">
            <div className="hidden dark:block h-full">
              <LogoSvgDark />
            </div>
            <div className=" dark:hidden h-full">
              <LogoSvgLight />
            </div>
          </Link>
          {problemPage && (
            <div className="flex ml-5 items-center hover:bg-gray-200 dark:hover:bg-dark-alternate rounded">
              <span className="cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-fill-2 p-1 transition-all delay-75">
                <FormatListBulletedIcon className=" dark:text-gray-400" />{" "}
                <span className="ml-1">Problems List</span>
              </span>
              <span
                onClick={handlePrevProblem}
                className="cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-fill-2 p-1transition-all delay-75 text-gray-400"
              >
                <ChevronLeftIcon fontSize="large" />
              </span>
              <span
                onClick={handleNextProblem}
                className="cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-fill-2  p-1transition-all delay-75 text-gray-400"
              >
                <ChevronRightIcon fontSize="large" />
              </span>
              <span
                onClick={handleRandomProblem}
                className="cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-fill-2  p-1transition-all delay-75 text-gray-400"
              >
                <ShuffleIcon />
              </span>
            </div>
          )}
        </div>
        {problemPage && (
          <div className="flex gap-2 h-[2.5rem]">
            <div className="btn-1 px-3 flex justify-center font-semibold">
              {" "}
              <PlayArrowIcon className="mr-1" />
              Run
            </div>
            <div
              onClick={handleSubmit}
              className=" btn-1 text-green-600 dark:text-green-300 px-3 flex justify-center font-semibold"
            >
              <BackupIcon className="mr-1" />
              Submit
            </div>

            <Timer />
          </div>
        )}
        <ul className="flex gap-2 items-center">
          <li>
            {auth?.user ? (
              <Logout />
            ) : (
              <Link className="px-2 py-2 btn-2" to="/auth/login">
                <LoginIcon className="scale-[0.8] md:mr-2" />
                <span className="hidden md:inline">LogIn</span>
              </Link>
            )}
          </li>

          <li>
            <ToggleThemeModes />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nabvar;
