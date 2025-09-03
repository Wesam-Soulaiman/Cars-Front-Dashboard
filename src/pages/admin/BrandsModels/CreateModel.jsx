import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ModelForm from "./components/ModelForm";
import { useCreateModel } from "../../../api/models";
import Permission from "../../../components/Permission";

const CreateModel = () => {
  const { t } = useTranslation();
  const createModel = useCreateModel();

  return (
    <Permission permission="models.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.model") })}
        </Typography>
        <ModelForm
          initialValues={{
            name: "",
            name_ar: "",
            brand_id: null,
          }}
          onSubmit={(values, { resetForm }) => {
            createModel.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createModel.isPending,
          }}
        />
      </Box>
    </Permission>
  );
};

export default CreateModel;
