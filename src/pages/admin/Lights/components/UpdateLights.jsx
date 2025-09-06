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
import { useUpdateLight } from "../../../../api/lights";

const UpdateLights = ({ light }) => {
  const updateLights = useUpdateLight();
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
            {t("edit_pop.title", { thetypes: t("thetypes.light") })}
          </DialogTitle>
          <DialogContent>
            <CarInfoForm
              initialValues={{
                name: light.name,
                name_ar: light.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateLights.isPending,
              }}
              onSubmit={async (values) => {
                await updateLights.mutateAsync({
                  data: values,
                  id: light.id,
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

export default UpdateLights;
