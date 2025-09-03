import { IconButton, useTheme as useMuiTheme } from "@mui/material";
import { useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../store/themeStore";

const ModeSwitch = () => {
  const theme = useMuiTheme();
  const { mode, changeMode } = useTheme((state) => state);

  useEffect(() => {
    localStorage.setItem("car-mode", mode);
  }, [mode]);

  return (
    <IconButton
      color="primary"
      onClick={() => {
        changeMode();
      }}
    >
      {theme.palette.mode === "dark" ? (
        <MdOutlineLightMode />
      ) : (
        <MdOutlineDarkMode />
      )}
    </IconButton>
  );
};

export default ModeSwitch;
