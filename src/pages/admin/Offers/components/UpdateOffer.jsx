import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdateOffer } from "../../../../api/offer";
import PopupButton from "../../../../components/PopupButton";
import OfferForm from "./OfferForm";
import dayjs from "dayjs";

const UpdateOffer = ({ offer }) => {
  const updateOffer = useUpdateOffer();
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
            {t("edit_pop.title", { thetypes: t("thetypes.offer") })}
          </DialogTitle>
          <DialogContent>
            <OfferForm
              initialValues={{
                start_time: offer.start_time ? dayjs(offer.start_time) : null,
                end_time: offer.end_time ? dayjs(offer.end_time) : null,
                final_price: offer.price,
                product_id: offer.product_id,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateOffer.isPending,
              }}
              onSubmit={async (values) => {
                const payload = {
                  ...values,
                  start_time: values.start_time?.format("YYYY-MM-DD") || null,
                  end_time: values.end_time?.format("YYYY-MM-DD") || null,
                };
                await updateOffer.mutateAsync({ data: payload, id: offer.id });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateOffer;
