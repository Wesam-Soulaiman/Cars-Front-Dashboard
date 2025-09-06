import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Permission from "../../../../components/Permission";
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { useCreateCarPartCategories } from "../../../../api/carPartsCategories";

const CreateCarPartCategories = () => {
  const createCarPartCategories = useCreateCarPartCategories();
  const { t } = useTranslation();

  return (
    <Permission permission="car_part_categories.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.carPartCategories") })}
        </Typography>
        <CarInfoForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createCarPartCategories.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createCarPartCategories.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateCarPartCategories;
