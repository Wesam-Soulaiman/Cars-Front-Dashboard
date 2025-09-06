import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PopupButton from "../../../../components/PopupButton";
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { useUpdateColor } from "../../../../api/colors";

const UpdateColors = ({ color }) => {
  const updateColors = useUpdateColor();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("edit_pop.tooltip")}>
          <IconButton
            color="warning"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            <MdModeEditOutline />
          </IconButton>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("edit_pop.title", { thetypes: t("thetypes.color") })}
          </DialogTitle>
          <DialogContent>
            <CarInfoForm
              initialValues={{
                name: color.name,
                name_ar: color.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateColors.isPending,
              }}
              onSubmit={async (values) => {
                await updateColors.mutateAsync({
                  data: values,
                  id: color.id,
                });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateColors;
