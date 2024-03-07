import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import CustomDialog from "./Dialog";

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <>
      <CustomDialog open={open} handleClose={handleClose}>
        <Card className="w-full transition-all ease-in-out md:w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Are you sure you want to Delete Member?
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex flex-col md:flex-row md:justify-end gap-2">
            <Button
              onClick={handleClose}
              className="p-2 w-full md:w-auto md:order-2"
            >
              Delete
            </Button>
            <Button className="p-2 md:mr-2 bg-gray-400 w-full md:w-auto md:order-1">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </CustomDialog>
    </>
  );
};

export default DeleteDialog;
