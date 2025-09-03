import PopupButton from "../../../../components/PopupButton";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreateRole } from "../../../../api/roles";
import RoleForm from "./RoleForm";

const CreateRole = () => {
  const createRole = useCreateRole();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("edit_pop.tooltip")}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            {t("forms.create", { types: t("types.role") })}
          </Button>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("forms.create", { types: t("types.role") })}
          </DialogTitle>
          <DialogContent>
            <RoleForm
              isPopup
              initialValues={{
                name: "",
                name_ar: "",
              }}
              task="create"
              loadingButtonProps={{
                loading: createRole.isPending,
              }}
              onSubmit={(values) => {
                createRole.mutateAsync(values);
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default CreateRole;
