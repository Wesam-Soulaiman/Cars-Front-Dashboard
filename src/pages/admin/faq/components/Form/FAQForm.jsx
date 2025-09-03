import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "../../../../../config";
import * as Yup from "yup";
import { TextInput } from "../../../../../components/forms";

const FAQForm = ({ task = "create", loadingButtonProps, ...formikConfig }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    question: Yup.string().required().label(t("forms.question")).max(100),
    question_ar: Yup.string().required().label(t("forms.question_ar")).max(100),
    answer: Yup.string().required().label(t("forms.answer")).max(500),
    answer_ar: Yup.string().required().label(t("forms.answer_ar")).max(500),
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
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextInput
              name="question"
              label={t("forms.question")}
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.question && Boolean(errors.question)}
              helperText={touched.question && errors.question}
              required
              touched={touched.question}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextInput
              name="question_ar"
              label={t("forms.question_ar")}
              value={values.question_ar}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.question_ar && Boolean(errors.question_ar)}
              helperText={touched.question_ar && errors.question_ar}
              required
              touched={touched.question_ar}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextInput
              name="answer"
              label={t("forms.answer")}
              value={values.answer}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.answer && Boolean(errors.answer)}
              helperText={touched.answer && errors.answer}
              multiline
              rows={3}
              required
              touched={touched.answer}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextInput
              name="answer_ar"
              label={t("forms.answer_ar")}
              value={values.answer_ar}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.answer_ar && Boolean(errors.answer_ar)}
              helperText={touched.answer_ar && errors.answer_ar}
              multiline
              rows={3}
              required
              touched={touched.answer_ar}
            />
          </Grid>

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
        </Grid>
      </form>
    </Box>
  );
};

export default FAQForm;
