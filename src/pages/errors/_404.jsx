import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "../../components/Logo";

const NotFound404 = () => {
  const navigate = useNavigate();
  const redirectHandeler = () => {
    navigate("/admin/dashboard");
  };
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Logo logoWidth="200px" mb={3} />
      <Typography
        sx={{
          fontSize: "calc(30px + 1vw)",
          letterSpacing: "5px",
          "& .o": {
            color: "primary.main",
          },
        }}
      >
        4<span className="o">0</span>4
      </Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {t("error.404.title")}
      </Typography>
      <Button onClick={redirectHandeler} variant="outlined">
        {t("error.404.action")}
      </Button>
    </Box>
  );
};

export default NotFound404;
