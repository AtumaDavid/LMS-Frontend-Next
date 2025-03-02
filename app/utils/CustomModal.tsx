import React from "react";
import { Box, Modal } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  component: React.ElementType<{
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
  }>;
  setRoute: (route: string) => void;
};

export default function CustomModal({
  open,
  setOpen,
  // activeItem,
  component: Component,
  setRoute,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "450px",
          bgcolor: "white",
          dark: "bg-slate-900",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          p: 4,
          outline: "none",
        }}
      > */}
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} />
        {/* {React.createElement(Component, { setOpen, setRoute })} */}
      </Box>
    </Modal>
  );
}
