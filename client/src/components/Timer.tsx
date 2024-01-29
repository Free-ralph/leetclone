import { useEffect, useState } from "react";
import { motion as m, AnimatePresence, Variants } from "framer-motion";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const ShowTimerVariant: Variants = {
  hidden: {
    width: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    width: "10rem",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delayChildren: 0.2,
    },
  },
};

const TimerChildVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Timer = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleResetTimer = () => {
    setTimer({ hours: 0, minutes: 0, seconds: 0 });
    setIsPaused(false);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showTimer && !isPaused) {
      interval = setInterval(() => {
        // Update the timer
        setTimer((prevTimer) => {
          const newSeconds = prevTimer.seconds + 1;
          let newMinutes = prevTimer.minutes;
          let newHours = prevTimer.hours;
          if (newSeconds === 60) newMinutes = (newMinutes + 1) % 60;
          if (newMinutes === 60) newHours = newHours + 1;

          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds % 60,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showTimer, isPaused]);

  return (
    <div className="flex h-full rounded gap-1">
      <AnimatePresence>
        {showTimer && (
          <m.div
            variants={ShowTimerVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="h-full"
          >
            <m.div variants={TimerChildVariant} className="h-full flex gap-1">
              <div
                onClick={handleResetTimer}
                className="group relative btn-1 py-1 px-2"
              >
                <RestartAltIcon />
                <span className="w-[7rem] py-1 px-1 -bottom-[2.5rem] -left-[2rem] tooltip">
                  Reset time
                </span>
              </div>
              <div
                onClick={handleTogglePause}
                className="px-1 flex-1 btn-1 flex group relative"
              >
                <p>
                  <span className="mr-2">
                    {isPaused ? (
                      <PlayCircleOutlineIcon />
                    ) : (
                      <PauseCircleOutlineIcon />
                    )}
                  </span>
                  {formatTime(timer.hours)} : {formatTime(timer.minutes)}:{" "}
                  {formatTime(timer.seconds)}
                </p>
                <span className="py-1 px-2 -bottom-[2.5rem] left-[2rem] tooltip">
                  {isPaused ? "play" : "pause"}
                </span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
      <div className="relative group flex">
        <div
          className=" btn-1 px-3 flex justify-center font-semibold"
          onClick={() => setShowTimer((prev) => !prev)}
        >
          {showTimer ? <CloseIcon /> : <AccessAlarmsIcon />}
        </div>
        <span className="w-[7rem] py-1 px-2 -bottom-[2.5rem] -left-[2rem] tooltip">
          {showTimer ? "close timer" : "Show timer"}
        </span>
      </div>
    </div>
  );
};

export default Timer;
