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
  // --color-automotive-red-50: #fef2f2;
  // --color-automotive-red-100: #fee2e2;
  // --color-automotive-red-200: #fecaca;
  // --color-automotive-red-300: #fca5a5;
  // --color-automotive-red-400: #f87171;
  // --color-automotive-red-500: #ef4444;
  // --color-automotive-red-600: #dc2626;
  // --color-automotive-red-700: #b91c1c;
  // --color-automotive-red-800: #991b1b;
  // --color-automotive-red-900: #7f1d1d;
  // --color-automotive-red-950: #450a0a;

  // --color-automotive-carbon-50: #f8fafc;
  // --color-automotive-carbon-100: #f1f5f9;
  // --color-automotive-carbon-200: #e2e8f0;
  // --color-automotive-carbon-300: #cbd5e1;
  // --color-automotive-carbon-400: #94a3b8;
  // --color-automotive-carbon-500: #64748b;
  // --color-automotive-carbon-600: #475569;
  // --color-automotive-carbon-700: #334155;
  // --color-automotive-carbon-800: #1e293b;
  // --color-automotive-carbon-900: #0f172a;
  // --color-automotive-carbon-950: #020617;\

  const themeContext = createTheme(
    {
      direction: dir,
      palette: {
        mode: mode,
        background: {
          default: mode === "dark" ? "#020617" : "#f8fafc",
          paper: mode === "dark" ? "#0f172a" : "#e2e8f0",
        },
        primary: {
          main: "#ef4444",
          light: "#dc2626",
          dark: "#f87171",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
      },
      typography: typographyOverrides,

      components: overideComponents,
    },
    dir === "ltr" ? enUS : arSA
  );
  return themeContext;
};
