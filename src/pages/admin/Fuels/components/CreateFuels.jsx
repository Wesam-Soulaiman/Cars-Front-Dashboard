import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Permission from "../../../../components/Permission";
import { useCreateFuel } from "../../../../api/fuel";
import CarInfoForm from "../../../../components/forms/CarInfoForm";

const CreateFuels = () => {
  const createFuels = useCreateFuel();
  const { t } = useTranslation();

  return (
    <Permission permission="fuel_type.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.fuel") })}
        </Typography>
        <CarInfoForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createFuels.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createFuels.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateFuels;
