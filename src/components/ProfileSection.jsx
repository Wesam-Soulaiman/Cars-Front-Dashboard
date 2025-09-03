import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import Role from "./Role";
import useGetTranslation from "../utils/useGetTranslation";
import useGetMyProfile from "../api/useGetMyProfile";
import { IoMdMail } from "react-icons/io";
const ProfileSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { getTranslation2 } = useGetTranslation();
  const { data, isLoading, isError } = useGetMyProfile();
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Tooltip title="Error loading profile">
          <IconButton>
            <Avatar />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  const user = data?.data;

  return (
    <Box>
      <Tooltip title="Profile settings">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Role role={"employee"}>
          <MenuItem sx={{ gap: 2 }}>
            <CgProfile fontSize={20} />
            {getTranslation2(user, "name")}
          </MenuItem>
          <MenuItem sx={{ gap: 2 }}>
            <IoMdMail fontSize={20} />
            {user.email}
          </MenuItem>
        </Role>
        <Role role={"store"}>
          <MenuItem
            onClick={() => {
              navigate("/admin/dashboard/my-profile");
            }}
            sx={{ gap: 2 }}
          >
            <CgProfile fontSize={20} />
            {t("profile.my")}
          </MenuItem>
        </Role>
        <MenuItem
          onClick={() => {
            navigate("/auth/login");
          }}
          sx={{ gap: 2 }}
        >
          <IoLogOutOutline fontSize={20} />
          {t("profile.logout")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileSection;
