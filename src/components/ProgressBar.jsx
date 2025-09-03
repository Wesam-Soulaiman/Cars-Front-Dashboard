import { LinearProgress } from "@mui/material";

const ProgressBar = () => {
  return (
    <LinearProgress
      color="primary"
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "5px",
        borderRadius: "6px",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    />
  );
};

export default ProgressBar;
