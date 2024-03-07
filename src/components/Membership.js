import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import EditDialog from "./Edit";
import DeleteDialog from "./Delete";
import "react-datepicker/dist/react-datepicker.css";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import BicepsLogo from "../assets/biceps-svgrepo-com.svg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  Tab,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import Wrapper from "./Wrapper";
import CustomDialog from "./Dialog";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { RiSearch2Line, RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "InActive",
    value: "InActive",
  },
];

const TABLE_HEAD = [
  "Member",
  "Mobile No.",
  "Status",
  "Date of Joining",
  "Date of Expiry",
  "Action",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    Number: "9425654545",
    Active: true,
    date: "23/04/18",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "23/04/18",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "19/09/17",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    Number: "9425654545",
    Active: true,
    date: "24/12/08",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "04/10/21",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    Number: "9425654545",
    Active: true,
    date: "24/12/08",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "04/10/21",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "19/09/17",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    Number: "9425654545",
    Active: true,
    date: "24/12/08",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "04/10/21",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    Number: "9425654545",
    Active: true,
    date: "24/12/08",
    expiryDate: "23/07/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    Number: "9425654545",
    Active: false,
    date: "04/10/21",
    expiryDate: "23/07/18",
  },
];

const Membership = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },

    watch,
  } = useForm();
  const activeTab = "all";
  // const [switchValue, setSwitchValue] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [defaultJoiningDate, setDefaultJoiningDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [membershipDuration, setMembershipDuration] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const watchMemberShipDuration = watch("membershipDuration");
  const watchStartDateJoining = watch("startDateJoining");
  const [isChecked, setChecked] = useState(false);
  const [ setImageFile] = useState(null);
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

  // const handleSwitchChange = () => {
  //   setSwitchValue(!switchValue);
  // };

  const handleOpenDialog = () => {
    // Set the default joining date to the current date when the dialog is opened
    setDefaultJoiningDate(new Date());
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Function to open the Edit dialog
  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  // Function to close the Edit dialog
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddMemberClick = () => {
    handleOpenDialog();
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

  const onSubmit = (data) => {
    handleCloseDialog();
  };

  return (
    <Wrapper
      className="flex justify-center items-center"
      activeComponent="membership"
    >
      <Card className="w-full px-4  mt-3 py-3 ">
        <CardHeader>
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="mr-auto ml-5 md:mr-6 md:ml-5">
              <Typography className="text-black font-semibold text-2xl md:text-3xl lg:text-3xl mb-2 md:mb-0">
                Members list
              </Typography>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 ml-auto mr-5 md:ml-6 md:mr-5">
              <Button
                onClick={handleAddMemberClick}
                className="flex items-center gap-2"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Add member
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} className="w-full">
            <div className="flex flex-row justify-between items-center">
              <div className="md:w-72 flex flex-row mb-2 md:mb-0">
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="bg-gray-100 p-2 relative custom-tab"
                  >
                    <div className="z-10">{label}</div>
                    <div className="z-20 absolute top-0 left-0 "></div>
                  </Tab>
                ))}
              </div>
              <div className="md:flex items-center ml-6 ">
                <Input
                  size="md"
                  className="rounded-md pl-7 p-2 md:pr-3"
                  icon={
                    <RiSearch2Line className="text-lg absolute ml-2 mt-2" />
                  }
                />
              </div>
            </div>
          </Tabs>
        </CardHeader>

        <CardBody className="px-0">
          <div style={{ maxHeight: "415px", overflow: "auto" }}>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}
                        {index !== TABLE_HEAD.length - 1 && (
                          <Tooltip content={`Sort by ${head}`} className="p-2">
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          </Tooltip>
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.slice(0, 10).map(
                  (
                    { img, name, email, Number, Active, date, expiryDate },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-2 sm:p-4"
                      : "p-2 sm:p-4 border-b border-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={img}
                              alt={name}
                              size="sm"
                              className="h-8 w-8"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex flex-row font-normal"
                              >
                                {name}
                                {Active && (
                                  <Tooltip
                                    content="Personal Training"
                                    className="p-2"
                                  >
                                    <span>
                                      <img
                                        src={BicepsLogo}
                                        alt="Active Member Logo"
                                        className="h-4 cursor-pointer w-4 ml-2 "
                                      />
                                    </span>
                                  </Tooltip>
                                )}
                              </Typography>

                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal cursor-pointer p-1 "
                          >
                            {Number}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={Active ? "Active" : "InActive"}
                              className={`${
                                Active
                                  ? "bg-green-200 text-green-900"
                                  : "bg-gray-200 text-gray-900"
                              } px-2 py-1 `}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {expiryDate}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className="flex gap-5">
                            <Tooltip content="Edit" className="p-2">
                              <button onClick={handleOpenEditDialog}>
                                <span>
                                  <RiPencilLine className="text-blue-500 cursor-pointer transition duration-300 hover:ring-2 hover:ring-blue-500" />
                                </span>
                              </button>
                            </Tooltip>

                            <Tooltip content="Delete" className="p-2">
                              <button onClick={handleOpenDeleteDialog}>
                                <span>
                                  <RiDeleteBinLine className="text-red-500 cursor-pointer transition duration-300 hover:ring-2 hover:ring-red-500" />
                                </span>
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <>
        <CustomDialog open={isDialogOpen} handleClose={handleCloseDialog}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 bg-white rounded-lg p-4 md:p-8">
              <Typography
                variant="h4"
                className="flex justify-center items-center mb-2 text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                Add Member
              </Typography>
              <div>
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
                      message: "Invalid mobile number (should be of 10 digits)",
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
                    <div style={{ height: "0.5rem" }}>
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

              <div className="flex flex-row justify-between ">
                <div className="flex w-1/2  justify-center items-center">
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
                <div className="w-1/2 mt-3">
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
                        message: "Invalid amount. Please enter numbers only.",
                      },
                    })}
                  />
                  {errors.amount && (
                    <div style={{ height: "0.5rem" }}>
                      <p className="text-red-500 text-sm">
                        {errors.amount.message}
                      </p>
                    </div>
                  )}
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
            </div>

            <CardFooter className="flex flex-col p-4">
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                className="p-3 bg-gray-900"
              >
                Add
              </Button>
            </CardFooter>
          </form>
        </CustomDialog>
      </>
      <DeleteDialog
        open={isDeleteDialogOpen}
        handleClose={handleCloseDeleteDialog}
      />
      <EditDialog open={isEditDialogOpen} handleClose={handleCloseEditDialog} />
    </Wrapper>
  );
};
export default Membership;
