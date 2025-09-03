import { useAuthContext } from "../providers/AuthProvider";

export const useFilteredMenu = (menuItems) => {
  const { permissions } = useAuthContext();

  const hasPermission = (requiredPermission) => {
    if (!requiredPermission) return true;
    return permissions?.some((perm) => perm.guard_name === requiredPermission);
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      if (item.children) {
        item.children = filterItems(item.children);
        return item.children.length > 0;
      }

      return hasPermission(item.permission);
    });
  };

  return filterItems([...menuItems]);
};
