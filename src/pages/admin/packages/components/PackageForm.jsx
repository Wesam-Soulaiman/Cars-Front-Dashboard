import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetCategories } from "../../../../api/packages";
import {
  TextInput,
  SelectInput,
  NumberInput,
} from "../../../../components/forms";
import useGetTranslation from "../../../../utils/useGetTranslation";

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
    services: Yup.array().label(t("forms.services")),
    count_days: Yup.number().required().positive().label(t("forms.count_days")),
    count_product: Yup.number()
      .positive()
      .max(10000000)
      .label(t("forms.count_days")),
    has_top_result: Yup.number().label(t("forms.has_top_result")),
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
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

  const { getTranslation2 } = useGetTranslation();

  const servicesOptions = ["sell", "rent", "parts"];

  const services = values.services
    ? servicesOptions.filter((service) => values.services.includes(service))
    : [];

  const has_top_result_data = [
    {
      id: 1,
      name: "Yes",
      name_ar: "نعم",
      value: 1,
    },
    {
      id: 2,
      name: "No",
      name_ar: "لا",
      value: 0,
    },
  ];

  const has_top_result =
    has_top_result_data.find((b) => b.value === values.has_top_result) || null;

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
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
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
            helperText={
              touched.category_service_id && errors.category_service_id
            }
            getOptionLabel={(option) => t("category." + option.name)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onBlur={() => setFieldTouched("category_service_id", true)}
            touched={touched.category_service_id}
          />
          {values.category_service_id === 2 ? (
            <NumberInput
              name="count_product"
              label={t("forms.count_product")}
              value={values.count_product}
              error={touched.count_product && Boolean(errors.count_product)}
              helperText={touched.count_product && errors.count_product}
              onChange={(e) => setFieldValue("count_product", e.target.value)}
              onBlur={() => setFieldTouched("count_product", true)}
            />
          ) : (
            ""
          )}
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <NumberInput
            name="count_days"
            label={t("forms.count_days")}
            value={values.count_days}
            error={touched.count_days && Boolean(errors.count_days)}
            helperText={touched.count_days && errors.count_days}
            onChange={(e) => setFieldValue("count_days", e.target.value)}
            onBlur={() => setFieldTouched("count_days", true)}
          />
          <SelectInput
            options={has_top_result_data}
            value={has_top_result}
            label={t("forms.has_top_result")}
            placeholder={t("forms.selecthas_top_result")}
            error={touched.has_top_result && Boolean(errors.has_top_result)}
            helperText={touched.has_top_result && errors.has_top_result}
            onChange={(e, newValue) =>
              setFieldValue("has_top_result", newValue?.value || 0)
            }
            getOptionLabel={(option) => getTranslation2(option, "name")}
            onBlur={() => setFieldTouched("has_top_result", true)}
          />
        </Box>

        <FormControl
          margin="dense"
          fullWidth
          error={touched.services && Boolean(errors.services)}
        >
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={servicesOptions}
            getOptionLabel={(option) => t(option)}
            value={services}
            onChange={(e, newValue) => {
              setFieldValue(
                "services",
                newValue.map((service) => service)
              );
            }}
            onBlur={() => setFieldTouched("services", true)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("forms.services")}
                placeholder={t("forms.selectServices")}
                error={touched.services && Boolean(errors.services)}
                helperText={touched.services && errors.services}
              />
            )}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
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
