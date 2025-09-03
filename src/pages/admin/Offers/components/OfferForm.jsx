import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useGetCars } from "../../../../api/cars";
import * as Yup from "yup";
import useGetTranslation from "../../../../utils/useGetTranslation";
import { useEffect, useMemo, useState } from "react";
import {
  DatePickerInput,
  NumberInput,
  SelectInput,
} from "../../../../components/forms";

const OfferForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();

  const validationSchema = Yup.object().shape({
    product_id: Yup.string().required().label(t("forms.car")),
    start_time: Yup.date().required().label(t("forms.startDate")),
    end_time: Yup.date().required().label(t("forms.endDate")),
    final_price: Yup.number().required().label(t("forms.price")).min(0),
  });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    isValid,
    setFieldTouched,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    ...formikConfig,
  });

  const [searchCar, setSearchCar] = useState("");
  const [debouncedSearchCar, setDebouncedSearchCar] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchCar(searchCar);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchCar]);

  const [page] = useState(0);
  const [pageSize] = useState(10);

  const { data, isLoading } = useGetCars({
    page,
    pageSize,
    name: debouncedSearchCar,
  });

  const carsOptions = useMemo(() => data?.data.data || [], [data?.data]);
  const selectedCar = useMemo(
    () => ({
      car: carsOptions.find((b) => b.id === values.product_id) || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.product_id]
  );
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            {/* Car Selection */}
            <SelectInput
              name="product_id"
              label={t("forms.car")}
              placeholder={t("forms.selectCar")}
              options={carsOptions}
              value={selectedCar.car}
              onChange={(e, newVal) => {
                setFieldValue("product_id", newVal?.id || "");
              }}
              onInputChange={(e, newInputValue) => setSearchCar(newInputValue)}
              loading={isLoading}
              error={touched.product_id && Boolean(errors.product_id)}
              helperText={touched.product_id && errors.product_id}
              getOptionLabel={(option) => getTranslation2(option, "name")}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onBlur={() => setFieldTouched("product_id", true)}
              touched={touched.product_id}
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

            <NumberInput
              name="final_price"
              label={t("forms.final_price")}
              value={values.final_price}
              error={touched.final_price && Boolean(errors.final_price)}
              helperText={touched.final_price && errors.final_price}
              onChange={(e) => setFieldValue("final_price", e.target.value)}
              onBlur={() => setFieldTouched("final_price", true)}
            />
          </Box>
          {/* Start and End Time in the same row */}
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <DatePickerInput
              name="start_time"
              label={t("forms.startDate")}
              value={values.start_time}
              onChange={(value) => setFieldValue("start_time", value)}
              error={touched.start_time && Boolean(errors.start_time)}
              helperText={touched.start_time && errors.start_time}
              onBlur={() => setFieldTouched("start_time", true)}
            />

            <DatePickerInput
              name="end_time"
              label={t("forms.endDate")}
              value={values.end_time}
              onChange={(value) => setFieldValue("end_time", value)}
              error={touched.end_time && Boolean(errors.end_time)}
              helperText={touched.end_time && errors.end_time}
              onBlur={() => setFieldTouched("end_time", true)}
            />
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            disabled={!isValid}
            sx={{
              width: { xs: "100%", sm: "fit-content" },
            }}
            {...loadingButtonProps}
            loading={loadingButtonProps?.loading}
          >
            {t("gbtn." + task)}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OfferForm;
