import { Box } from "@mui/material";
import { Outlet } from "react-router";
import useMount from "../../hooks/useMount";
import ProgressBar from "../../components/ProgressBar";
import { AuthContextProvider } from "../../providers/AuthProvider";

const RootLayout = () => {
  const mount = useMount();

  if (!mount) {
    return <ProgressBar />;
  }

  return (
    <Box>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </Box>
  );
};

export default RootLayout;
