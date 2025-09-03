import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PopupButton from "../../../../components/PopupButton";
import dayjs from "dayjs";
import { MdOutlineUpdate } from "react-icons/md";
import { useUpdateSubscription } from "../../../../api/subscriptions";

const RenewalSub = ({ sub }) => {
  const updateSub = useUpdateSubscription();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("renewal_pop.tooltip")}>
          <IconButton
            color="warning"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            <MdOutlineUpdate />
          </IconButton>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("renewal_pop.title", { thetypes: t("thetypes.subscription") })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("renewal_pop.desc", {
                thetypes: t("thetypes.subscription"),
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              {t("renewal_pop.cancel")}
            </Button>
            <Button
              onClick={async () => {
                await updateSub.mutateAsync({
                  id: sub.id,
                  data: {
                    start_time: dayjs().format("YYYY-MM-DD"),
                  },
                });
                handleClose();
              }}
              disabled={updateSub.isPending}
              color="primary"
              variant="contained"
            >
              {t("renewal_pop.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    />
  );
};

export default RenewalSub;
