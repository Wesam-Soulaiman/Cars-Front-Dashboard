import { useAuthContext } from "../providers/AuthProvider";

const Role = ({ role, children }) => {
  const { user } = useAuthContext();

  const IsRole = role === user.type;

  return IsRole ? children : null;
};

export default Role;
