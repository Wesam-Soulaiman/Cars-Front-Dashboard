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
import { useUpdateFuel } from "../../../../api/fuel";
import CarInfoForm from "../../../../components/forms/CarInfoForm";

const UpdateFuels = ({ fuel }) => {
  const updateFuels = useUpdateFuel();
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
            {t("edit_pop.title", { thetypes: t("thetypes.fuel") })}
          </DialogTitle>
          <DialogContent>
            <CarInfoForm
              initialValues={{
                name: fuel.name,
                name_ar: fuel.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateFuels.isPending,
              }}
              onSubmit={async (values) => {
                const data = {};
                if (values.name !== fuel.name) data.name = values.name;
                if (values.name_ar !== fuel.name_ar)
                  data.name_ar = values.name_ar;

                await updateFuels.mutateAsync({
                  data,
                  id: fuel.id,
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

export default UpdateFuels;
