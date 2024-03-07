import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Card,
  CardFooter,
  Button,
  CardBody,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import CustomDialog from "./Dialog";
import Switch from "@mui/material/Switch";
import { useForm, Controller } from "react-hook-form";
import BicepsLogo from "../assets/biceps-svgrepo-com.svg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const EditDialog = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [switchValue, setSwitchValue] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [defaultJoiningDate, setDefaultJoiningDate] = useState(new Date());
  const watchMemberShipDuration = watch("membershipDuration");
  const watchStartDateJoining = watch("startDateJoining");
  const [membershipDuration, setMembershipDuration] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Step 2: Set image file and preview
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        // Step 2: Set image preview
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = () => {
    setChecked(!isChecked);
  };

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const calculateExpiryDate = (joiningDate, duration) => {
    const startDateValue = joiningDate ? new Date(joiningDate) : new Date();
    const expiryDate = new Date(startDateValue);
    expiryDate.setMonth(expiryDate.getMonth() + duration);

    // Use setValue to update the state of startDateExpiry
    setValue("startDateExpiry", expiryDate, { shouldValidate: true });
  };

  useEffect(() => {
    if (membershipDuration && startDate) {
      calculateExpiryDate(startDate, parseInt(membershipDuration));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membershipDuration, startDate]);

  useEffect(() => {
    setMembershipDuration(watch("membershipDuration"));
    setStartDate(watch("startDateJoining"));
  }, [watchMemberShipDuration, watch, watchStartDateJoining]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onSubmit = (data) => {
    handleCloseDialog();
  };

  return (
    <>
      <CustomDialog open={open} handleClose={handleClose}>
        <div className="w-full h-full overflow-y-auto">
          <Card className="w-full flex flex-col gap-2 bg-white  rounded-lg p-3 md:w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardBody className="flex flex-col">
                <Typography
                  variant="h4"
                  className="flex justify-center items-center mb-3 text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  Edit Member
                </Typography>

                <Typography variant="h6">Member Name</Typography>
                <Input
                  size="lg"
                  className={` rounded-lg border border-gray-300  focus:border-black focus:border-2 focus:outline-none ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your Name"
                  {...register("name", { required: "Name is required" })}
                />
                <div style={{ height: "0.5rem" }}>
                  {errors.name && (
                    <p className="text-red-500  text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Typography variant="h6" className="mt-2">
                    Member Email-Id
                  </Typography>
                  <Input
                    size="lg"
                    className={`p-2 rounded-lg border border-gray-300 focus:border-black focus:border-2 focus:outline-none ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your Email"
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                <div>
                  <Typography variant="h6" className="">
                    Mobile No.
                  </Typography>
                  <Input
                    size="lg"
                    className={`p-2 rounded-lg border border-gray-300 focus:border-black focus:border-2 focus:outline-none ${
                      errors.mobile ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your Mobile No."
                    {...register("mobile", {
                      required: "Mobile No. is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "Invalid mobile number (should be of 10 digits)",
                      },
                    })}
                  />
                  <div style={{ height: "0.5rem" }}>
                    {errors.mobile && (
                      <p className="text-red-500 text-sm">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <Typography variant="h6" className="mb-1">
                    Membership Duration
                  </Typography>
                  <FormControl
                    className={`w-full ${
                      errors.membershipDuration ? "border-red-500" : ""
                    }`}
                  >
                    <Select
                      className="h-11"
                      {...register("membershipDuration", {
                        required: "Membership Duration is required",
                      })}
                      MenuProps={{
                        style: {
                          zIndex: 12000,
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Duration
                      </MenuItem>
                      <MenuItem value="1">1 month</MenuItem>
                      <MenuItem value="3">3 months</MenuItem>
                      <MenuItem value="6">6 months</MenuItem>
                      <MenuItem value="12">12 months</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.membershipDuration && (
                    <div style={{ height: "0.5rem" }}>
                      <p className="text-red-500 text-sm">
                        {errors.membershipDuration.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex mb-2 gap-2">
                  <div className=" mt-2 w-1/2">
                    <Typography variant="h6">Date of Joining</Typography>
                    <div className="w-full">
                      <Controller
                        name="startDateJoining"
                        control={control}
                        defaultValue={defaultJoiningDate}
                        rules={{ required: "Date of Joining is required" }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            selected={field.value}
                            onChange={(date) => {
                              setValue("startDateJoining", date, {
                                shouldValidate: true,
                              });
                            }}
                            dateFormat="dd/MM/yyyy"
                            className={`w-full p-2 border rounded-md ${
                              errors.startDateJoining ? "border-red-500" : ""
                            }`}
                            placeholderText="Select Date of Joining"
                            wrapperClassName="w-full"
                          />
                        )}
                      />
                      <div style={{ height: "1.5rem" }}>
                        {errors.startDateJoining && (
                          <p className="text-red-500 text-sm">
                            {errors.startDateJoining.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" mt-2 w-1/2">
                    <Typography variant="h6">Date of expiry</Typography>
                    <div className="w-full">
                      <Controller
                        name="startDateExpiry"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Date of Expiry is required" }}
                        render={({ field }) => {
                          return (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              onChange={(date) => {
                                setValue("startDateExpiry", date, {
                                  shouldValidate: true,
                                });
                              }}
                              dateFormat="dd/MM/yyyy"
                              className={`w-full p-2 border rounded-md ${
                                errors.startDateExpiry ? "border-red-500" : ""
                              }`}
                              placeholderText="Select Date of Expiry"
                              wrapperClassName="w-full"
                            />
                          );
                        }}
                      />
                      <div style={{ height: "0.5rem" }}>
                        {errors.startDateExpiry && (
                          <p className="text-red-500 text-sm">
                            {errors.startDateExpiry.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between  mt-1 gap-2">
                  <div className="flex md:w-1/2 justify-center items-center">
                    {/* Bicep Logo SVG */}
                    <img
                      src={BicepsLogo}
                      alt="Biceps Logo"
                      className={`mr-`}
                      style={{
                        filter: isChecked ? "grayscale(0%)" : "grayscale(100%)",
                        transition: "filter 0.3s",
                      }}
                    />

                    {/* Switch */}
                    <Switch
                      id="custom-switch-component"
                      on={isChecked}
                      onClick={handleChange}
                    />
                  </div>

                  <div className=" md:mb-0 mt-5 md:mr-3">
                    <Typography variant="h6" className="mr-2">
                      Status:
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={isChecked ? "text-green-500" : "text-red-500"}
                    >
                      {isChecked ? "Active" : "Inactive"}
                    </Typography>
                  </div>

                  <div className="w-full mt-3 md:mt-0">
                    <div className="w-full ">
                      <Typography variant="h6">$ Amount</Typography>
                      <Input
                        size="lg"
                        className={`p-2 rounded-lg border border-gray-300 focus:border-black focus:border-2 focus:outline-none ${
                          errors.amount ? "border-red-500" : ""
                        }`}
                        placeholder="Enter Amount"
                        {...register("amount", {
                          pattern: {
                            value: /^\d*\.?\d+$/,
                            message:
                              "Invalid amount. Please enter numbers only.",
                          },
                        })}
                      />
                      {errors.amount && (
                        <div style={{ height: "1rem" }}>
                          <p className="text-red-500 text-sm">
                            {errors.amount.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 mr-4">
                    <label
                      htmlFor="formFile"
                      className="text-gray-900 font-semibold"
                    >
                      Upload Member photo
                    </label>
                    <Controller
                      name="file"
                      control={control}
                      defaultValue={null}
                      rules={{ required: "File is required" }}
                      render={({ field }) => (
                        <input
                          type="file"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            handleImageChange(e); // Call the custom image change handler
                          }}
                          className={`relative block w-full min-w-0 flex-auto border border-solid border-neutral-200 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 rounded-md file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:mb-3 hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary ${
                            errors.file ? "border-red-500" : "" // Added condition here
                          }`}
                          id="formFile"
                        />
                      )}
                    />
                    {errors.file && (
                      <div style={{ height: "0.5rem" }}>
                        <p className="text-red-500 text-sm">
                          {errors.file.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/2">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Member Preview"
                        className="h-16 w-16 ml-2 cursor-pointer rounded-full"
                      />
                    )}
                  </div>
                </div>
              </CardBody>

              <CardFooter className="flex flex-col p-4">
                <Button
                  type="submit"
                  variant="gradient"
                  fullWidth
                  className="p-3 bg-gray-900"
                >
                  update
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </CustomDialog>
    </>
  );
};

export default EditDialog;
