import { useEffect, useState } from "react";
import CodeTagSVG from "../../assets/codeTag";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useTheme from "../../hooks/useTheme";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useOutletProblem } from "../../pages/ProblemDetialLayout";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ISettings } from "../../types/types";
import SettingsModal from "../SettingsModal";

type PlayGroundProps = {
  handleCodeChange(code: string): void;
  userCode: string;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
};
const PlayGround = ({ handleCodeChange, userCode }: PlayGroundProps) => {
  const { problem } = useOutletProblem();
  const { theme } = useTheme();
  const [currCase, setCurrCase] = useState(1);
  const fontSize = useLocalStorage("lcc-fontSize", "16px")[0];

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const openSettingModal = () => {
    setSettings({ ...settings, settingsModalIsOpen: true });
  };

  useEffect(() => {
    function exitHandler() {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <main className="relative m-3 mx-1 text-light-text dark:bg-dark-problem-page-2 bg-light-200 rounded-xl overflow-hidden flex flex-col">
      <div className="flex flex-1">
        <Split
          className="w-full"
          direction="vertical"
          minSize={60}
          sizes={[60, 40]}
          gutterSize={5}
        >
          <div className="rounded-lg overflow-hidden flex flex-col">
            <div className="h-fit">
              <div className="h-[3rem] w-full bg-light-300 dark:bg-dark-problem-page-alternate p-3 flex items-center justify-between">
                <p className="flex items-center gap-2">
                  <span className="text-green-500">
                    <CodeTagSVG />
                  </span>{" "}
                  code
                </p>
                <div className="flex gap-2">
                  <div
                    onClick={handleFullScreen}
                    className="cursor-pointer group relative"
                  >
                    {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}

                    <span className="tooltip -bottom-[2.4rem] -left-[2.5rem] py-1 px-2 ">
                      {isFullScreen ? "Exit" : "Fullscreen"}
                    </span>
                  </div>
                  <div
                    onClick={openSettingModal}
                    className="cursor-pointer group relative"
                  >
                    <SettingsIcon />
                    <span className="tooltip -bottom-[2.4rem] -left-[2.5rem] py-1 px-2 ">
                      settings
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[2.5rem] flex p-1 border-b-2 border-light-300 dark:border-dark-problem-page-alternate">
                <div className="py-1 px-2 rounded-lg hover:bg-light-300 dark:hover:bg-dark-problem-page-alternate cursor-pointer inline">
                  Javascript <KeyboardArrowDownIcon />
                </div>
              </div>
            </div>
            <div className="overflow-auto custom-scrollbar">
              <CodeMirror
                onChange={handleCodeChange}
                value={userCode}
                theme={theme == "light" ? theme : vscodeDark}
                extensions={[javascript()]}
                style={{ fontSize: settings.fontSize }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex px-5 h-10 items-center space-x-6 bg-light-300 dark:bg-dark-problem-page-alternate">
              <div className="relative flex h-full flex-col justify-center cursor-pointer">
                <div className="text-sm font-medium flex items-end">
                  <span className="text-green-500">
                    <CheckBoxIcon className=" scale-90" />
                  </span>
                  Testcases
                </div>
              </div>
            </div>
            <div className="flex flex-col p-5 gap-3 overflow-auto flex-1 custom-scrollbar">
              <div className=" h-[2.5rem] flex gap-2 w-full">
                {problem?.examples.map((eg) => {
                  return (
                    <div
                      key={eg.id}
                      onClick={() => setCurrCase(eg.id)}
                      className={`px-3 py-1 h-fit ${
                        currCase === eg.id ? "btn-3" : "hover:btn-3"
                      }`}
                    >
                      Case {eg.id}
                    </div>
                  );
                })}
              </div>

              <div>
                <p className=" dark:text-neutral-400">input {currCase}</p>
                <div>
                  {
                    problem?.examples.find((eg) => eg.id === currCase)
                      ?.inputText
                  }
                </div>
              </div>
            </div>
          </div>
        </Split>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </main>
  );
};

export default PlayGround;
