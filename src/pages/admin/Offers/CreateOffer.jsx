import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreateOffer } from "../../../api/offer";
import OfferForm from "./components/OfferForm";
import dayjs from "dayjs";
import Permission from "../../../components/Permission";

const CreateOffer = () => {
  const { t } = useTranslation();
  const createOffer = useCreateOffer();

  return (
    <Permission permission="offers.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.offer") })}
        </Typography>
        <OfferForm
          initialValues={{
            product_id: null,
            start_time: dayjs(),
            end_time: dayjs(),
            final_price: "",
          }}
          onSubmit={(values, { resetForm }) => {
            const payload = {
              ...values,
              start_time: values.start_time.format("YYYY-MM-DD"),
              end_time: values.end_time.format("YYYY-MM-DD"),
            };
            createOffer.mutateAsync(payload);
            resetForm();
          }}
          loading={createOffer.isPending}
        />
      </Box>
    </Permission>
  );
};

export default CreateOffer;
