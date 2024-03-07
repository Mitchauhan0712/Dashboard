import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import loginImg from "../assets/anastase-maragos-ehQimz6-1qM-unsplash.jpg";
import { Tooltip } from "@material-tailwind/react";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const redirectToDashboard = () => {
    navigate("/Dashboard");
  };

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
    redirectToDashboard();
  };

  return (
    <div className="grid grid-cols-1 transition-all duration-500 sm:grid-cols-3 gap-none h-screen w-full ">
      {/* Content for the left side */}
      <div className="col-span-2 sm:col-span-2 flex flex-col h-full max-h-full w-full justify-center items-center ">
        <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center p-4 sm:p-8">
          <div className="max-w-[400px] w-full h-center  mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl sm:text-4xl font-bold text-center text-black dark:text-black">
                Sign In
              </h2>
              <p className="items-center mt-3 mb-4 ml-0 sm:ml-4 sm:mt-6 sm:mb-6">
                Enter your Email and Password to Sign In
              </p>

              {/* Email Input */}
              <div className="flex flex-col text-black py-2">
                <label className="text-black ">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`p-2 rounded-lg border border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  placeholder="abc@gmail.com"
                />
                <div
                  style={{ height: "0.5rem" }}
                  className={`${errors.email && "visible"}`}
                >
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col text-black py-2 relative">
                <label className="text-black">Password</label>
                <input
                  {...register("password", {
                    required: "Password is required",
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
                  className={`rounded-lg border p-2 border-gray-300 mt-2 focus:border-black focus:border-2 focus:outline-none ${
                    errors.password ? "border-red-500 " : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Tooltip
                      content="Hide password"
                      position="top"
                      className="p-2"
                    >
                      <span>
                        <RiEyeFill className=" mt-5 text-gray-500" />
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      content="Show password"
                      position="top"
                      className="p-2"
                    >
                      <span>
                        <RiEyeCloseFill className=" mt-5 text-gray-500" />
                      </span>
                    </Tooltip>
                  )}
                </span>
                <div
                  style={{ height: "0.5rem" }}
                  className={`${errors.password && "visible"}`}
                >
                  {errors.password && (
                    <Tooltip
                      content={errors.password.message}
                      position="bottom"
                    >
                      <p className="text-red-500 text-sm">
                        Password is Invalid
                      </p>
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* Sign In Button */}
              <div className="mt-4 flex flex-col gap-y-2">
                <button
                  type="submit"
                  className="w-full my-2 py-2 bg-black hover:shadow-lg text-white font-semibold rounded-lg"
                >
                  Sign In
                </button>

                <p className="text-center  text-gray-400 text-sm sm:text-base">
                  Not registered?
                  <Link
                    className="text-black hover:underline"
                    to={`/registration`}
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Content for the right side */}
      <div className="col-span-1 ">
        <div className="flex  justify-center h-full overflow-hidden  ">
          <img
            style={{ width: "100%", height: "100%" }}
            src={loginImg}
            alt=""
            className="object-cover sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
