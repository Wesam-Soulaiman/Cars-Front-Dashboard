import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Permission from "../../../../components/Permission";
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { useCreateStoreType } from "../../../../api/storeType";

const CreateStoreType = () => {
  const createStoreType = useCreateStoreType();
  const { t } = useTranslation();

  return (
    <Permission permission="store_type.create">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.StoreType") })}
        </Typography>
        <CarInfoForm
          initialValues={{
            name: "",
            name_ar: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createStoreType.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createStoreType.isPending,
          }}
        />
      </Box>

      <Grid size={12}>
        <Divider />
      </Grid>
    </Permission>
  );
};

export default CreateStoreType;
