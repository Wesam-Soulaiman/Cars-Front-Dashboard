import ThemeProvider from "./providers/ThemeProviders";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";
import AppRouterProvider from "./providers/AppRouterProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useTokenRefreshScheduler from "./hooks/useTokenRefreshScheduler";

const App = () => {
  useTokenRefreshScheduler();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <AppRouterProvider />
        <ToastContainer />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
