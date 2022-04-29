import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export interface SimpleDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: (value: string) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, children, title } = props;

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}
