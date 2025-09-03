import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  MdArrowCircleLeft,
  MdArrowCircleRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import LoadingDataError from "../../../components/LoadingDataError";
import TitleTypography from "../../../components/TitleTypography";
import { useShowRole, useUpdatePermissions } from "../../../api/roles";
import Permission from "../../../components/Permission";

export default function RolePermissionsManager() {
  const { id } = useParams();
  const { data, isLoading, isError } = useShowRole();
  const updatePermissions = useUpdatePermissions();
  const { t, i18n } = useTranslation();

  const [permissions, setPermissions] = useState([]);
  const [checkedAvailable, setCheckedAvailable] = useState([]);
  const [checkedSelected, setCheckedSelected] = useState([]);

  useEffect(() => {
    if (data?.data?.data?.permissions) {
      setPermissions(data.data.data.permissions);
    }
  }, [data]);

  const handleMoveToSelected = () => {
    setPermissions((prev) =>
      prev.map((perm) =>
        checkedAvailable.includes(perm.id) ? { ...perm, status: true } : perm
      )
    );
    setCheckedAvailable([]);
  };

  const handleMoveToAvailable = () => {
    setPermissions((prev) =>
      prev.map((perm) =>
        checkedSelected.includes(perm.id) ? { ...perm, status: false } : perm
      )
    );
    setCheckedSelected([]);
  };

  const handleMoveAllToSelected = () => {
    setPermissions((prev) => prev.map((perm) => ({ ...perm, status: true })));
    setCheckedAvailable([]);
    setCheckedSelected([]);
  };

  const handleMoveAllToAvailable = () => {
    setPermissions((prev) => prev.map((perm) => ({ ...perm, status: false })));
    setCheckedAvailable([]);
    setCheckedSelected([]);
  };

  const handleSubmit = () => {
    const selectedIds = permissions
      .filter((perm) => perm.status)
      .map((perm) => perm.id);

    updatePermissions.mutate({
      id: id,
      data: { permission_ids: selectedIds },
    });
  };

  const getTranslatedPermissionName = (permissionName) => {
    const [type, action] = permissionName.split(".");
    const translatedType = t(`permissions.types.${type}`, type);
    const translatedAction = t(`permissions.actions.${action}`, action);
    return `${translatedAction} ${translatedType}`;
  };

  const renderList = (items, checked, setChecked, title) => (
    <Paper
      variant="outlined"
      sx={{ p: 2, width: 300, height: 400, overflow: "auto" }}
    >
      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Stack spacing={1}>
        {items.map((perm) => (
          <FormControlLabel
            key={perm.id}
            control={
              <Checkbox
                checked={checked.includes(perm.id)}
                onChange={() => {
                  if (checked.includes(perm.id)) {
                    setChecked(checked.filter((id) => id !== perm.id));
                  } else {
                    setChecked([...checked, perm.id]);
                  }
                }}
              />
            }
            label={getTranslatedPermissionName(perm.guard_name)}
          />
        ))}
      </Stack>
    </Paper>
  );

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (isError) return <LoadingDataError refetch={data.refetch} />;

  const available = permissions.filter((perm) => !perm.status);
  const selected = permissions.filter((perm) => perm.status);

  return (
    <Permission permission="roles.update">
      <Box>
        <TitleTypography>{t("permissions.title")}</TitleTypography>
        <Box display="flex" gap={3} mt={5} alignItems="center">
          {renderList(
            available,
            checkedAvailable,
            setCheckedAvailable,
            t("permissions.available")
          )}

          <Stack justifyContent="center" spacing={2}>
            {/* Move All to Selected */}
            <Tooltip title={t("permissions.moveAllToSelected")}>
              <span>
                <IconButton
                  color="primary"
                  onClick={handleMoveAllToSelected}
                  disabled={available.length === 0}
                  sx={{
                    transform: i18n.dir() === "rtl" ? "rotate(180deg)" : "none",
                  }}
                >
                  <MdKeyboardDoubleArrowRight />
                </IconButton>
              </span>
            </Tooltip>

            {/* Move Selected */}
            <Tooltip title={t("permissions.moveSelected")}>
              <span>
                <IconButton
                  color="primary"
                  onClick={handleMoveToSelected}
                  disabled={checkedAvailable.length === 0}
                  sx={{
                    transform: i18n.dir() === "rtl" ? "rotate(180deg)" : "none",
                  }}
                >
                  <MdArrowCircleRight />
                </IconButton>
              </span>
            </Tooltip>

            {/* Move Selected Back */}
            <Tooltip title={t("permissions.moveSelected")}>
              <span>
                <IconButton
                  color="primary"
                  onClick={handleMoveToAvailable}
                  disabled={checkedSelected.length === 0}
                  sx={{
                    transform: i18n.dir() === "rtl" ? "rotate(180deg)" : "none",
                  }}
                >
                  <MdArrowCircleLeft />
                </IconButton>
              </span>
            </Tooltip>

            {/* Move All to Available */}
            <Tooltip title={t("permissions.moveAllToAvailable")}>
              <span>
                <IconButton
                  color="primary"
                  onClick={handleMoveAllToAvailable}
                  disabled={selected.length === 0}
                  sx={{
                    transform: i18n.dir() === "rtl" ? "rotate(180deg)" : "none",
                  }}
                >
                  <MdKeyboardDoubleArrowLeft />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>

          {renderList(
            selected,
            checkedSelected,
            setCheckedSelected,
            t("permissions.selected")
          )}
        </Box>

        <Box mt={4}>
          <Button
            sx={{ px: "30px" }}
            variant="contained"
            onClick={handleSubmit}
            disabled={updatePermissions.isPending}
          >
            {t("permissions.save")}
          </Button>
        </Box>
      </Box>
    </Permission>
  );
}
