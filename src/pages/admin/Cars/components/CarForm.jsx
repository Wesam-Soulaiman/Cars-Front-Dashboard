import {
  Box,
  Button,
  Typography,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useGetBrands } from "../../../../api/brands";
import { useGetModels } from "./../../../../api/models/index";
import { useGetShowrooms } from "../../../../api/showrooms";
import useGetTranslation from "../../../../utils/useGetTranslation";
import { driveTypeData } from "../../../../data/driveTypeData";
import { MdOutlineDeleteSweep } from "react-icons/md";
import FileImagePicker from "../../../../components/FileImagePicker";
import {
  ColorPickerField,
  NumberInput,
  SelectInput,
} from "../../../../components/forms";
import { typeData } from "../../../../data/typeData";
import { useGetFeatures } from "../../../../api/feature";
import Role from "../../../../components/Role";
import { useDeleteCarPhoto } from "../../../../api/cars";
import { useGetColors } from "../../../../api/colors";
import { useGetFuels } from "../../../../api/fuel";
import { useGetGears } from "../../../../api/gears";
import { useGetLights } from "../../../../api/lights";
import { useGetDeals } from "../../../../api/deals";
import { useGetStructures } from "../../../../api/structures";
import { useAuthContext } from "../../../../providers/AuthProvider";

