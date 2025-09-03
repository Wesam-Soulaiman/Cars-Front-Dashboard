import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdateEmployee } from "../../../../api/employees";
import EmployeeForm from "./EmployeeForm";
import PopupButton from "../../../../components/PopupButton";

const UpdateEmployee = ({ employee }) => {
  const updateEmployee = useUpdateEmployee();
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
            {t("edit_pop.title", { thetypes: t("thetypes.employee") })}
          </DialogTitle>
          <DialogContent>
            <EmployeeForm
              initialValues={{
                name: employee.name,
                name_ar: employee.name_ar,
                email: employee.email,
                phone: employee.phone,
                role_id: employee.role_id,
              }}
              task="update"
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

export default UpdateEmployee;
