import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type TDialogHeader = {
  children: React.ReactNode;
  handleClose: () => void;
};
export const DialogHeader = (props: TDialogHeader) => {
  const { handleClose, children } = props;
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {children}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
};

type TDialogFooter = {
  children: React.ReactNode;
};
export const DialogFooter = (props: TDialogFooter) => {
  const { children } = props;
  return <DialogActions>{children}</DialogActions>;
};
type TCustomizedDialog = {
  open: boolean;
  children: React.ReactNode;
  handleClose: (...params: any[]) => void;
};
export function CustomizedDialog(props: TCustomizedDialog) {
  const { handleClose, children, open, ...rest } = props;
  return (
    <BootstrapDialog onClose={handleClose} open={open} PaperProps={{
      sx: {
        maxHeight: '100%'
      }
    }} {...rest}>
      {children}
    </BootstrapDialog>
  );
}

type TDialogBody = DialogContentProps & {
  children: React.ReactNode;
};
export function DialogBody({ children, sx, ...rest }: TDialogBody) {
  return (
    <DialogContent {...rest} dividers sx={{ maxHeight: "550px", ...sx }}>
      {children}
    </DialogContent>
  );
}
