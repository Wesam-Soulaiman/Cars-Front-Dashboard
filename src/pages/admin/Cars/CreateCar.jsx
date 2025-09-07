import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CarForm from "./components/CarForm";
import { useCreateCar } from "../../../api/cars";

const CreateCar = () => {
  const { t } = useTranslation();
  const createCar = useCreateCar();

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("forms.create", { types: t("types.car") })}
      </Typography>
      <CarForm
        initialValues={{
          brand_id: null,
          model_id: null,
          color_id: null,
          structure_id: null,
          deal_id: null,
          store_id: null,
          hex: "",
          price: "",
          mileage: "",
          year_of_construction: "",
          register_year: "",
          cylinders: "",
          cylinder_capacity: "",
          gear_id: null,
          number_of_seats: "",
          drive_type: "",
          fuel_type_id: null,
          used: null,
          light_id: null,
          features: [],
          main_photo: null,
          photos: [],
        }}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            if (key === "photos" || key === "features") {
              return;
            }

            if (values[key] !== null && values[key] !== undefined) {
              formData.append(key, values[key]);
            }
          });

          if (values.features) {
            values.features.forEach((feature, index) => {
              formData.append(`features[${index}]`, feature);
            });
          }

          if (values.photos) {
            values.photos.forEach((photo, index) => {
              const file = photo instanceof File ? photo : photo.photo;
              if (file) {
                formData.append(`photos[${index}]`, file);
              }
            });
          }

          if (values.main_photo) {
            formData.append("main_photo", values.main_photo);
          }

          createCar.mutateAsync(formData);
          resetForm();
        }}
        loadingButtonProps={{
          loading: createCar.isPending,
        }}
      />
    </Box>
  );
};

export default CreateCar;