const CarForm = ({
  task = "create",
  initialValues = {},
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  const { mutate: deletePhoto } = useDeleteCarPhoto();

  const validationSchema = Yup.object().shape({
    brand_id: Yup.string().required().label(t("forms.brand")),
    model_id: Yup.string().required().label(t("forms.model")),
    structure_id: Yup.string().required().label(t("forms.structure")),
    store_id: Yup.string().default(1).label(t("forms.showroom")),
    deal_id: Yup.string().default(1).label(t("forms.deal")),
    fuel_type_id: Yup.string().default(1).label(t("forms.fuel_type")),
    gear_id: Yup.string().default(1).label(t("forms.gear")),
    light_id: Yup.string().default(1).label(t("forms.light")),
    price: Yup.number().required().positive().label(t("forms.price")),
    mileage: Yup.number().required().positive().label(t("forms.mileage")),
    year_of_construction: Yup.number()
      .required()
      .label(t("forms.year_of_construction"))
      .min(1900)
      .max(new Date().getFullYear()),
    register_year: Yup.number()
      .required()
      .label(t("forms.year_of_registration"))
      .min(1900)
      .max(new Date().getFullYear()),
    number_of_seats: Yup.number()
      .required()
      .positive()
      .label(t("forms.number_of_seats")),
    drive_type: Yup.string().required().label(t("forms.drive_type")),
    // doors: Yup.number().required().min(1).label(t("forms.doors")),
    cylinders: Yup.number().required().min(1).label(t("forms.cylinders")),
    cylinder_capacity: Yup.number()
      .required()
      .positive()
      .label(t("forms.cylinder_capacity")),
    used: Yup.number().required().label(t("forms.type")),
    color_id: Yup.string().required().label(t("forms.color")),
    features: Yup.array().label(t("forms.features")),
    main_photo: Yup.mixed().required().label(t("forms.main_photo")),
    photos: Yup.array().of(Yup.mixed()).label(t("forms.photos")),
  });

  const { user } = useAuthContext();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
    setFieldTouched,
  } = useFormik({
    validationSchema,
    initialValues: { ...initialValues },
    validateOnMount: true,
    enableReinitialize: true,
    ...formikConfig,
  });

  // Search states
  const [searchShowroom, setSearchShowroom] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [searchLight, setSearchLight] = useState("");
  const [searchGear, setSearchGear] = useState("");
  const [searchStructure, setSearchStructure] = useState("");
  const [searchFeal, setSearchFeal] = useState("");
  const [searchFeature, setSearchFeature] = useState("");
  const [searchDeal, setSearchDeal] = useState("");

  // Debounced search states
  const [debouncedSearchBrand, setDebouncedSearchBrand] = useState("");
  const [debouncedSearchModel, setDebouncedSearchModel] = useState("");
  const [debouncedSearchShowroom, setDebouncedSearchShowroom] = useState("");
  const [debouncedSearchColor, setDebouncedSearchColor] = useState("");
  const [debouncedSearchLight, setDebouncedSearchLight] = useState("");
  const [debouncedSearchGear, setDebouncedSearchGear] = useState("");
  const [debouncedSearchStructure, setDebouncedSearchStructure] = useState("");
  const [debouncedSearchDeal, setDebouncedSearchDeal] = useState("");
  const [debouncedSearchFeal, setDebouncedSearchFeal] = useState("");
  const [debouncedSearchFeature, setDebouncedSearchFeature] = useState("");

  // Debounce search inputs
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchShowroom(searchShowroom);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchShowroom]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchColor(searchColor);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchColor]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchLight(searchLight);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchLight]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchGear(searchGear);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchGear]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchModel(searchModel);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchModel]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchBrand(searchBrand);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchBrand]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchFeature(searchFeature);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchFeature]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchStructure(searchStructure);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchStructure]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchDeal(searchDeal);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchDeal]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchFeal(searchFeal);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchFeal]);

  // API requests
  const [page] = useState(0);
  const [pageSize] = useState(15);

  const features = useGetFeatures({
    page,
    pageSize,
    name: debouncedSearchFeature,
  });

  const brands = useGetBrands({
    page,
    pageSize,
    name: debouncedSearchBrand,
  });

  const models = useGetModels({
    page,
    pageSize,
    name: debouncedSearchModel,
  });

  if (user.type === "employee") {
    const showrooms = useGetShowrooms({
      page,
      pageSize,
      name: debouncedSearchShowroom,
    });
  }
  const colors = useGetColors({
    page,
    pageSize,
    name: debouncedSearchColor,
  });
  const fuelTypes = useGetFuels({
    page,
    pageSize,
    name: debouncedSearchFeal,
  });
  const gears = useGetGears({
    page,
    pageSize,
    name: debouncedSearchGear,
  });
  const lights = useGetLights({
    page,
    pageSize,
    name: debouncedSearchLight,
  });

  const deals = useGetDeals({
    page,
    pageSize,
    name: debouncedSearchDeal,
  });
  const structures = useGetStructures({
    page,
    pageSize,
    name: debouncedSearchStructure,
  });

  // Memoize options and selected values
  const brandOptions = useMemo(
    () => brands?.data?.data?.data || [],
    [brands.data]
  );
  const modelOptions = useMemo(
    () => models?.data?.data?.data || [],
    [models.data]
  );
  const showroomOptions = useMemo(
    () => showrooms?.data?.data?.data || [],
    [showrooms.data]
  );

  const featureOptions = useMemo(
    () => features?.data?.data?.data || [],
    [features.data]
  );
  const dealOptions = useMemo(
    () => deals?.data?.data?.data || [],
    [deals.data]
  );
  const gearOptions = useMemo(
    () => gears?.data?.data?.data || [],
    [gears.data]
  );
  const lightOptions = useMemo(
    () => lights?.data?.data?.data || [],
    [lights.data]
  );
  const colorOptions = useMemo(
    () => colors?.data?.data?.data || [],
    [colors.data]
  );
  const fuelOptions = useMemo(
    () => fuelTypes?.data?.data?.data || [],
    [fuelTypes.data]
  );
  const structureOptions = useMemo(
    () => structures?.data?.data?.data || [],
    [structures.data]
  );

  const selectedOptions = useMemo(
    () => ({
      brand: brandOptions.find((b) => b.id === values.brand_id) || null,
      gear: gearOptions.find((b) => b.id === values.gear_id) || null,
      light: lightOptions.find((b) => b.id === values.light_id) || null,
      fuel: fuelOptions.find((b) => b.id === values.fuel_type_id) || null,
      deal: dealOptions.find((b) => b.id === values.deal_id) || null,
      model: modelOptions.find((b) => b.id === values.model_id) || null,
      color: colorOptions.find((b) => b.id === values.color_id) || null,
      showroom: showroomOptions.find((b) => b.id === values.store_id) || null,
      structure:
        structureOptions.find((b) => b.id === values.structure_id) || null,
      driveType: driveTypeData.find((b) => b.id === values.drive_type) || null,
      used: typeData.find((b) => b.value === values.used) || null,
      features: values.features
        ? featureOptions.filter((feature) =>
            values.features.includes(feature.id)
          )
        : [],
    }),
    [
      values,
      brandOptions,
      modelOptions,
      showroomOptions,
      featureOptions,
      colorOptions,
      dealOptions,
      fuelOptions,
      gearOptions,
      lightOptions,
      structureOptions,
    ]
  );

  // Memoize handlers
  const handleMainPhotoUpload = useCallback(
    (files) => {
      if (files?.length > 0) {
        setFieldValue("main_photo", files[0]);
      }
    },
    [setFieldValue]
  );

  const handlePhotosUpload = useCallback(
    (files) => {
      if (files?.length > 0) {
        // Convert FileList to array and then map
        const filesArray = Array.from(files);
        const newPhotos = filesArray.map((file) => ({ photo: file }));
        setFieldValue("photos", [...(values.photos || []), ...newPhotos]);
        console.log(values.photos);
      }
    },
    [setFieldValue, values.photos]
  );

  const removePhoto = useCallback(
    (index) => {
      const photoToRemove = values.photos[index];

      if (
        typeof photoToRemove === "object" &&
        photoToRemove.id &&
        photoToRemove.photo
      ) {
        deletePhoto(photoToRemove.id, {
          onSuccess: () => {
            const newPhotos = [...values.photos];
            newPhotos.splice(index, 1);
            setFieldValue("photos", newPhotos);
          },
        });
      } else {
        const newPhotos = [...values.photos];
        newPhotos.splice(index, 1);
        setFieldValue("photos", newPhotos);
      }
    },
    [setFieldValue, values.photos, deletePhoto]
  );

  // Render sections
  const renderBrandAndModelSection = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <SelectInput
        options={brandOptions}
        value={selectedOptions.brand}
        label={t("forms.brand")}
        placeholder={t("forms.selectBrand")}
        error={touched.brand_id && Boolean(errors.brand_id)}
        helperText={touched.brand_id && errors.brand_id}
        loading={brands.isLoading}
        onChange={(e, newValue) =>
          setFieldValue("brand_id", newValue?.id || "")
        }
        onInputChange={(e, newInputValue) => setSearchBrand(newInputValue)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("brand_id", true)}
      />

      <SelectInput
        options={modelOptions}
        value={selectedOptions.model}
        label={t("forms.model")}
        placeholder={t("forms.selectModel")}
        error={touched.model_id && Boolean(errors.model_id)}
        helperText={touched.model_id && errors.model_id}
        loading={models.isLoading}
        onChange={(e, newValue) =>
          setFieldValue("model_id", newValue?.id || "")
        }
        onInputChange={(e, newInputValue) => setSearchModel(newInputValue)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("model_id", true)}
      />
    </Box>
  );

  const renderShowroomAndStructureSection = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <Role role={"employee"}>
        <SelectInput
          options={showroomOptions}
          value={selectedOptions.showroom}
          label={t("forms.showroom")}
          placeholder={t("forms.selectShowroom")}
          error={touched.store_id && Boolean(errors.store_id)}
          helperText={touched.store_id && errors.store_id}
          loading={showrooms.isLoading}
          onChange={(e, newValue) =>
            setFieldValue("store_id", newValue?.id || "")
          }
          onInputChange={(e, newInputValue) => setSearchShowroom(newInputValue)}
          getOptionLabel={(option) => getTranslation2(option, "name")}
          onBlur={() => setFieldTouched("model_id", true)}
        />
      </Role>

      <SelectInput
        options={structureOptions}
        value={selectedOptions.structure}
        label={t("forms.structure")}
        placeholder={t("forms.selectStructure")}
        error={touched.structure_id && Boolean(errors.structure_id)}
        helperText={touched.structure_id && errors.structure_id}
        onChange={(e, newValue) =>
          setFieldValue("structure_id", newValue?.id || "")
        }
        onInputChange={(e, newInputValue) => setSearchStructure(newInputValue)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("structure_id", true)}
      />
    </Box>
  );

  const renderDriveTypeAndFuelSection = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <SelectInput
        options={driveTypeData}
        value={selectedOptions.driveType}
        label={t("forms.drive_type")}
        placeholder={t("forms.selectdrive_type")}
        error={touched.drive_type && Boolean(errors.drive_type)}
        helperText={touched.drive_type && errors.drive_type}
        onChange={(e, newValue) =>
          setFieldValue("drive_type", newValue?.id || "")
        }
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("drive_type", true)}
      />

      <SelectInput
        options={fuelOptions}
        value={selectedOptions.fuel}
        label={t("forms.fuel_type_id")}
        placeholder={t("forms.selectfuel_type_id")}
        error={touched.fuel_type_id && Boolean(errors.fuel_type_id)}
        helperText={touched.fuel_type_id && errors.fuel_type_id}
        onChange={(e, newValue) =>
          setFieldValue("fuel_type_id", newValue?.id || "")
        }
        onInputChange={(e, newInputValue) => setSearchFeal(newInputValue)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("fuel_type_id", true)}
      />
    </Box>
  );

  const renderSeatTypeAndLightsSection = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <SelectInput
        options={gearOptions}
        value={selectedOptions.gear}
        label={t("forms.gears")}
        placeholder={t("forms.selectgears")}
        error={touched.gear_id && Boolean(errors.gear_id)}
        helperText={touched.gear_id && errors.gear_id}
        onInputChange={(e, newInputValue) => setSearchGear(newInputValue)}
        onChange={(e, newValue) => setFieldValue("gear_id", newValue?.id || "")}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("gear_id", true)}
      />

      <SelectInput
        options={lightOptions}
        value={selectedOptions.light}
        label={t("forms.lights")}
        placeholder={t("forms.selectlights")}
        error={touched.light_id && Boolean(errors.light_id)}
        helperText={touched.light_id && errors.light_id}
        onInputChange={(e, newInputValue) => setSearchLight(newInputValue)}
        onChange={(e, newValue) =>
          setFieldValue("light_id", newValue?.id || "")
        }
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("light_id", true)}
      />
    </Box>
  );

  const renderNumericInputsFirstRow = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <NumberInput
        name="price"
        label={t("forms.price")}
        value={values.price}
        error={touched.price && Boolean(errors.price)}
        helperText={touched.price && errors.price}
        onChange={(e) => setFieldValue("price", e.target.value)}
        onBlur={() => setFieldTouched("price", true)}
      />

      <NumberInput
        name="mileage"
        label={t("forms.mileage")}
        value={values.mileage}
        error={touched.mileage && Boolean(errors.mileage)}
        helperText={touched.mileage && errors.mileage}
        onChange={(e) => setFieldValue("mileage", e.target.value)}
        onBlur={() => setFieldTouched("mileage", true)}
      />

      <NumberInput
        name="cylinders"
        label={t("forms.cylinders")}
        value={values.cylinders}
        error={touched.cylinders && Boolean(errors.cylinders)}
        helperText={touched.cylinders && errors.cylinders}
        onChange={(e) => setFieldValue("cylinders", e.target.value)}
        onBlur={() => setFieldTouched("cylinders", true)}
      />

      <NumberInput
        name="cylinder_capacity"
        label={t("forms.cylinder_capacity")}
        value={values.cylinder_capacity}
        error={touched.cylinder_capacity && Boolean(errors.cylinder_capacity)}
        helperText={touched.cylinder_capacity && errors.cylinder_capacity}
        onChange={(e) => setFieldValue("cylinder_capacity", e.target.value)}
        onBlur={() => setFieldTouched("cylinder_capacity", true)}
      />
    </Box>
  );

  const renderNumericInputsSecondRow = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <NumberInput
        name="year_of_construction"
        label={t("forms.year_of_construction")}
        value={values.year_of_construction}
        error={
          touched.year_of_construction && Boolean(errors.year_of_construction)
        }
        helperText={touched.year_of_construction && errors.year_of_construction}
        onChange={(e) => setFieldValue("year_of_construction", e.target.value)}
        onBlur={() => setFieldTouched("year_of_construction", true)}
      />
      <NumberInput
        name="register_year"
        label={t("forms.year_of_registration")}
        value={values.register_year}
        error={touched.register_year && Boolean(errors.register_year)}
        helperText={touched.register_year && errors.register_year}
        onChange={(e) => setFieldValue("register_year", e.target.value)}
        onBlur={() => setFieldTouched("register_year", true)}
      />
      <NumberInput
        name="number_of_seats"
        label={t("forms.number_of_seats")}
        value={values.number_of_seats}
        error={touched.number_of_seats && Boolean(errors.number_of_seats)}
        helperText={touched.number_of_seats && errors.number_of_seats}
        onChange={(e) => setFieldValue("number_of_seats", e.target.value)}
        onBlur={() => setFieldTouched("number_of_seats", true)}
      />
    </Box>
  );

  const renderGearsAndColorSection = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <SelectInput
        options={colorOptions}
        value={selectedOptions.color}
        label={t("forms.color")}
        placeholder={t("forms.selectColor")}
        error={touched.color_id && Boolean(errors.color_id)}
        helperText={touched.color_id && errors.color_id}
        onInputChange={(e, newInputValue) => setSearchColor(newInputValue)}
        onChange={(e, newValue) =>
          setFieldValue("color_id", newValue?.id || "")
        }
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("color_id", true)}
      />

      <ColorPickerField
        label={t("forms.color")}
        value={values.hex}
        onChange={(color) => setFieldValue("hex", color)}
        onBlur={() => setFieldTouched("hex", true)}
      />
    </Box>
  );

  const renderTypeSection = () => (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
      <SelectInput
        options={typeData}
        value={selectedOptions.used}
        label={t("forms.type")}
        placeholder={t("forms.selecttype")}
        error={touched.used && Boolean(errors.used)}
        helperText={touched.used && errors.used}
        onChange={(e, newValue) => setFieldValue("used", newValue?.value || 0)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("used", true)}
      />

      <SelectInput
        options={dealOptions}
        value={selectedOptions.deal}
        label={t("forms.deals")}
        placeholder={t("forms.selectdeals")}
        error={touched.deal_id && Boolean(errors.deal_id)}
        helperText={touched.deal_id && errors.deal_id}
        onChange={(e, newValue) => setFieldValue("deal_id", newValue?.id || "")}
        onInputChange={(e, newInputValue) => setSearchDeal(newInputValue)}
        getOptionLabel={(option) => getTranslation2(option, "name")}
        onBlur={() => setFieldTouched("deal_id", true)}
      />
    </Box>
  );

  const renderFeaturesSection = () => {
    return (
      <FormControl
        margin="dense"
        fullWidth
        error={touched.features && Boolean(errors.features)}
      >
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={featureOptions}
          getOptionLabel={(option) => getTranslation2(option, "name")}
          value={selectedOptions.features}
          onChange={(e, newValue) => {
            setFieldValue(
              "features",
              newValue.map((feature) => feature.id)
            );
          }}
          onInputChange={(e, newInputValue) => setSearchFeature(newInputValue)}
          loading={features.isLoading}
          onBlur={() => setFieldTouched("features", true)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("forms.features")}
              placeholder={t("forms.selectfeatures")}
              error={touched.features && Boolean(errors.features)}
              helperText={touched.features && errors.features}
            />
          )}
        />
      </FormControl>
    );
  };
  const renderMainPhotoSection = () => (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>
        {t("forms.main_photo")}
      </Typography>
      <FileImagePicker
        title={t("imagePicker.title", {
          thetypes: t("thetypes.car"),
        })}
        onSelectImage={handleMainPhotoUpload}
        name="main_photo"
        accept="image/png,image/jpg,image/jpeg"
        id="main_photo"
        onBlur={handleBlur}
        multiple={false}
        error={touched.main_photo && Boolean(errors.main_photo)}
        helperText={touched.main_photo && errors.main_photo}
        renderContent={() => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            mx="auto"
            mt={2}
            flexDirection="column"
          >
            {values.main_photo ? (
              <Box
                position="relative"
                width="100%"
                maxWidth="400px"
                height="200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius={2}
                boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
                overflow="hidden"
              >
                <img
                  src={
                    typeof values.main_photo === "string"
                      ? values.main_photo
                      : URL.createObjectURL(values.main_photo)
                  }
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <IconButton
                  onClick={() => setFieldValue("main_photo", null)}
                  color="error"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    bgcolor: "white",
                    borderRadius: "50%",
                    boxShadow: 1,
                    width: 40,
                    height: 40,
                  }}
                >
                  <MdOutlineDeleteSweep size={24} />
                </IconButton>
              </Box>
            ) : (
              <Typography color="primary.main" textAlign="center">
                {t("imagePicker.types")}
              </Typography>
            )}
          </Box>
        )}
      />
    </Box>
  );

  const renderAdditionalPhotosSection = () => (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>
        {t("forms.additional_photos")}
      </Typography>
      <FileImagePicker
        title={t("imagePicker.titles", {
          thetypes: t("thetypes.car"),
        })}
        onSelectImage={handlePhotosUpload}
        name="photos"
        accept="image/png,image/jpg,image/jpeg"
        id="photos"
        onBlur={handleBlur}
        multiple={true}
        renderContent={() => (
          <Box>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {values.photos?.map((photo, index) => {
                let photoUrl;
                if (typeof photo.photo === "string") {
                  photoUrl = photo.photo;
                } else if (photo.photo instanceof File) {
                  photoUrl = URL.createObjectURL(photo.photo);
                } else if (photo instanceof File) {
                  photoUrl = URL.createObjectURL(photo);
                }

                return (
                  <Box
                    key={index}
                    position="relative"
                    width="120px"
                    height="120px"
                    borderRadius={2}
                    boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
                    overflow="hidden"
                  >
                    <img
                      src={photoUrl}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <IconButton
                      onClick={() => removePhoto(index)}
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        bgcolor: "white",
                        borderRadius: "50%",
                        boxShadow: 1,
                        width: 30,
                        height: 30,
                      }}
                    >
                      <MdOutlineDeleteSweep size={18} />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
            {(!values.photos || values.photos.length === 0) && (
              <Typography color="primary.main" textAlign="center" mt={2}>
                {t("imagePicker.types")}
              </Typography>
            )}
          </Box>
        )}
      />
    </Box>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} px={3}>
      {renderBrandAndModelSection()}
      {renderShowroomAndStructureSection()}
      {renderDriveTypeAndFuelSection()}
      {renderSeatTypeAndLightsSection()}
      {renderNumericInputsFirstRow()}
      {renderNumericInputsSecondRow()}
      {renderGearsAndColorSection()}
      {renderTypeSection()}
      {renderFeaturesSection()}
      {renderMainPhotoSection()}
      {renderAdditionalPhotosSection()}

      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={!isValid}
        sx={{
          width: { xs: "100%", sm: "fit-content" },
          mt: 3,
          mb: 2,
        }}
        {...loadingButtonProps}
      >
        {t("gbtn." + task)}
      </Button>
    </Box>
  );
};

export default CarForm;
