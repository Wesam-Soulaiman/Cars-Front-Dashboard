import { Box } from "@mui/material";
import Logo from "../Logo";

const SidebarHeader = () => {
  return (
    <Box
      sx={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        pl: 1,
      }}
    >
      <Logo logoWidth="120px" />
    </Box>
  );
};

export default SidebarHeader;
