import PopupButton from "../../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdateRole } from "../../../../api/roles";
import RoleForm from "./RoleForm";

const UpdateRole = ({ role }) => {
  const updateRole = useUpdateRole();
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
            {t("edit_pop.title", { thetypes: t("thetypes.role") })}
          </DialogTitle>
          <DialogContent>
            <RoleForm
              isPopup
              initialValues={{
                name: role.name,
                name_ar: role.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateRole.isPending,
              }}
              onSubmit={async (values) => {
                await updateRole.mutateAsync({ data: values, id: role.id });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateRole;
