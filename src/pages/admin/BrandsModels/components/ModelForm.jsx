import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetBrands } from "../../../../api/brands";
import { TextInput, SelectInput } from "../../../../components/forms";
import useGetTranslation from "../../../../utils/useGetTranslation";
import { useEffect, useState } from "react";

const ModelForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label(t("forms.name")).max(50),
    name_ar: Yup.string().required().label(t("forms.name_ar")).max(50),
    brand_id: Yup.string().required().label(t("forms.brand")),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isValid,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

  const { getTranslation2 } = useGetTranslation();

  const [searchBrand, setSearchBrand] = useState("");
  const [debouncedSearchBrand, setDebouncedSearchBrand] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchBrand(searchBrand);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchBrand]);

  // request
  const [page] = useState(0);
  const [pageSize] = useState(15);

  const { data, isLoading } = useGetBrands({
    page,
    pageSize,
    name: debouncedSearchBrand,
  });

  const brandOptions = data?.data?.data || [];
  const selectedBrand =
    brandOptions.find((b) => b.id === values.brand_id) || null;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {/* English Name */}
          <TextInput
            name="name"
            label={t("forms.name")}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            required
            touched={touched.name}
          />

          {/* Arabic Name */}
          <TextInput
            name="name_ar"
            label={t("forms.name_ar")}
            value={values.name_ar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name_ar && Boolean(errors.name_ar)}
            helperText={touched.name_ar && errors.name_ar}
            required
            touched={touched.name}
          />
        </Box>

        {/* Brand select */}
        <SelectInput
          name="brand_id" // Add name prop to connect with formik
          options={brandOptions}
          value={selectedBrand}
          label={t("forms.brand")}
          placeholder={t("forms.selectBrand")}
          error={touched.brand_id && Boolean(errors.brand_id)}
          helperText={touched.brand_id && errors.brand_id}
          onInputChange={(e, newInputValue) => setSearchBrand(newInputValue)}
          loading={isLoading}
          onChange={(e, newValue) => {
            setFieldValue("brand_id", newValue ? newValue.id : "");
          }}
          onBlur={() => setFieldTouched("brand_id", true)} // Add blur handler
          getOptionLabel={(option) => getTranslation2(option, "name")}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isValid || loadingButtonProps?.loading}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
            mt: 3,
          }}
          {...loadingButtonProps}
        >
          {loadingButtonProps?.loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("gbtn." + task)
          )}
        </Button>
      </form>
    </Box>
  );
};

export default ModelForm;
