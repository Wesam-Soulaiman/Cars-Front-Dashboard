import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleTypography from "../../../../../components/TitleTypography";
import DoupleClickToConfirm from "../../../../../components/DoupleClickToConfirm";
import { useDeleteShowroomDetails } from "../../../../../api/showrooms";
import { useTranslation } from "react-i18next";

const DeleteShowroom = () => {
  const deleteShowroom = useDeleteShowroomDetails();
  const { t } = useTranslation();

  return (
    <Grid size={12}>
      <Box>
        <TitleTypography mb={2}>
          {t("deleteSec.button", { thetypes: t("thetypes.showroom") })}
        </TitleTypography>
        <Typography sx={{ maxWidth: "1000px", mb: 2 }}>
          {t("deleteSec.warning")}
        </Typography>
        <DoupleClickToConfirm
          color="error"
          loading={deleteShowroom.isPending}
          onClick={() => {
            deleteShowroom.mutate();
          }}
        >
          {t("gbtn.delete")}
        </DoupleClickToConfirm>
      </Box>
    </Grid>
  );
};

export default DeleteShowroom;
