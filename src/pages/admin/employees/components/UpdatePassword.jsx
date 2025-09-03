import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FaExpeditedssl } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useUpdateEmployee } from "../../../../api/employees";
import EmployeeForm from "./EmployeeForm";
import PopupButton from "../../../../components/PopupButton";

const UpdatePassword = ({ employee }) => {
  const updateEmployee = useUpdateEmployee();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("edit_pop.tooltip")}>
          <IconButton
            color="success"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            <FaExpeditedssl />
          </IconButton>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("edit_pop.title", { thetypes: t("thetypes.employee") })}
          </DialogTitle>
          <DialogContent>
            <EmployeeForm
              initialValues={{
                password: "",
                password_confirmation: "",
              }}
              task="updatePassword"
              loadingButtonProps={{
                loading: updateEmployee.isPending,
              }}
              onSubmit={async (values) => {
                await updateEmployee.mutateAsync({
                  data: values,
                  id: employee.id,
                });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdatePassword;
