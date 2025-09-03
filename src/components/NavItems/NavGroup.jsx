// NavGroup.js
import { Divider, Typography } from "@mui/material";
import NavItemsRenderer from ".";
import { useTranslation } from "react-i18next";

const NavGroup = ({ item }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography sx={{ color: "grey.600", my: 2, pl: 1 }}>
        {t("sidebar." + item.title)}
      </Typography>
      <NavItemsRenderer items={item.children} />
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default NavGroup;
