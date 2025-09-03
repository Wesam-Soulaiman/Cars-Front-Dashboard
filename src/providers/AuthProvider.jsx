import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Stack, Typography } from "@mui/material";
// import { request } from "../api/baseRequest";
// import { homepageMap } from "../router/homepageMap";
import { useTranslation } from "react-i18next";
import { Decrypt } from "../utils/encryption";

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  base: "",
  isLoggedIn: true,
  logout: null,
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("cartoken");

    const getMe = async () => {
      try {
        setIsLoading(true);
        const decrypted = Decrypt(localStorage.getItem("User"));
        const { user, permissions } = JSON.parse(decrypted);
        console.log(user);
        console.log(permissions);

        setUser(user);
        setPermissions(permissions);
        setIsLoggedIn(true);

        const pathname =
          location.pathname === "/" ? "/admin/dashboard" : location.pathname;
        navigate(`${pathname}`);
      } catch (err) {
        setIsLoggedIn(false);
        navigate("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      setIsLoggedIn(false);
      navigate("/auth/login");
    } else {
      getMe();
    }
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <Stack
        height={"100vh"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          textAlign={"center"}
          sx={{
            fontSize: "calc(0.15vw + 20px)",
            fontWeight: "600",
          }}
        >
          {t("authContext.waiting")}
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{
            fontSize: "calc(0.15vw + 16px)",
            fontWeight: "400",
            color: "grey.500",
          }}
        >
          {t("authContext.desc")}
        </Typography>
      </Stack>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        isLoading: false,
        isLoggedIn,
        logout: () => {
          localStorage.removeItem("cartoken");
          setIsLoggedIn(false);
          navigate("/auth/login");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
