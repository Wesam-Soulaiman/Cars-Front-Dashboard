import { styled, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MotionTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  opacity: !open ? 0 : 1,
  textShadow: `3px 3px 15px ${theme.palette.primary.main}`, // fixed backtick typo
}));

const DoupleClickToConfirm = ({ onClick, children, ...buttonProps }) => {
  const [clickTimes, setClickTimes] = useState(0);
  const { t } = useTranslation();

  const handleClickIncrease = () => {
    setClickTimes((prev) => prev + 1);
  };

  if (!onClick) {
    throw new Error(
      "DoupleClickToConfirm component requires an onClick handler, but it's missing."
    );
  }

  buttonProps.variant = buttonProps.variant || "outlined";

  return (
    <>
      <Button
        {...buttonProps}
        loading={buttonProps.loading || false}
        onClick={(e) => {
          if (clickTimes === 0) {
            handleClickIncrease();
            return;
          }
          onClick(e);
          setClickTimes(0);
        }}
      >
        {children}
      </Button>
      <MotionTypography
        open={clickTimes !== 0}
        variant="caption"
        sx={{ ml: 1 }}
      >
        {t("click-tw")}
      </MotionTypography>
      <MotionTypography
        open={buttonProps.loading || false}
        variant="caption"
        sx={{ ml: 1 }}
      >
        {t("gbtn.deleting")}...
      </MotionTypography>
    </>
  );
};

export default DoupleClickToConfirm;
