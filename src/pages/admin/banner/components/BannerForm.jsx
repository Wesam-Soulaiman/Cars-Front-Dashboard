import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileImagePicker from "../../../../components/FileImagePicker";
import { MdOutlineDeleteSweep } from "react-icons/md";

const BannerForm = ({
  task = "create",
  loadingButtonProps,
  isPopup = false,
  ...formikConfig
}) => {
  const { t } = useTranslation();

  // Validation schema
  const validationSchema = Yup.object().shape({
    photo: Yup.mixed()
      .required()
      .label(t("forms.image", { types: t("thetypes.banner") }))
      .test("fileType", "Only image files are accepted", (value) => {
        if (typeof value === "string") return true;
        return value && value.type.match(/image.*/);
      })
      .test("fileSize", "File too large (max 2MB)", (value) => {
        if (typeof value === "string") return true;
        return !value || (value && value.size <= 2000000);
      }),
    photo_ar: Yup.mixed()
      .required()
      .label(t("forms.image", { types: t("thetypes.banner_ar") }))
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
        {/* Image Upload Field */}
        <Box my={3} display="flex" flexDirection="row" justifyContent="center">
          <Box my={2} display="flex" width="100%">
            <FileImagePicker
              title={t("imagePicker.title", {
                thetypes: t("thetypes.banner"),
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
              error={touched.photo && Boolean(errors.photo)}
              helperText={touched.photo && errors.photo}
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
                        color="primary.main"
                        variant="caption"
                        sx={{
                          fontSize: "0.9rem",
                          mt: 1,
                        }}
                      >
                        {t("imagePicker.types")}
                      </Typography>
                      {touched.photo && errors.photo && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ mt: 2 }}
                        >
                          {errors.photo}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            />
          </Box>

          <Box my={2} display="flex" width="100%">
            <FileImagePicker
              title={t("imagePicker.title", {
                thetypes: t("thetypes.banner_ar"),
              })}
              onSelectImage={(files) => {
                if (files && files.length > 0) {
                  setFieldValue("photo_ar", files[0]);
                }
              }}
              name="photo_ar"
              accept="image/png,image/jpg,image/jpeg"
              id="photo_ar"
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
              error={touched.photo_ar && Boolean(errors.photo_ar)}
              helperText={touched.photo_ar && errors.photo_ar}
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
                  {values.photo_ar ? (
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
                          typeof values.photo_ar === "string"
                            ? values.photo_ar
                            : URL.createObjectURL(values.photo_ar)
                        }
                        alt="Selected"
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setFieldValue("photo_ar", null);
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
                      {touched.photo_ar && errors.photo_ar && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ mt: 2 }}
                        >
                          {errors.photo_ar}
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

export default BannerForm;
