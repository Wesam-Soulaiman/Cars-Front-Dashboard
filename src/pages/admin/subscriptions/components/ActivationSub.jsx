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
import { useUpdateSubscription } from "../../../../api/subscriptions";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

const ActivationSub = ({ sub }) => {
  const updateSub = useUpdateSubscription();
  const { t } = useTranslation();

  const isActive = sub.active;
  const actionText = isActive ? "deactivate" : "activate";

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t(`${actionText}_pop.tooltip`)}>
          <IconButton
            color={isActive ? "success" : "error"}
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            {isActive ? <MdToggleOn size={35} /> : <MdToggleOff size={35} />}
          </IconButton>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>{t(`${actionText}_pop.title`)}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t(`${actionText}_pop.desc`)}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              {t(`${actionText}_pop.cancel`)}
            </Button>
            <Button
              onClick={async () => {
                await updateSub.mutateAsync({
                  id: sub.id,
                  data: {
                    active: !isActive, // Toggle the status
                  },
                });
                handleClose();
              }}
              disabled={updateSub.isPending}
              color={isActive ? "error" : "success"}
              variant="contained"
            >
              {t(`${actionText}_pop.confirm`)}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    />
  );
};

export default ActivationSub;
