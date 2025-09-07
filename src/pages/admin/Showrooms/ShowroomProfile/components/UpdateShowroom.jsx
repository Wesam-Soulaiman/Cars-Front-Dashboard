import { alpha } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleTypography from "../../../../../components/TitleTypography";
import ShowroomForm from "../../components/ShowroomForm";
import { useUpdateShowroom } from "../../../../../api/showrooms";
import { useTranslation } from "react-i18next";

const UpdateShowroom = ({ showroom }) => {
  const updateShowroom = useUpdateShowroom();
  const { t } = useTranslation();
  const storeData = showroom.data?.data.data;

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
          initialValues={{
            address: storeData.address || "",
            address_ar: storeData.address_ar || "",
            email: storeData.email || "",
            governorate_id: storeData.governorate.id || 1,
            store_type_id: storeData.store_type.id || 1,
            name: storeData.name || "",
            name_ar: storeData.name_ar || "",
            phone: storeData.phone || "",
            whatsapp_phone: storeData.whatsapp_phone || "",
            photo: storeData.photo || null,
          }}
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
