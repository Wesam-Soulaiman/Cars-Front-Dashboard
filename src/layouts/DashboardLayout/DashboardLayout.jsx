import { alpha, Box, IconButton, Stack } from "@mui/material";
import ModeSwitch from "../../components/ModeSwitch";
import Sidebar from "../../components/Navigations";
import { useSidebar } from "../../store/sidebarStore";
import Logo from "../../components/Logo";
import { MdFullscreen } from "react-icons/md";
import ProfileSection from "../../components/ProfileSection";
import LangSwitch from "../../components/LangSwitch";
import { CgMenuLeftAlt } from "react-icons/cg";

const DashboardLayout = ({ children, sidebarItems = [] }) => {
  const { handleSwitch } = useSidebar();

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar items={sidebarItems} />
      <Box
        sx={{
          minHeight: "100vh",
          width: "calc(100% - 260px)",
          flexGrow: 1,
        }}
      >
        <Box
          component="header"
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo logoWidth="100px" />
            <IconButton
              sx={{ mr: 1, display: { xs: "none", lg: "flex" } }}
              onClick={handleSwitch}
            >
              <CgMenuLeftAlt />
            </IconButton>
          </Box>

          <Stack flexDirection="row" gap={1} alignItems="center">
            <IconButton
              sx={{ mr: 1, display: { xs: "inline-flex", lg: "none" } }}
              onClick={handleSwitch}
            >
              <CgMenuLeftAlt />
            </IconButton>

            <IconButton
              onClick={() => {
                const root = document.getElementById("root");
                if (root?.requestFullscreen) {
                  root.requestFullscreen();
                } else if (root?.webkitRequestFullscreen) {
                  root.webkitRequestFullscreen();
                } else if (root?.msRequestFullscreen) {
                  root.msRequestFullscreen();
                }
              }}
            >
              <MdFullscreen />
            </IconButton>

            <ModeSwitch />
            <LangSwitch />
            <ProfileSection />
          </Stack>
        </Box>

        <Box
          component="main"
          sx={{
            p: { xs: 2, sm: 3 },
            minHeight: "calc(100vh - 70px)",
            backgroundColor: (theme) =>
              alpha(
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.common.black,
                0.02
              ),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
