import { Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const LoadingDataError = ({ refetch }) => {
  const { t } = useTranslation();

  return (
    <Stack alignItems={"center"}>
      <Typography>{t("loadingError.title")}</Typography>
      <Button onClick={() => refetch()}>{t("loadingError.refetch")}</Button>
    </Stack>
  );
};

export default LoadingDataError;
