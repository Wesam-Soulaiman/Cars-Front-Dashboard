import { createTheme } from "@mui/material";
import { typographyOverrides } from "./typography";
import { overideComponents } from "./overrideComponents";
import { arSA } from "@mui/material/locale";
import { enUS } from "@mui/material/locale";
import "@fontsource/poppins";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/cairo";
import "@fontsource/cairo/200.css";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/cairo/800.css";
import "@fontsource/cairo/900.css";

export const theme = ({ mode = "dark", dir = "ltr" } = {}) => {
  const themeOptions = {
    direction: dir,
    palette: {
      mode: mode,
      background: {
        default: mode === "dark" ? "#1C1C1E" : "#FFFFFF",
        paper: mode === "dark" ? "#2C2C2E" : "#F5F5F5",
      },
      // Uncomment and customize these if needed:
      primary: {
        main: "#fb2c36",
      },
      secondary: {
        main: "#D0F81D",
      },
    },
    typography: typographyOverrides,
    components: overideComponents,
  };

  const themeContext = createTheme(themeOptions, dir === "ltr" ? enUS : arSA);
  return themeContext;
};
