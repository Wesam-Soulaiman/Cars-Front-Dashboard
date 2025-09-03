import { useTheme } from "@mui/material";

const useGetDarkValue = () => {
  const theme = useTheme();

  const getVlaue = (darkValue, lightValue) => {
    return theme.palette.mode === "dark" ? darkValue : lightValue;
  };

  return { getVlaue };
};

export default useGetDarkValue;
