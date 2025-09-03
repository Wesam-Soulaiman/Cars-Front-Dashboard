import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useLogin from "../../api/useLogin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required().label(t("forms.email")),
    password: yup.string().min(7).max(26).required().label(t("forms.password")),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          login.mutate(values);
          setSubmitting(false);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth error={!!errors.email && touched.email}>
              <InputLabel>{t("forms.email")}</InputLabel>
              <OutlinedInput
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label={t("forms.email")}
                type="email"
              />
              {!!errors.email && touched.email && (
                <FormHelperText>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.password && touched.password}
            >
              <InputLabel>{t("forms.password")}</InputLabel>
              <OutlinedInput
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label={t("forms.password")}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                }
              />
              {!!errors.password && touched.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <Button
              loading={login.isPending}
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              {t("login.form.btn")}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
