import { alpha, Typography } from "@mui/material";

const TitleTypography = ({ color = "error", children, ...typographyProps }) => {
  typographyProps.variant = typographyProps.variant || "h3";
  typographyProps.sx = {
    textTransform: "capitalize",
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderLeftColor: (theme) => alpha(theme.palette[color].main, 0.3),
    pl: 2,
    ...typographyProps.sx,
  };

  return <Typography {...typographyProps}>{children}</Typography>;
};

export default TitleTypography;
