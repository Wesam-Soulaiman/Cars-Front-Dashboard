import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import BrandForm from "./components/BrandForm";
import { useCreateBrand } from "../../../api/brands";
import Permission from "../../../components/Permission";

const CreateBrand = () => {
  const { t } = useTranslation();
  const createBrand = useCreateBrand();

  return (
    <Permission permission="brands.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.brand") })}
        </Typography>
        <BrandForm
          initialValues={{
            name: "",
            name_ar: "",
            logo: null,
          }}
          onSubmit={(values, { resetForm }) => {
            createBrand.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createBrand.isPending,
          }}
        />
      </Box>
    </Permission>
  );
};

export default CreateBrand;
