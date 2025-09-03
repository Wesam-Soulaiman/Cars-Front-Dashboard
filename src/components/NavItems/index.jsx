// NavItemsRenderer.js
import { Box, Typography } from "@mui/material";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";
import CollapseItem from "./CollapseItem";
import { useAuthContext } from "../../providers/AuthProvider";

const NavItemsRenderer = ({ items }) => {
  const { permissions } = useAuthContext();

  const hasPermission = (requiredPermission) => {
    if (!requiredPermission) return true;
    return permissions?.some((perm) => perm.guard_name === requiredPermission);
  };

  const filteredItems = items.filter((item) => {
    if (item.permission && !hasPermission(item.permission)) {
      return false;
    }
    return true;
  });

  const testItems = filteredItems.map((item, i) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={i} item={item} />;
      case "item":
        return <NavItem key={i} item={item} />;
      case "coollabse":
        return <CollapseItem key={i} item={item} />;
      default:
        return (
          <Typography key={i}>type of item {item.type} is wrong</Typography>
        );
    }
  });

  return <Box>{testItems}</Box>;
};

export default NavItemsRenderer;
