import { Suspense, useEffect, useState } from "react";
import MainCard from "./MainCard";
import { Stack, Typography } from "@mui/material";

// Loading screen shown while component is being loaded
const LoadingFallback = ({ progress }) => {
  return (
    <MainCard>
      <Stack justifyContent="center" alignItems="center">
        <Typography>Loading ...</Typography>
        <Typography>{progress}%</Typography>
      </Stack>
    </MainCard>
  );
};

// Higher-order component to wrap lazy-loaded components
const Loadable = (Component) => {
  const LoadableComponent = (props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 100); // Increment progress every 100ms

      return () => clearInterval(interval);
    }, []);

    return (
      <Suspense fallback={<LoadingFallback progress={progress} />}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LoadableComponent;
};

export default Loadable;
