import PopupButton from "../../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useUpdateBrand } from "../../../../api/brands/index";
import { useTranslation } from "react-i18next";
import BrandForm from "./BrandForm";

const UpdateBrand = ({ brand }) => {
  const updateBrand = useUpdateBrand();
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
            {t("edit_pop.title", { thetypes: t("thetypes.brand") })}
          </DialogTitle>
          <DialogContent>
            <BrandForm
              isPopup
              initialValues={{
                name: brand.name,
                name_ar: brand.name_ar,
                logo: brand.logo,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateBrand.isPending,
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("name_ar", values.name_ar);

                // Only append logo if it's a new file
                if (values.logo instanceof File) {
                  formData.append("logo", values.logo);
                } else if (values.logo === null) {
                  // Handle case when logo is removed
                  formData.append("logo", "");
                }

                await updateBrand.mutateAsync({
                  data: formData,
                  id: brand.id,
                  logoUrl:
                    typeof values.logo === "string" ? values.logo : undefined,
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

export default UpdateBrand;
