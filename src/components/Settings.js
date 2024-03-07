import React, { useState } from "react";
import {
  CardBody,
  Typography,
  Input,
  Card,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import CustomDialog from "./Dialog";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Tooltip } from "@material-tailwind/react";

const Settings = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "newPassword") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    } else if (field === "OldPassword") {
      setShowOldPassword(!showOldPassword);
    }
  };

  const onSubmit = (data) => {
    // Perform validation and update logic
    console.log(data);

    // Reset form fields
    handleClose();
  };

  return (
    <>
      <CustomDialog open={open} handleClose={handleClose}>
        <Card maxWidth="md" className="w-full md:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="flex flex-col">
              <Typography
                variant="h4"
                className="flex justify-center items-center text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                Settings
              </Typography>

              {/* Name Input */}
              <div className="flex flex-col text-black py-2">
                <Typography className="-mb-2" variant="h6">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  className={`p-2 rounded-lg border border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your Name"
                  {...register("name", { required: "Name is required" })}
                />
                <div style={{ height: "0.5rem" }}>
                  {errors.name && (
                    <Tooltip content={errors.name.message} position="bottom">
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="flex flex-col text-black py-2">
                <Typography className="-mb-2" variant="h6">
                  Your Email-Id
                </Typography>
                <Input
                  size="lg"
                  className={`p-2 rounded-lg border border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
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
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* Old Password Input */}
              <div className="flex flex-col mb-2 text-black py-2 relative">
                <Typography className="-mb-2" variant="h6">
                  Old Password
                </Typography>
                <Input
                  size="lg"
                  className={`rounded-lg border p-2 border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
                    errors.oldPassword ? "border-red-500 " : ""
                  }`}
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("OldPassword")}
                >
                  {showOldPassword ? (
                    <span>
                      <RiEyeFill className=" mt-5 text-gray-500" />
                    </span>
                  ) : (
                    <span>
                      <RiEyeCloseFill className=" mt-5 text-gray-500" />
                    </span>
                  )}
                </span>
                <div style={{ height: "0.5rem" }}>
                  {errors.oldPassword && (
                    <Tooltip
                      content={errors.oldPassword.message}
                      position="bottom"
                    >
                      <p className="text-red-500 text-sm">
                        {errors.oldPassword.message}
                      </p>
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* New Password Input */}
              <div className="flex flex-col mb-2 text-black py-2 relative">
                <Typography className="-mb-2" variant="h6">
                  New Password
                </Typography>
                <Input
                  size="lg"
                  className={`rounded-lg border p-2 border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
                    errors.newPassword ? "border-red-500 " : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your New password"
                  {...register("newPassword", {
                    required: "New Password is required",
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
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword ? (
                    <span>
                      <RiEyeFill className=" mt-3 text-gray-500" />
                    </span>
                  ) : (
                    <span>
                      <RiEyeCloseFill className=" mt-3 text-gray-500" />
                    </span>
                  )}
                </span>
                <div style={{ height: "1.2rem" }}>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="flex flex-col text-black mt-3 py-2 relative">
                <Typography className="-mb-2" variant="h6">
                  Confirm Password
                </Typography>
                <Input
                  size="lg"
                  className={`rounded-lg border p-2 border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
                    errors.confirmPassword ? "border-red-500 " : ""
                  }`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your New password"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-10"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? (
                    <span>
                      <RiEyeFill className="mt-5 text-gray-500" />
                    </span>
                  ) : (
                    <span>
                      <RiEyeCloseFill className="mt-5 text-gray-500" />
                    </span>
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
            </CardBody>
            <CardFooter className="flex -mt-8 flex-col">
              <Button
                variant="gradient"
                fullWidth
                className="p-3 bg-gray-900"
                type="submit"
              >
                Update
              </Button>
            </CardFooter>
          </form>
        </Card>
      </CustomDialog>
    </>
  );
};

export default Settings;
