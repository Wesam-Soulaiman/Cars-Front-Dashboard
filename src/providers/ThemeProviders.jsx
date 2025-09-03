import {
  ThemeProvider as BaseThemeProvider,
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
} from "@mui/material";
import { theme } from "../themes";
import { useEffect, useState } from "react";
import { useTheme } from "../store/themeStore";
import { useTranslation } from "react-i18next";
import { setLocale } from "yup";
import { ar, en } from "yup-locales";

const ThemeProvider = ({ children }) => {
  const { mode } = useTheme((state) => state);
  const [dir, setDir] = useState("ltr");
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      setDir("rtl");
      setLocale(ar);
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      setDir("ltr");
      setLocale(en);
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [i18n.language]);

  const appTheme = theme({ mode, dir });

  return (
    <StyledEngineProvider injectFirst>
      <BaseThemeProvider theme={appTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":fullscreen": {
              backgroundColor: appTheme.palette.background.default,
            },
            "*::-webkit-scrollbar": {
              width: "5px",
              height: "10px",
            },
            "*::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
              borderRadius: "10px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
              border: "2px solid #f0f0f0",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        />
        {children}
      </BaseThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
