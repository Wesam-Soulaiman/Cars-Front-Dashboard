import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetShowrooms } from "../../../../api/showrooms";
import { useGetPackages } from "../../../../api/packages";
import {
  SelectInput,
  TextInput,
  DatePickerInput,
} from "../../../../components/forms";
import useGetTranslation from "../../../../utils/useGetTranslation";

const SubscriptionForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();

  // Validation schema
  const validationSchema = Yup.object().shape({
    store_id: Yup.string().required().label(t("forms.showroom")),
    service_id: Yup.string().required().label(t("forms.package")),
    start_time: Yup.date().required().label(t("forms.startDate")),
    price: Yup.number().required().label(t("forms.price")).min(0),
  });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isValid,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

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

  const [page] = useState(0);
  const [pageSize] = useState(10);

  const { data: showroomsData, isLoading: showroomsLoading } = useGetShowrooms({
    page,
    pageSize,
    name: debouncedSearchShowroom,
  });
  const { data: packagesData } = useGetPackages();

  const showroomOptions = showroomsData?.data?.data || [];
  const packageOptions = packagesData?.data?.data || [];

  const selectedShowroom = useMemo(
    () => ({
      showroom: showroomOptions.find((b) => b.id === values.store_id) || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.store_id]
  );

  const selectedPackage =
    packageOptions.find((b) => b.id === values.service_id) || null;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            {/* Showroom Selection */}
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

            {/* Package Selection */}
            <SelectInput
              name="service_id"
              label={t("forms.package")}
              placeholder={t("forms.selectPackage")}
              options={packageOptions}
              value={selectedPackage}
              onChange={(e, newVal) => {
                setFieldValue("service_id", newVal?.id || "");
              }}
              error={touched.service_id && Boolean(errors.service_id)}
              helperText={touched.service_id && errors.service_id}
              getOptionLabel={(option) => getTranslation2(option, "name")}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onBlur={() => setFieldTouched("service_id", true)}
              touched={touched.service_id}
            />
          </Box>

          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            {/* Price */}
            <TextInput
              name="price"
              label={t("forms.price")}
              value={values.price}
              onChange={(e) => setFieldValue("price", e.target.value)}
              onBlur={() => setFieldTouched("price", true)}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
              type="number"
              required
              touched={touched.price}
            />

            <DatePickerInput
              name="start_time"
              label={t("forms.startDate")}
              value={values.start_time}
              onChange={(value) => setFieldValue("start_time", value)}
              error={touched.start_time && Boolean(errors.start_time)}
              helperText={touched.start_time && errors.start_time}
              onBlur={() => setFieldTouched("start_time", true)}
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
            {loadingButtonProps?.loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("gbtn." + task)
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SubscriptionForm;
