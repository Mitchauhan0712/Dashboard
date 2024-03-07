import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";
import Wrapper from "./Wrapper";
import { useForm } from "react-hook-form";
import {
  RiPencilLine,
  RiDeleteBinLine,
  RiSearch2Line,
  RiEyeFill,
  RiEyeCloseFill,
} from "react-icons/ri";
import CustomDialog from "./Dialog";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Name", "Date", "Action"];
const TOTAL_PAGES = 10;

const TABLE_ROWS = [
  {
    name: "John Michael",
    date: "23/04/18",
  },
  {
    name: "Alex Liras",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    date: "04/10/21",
  },
  {
    name: "John Michael",
    date: "23/04/18",
  },
  {
    name: "Alex Liras",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    date: "04/10/21",
  },
  {
    name: "John Michael",
    date: "23/04/18",
  },
  {
    name: "John Michael",
    date: "23/04/18",
  },
];

const SimplePagination = ({ active, onNext, onPrev }) => {
  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={onPrev}
        disabled={active === 1}
        className="flex-shrink-0"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <div className="flex-grow flex justify-center">
        <Typography color="gray" className="font-normal text-center">
          Page <strong className="text-gray-900">{active}</strong> of{" "}
          <strong className="text-gray-900">10</strong>
        </Typography>
      </div>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={onNext}
        disabled={active === 10}
        className="flex-shrink-0"
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

const User = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [activePage, setActivePage] = React.useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleNextPage = () => {
    if (activePage < TOTAL_PAGES) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddUserClick = () => {
    handleOpenDialog();
  };

  const onSubmit = (data) => {
    console.log(data);
    handleCloseDialog();
  };

  // const filteredRows = TABLE_ROWS.filter((row) =>
  //   Object.values(row).some((value) =>
  //     value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  return (
    <Wrapper className="h-full  overflow-hidden" activeComponent="user">
      <Card className="w-full mb-3  h-full ">
        <div className="flex flex-col md:flex-row  p-4 h-full ">
          <div className="w-full p-2 md:w-72 relative">
            <RiSearch2Line className="absolute ml-2  mt-3" />
            <Input
              type="text"
              value={searchQuery}
              className="p-2 rounded-md pl-10 w-full md:w-72"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="ml-auto">
            <Button
              onClick={handleAddUserClick}
              className="flex items-center gap-3 flex-shrink-0"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-5 w-5" /> Add User
            </Button>
          </div>
        </div>
        <div style={{ maxHeight: "520px", overflow: "auto" }}>
          <table className="w-full min-w-max h-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-r border-gray-100 p-4 font-bold text-center"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="border-b border-r rounded-md p-4 font-bold text-center"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4 border-b border-r border-blue-gray-100 text-center"
                  : "p-4 border-b border-r border-blue-gray-50 text-center";

                return (
                  <tr key={name} className={classes}>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Tooltip content="Date" className="p-2">
                          <span className="flex justify-center">{date}</span>
                        </Tooltip>
                      </Typography>
                    </td>
                    <td colSpan="2" className={`${classes} bg-blue-gray-50/50`}>
                      <div className="flex justify-center gap-8">
                        <Tooltip content="Edit" className="p-2">
                          <span>
                            <RiPencilLine className="text-blue-500 cursor-pointer transition duration-300 hover:ring-2 hover:ring-blue-500" />
                          </span>
                        </Tooltip>
                        <Tooltip content="Delete" className="p-2">
                          <span>
                            <RiDeleteBinLine className="text-red-500 cursor-pointer transition duration-300 hover:ring-2 hover:ring-red-500" />
                          </span>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex  justify-center mt-2 mb-2">
          <SimplePagination
            active={activePage}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        </div>
      </Card>

      <>
        <CustomDialog open={isDialogOpen} handleClose={handleCloseDialog}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card maxWidth="md" className="w-full md:w-96">
              <CardBody className="flex flex-col">
                <Typography
                  variant="h4"
                  className="flex justify-center items-center text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  Add User
                </Typography>

                <div className="flex flex-col mb-2 text-black py-2">
                  <Typography variant="h6">Your Name</Typography>
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
                      <Tooltip content={errors.name.message} position="bottom">
                        <p className="text-red-500  text-sm">
                          {errors.name.message}
                        </p>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-black">
                  <Typography variant="h6">Your Email-Id</Typography>
                  <Input
                    size="lg"
                    className={`p-2 rounded-lg border border-gray-300  focus:border-black focus:border-2 focus:outline-none ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <div style={{ height: "0.5rem" }}>
                    {errors.email && (
                      <Tooltip content={errors.email.message} position="bottom">
                        <p className="text-red-500  text-sm">
                          {errors.email.message}
                        </p>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col   text-black py-4 relative">
                    <Typography variant="h6">Password</Typography>
                    <Input
                      size="lg"
                      className={`rounded-lg border  border-gray-300  focus:border-black focus:border-2 focus:outline-none ${
                        errors.Password ? "border-red-500 " : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("Password", {
                        required: " Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                        },
                      })}
                    />
                    <span
                      className="absolute top-1/2 right-2 transform mt-2 -translate-y-1/2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      {showPassword ? (
                        <span>
                          <RiEyeFill className="  text-gray-500" />
                        </span>
                      ) : (
                        <span>
                          <RiEyeCloseFill className=" text-gray-500" />
                        </span>
                      )}
                    </span>
                    <div style={{ height: "0.5rem" }}>
                      {errors.Password && (
                        <p className="text-red-500 text-sm">
                          {errors.Password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full mt-4  relative">
                    <Typography variant="h6">Confirm Password</Typography>
                    <Input
                      size="lg"
                      className={`rounded-lg border border-gray-300 focus:border-black focus:border-2 focus:outline-none ${
                        errors.confirmPassword ? "border-red-500 " : ""
                      }`}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your New password"
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === watch("Password") ||
                          "Passwords do not match",
                      })}
                    />
                    <span
                      className="absolute top-1/2 right-2 transform mt-2 -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      {showConfirmPassword ? (
                        <RiEyeFill className="text-gray-500" />
                      ) : (
                        <RiEyeCloseFill className="text-gray-500" />
                      )}
                    </span>
                    <div style={{ height: "0.5rem" }}>
                      {errors.confirmPassword && (
                        <Tooltip
                          content={errors.confirmPassword.message}
                          position="bottom"
                        >
                          <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                          </p>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="-mt-4">
                <Button
                  type="submit"
                  variant="gradient"
                  fullWidth
                  className="p-3 bg-gray-900"
                >
                  Add
                </Button>
              </CardFooter>
            </Card>
          </form>
        </CustomDialog>
      </>
    </Wrapper>
  );
};

export default User;
