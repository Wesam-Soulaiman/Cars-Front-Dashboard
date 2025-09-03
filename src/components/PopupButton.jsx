import { Button, Slide } from "@mui/material";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupButton = ({
  title,
  buttonProps,
  ButtonComponentRender,
  DialogRender,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dialogProps = {
    open,
    onClose: handleClose,
    TransitionComponent: Transition,
    transitionDuration: 500,
  };

  return (
    <>
      {ButtonComponentRender ? (
        ButtonComponentRender({ handleClose, handleOpen })
      ) : (
        <Button variant="outlined" onClick={handleOpen} {...buttonProps}>
          {title}
        </Button>
      )}

      {DialogRender
        ? DialogRender({ handleClose, handleOpen, props: dialogProps })
        : null}
    </>
  );
};

export default PopupButton;
