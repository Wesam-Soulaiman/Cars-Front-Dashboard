import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Permission from "../../../../components/Permission";
import { useCreateLight } from "../../../../api/lights";
import CarInfoForm from "../../../../components/forms/CarInfoForm";

const CreateLights = () => {
  const createLights = useCreateLight();
  const { t } = useTranslation();

  return (
    <Permission permission="light.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.lights") })}
        </Typography>
        <CarInfoForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createLights.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createLights.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateLights;
