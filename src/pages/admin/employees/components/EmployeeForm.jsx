import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetRoles } from "../../../../api/roles";
import { TextInput, SelectInput } from "../../../../components/forms";
import useGetTranslation from "../../../../utils/useGetTranslation";

const EmployeeForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();

  const { data, isLoading } = useGetRoles();
  const roleOptions = data?.data?.data || [];

  // Dynamic validation schema based on task
  const getValidationSchema = () => {
    const baseSchema = {
      name: Yup.string().label(t("forms.name")).max(50),
      name_ar: Yup.string().label(t("forms.name_ar")).max(50),
      phone: Yup.string()
        .label(t("forms.phone"))
        .matches(/^[0-9]+$/)
        .min(8)
        .max(15),
      email: Yup.string().email().label(t("forms.email")).max(100),
      role_id: Yup.string().label(t("forms.role")),
    };

    const passwordSchema = {
      password: Yup.string()
        .label(t("forms.password"))
        .min(8)
        .max(100)
        .required(),
      password_confirmation: Yup.string()
        .label(t("forms.password_confirmation"))
        .oneOf([Yup.ref("password"), null], t("forms.passwords_must_match"))
        .required(),
    };

    switch (task) {
      case "create":
        return Yup.object().shape({
          ...baseSchema,
          ...passwordSchema,
          name: baseSchema.name.required(),
          name_ar: baseSchema.name_ar.required(),
          phone: baseSchema.phone.required(),
          email: baseSchema.email.required(),
          role_id: baseSchema.role_id.required(),
        });
      case "update":
        return Yup.object().shape(baseSchema);
      case "updatePassword":
        return Yup.object().shape(passwordSchema);
      default:
        return Yup.object().shape(baseSchema);
    }
  };

  const validationSchema = getValidationSchema();

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

  // Field groups for better organization
  const renderPersonalInfoFields = () => (
    <>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
        <TextInput
          name="name"
          label={t("forms.name")}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          required={task === "create"}
          touched={touched.name}
        />

        <TextInput
          name="name_ar"
          label={t("forms.name_ar")}
          value={values.name_ar}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name_ar && Boolean(errors.name_ar)}
          helperText={touched.name_ar && errors.name_ar}
          required={task === "create"}
          touched={touched.name_ar}
        />
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
        <TextInput
          name="phone"
          label={t("forms.phone")}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
          type="tel"
          required={task === "create"}
          touched={touched.phone}
        />

        <TextInput
          name="email"
          label={t("forms.email")}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          type="email"
          required={task === "create"}
          touched={touched.email}
        />
      </Box>
    </>
  );

  const renderRoleField = () => (
    <SelectInput
      name="role_id"
      label={t("forms.role")}
      placeholder={t("forms.selectRole")}
      options={roleOptions}
      value={roleOptions.find((r) => r.id === values.role_id) || null}
      onChange={(e, newValue) => setFieldValue("role_id", newValue?.id || "")}
      loading={isLoading}
      error={touched.role_id && Boolean(errors.role_id)}
      helperText={touched.role_id && errors.role_id}
      getOptionLabel={(option) => getTranslation2(option, "name")}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      required={task === "create"}
      onBlur={() => setFieldTouched("role_id", true)}
    />
  );

  const renderPasswordFields = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <TextInput
        name="password"
        label={t("forms.password")}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        type="password"
        required={task === "create" || task === "updatePassword"}
        touched={touched.password}
      />

      <TextInput
        name="password_confirmation"
        label={t("forms.password_confirmation")}
        value={values.password_confirmation}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.password_confirmation && Boolean(errors.password_confirmation)
        }
        helperText={
          touched.password_confirmation && errors.password_confirmation
        }
        type="password"
        required={task === "create" || task === "updatePassword"}
        touched={touched.password_confirmation}
      />
    </Box>
  );

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {task !== "updatePassword" && (
          <>
            {renderPersonalInfoFields()}
            {renderRoleField()}
          </>
        )}

        {(task === "create" || task === "updatePassword") &&
          renderPasswordFields()}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loadingButtonProps?.loading}
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

export default EmployeeForm;
