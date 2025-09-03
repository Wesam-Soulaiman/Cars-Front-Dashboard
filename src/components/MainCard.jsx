import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const MainCard = ({
  border = true,
  children,
  cardTitle,
  darkTitle = false,
  cardHeaderProps,
  cardContent = true,
  contentProps,
  ...cardProps
}) => {
  cardProps.sx = {
    p: "16px",
    border: border ? "1px solid" : "none",
    borderRadius: 2,
    borderColor: (theme) =>
      theme.palette.mode === "dark"
        ? theme.palette.divider
        : theme.palette.grey.A200,
    "& pre": {
      m: 0,
      p: "16px !important",
      fontFamily: (theme) => theme.typography.fontFamily,
      fontSize: "0.75rem",
    },
    ...cardProps.sx,
  };

  return (
    <Card elevation={0} {...cardProps}>
      {/* Render Header */}
      {cardTitle && !darkTitle && (
        <CardHeader
          title={<Typography variant="subtitle1">{cardTitle}</Typography>}
          {...cardHeaderProps}
        />
      )}

      {cardTitle && darkTitle && (
        <CardHeader
          title={<Typography variant="h3">{cardTitle}</Typography>}
          {...cardHeaderProps}
        />
      )}

      {/* Render Content */}
      {cardContent ? (
        <CardContent {...contentProps}>{children}</CardContent>
      ) : (
        children
      )}
    </Card>
  );
};

export default MainCard;
