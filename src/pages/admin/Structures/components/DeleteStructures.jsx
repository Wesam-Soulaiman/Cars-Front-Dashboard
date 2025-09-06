import PopupButton from "../../../../components/PopupButton";
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
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDeleteStructures } from "../../../../api/structures";

const DeleteStructures = ({ structures }) => {
  const deleteStructures = useDeleteStructures();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("delete_pop.tooltip")}>
          <IconButton
            color="error"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            <MdOutlineDeleteSweep />
          </IconButton>
        </Tooltip>
      )}
      title="delete"
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("delete_pop.title", { thetypes: t("thetypes.structures") })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("delete_pop.desc", {
                thetypes: t("thetypes.structures"),
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              {t("delete_pop.cancel")}
            </Button>
            <Button
              onClick={() => {
                deleteStructures.mutateAsync(structures.id);
                handleClose();
              }}
              disabled={deleteStructures.isPending}
              color="primary"
              variant="contained"
            >
              {t("delete_pop.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    />
  );
};

export default DeleteStructures;
