import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  List,
  ListItem,
} from "@material-tailwind/react";

import { BreadcrumbsWithIcon } from "./Breadcrumbs";
import CustomDialog from "./Dialog";
import Sidebar from "./Sidebar";
import {
  RiNotification2Line,
  RiSettings2Line,
  RiProfileLine,
  RiLogoutCircleLine,
  RiMenu3Line,
} from "react-icons/ri";
import { Footer } from "./Footer";

import Settings from "./Settings";
import { useMediaQuery } from "react-responsive";

const Wrapper = (props) => {
  const { activeComponent } = props;

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [isDrawerOpen, setIsDrawerOpen] = useState(isMobile ? false : true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isNotificationPopoverOpen, setIsNotificationPopoverOpen] =
    useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  // const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const sidebarRef = useRef(null);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  // const handleProfileClick = () => {
  //   setIsProfileDialogOpen(true);
  // };
  const handleLogoutClick = () => {};
  const updateDate = () => {
    setCurrentDate(new Date());
  };

  // const handleOpenDialog = () => {
  //   setIsProfileDialogOpen(true);
  // };

  const handleCloseDialog = () => {
    setIsProfileDialogOpen(false);
  };

  // const handleAddUserClick = () => {
  //   handleOpenDialog();
  // };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const toggleSidebar = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSidebarComponentChange = (component) => {
    // setSelectedComponent(component);
    // setIsDrawerOpen(true);
  };

  useEffect(() => {
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const intervalId = setInterval(updateDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isDrawerOpen
      ) {
        closeDrawer();
        closePopover();
      }
    };

    if (isDrawerOpen || isPopoverOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDrawerOpen, isPopoverOpen]);

  // const recentSearches = ["Query 1", "Query 2", "Query 3"];
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];
  return (
    <div>
      <main
        className={`w-full transition-all duration-500
         ${
           isDrawerOpen ? "md:w-[calc(100%-256px)]" : "md:w-full"
         } bg-gray-50 min-h-screen transition-all main `}
        style={{ marginLeft: isDrawerOpen ? "256px" : "0" }}
      >
        <Sidebar
          ref={sidebarRef}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          onComponentChange={handleSidebarComponentChange}
        />

        <div className="py-2 px-2 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 w-full transition-transform duration-200 ">
          <RiMenu3Line
            className="text-3xl cursor-pointer ml-2 "
            onClick={toggleSidebar}
          />

          <div className="ml-2">
            <BreadcrumbsWithIcon
              activeComponent={activeComponent}
              onComponentChange={handleSidebarComponentChange}
            />
          </div>
          <ul className="ml-auto flex items-center gap-4 ">
            <Popover
              placement="bottom-end"
              isOpen={isNotificationPopoverOpen}
              onClickOutside={() => setIsNotificationPopoverOpen(false)}
            >
              <PopoverHandler>
                <button
                  type="button"
                  className="p-2 text-sm font-medium text-center text-black rounded-lg relative"
                >
                  <RiNotification2Line className="w-5 h-5" />
                  <span className="sr-only">Notifications</span>
                  <div className="absolute top-3 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 dark:border-gray-900" />
                </button>
              </PopoverHandler>
              <PopoverContent>
                <div className="text-lg p-4 ">
                  <p className="text-gray-500 text-sm mb-2 font-bold">
                    Notifications:
                  </p>
                  <List>
                    {notifications.map((notification, index) => (
                      <ListItem
                        key={index}
                        className="text-gray-700 cursor-pointer "
                      >
                        {notification}
                      </ListItem>
                    ))}
                  </List>
                </div>
              </PopoverContent>
            </Popover>

            <Popover placement="bottom-end">
              <PopoverHandler>
                <button
                  type="button"
                  className="dropdown-toggle flex items-center"
                  onClick={() => setIsSettingsDialogOpen(true)}
                >
                  <Avatar
                    size="lg"
                    alt="avatar"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30 w-7 h-7"
                  />
                </button>
              </PopoverHandler>
              <PopoverContent>
                <List>
                  <button
                    type="button"
                    onClick={() => setIsProfileDialogOpen(true)}
                    className="text-initial text-blue-gray-500 focus:outline-none transition-all duration-200"
                  >
                    <ListItem>
                      <RiProfileLine className="mr-3 text-lg" />
                      Profile
                    </ListItem>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSettingsDialogOpen(true)}
                    className="text-initial text-blue-gray-500 focus:outline-none"
                  >
                    <ListItem>
                      <RiSettings2Line className="mr-3 text-lg" />
                      Settings
                    </ListItem>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogoutClick()}
                    className="text-initial text-blue-gray-500 focus:outline-none"
                  >
                    <ListItem>
                      <RiLogoutCircleLine className="mr-3 text-lg" />
                      Logout
                    </ListItem>
                  </button>
                </List>
              </PopoverContent>
              <Settings
                open={isSettingsDialogOpen}
                handleClose={() => setIsSettingsDialogOpen(false)}
              />

              {isProfileDialogOpen && (
                <>
                  <CustomDialog
                    open={isProfileDialogOpen}
                    handleClose={handleCloseDialog}
                  >
                    <Card className="w-full md:w-96 rounded-md">
                      <CardHeader floated={false} className="h-80 p-2 ">
                        <img
                          src="https://docs.material-tailwind.com/img/team-3.jpg"
                          alt=""
                          className="rounded-md w-full h-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography
                          variant="h4"
                          color="blue-gray"
                          className="mb-2"
                        >
                          Natalie Paisley
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium"
                          textGradient
                        >
                          nataliepaisley007@gmail.com
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
                    </Card>
                  </CustomDialog>
                </>
              )}
            </Popover>
          </ul>
        </div>
        {props.children}
        <Footer currentDate={currentDate} />
      </main>
    </div>
  );
};

export default Wrapper;
