import PopupButton from "../../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdateCarParts } from "../../../../api/carParts";
import CarPartsForm from "./CarPartsForm";

const UpdateCarParts = ({ carParts }) => {
  const updateCarParts = useUpdateCarParts();
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
            {t("edit_pop.title", { thetypes: t("thetypes.carParts") })}
          </DialogTitle>
          <DialogContent>
            <CarPartsForm
              isPopup
              initialValues={{
                brand_id: carParts.brand.id,
                store_id: carParts.store.id,
                model_id: carParts.model.id,
                category_id: carParts.category.id,
                price: carParts.price,
                creation_country: carParts.creation_country,
                main_photo: carParts.main_photo,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateCarParts.isPending,
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("brand_id", values.brand_id);
                formData.append("model_id", values.model_id);
                formData.append("category_id", values.category_id);
                formData.append("price", values.price);
                formData.append("creation_country", values.creation_country);

                // Only append main_photo if it's a new file
                if (values.main_photo instanceof File) {
                  formData.append("main_photo", values.main_photo);
                } else if (values.main_photo === null) {
                  // Handle case when main_photo is removed
                  formData.append("main_photo", "");
                }

                await updateCarParts.mutateAsync({
                  data: formData,
                  id: carParts.id,
                  main_photoUrl:
                    typeof values.main_photo === "string"
                      ? values.main_photo
                      : undefined,
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

export default UpdateCarParts;
