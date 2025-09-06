import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Permission from "../../../../components/Permission";
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { useCreateColor } from "../../../../api/colors";

const CreateColors = () => {
  const createColors = useCreateColor();
  const { t } = useTranslation();

  return (
    <Permission permission="color.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.color") })}
        </Typography>
        <CarInfoForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createColors.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createColors.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateColors;
