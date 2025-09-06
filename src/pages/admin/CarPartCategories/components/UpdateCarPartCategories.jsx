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
import { useUpdateCarPartCategories } from "../../../../api/carPartsCategories";

const UpdateCarPartCategories = ({ carPartCategories }) => {
  const updateCarPartCategories = useUpdateCarPartCategories();
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
            {t("edit_pop.title", { thetypes: t("thetypes.carPartCategories") })}
          </DialogTitle>
          <DialogContent>
            <CarInfoForm
              initialValues={{
                name: carPartCategories.name,
                name_ar: carPartCategories.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateCarPartCategories.isPending,
              }}
              onSubmit={async (values) => {
                await updateCarPartCategories.mutateAsync({
                  data: values,
                  id: carPartCategories.id,
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

export default UpdateCarPartCategories;
