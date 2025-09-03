import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import PopupButton from "../../../../components/PopupButton";
import { useCreateBanner } from "../../../../api/banner";
import BannerForm from "./BannerForm";

const AddBanner = () => {
  const createBanner = useCreateBanner();
  const { t } = useTranslation();
  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Button
          color="error"
          variant="contained"
          onClick={(e) => {
            e.currentTarget.blur();
            requestAnimationFrame(() => {
              handleOpen();
            });
          }}
        >
          {t("forms.create", { types: t("types.banner") })}
        </Button>
      )}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("create_pop.title", { types: t("types.banner") })}
            </DialogTitle>
            <DialogContent>
              <BannerForm
                loadingButtonProps={{
                  loading: createBanner.isPending,
                }}
                initialValues={{
                  photo: null,
                  photo_ar: null,
                  active: 1,
                }}
                onSubmit={async (values) => {
                  await createBanner.mutateAsync(values);
                  handleClose();
                }}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default AddBanner;
