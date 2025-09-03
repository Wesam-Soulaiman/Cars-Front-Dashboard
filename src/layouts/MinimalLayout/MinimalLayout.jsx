import { alpha, Box } from "@mui/material";
import { Outlet } from "react-router";
import MinimalHeader from "./MinimalHeader";

const MinimalLayout = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "calc(100svh - 70px)", md: "calc(100vh - 70px)" },
      }}
    >
      <MinimalHeader />
      <Box
        sx={{
          position: "relative",
          zIndex: "2",
          backdropFilter: "blur(2px)",
          backgroundColor: (theme) =>
            alpha(
              theme.palette.common[
                theme.palette.mode === "dark" ? "white" : "black"
              ],
              0.02
            ),
          height: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MinimalLayout;
