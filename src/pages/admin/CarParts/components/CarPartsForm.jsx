import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileImagePicker from "../../../../components/FileImagePicker";
import { MdOutlineDeleteSweep } from "react-icons/md";
import {
  NumberInput,
  SelectInput,
  TextInput,
} from "../../../../components/forms";
import { useEffect, useMemo, useState } from "react";
import { useGetBrands } from "../../../../api/brands";
import { useGetModels } from "../../../../api/models";
import { useGetCarPartCategories } from "../../../../api/carPartsCategories";
import useGetTranslation from "../../../../utils/useGetTranslation";
import { useGetShowrooms } from "../../../../api/showrooms";
import Role from "../../../../components/Role";

const CarPartsForm = ({
  task = "create",
  loadingButtonProps,
  isPopup = false,
  ...formikConfig
}) => {
  const { t } = useTranslation();

  // Validation schema
  const validationSchema = Yup.object().shape({
    brand_id: Yup.string().required().label(t("forms.brand")),
    store_id: Yup.string().required().label(t("forms.showroom")),
    model_id: Yup.string().required().label(t("forms.model")),
    category_id: Yup.string().required().label(t("forms.category")),
    price: Yup.number().required().positive().label(t("forms.price")),
    creation_country: Yup.string()
      .required()
      .label(t("forms.creation_country")),

    main_photo: Yup.mixed()
      .required()
      .label(t("forms.image", { types: t("types.carPart") }))
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
    setFieldTouched,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

  const { getTranslation2 } = useGetTranslation();

  const [searchBrand, setSearchBrand] = useState("");
  const [debouncedSearchBrand, setDebouncedSearchBrand] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchBrand(searchBrand);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchBrand]);

  // request
  const [page] = useState(0);
  const [pageSize] = useState(15);

  const { data, isLoading } = useGetBrands({
    page,
    pageSize,
    name: debouncedSearchBrand,
  });

  const brandOptions = data?.data?.data || [];
  const selectedBrand =
    brandOptions.find((b) => b.id === values.brand_id) || null;

  const [searchModels, setSearchModels] = useState("");
  const [debouncedSearchModels, setDebouncedSearchModels] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchModels(searchModels);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchModels]);

  console.log(values);

  const { data: modelsData, isLoading: isLoadingModels } = useGetModels({
    page,
    pageSize,
    name: debouncedSearchModels,
  });

  const modelsOptions = modelsData?.data?.data || [];
  const selectedModels =
    modelsOptions.find((b) => b.id === values.model_id) || null;

  const [searchCategory, setSearchCategory] = useState("");
  const [debouncedSearchCategory, setDebouncedSearChcategory] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearChcategory(searchCategory);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchCategory]);

  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCarPartCategories({
      page,
      pageSize,
      name: debouncedSearchCategory,
    });

  const categoryOptions = categoryData?.data?.data || [];
  const selectedCategory =
    categoryOptions.find((b) => b.id === values.category_id) || null;

  const [searchShowroom, setSearchShowroom] = useState("");

  // debounced
  const [debouncedSearchShowroom, setDebouncedSearchShowroom] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchShowroom(searchShowroom);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchShowroom]);

  const { data: showroomsData, isLoading: showroomsLoading } = useGetShowrooms({
    page,
    pageSize,
    name: debouncedSearchShowroom,
  });

  const showroomOptions = showroomsData?.data?.data || [];

  const selectedShowroom = useMemo(
    () => ({
      showroom: showroomOptions.find((b) => b.id === values.store_id) || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.store_id]
  );

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {/* Title Field */}
          <SelectInput
            name="brand_id" // Add name prop to connect with formik
            options={brandOptions}
            value={selectedBrand}
            label={t("forms.brand")}
            placeholder={t("forms.selectBrand")}
            error={touched.brand_id && Boolean(errors.brand_id)}
            helperText={touched.brand_id && errors.brand_id}
            onInputChange={(e, newInputValue) => setSearchBrand(newInputValue)}
            loading={isLoading}
            onChange={(e, newValue) => {
              setFieldValue("brand_id", newValue ? newValue.id : "");
            }}
            onBlur={() => setFieldTouched("brand_id", true)} // Add blur handler
            getOptionLabel={(option) => getTranslation2(option, "name")}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          {/* Arabic Title Field */}
          <SelectInput
            name="model_id" // Add name prop to connect with formik
            options={modelsOptions}
            value={selectedModels}
            label={t("forms.model")}
            placeholder={t("forms.selectedModels")}
            error={touched.model_id && Boolean(errors.model_id)}
            helperText={touched.model_id && errors.model_id}
            onInputChange={(e, newInputValue) => setSearchModels(newInputValue)}
            loading={isLoadingModels}
            onChange={(e, newValue) => {
              setFieldValue("model_id", newValue ? newValue.id : "");
            }}
            onBlur={() => setFieldTouched("model_id", true)} // Add blur handler
            getOptionLabel={(option) => getTranslation2(option, "name")}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Box>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {/* Title Field */}
          <SelectInput
            name="category_id" // Add name prop to connect with formik
            options={categoryOptions}
            value={selectedCategory}
            label={t("forms.category")}
            placeholder={t("forms.selectcategory")}
            error={touched.category_id && Boolean(errors.category_id)}
            helperText={touched.category_id && errors.category_id}
            onInputChange={(e, newInputValue) =>
              setSearchCategory(newInputValue)
            }
            loading={isLoadingCategory}
            onChange={(e, newValue) => {
              setFieldValue("category_id", newValue ? newValue.id : "");
            }}
            onBlur={() => setFieldTouched("category_id", true)} // Add blur handler
            getOptionLabel={(option) => getTranslation2(option, "name")}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          {/* Arabic Title Field */}
          <NumberInput
            name="price"
            label={t("forms.price")}
            value={values.price}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
            onChange={(e) => setFieldValue("price", e.target.value)}
            onBlur={() => setFieldTouched("price", true)}
          />
        </Box>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <TextInput
            name="creation_country"
            label={t("forms.creation_country")}
            value={values.creation_country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.creation_country && Boolean(errors.creation_country)}
            helperText={touched.creation_country && errors.creation_country}
            required
            touched={touched.creation_country}
          />
          <Role role={"employee"}>
            <SelectInput
              name="store_id"
              label={t("forms.showroom")}
              placeholder={t("forms.selectShowroom")}
              options={showroomOptions}
              value={selectedShowroom.showroom}
              onChange={(e, newVal) => {
                setFieldValue("store_id", newVal?.id || "");
              }}
              onInputChange={(e, newInputValue) =>
                setSearchShowroom(newInputValue)
              }
              loading={showroomsLoading}
              error={touched.store_id && Boolean(errors.store_id)}
              helperText={touched.store_id && errors.store_id}
              getOptionLabel={(option) => getTranslation2(option, "name")}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onBlur={() => setFieldTouched("store_id", true)}
              touched={touched.store_id}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    {...rest}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "100px",
                      width: "100%",
                    }}
                  >
                    <span>{option.id}</span>
                    <span>{getTranslation2(option, "name")}</span>
                  </Box>
                );
              }}
            />
          </Role>
        </Box>

        {/* Image Upload Field */}
        <Box my={3} display="flex" flexDirection="row" justifyContent="center">
          <Box my={2} display="flex" width="100%">
            <FileImagePicker
              title={t("imagePicker.title", {
                thetypes: t("thetypes.brand"),
              })}
              onSelectImage={(files) => {
                if (files && files.length > 0) {
                  setFieldValue("main_photo", files[0]);
                }
              }}
              name="main_photo"
              accept="image/png,image/jpg,image/jpeg"
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

export default CarPartsForm;
