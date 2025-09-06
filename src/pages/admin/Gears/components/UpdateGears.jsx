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
import { useUpdateGears } from "../../../../api/gears";

const UpdateGears = ({ gear }) => {
  const updateGears = useUpdateGears();
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
            {t("edit_pop.title", { thetypes: t("thetypes.gear") })}
          </DialogTitle>
          <DialogContent>
            <CarInfoForm
              initialValues={{
                name: gear.name,
                name_ar: gear.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateGears.isPending,
              }}
              onSubmit={async (values) => {
                await updateGears.mutateAsync({
                  data: values,
                  id: gear.id,
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

export default UpdateGears;
