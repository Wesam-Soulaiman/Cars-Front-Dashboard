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
import { useDeleteEmployee } from "../../../../api/employees";
import PopupButton from "../../../../components/PopupButton";

const DeleteEmployee = ({ employee }) => {
  const deleteEmployee = useDeleteEmployee();
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
            {t("delete_pop.title", { thetypes: t("thetypes.employee") })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("delete_pop.desc", {
                thetypes: t("thetypes.employee"),
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              {t("delete_pop.cancel")}
            </Button>
            <Button
              onClick={() => {
                deleteEmployee.mutateAsync(employee.id);
                handleClose();
              }}
              disabled={deleteEmployee.isPending}
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

export default DeleteEmployee;
