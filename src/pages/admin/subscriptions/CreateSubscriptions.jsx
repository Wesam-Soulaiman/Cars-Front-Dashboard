import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SubscriptionForm from "./components/SubscriptionForm";
import dayjs from "dayjs";
import { useCreateSubscription } from "../../../api/subscriptions";

const CreateSubscriptions = () => {
  const { t } = useTranslation();
  const createSubscription = useCreateSubscription();

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("forms.create", { types: t("types.subscription") })}
      </Typography>
      <SubscriptionForm
        initialValues={{
          service_id: null,
          store_id: null,
          price: "",
          count_days: "",
          start_time: dayjs(),
          active: 1,
        }}
        onSubmit={(values, { resetForm }) => {
          const payload = {
            ...values,
            start_time: values.start_time.format("YYYY-MM-DD"), // Convert here
          };
          createSubscription.mutateAsync(payload);
          resetForm();
        }}
        loading={createSubscription.isPending}
      />
    </Box>
  );
};

export default CreateSubscriptions;
