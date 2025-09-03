import { useEffect } from "react";
import useRefresh from "../api/useRefresh";

const useTokenRefreshScheduler = () => {
  const { mutate: refreshToken } = useRefresh();

  useEffect(() => {
    const isAuthenticated = () => {
      return !!localStorage.getItem("cartoken");
    };

    if (!isAuthenticated()) return;

    const refreshInterval = 7 * 24 * 60 * 60 * 1000;

    const scheduleRefresh = () => {
      const timeoutId = setTimeout(() => {
        refreshToken();
        const intervalId = setInterval(refreshToken, refreshInterval);
        return () => clearInterval(intervalId);
      }, refreshInterval);

      return () => clearTimeout(timeoutId);
    };

    const cleanup = scheduleRefresh();
    return cleanup;
  }, [refreshToken]);
};

export default useTokenRefreshScheduler;
