import { severityType } from "./../types/types";
import { useRecoilState } from "recoil";
import { snackState } from "../state/atoms/snackMessageAtom";

const useSnackBar = () => {
  const [snack, setSnack] = useRecoilState(snackState);
  const handleSnackMessage = (message: string, severity: severityType) => {
    setSnack({ message, severity, isOpen: true });
  };
  const handleCloseSnack = () => {
    setSnack({
      message: "",
      severity: "success",
      isOpen: false,
    });
  };
  const handleOpenSnack = () => {
    setSnack((prev) => ({ ...prev, isOpen: true }));
  };

  return {
    handleSnackMessage,
    handleCloseSnack,
    handleOpenSnack,
    snack,
  };
};

export default useSnackBar;
