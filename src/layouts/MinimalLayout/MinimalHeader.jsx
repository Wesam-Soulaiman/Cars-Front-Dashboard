import { Box } from "@mui/material";
import Logo from "../../components/Logo";

const MinimalHeader = ({ ...props }) => {
  props.sx = {
    width: "100%",
    height: "70px",
    display: "flex",
    alignItems: "center",
    mx: "auto",
    justifyContent: "space-between",
    px: 4,
    ...props.sx,
  };
  return (
    <Box {...props}>
      <Logo logoWidth="120px" />
    </Box>
  );
};

export default MinimalHeader;
