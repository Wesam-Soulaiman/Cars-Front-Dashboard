// CollapseItem.js
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import NavItemsRenderer from ".";
import { MdExpandMore } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../providers/AuthProvider";

const CollapseItem = ({ item }) => {
  const { t } = useTranslation();
  const { permissions } = useAuthContext();

  const hasPermission = (requiredPermission) => {
    if (!requiredPermission) return true;
    return permissions?.some((perm) => perm.guard_name === requiredPermission);
  };

  // Filter children based on permissions
  const filteredChildren = item.children?.filter(
    (child) => !child.permission || hasPermission(child.permission)
  );

  if (!filteredChildren || filteredChildren.length === 0) return null;

  return (
    <Accordion
      disableGutters
      elevation={0}
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        [`&.${accordionClasses.root}`]: {
          ":before": {
            display: "none",
          },
        },
      }}
    >
      <AccordionSummary
        sx={{
          fontWeight: 500,
          fontSize: "0.9rem",
          lineHeight: 1.5,
          fontFamily: "Cairo",
        }}
        expandIcon={<MdExpandMore size={25} />}
      >
        {t("sidebar." + item.title)}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "transparent",
          p: 0,
        }}
      >
        <NavItemsRenderer items={filteredChildren} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseItem;
