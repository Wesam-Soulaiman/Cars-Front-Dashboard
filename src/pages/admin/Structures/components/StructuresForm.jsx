import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileImagePicker from "../../../../components/FileImagePicker";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TextInput } from "../../../../components/forms";

const StructuresForm = ({
  task = "create",
  loadingButtonProps,
  isPopup = false,
  ...formikConfig
}) => {
  const { t } = useTranslation();

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label(t("forms.name")).max(50),
    name_ar: Yup.string().required().label(t("forms.name_ar")).max(50),
    main_photo: Yup.mixed()
      .required()
      .label(t("forms.image", { types: t("types.structures") }))
      .test("fileType", "Only image files are accepted", (value) => {
        if (typeof value === "string") return true;
        return value && value.type.match(/image.*/);
      })
      .test("fileSize", "File too large (max 2MB)", (value) => {
        if (typeof value === "string") return true;
        return !value || (value && value.size <= 2000000);
      }),
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
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {/* Title Field */}
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

        {/* Image Upload Field */}
        <Box my={3} display="flex" flexDirection="row" justifyContent="center">
          <Box my={2} display="flex" width="100%">
            <FileImagePicker
              title={t("imagePicker.title", {
                thetypes: t("thetypes.structures"),
              })}
              onSelectImage={(files) => {
                if (files && files.length > 0) {
                  setFieldValue("main_photo", files[0]);
                }
              }}
              name="main_photo"
              // accept="image/png,image/jpg,image/jpeg,image/svg"
              id="main_photo"
              onBlur={handleBlur}
              sx={{
                width: "100%",
                maxWidth: "600px", // Increased max width
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2,
                p: 3,
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
              error={touched.main_photo && Boolean(errors.main_photo)}
              helperText={touched.main_photo && errors.main_photo}
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
                  {values.main_photo ? (
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
                          typeof values.main_photo === "string"
                            ? values.main_photo
                            : URL.createObjectURL(values.main_photo)
                        }
                        alt="Selected"
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setFieldValue("main_photo", null);
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
                        color="primary.main"
                        variant="caption"
                        sx={{
                          fontSize: "0.9rem",
                          mt: 1,
                        }}
                      >
                        {t("imagePicker.types")}
                      </Typography>
                      {touched.main_photo && errors.main_photo && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ mt: 2 }}
                        >
                          {errors.main_photo}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            />
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="outlined"
          type="submit"
          disabled={!isValid}
          sx={{
            width: { xs: "100%" },
            maxWidth: { sm: "200px" },
          }}
          {...loadingButtonProps}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default StructuresForm;
