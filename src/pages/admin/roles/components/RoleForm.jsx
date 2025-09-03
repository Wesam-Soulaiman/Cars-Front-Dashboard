import { useFormik } from "formik";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextInput } from "../../../../components/forms";
import * as Yup from "yup";

const RoleForm = ({
  task = "create",
  loadingButtonProps,
  isPopup = false,
  ...formikConfig
}) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label(t("forms.name")).max(50),
    name_ar: Yup.string().required().label(t("forms.name_ar")).max(50),
  });
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <TextInput
            name="name"
            label={t("forms.name")}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            touched={touched.name}
          />

          {/* Arabic Title Field */}
          <TextInput
            name="name_ar"
            label={t("forms.name_ar")}
            value={values.name_ar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name_ar && Boolean(errors.name_ar)}
            helperText={touched.name_ar && errors.name_ar}
            touched={touched.name_ar}
          />
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="outlined"
          type="submit"
          disabled={!isValid}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
          }}
          {...loadingButtonProps}
          loading={loadingButtonProps?.loading}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default RoleForm;
