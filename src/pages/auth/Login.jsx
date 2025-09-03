import { Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import Logo from "../../components/Logo";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "60%", md: "40%" },
          borderRadius: "15px",
          p: 6,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "calc(20px + 0.15vw)",
              }}
            >
              {t("login.welcome")}
            </Typography>
            <Logo logoWidth="120px" />
          </Box>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "calc(20px + 0.15vw)",
            }}
          >
            {t("login.title")}
          </Typography>
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
