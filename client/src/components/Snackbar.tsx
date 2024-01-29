import { Snackbar, Alert } from "@mui/material";
import useSnackBar from "../hooks/useSnackBar";
const FlashMessage = () => {
  const { snack, handleCloseSnack } = useSnackBar();
  return (
    <main>
      <Snackbar
        open={snack.isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default FlashMessage;
