import { useEffect } from "react";
import { useSidebar } from "../../store/sidebarStore";
import MiniDrawerStyled from "./MiniDrawerStyled";
import { Box, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { drawerWidth } from "../../config";
import SidebarHeader from "./SidebarHeader";
import NavItemsRenderer from "../NavItems";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Sidebar = ({ items = [] }) => {
  const { open, handleClose, handleOpen } = useSidebar();
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (matchDownLg) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [handleClose, handleOpen, matchDownLg]);

  useEffect(() => {
    if (matchDownLg && open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Box
        component="nav"
        dir={direction}
        sx={{ display: { xs: "none", lg: "initial" } }}
      >
        <MiniDrawerStyled
          dir={direction}
          anchor="left"
          variant="permanent"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              "&::-webkit-scrollbar": { width: "0px", height: "10px" },
            },
          }}
        >
          <SidebarHeader />
          <Box sx={{ maxWidth: "100%" }}>
            <NavItemsRenderer items={items} />
          </Box>
        </MiniDrawerStyled>
      </Box>

      <Box dir={direction}>
        <SwipeableDrawer
          anchor="left"
          dir={direction}
          open={open && matchDownLg}
          variant="temporary"
          onClose={handleClose}
          onOpen={handleOpen}
          swipeAreaWidth={50}
          sx={{
            display: { lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid",
              borderRightColor: "divider",
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          }}
        >
          <Box sx={{ maxWidth: drawerWidth }} role="presentation">
            <SidebarHeader />
            <Box sx={{ maxWidth: "100%" }}>
              <NavItemsRenderer items={items} />
            </Box>
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
};

export default Sidebar;
