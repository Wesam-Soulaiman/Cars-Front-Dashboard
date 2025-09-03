import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleTypography from "../../../../../components/TitleTypography";
import DoupleClickToConfirm from "../../../../../components/DoupleClickToConfirm";
import { useTranslation } from "react-i18next";
import { useDeleteCarDetails } from "../../../../../api/cars";

const DeleteCar = () => {
  const deleteCar = useDeleteCarDetails();
  const { t } = useTranslation();

  return (
    <Grid size={12}>
      <Box>
        <TitleTypography mb={2}>
          {t("deleteSec.button", { thetypes: t("thetypes.car") })}
        </TitleTypography>
        <Typography sx={{ maxWidth: "1000px", mb: 2 }}>
          {t("deleteSec.warning")}
        </Typography>
        <DoupleClickToConfirm
          color="error"
          loading={deleteCar.isPending}
          onClick={() => {
            deleteCar.mutate();
          }}
        >
          {t("gbtn.delete")}
        </DoupleClickToConfirm>
      </Box>
    </Grid>
  );
};

export default DeleteCar;
