import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Permission from "../../../../components/Permission";
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { useCreateGears } from "../../../../api/gears";

const CreateGears = () => {
  const createGears = useCreateGears();
  const { t } = useTranslation();

  return (
    <Permission permission="gear.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.gear") })}
        </Typography>
        <CarInfoForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createGears.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createGears.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateGears;
