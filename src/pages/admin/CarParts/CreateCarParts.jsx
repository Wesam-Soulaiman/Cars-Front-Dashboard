import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Permission from "../../../components/Permission";
import { useCreateCarParts } from "../../../api/carParts";
import CarPartsForm from "./components/CarPartsForm";

const CreateCarParts = () => {
  const { t } = useTranslation();
  const createCarParts = useCreateCarParts();

  return (
    <Permission permission="car_part.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.carParts") })}
        </Typography>
        <CarPartsForm
          initialValues={{
            brand_id: null,
            model_id: null,
            category_id: null,
            price: 0,
            creation_country: "",
            main_photo: null,
          }}
          onSubmit={(values, { resetForm }) => {
            createCarParts.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createCarParts.isPending,
          }}
        />
      </Box>
    </Permission>
  );
};

export default CreateCarParts;
