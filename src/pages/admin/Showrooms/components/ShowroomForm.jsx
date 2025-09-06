import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileImagePicker from "../../../../components/FileImagePicker";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { SelectInput, TextInput } from "../../../../components/forms";
import { useEffect, useState } from "react";
import { useGetGovernorates } from "../../../../api/governorates";
import useGetTranslation from "../../../../utils/useGetTranslation";
import { useGetStoreType } from "../../../../api/storeType";

const defaultInitialValues = {
  name: "",
  name_ar: "",
  email: "",
  phone: "",
  whatsapp_phone: "",
  address: "",
  address_ar: "",
  password: "",
  password_confirmation: "",
  photo: null,
  type: "office",
};

const ShowroomForm = ({
  initialValues = {},
  task = "create",
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation();

  // Dynamic validation schema based on task
  const getValidationSchema = () => {
    const baseSchema = {
      name: Yup.string().label(t("forms.name")).max(100),
      name_ar: Yup.string().label(t("forms.name_ar")).max(100),
      email: Yup.string().email().label(t("forms.email")).max(100),
      phone: Yup.string()
        .label(t("forms.phone"))
        .matches(/^[0-9]+$/)
        .min(8)
        .max(15),
      whatsapp_phone: Yup.string()
        .label(t("forms.whatsapp_phone"))
        .matches(/^[0-9]+$/)
        .min(8)
        .max(15),
      store_type_id: Yup.string().required().label(t("forms.storeType")),
      governorate_id: Yup.string().required().label(t("forms.governorate")),

      address: Yup.string().label(t("forms.address")).max(255),
      address_ar: Yup.string().label(t("forms.address_ar")).max(255),
      photo: Yup.mixed()
        .label(t("forms.photo"))
        .test("fileType", t("forms.only_images_accepted"), (value) => {
          if (typeof value === "string") return true;
          return (
            !value ||
            (value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
          );
        })
        .test("fileSize", t("forms.file_too_large"), (value) => {
          if (typeof value === "string") return true;
          return !value || (value && value.size <= 5 * 1024 * 1024);
        }),
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
          email: baseSchema.email.required(),
          phone: baseSchema.phone.required(),
          address: baseSchema.address.required(),
          address_ar: baseSchema.address_ar.required(),
          photo: baseSchema.photo.required(),
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
    isValid,
    setFieldTouched,
  } = useFormik({
    initialValues: { ...defaultInitialValues, ...initialValues },
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  const { getTranslation2 } = useGetTranslation();

  const [searchGovernorate, setSearchGovernorate] = useState("");
  const [debouncedSearchGovernorate, setDebouncedSearchGovernorate] =
    useState("");

  const [searchStoreType, setSearchStoreType] = useState("");
  const [debouncedSearchStoreType, setDebouncedSearchStoreType] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchGovernorate(searchGovernorate);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchGovernorate]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchStoreType(searchStoreType);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchStoreType]);

  // request
  const [page] = useState(0);
  const [pageSize] = useState(15);

  const { data, isLoading } = useGetGovernorates({
    page,
    pageSize,
    name: debouncedSearchGovernorate,
  });

  const governorateOptions = data?.data?.data || [];
  const selectedGovernorate =
    governorateOptions.find((b) => b.id === values.governorate_id) || null;

  const { data: types, isLoading: isLoadingTypes } = useGetStoreType({
    page,
    pageSize,
    name: debouncedSearchStoreType,
  });

  const storeTypeOptions = types?.data?.data || [];
  const selectedStoreType =
    storeTypeOptions.find((b) => b.id === values.store_type_id) || null;

  // Field group components
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
          name="email"
          label={t("forms.email")}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          required={task === "create"}
          touched={touched.email}
          type="email"
        />
      </Box>
    </>
  );

  const renderContactFields = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <TextInput
        name="phone"
        label={t("forms.phone")}
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phone && Boolean(errors.phone)}
        helperText={touched.phone && errors.phone}
        required={task === "create"}
        touched={touched.phone}
        type="tel"
      />
      <TextInput
        name="whatsapp_phone"
        label={t("forms.whatsapp_phone")}
        value={values.whatsapp_phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.whatsapp_phone && Boolean(errors.whatsapp_phone)}
        helperText={touched.whatsapp_phone && errors.whatsapp_phone}
        touched={touched.whatsapp_phone}
        type="tel"
      />
    </Box>
  );

  const renderAddressFields = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <TextInput
        name="address"
        label={t("forms.address")}
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address && Boolean(errors.address)}
        helperText={touched.address && errors.address}
        required={task === "create"}
        touched={touched.address}
      />
      <TextInput
        name="address_ar"
        label={t("forms.address_ar")}
        value={values.address_ar}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address_ar && Boolean(errors.address_ar)}
        helperText={touched.address_ar && errors.address_ar}
        required={task === "create"}
        touched={touched.address_ar}
      />
    </Box>
  );
  const renderFields = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <SelectInput
        name="governorate_id"
        options={governorateOptions}
        value={selectedGovernorate}
        label={t("forms.governorate")}
        placeholder={t("forms.selectGovernorate")}
        error={touched.governorate_id && Boolean(errors.governorate_id)}
        helperText={touched.governorate_id && errors.governorate_id}
        onInputChange={(e, newInputValue) =>
          setSearchGovernorate(newInputValue)
        }
        loading={isLoading}
        onChange={(e, newValue) => {
          setFieldValue("governorate_id", newValue ? newValue.id : "");
        }}
        onBlur={() => setFieldTouched("governorate_id", true)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <SelectInput
        name="store_type_id"
        options={storeTypeOptions}
        value={selectedStoreType}
        label={t("forms.storeType")}
        placeholder={t("forms.selectedStoreType")}
        error={touched.store_type_id && Boolean(errors.store_type_id)}
        helperText={touched.store_type_id && errors.store_type_id}
        onInputChange={(e, newInputValue) => setSearchStoreType(newInputValue)}
        loading={isLoadingTypes}
        onChange={(e, newValue) => {
          setFieldValue("store_type_id", newValue ? newValue.id : "");
        }}
        onBlur={() => setFieldTouched("store_type_id", true)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </Box>
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

  const renderPhotoField = () => (
    <Box my={3} display="flex" flexDirection="row" justifyContent="center">
      <Box my={2} display="flex" width="100%">
        <FileImagePicker
          title={t("imagePicker.title", {
            thetypes: t("thetypes.showroom"),
          })}
          onSelectImage={(files) => {
            if (files && files.length > 0) {
              setFieldValue("photo", files[0]);
            }
          }}
          name="photo"
          accept="image/png,image/jpg,image/jpeg"
          id="photo"
          onBlur={handleBlur}
          sx={{
            width: "100%",
            maxWidth: "600px",
            border: "2px dashed",
            borderColor:
              errors.photo && touched.photo ? "error.main" : "divider",
            borderRadius: 2,
            p: 3,
            "&:hover": {
              borderColor:
                errors.photo && touched.photo ? "error.main" : "primary.main",
              backgroundColor: "action.hover",
            },
          }}
          error={touched.photo && Boolean(errors.photo)}
          helperText={touched.photo && errors.photo}
          touched={touched.photo}
          required={task === "create"}
          renderContent={() => (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              minHeight="200px"
              mx="auto"
              flexDirection="column"
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {values.photo ? (
                <Box
                  position="relative"
                  width="100%"
                  height="200px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={2}
                  boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
                  overflow="hidden"
                  sx={{
                    "& img": {
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    },
                  }}
                >
                  <img
                    src={
                      typeof values.photo === "string"
                        ? values.photo
                        : URL.createObjectURL(values.photo)
                    }
                    alt="Selected"
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setFieldValue("photo", null);
                    }}
                    color="error"
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      bgcolor: "background.paper",
                      borderRadius: "50%",
                      boxShadow: 3,
                      width: 48,
                      height: 48,
                      "&:hover": {
                        bgcolor: "error.main",
                        color: "error.contrastText",
                      },
                    }}
                  >
                    <MdOutlineDeleteSweep size={28} />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  textAlign="center"
                  p={4}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color={
                      errors.photo && touched.photo ? "error" : "primary.main"
                    }
                    variant="caption"
                    sx={{
                      fontSize: "0.9rem",
                      mt: 1,
                    }}
                  >
                    {t("imagePicker.types")}
                    {task === "create" && (
                      <Typography component="span" color="error">
                        *
                      </Typography>
                    )}
                  </Typography>
                  {touched.photo && errors.photo && (
                    <Typography color="error" variant="caption" sx={{ mt: 2 }}>
                      {errors.photo}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
        />
      </Box>
    </Box>
  );

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {task !== "updatePassword" && (
          <>
            {renderPersonalInfoFields()}
            {renderContactFields()}
            {renderAddressFields()}
            {renderFields()}
            {renderPhotoField()}
          </>
        )}

        {(task === "create" || task === "updatePassword") &&
          renderPasswordFields()}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isValid || loading}
          sx={{
            width: { xs: "100%" },
            maxWidth: { sm: "200px" },
            mt: 2,
          }}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default ShowroomForm;
