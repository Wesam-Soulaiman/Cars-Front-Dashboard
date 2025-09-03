import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PopupButton from "../../../../components/PopupButton";
import dayjs from "dayjs";
import SubscriptionForm from "./SubscriptionForm";
import { useUpdateSubscription } from "../../../../api/subscriptions";

const UpdateSub = ({ sub }) => {
  const updateSub = useUpdateSubscription();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("edit_pop.tooltip")}>
          <IconButton
            color="warning"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            <MdModeEditOutline />
          </IconButton>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("edit_pop.title", { thetypes: t("thetypes.subscription") })}
          </DialogTitle>
          <DialogContent>
            <SubscriptionForm
              initialValues={{
                service_id: sub.service_id,
                store_id: sub.store_id,
                price: sub.price,
                count_days: sub.count_days,
                start_time: sub.start_time ? dayjs(sub.start_time) : null,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateSub.isPending,
              }}
              onSubmit={async (values) => {
                const payload = {
                  ...values,
                  start_time: values.start_time?.format("YYYY-MM-DD") || null,
                };
                await updateSub.mutateAsync({ data: payload, id: sub.id });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateSub;
