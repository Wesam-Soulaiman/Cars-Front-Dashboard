import { forwardRef } from "react";
import {
  alpha,
  ListItemButton,
  listItemButtonClasses,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSidebar } from "../../store/sidebarStore";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavItem = ({ item }) => {
  const { open, setSelected } = useSidebar();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.path} target={itemTarget} />
    )),
  };

  const isSelected = pathname === item.path;

  return (
    <ListItemButton
      {...listItemProps}
      selected={isSelected}
      sx={{
        borderRight: (theme) =>
          isSelected ? `2px solid ${theme.palette.primary.main}` : "none",
        [`&.${listItemButtonClasses.selected}`]: {
          backgroundColor: "transparent !important",
        },
        ":hover": {
          backgroundColor: (theme) =>
            alpha(theme.palette.primary.main, 0.1) + "!important",
        },
      }}
      onClick={() => setSelected(item.id)}
    >
      {open && (
        <ListItemIcon
          sx={{
            borderRadius: 1.5,
            alignItems: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
      )}
      {open && (
        <ListItemText
          primary={
            <Typography variant="h6">{t("sidebar." + item.title)}</Typography>
          }
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
