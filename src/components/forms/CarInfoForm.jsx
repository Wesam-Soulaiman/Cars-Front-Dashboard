import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextInput from "./TextInput";

const CarInfoForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label(t("forms.info")).max(50),
    name_ar: Yup.string().required().label(t("forms.info_ar")).max(50),
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
          {/* English Name */}
          <TextInput
            name="name"
            label={t("forms.info")}
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
            label={t("forms.info_ar")}
            value={values.name_ar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name_ar && Boolean(errors.name_ar)}
            helperText={touched.name_ar && errors.name_ar}
            required
            touched={touched.name_ar}
          />
        </Box>

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

export default CarInfoForm;
