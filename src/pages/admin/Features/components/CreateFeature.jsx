import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useCreateFeature } from "../../../../api/feature";
import { useTranslation } from "react-i18next";
import FeatureForm from "./FeatureForm";
import Permission from "../../../../components/Permission";

const CreateFeature = () => {
  const createFeature = useCreateFeature();
  const { t } = useTranslation();

  return (
    <Permission permission="feature.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.feature") })}
        </Typography>
        <FeatureForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createFeature.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createFeature.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateFeature;
