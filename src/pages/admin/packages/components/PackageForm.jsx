import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetCategories } from "../../../../api/packages";
import { TextInput, SelectInput } from "../../../../components/forms";

const PackageForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCategories();
  const categoriesOptions = data?.data?.data || [];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label(t("forms.name")).max(50),
    name_ar: Yup.string().required().label(t("forms.name_ar")).max(50),
    description: Yup.string().required().label(t("forms.description")).max(50),
    description_ar: Yup.string()
      .required()
      .label(t("forms.description_ar"))
      .max(50),
    category_service_id: Yup.string().required().label(t("forms.category")),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    setFieldTouched,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

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
            touched={touched.name_ar}
          />
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {/* English Description */}
          <TextInput
            name="description"
            label={t("forms.description")}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            multiline
            rows={3}
            required
            touched={touched.description}
          />

          {/* Arabic Description */}
          <TextInput
            name="description_ar"
            label={t("forms.description_ar")}
            value={values.description_ar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description_ar && Boolean(errors.description_ar)}
            helperText={touched.description_ar && errors.description_ar}
            multiline
            rows={3}
            required
            touched={touched.description_ar}
          />
        </Box>

        {/* Category select */}
        <SelectInput
          name="category_service_id"
          label={t("forms.category")}
          placeholder={t("forms.selectCategories")}
          options={categoriesOptions}
          value={
            categoriesOptions.find(
              (c) => c.id === values.category_service_id
            ) || null
          }
          onChange={(e, newValue) =>
            setFieldValue("category_service_id", newValue?.id || "")
          }
          loading={isLoading}
          error={
            touched.category_service_id && Boolean(errors.category_service_id)
          }
          helperText={touched.category_service_id && errors.category_service_id}
          getOptionLabel={(option) => t("category." + option.name)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onBlur={() => setFieldTouched("category_service_id", true)}
          touched={touched.category_service_id}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isValid || loadingButtonProps?.loading}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
            mt: 2,
          }}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default PackageForm;
