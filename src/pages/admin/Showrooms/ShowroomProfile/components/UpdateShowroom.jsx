import { alpha } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleTypography from "../../../../../components/TitleTypography";
import ShowroomForm from "../../components/ShowroomForm";
import { useUpdateShowroom } from "../../../../../api/showrooms";
import { useTranslation } from "react-i18next";

const UpdateShowroom = ({ showroom }) => {
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
        {t("showroomProfile.update")}
      </TitleTypography>
      {!showroom.isLoading && !showroom.isError && (
        <ShowroomForm
          initialValues={showroom.data?.data.data}
          task="update"
          onSubmit={(values) => {
            const formData = new FormData();
            for (const key in values) {
              if (
                (key === "password" || key === "password_confirmation") &&
                !values[key]
              ) {
                continue;
              }
              if (key === "photo" && typeof values[key] === "string") {
                continue;
              }

              formData.append(key, values[key]);
            }

            updateShowroom.mutate(formData);
          }}
          loading={updateShowroom.isPending}
        />
      )}
    </Grid>
  );
};

export default UpdateShowroom;
