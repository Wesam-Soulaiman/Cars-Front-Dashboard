import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Permission from "../../../components/Permission";
import { useCreateStructures } from "../../../api/structures";
import StructuresForm from "./components/StructuresForm";

const CreateStructures = () => {
  const { t } = useTranslation();
  const createStructures = useCreateStructures();

  return (
    <Permission permission="structure.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.Structures") })}
        </Typography>
        <StructuresForm
          initialValues={{
            name: "",
            name_ar: "",
            main_photo: null,
          }}
          onSubmit={(values, { resetForm }) => {
            createStructures.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createStructures.isPending,
          }}
        />
      </Box>
    </Permission>
  );
};

export default CreateStructures;
