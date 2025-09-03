import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreateEmployee } from "../../../api/employees";
import EmployeeForm from "./components/EmployeeForm";
import Permission from "../../../components/Permission";

const CreateEmployee = () => {
  const { t } = useTranslation();
  const createEmployee = useCreateEmployee();

  return (
    <Permission permission="employees.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.employee") })}
        </Typography>
        <EmployeeForm
          initialValues={{
            name: "",
            name_ar: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
            role_id: null,
          }}
          onSubmit={(values, { resetForm }) => {
            createEmployee.mutateAsync(values);
            resetForm();
          }}
          loadingButtonProps={{
            loading: createEmployee.isPending,
          }}
        />
      </Box>
    </Permission>
  );
};

export default CreateEmployee;
