import { useAuthContext } from "../providers/AuthProvider";

const Permission = ({ permission, children }) => {
  const { permissions } = useAuthContext();

  const hasPermission = permissions?.some(
    (perm) => perm.guard_name === permission
  );

  return hasPermission ? children : null;
};

export default Permission;
