import React from "react";
import { Dialog as TailwindDialog, Card } from "@material-tailwind/react";

const CustomDialog = ({ open, handleClose, children }) => {
  const handleOverlayClick = (e) => {
    handleClose();
  };

  return (
    <div onClick={handleClose}>
      <TailwindDialog
        size="xs"
        open={open}
        handler={handleClose}
        onOverlayClick={handleOverlayClick}
        className="bg-transparent fixed inset-0 flex items-center justify-center"
        style={{ backdropFilter: "blur(5px)", zIndex: 9999 }}
      >
        <div className="max-w-[22rem] md:max-w-[30rem] lg:max-w-[38rem] xl:max-w-[54rem] mx-auto">
          <Card
            className="flex flex-col bg-white rounded-lg ring-2 ring-gray-200 ring-opacity-50 hover:ring-opacity-100 transition duration-300 overflow-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 10000, maxHeight: "90vh" }}
          >
            {children}
          </Card>
        </div>
      </TailwindDialog>
    </div>
  );
};

export default CustomDialog;
