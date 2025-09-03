import { alpha, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleTypography from "../../../../../components/TitleTypography";
import { useTranslation } from "react-i18next";
import { useUpdateCar } from "../../../../../api/cars";
import CarForm from "../../components/CarForm";

const UpdateCar = ({ car }) => {
  const updateCar = useUpdateCar();
  const { t } = useTranslation();

  return (
    <Grid size={12}>
      <TitleTypography
        sx={{
          borderLeftColor: (theme) => alpha(theme.palette.info.main, 0.2),
          mb: 2,
        }}
      >
        {t("carProfile.update")}
      </TitleTypography>
      {car.isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : !car.isError ? (
        <CarForm
          task="update"
          initialValues={{
            brand_id: car?.data?.data?.data?.brand_id || "",
            model_id: car?.data?.data?.data?.model_id || "",
            structure_id: car?.data?.data?.data?.structure_id || "",
            store_id: car?.data?.data?.data?.store_id || 1,
            price: car?.data?.data?.data?.price || 0,
            mileage: car?.data?.data?.data?.mileage || 0,
            year_of_construction:
              car?.data?.data?.data?.year_of_construction ||
              new Date().getFullYear(),
            register_year:
              car?.data?.data?.data?.register_year || new Date().getFullYear(),
            number_of_seats: car?.data?.data?.data?.number_of_seats || 0,
            drive_type: car?.data?.data?.data?.drive_type || "",
            fuel_type: car?.data?.data?.data?.fuel_type || "",
            doors: car?.data?.data?.data?.doors || 4,
            cylinders: car?.data?.data?.data?.cylinders || 0,
            cylinder_capacity: car?.data?.data?.data?.cylinder_capacity || 0,
            gears: car?.data?.data?.data?.gears || "",
            type: car?.data?.data?.data?.type || "",
            seat_type: car?.data?.data?.data?.seat_type || "",
            color: car?.data?.data?.data?.color || "",
            lights: car?.data?.data?.data?.lights || "",
            features: car?.data?.data?.data?.features?.map((f) => f.id) || [],
            main_photo: car?.data?.data?.data?.main_photo || null,
            photos: car?.data?.data?.data?.photos || [],
          }}
          onSubmit={async (values) => {
            const formData = new FormData();

            for (let key in values) {
              if (
                key === "main_photo" ||
                key === "photos" ||
                key === "features"
              )
                continue;
              formData.append(key, values[key]);
            }

            if (values.main_photo instanceof File) {
              formData.append("main_photo", values.main_photo);
            }

            for (let i = 0; i < values.photos.length; i++) {
              const photo = values.photos[i];
              if (photo.photo instanceof File) {
                formData.append(`photos[${i}]`, photo.photo);
              }
            }

            if (values.features?.length > 0) {
              values.features.forEach((f) => formData.append("features[]", f));
            }

            updateCar.mutate(formData);
          }}
          loading={updateCar.isPending}
        />
      ) : null}
    </Grid>
  );
};

export default UpdateCar;
