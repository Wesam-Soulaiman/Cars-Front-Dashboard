import { alpha } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleTypography from "../../../../../components/TitleTypography";
import ShowroomForm from "../../components/ShowroomForm";
import { useUpdateShowroom } from "../../../../../api/showrooms";
import { useTranslation } from "react-i18next";

const UpdatePassword = ({ showroom }) => {
  const updateShowroom = useUpdateShowroom();
  const { t } = useTranslation();

  return (
    <Grid size={12}>
      <TitleTypography
        sx={{
          borderLeftColor: (theme) => alpha(theme.palette.info.main, 0.2),
          mb: 2,
        }}
      >
        {t("showroomProfile.updatePassword")}
      </TitleTypography>
      {!showroom.isLoading && !showroom.isError && (
        <ShowroomForm
          task="updatePassword"
          initialValues={{
            password: "",
            password_confirmation: "",
          }}
          onSubmit={(values) => {
            updateShowroom.mutate({
              id: showroom.data?.data.data.id,
              data: {
                password: values.password,
                password_confirmation: values.password_confirmation,
              },
            });
          }}
          loading={updateShowroom.isPending}
        />
      )}
    </Grid>
  );
};

export default UpdatePassword;
