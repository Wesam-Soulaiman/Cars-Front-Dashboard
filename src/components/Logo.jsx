import { Box } from "@mui/material";
import logo from "../assets/logo.png";

const Logo = ({ logoWidth = "200px", ...props }) => {
  return (
    <Box
      component="img"
      src={logo}
      alt="Logo Icon"
      sx={{
        width: logoWidth,
        height: "auto",
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default Logo;
