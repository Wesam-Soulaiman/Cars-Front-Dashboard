import { Box } from "@mui/material";
import { Outlet } from "react-router";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { adminMenuItems } from "../../menu-items";
import { useFilteredMenu } from "../../utils/useFilteredMenu";

const AdminLayout = () => {
  const filteredMenuItems = useFilteredMenu(adminMenuItems);
  return (
    <Box>
      <DashboardLayout sidebarItems={filteredMenuItems}>
        <Outlet />
      </DashboardLayout>
    </Box>
  );
};

export default AdminLayout;
