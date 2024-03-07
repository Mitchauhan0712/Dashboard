import React, { useState, useEffect } from "react";
import { RiFileCopy2Line, RiCheckLine } from "react-icons/ri";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import ClipboardJS from "clipboard";

const TABS = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "Expired",
    value: "Expired",
  },
];

const TABLE_HEAD = ["Member", "Mobile No.", "Message", "Actions"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    Number: "9425654545",
    message:
      "Darsh Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam eligendi tempore consectetur, voluptates dolore inventore nobis deserunt suscipit cumque ut, ipsum exercitationem. Architecto esse explicabo aut ducimus. Quo, sed magni!",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    Number: "9425654545",
    message:
      "Second User Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    Number: "9425654545",
    message:
      "Third User Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    Number: "9425654545",
    message:
      "Fourth User Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    Number: "9425654545",
    message:
      "Fifth User Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const ulStyles = {};
const truncateMessage = (message, maxLength) => {
  if (message.length <= maxLength) {
    return message;
  }

  const truncatedMessage = message.substr(0, maxLength);
  return `${truncatedMessage}...`;
};

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("New");
  const [copied, setCopied] = useState(false);
  const [copiedIcons, setCopiedIcons] = useState(
    Array(TABLE_ROWS.length).fill(false)
  );

  useEffect(() => {
    new ClipboardJS(".copy-message");
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const copyToClipboard = (message, index) => {
    const textarea = document.createElement("textarea");
    textarea.value = message;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const newCopiedIcons = [...copiedIcons];
    newCopiedIcons[index] = true;
    setCopiedIcons(newCopiedIcons);

    setCopiedIcons((prevCopiedIcons) => {
      const newCopiedIcons = [...prevCopiedIcons];
      newCopiedIcons[index] = true;
      return newCopiedIcons;
    });

    setCopied(true);

    setTimeout(() => {
      setCopiedIcons((prevCopiedIcons) => {
        const resetCopiedIcons = [...prevCopiedIcons];
        resetCopiedIcons[index] = false;
        return resetCopiedIcons;
      });
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">10</div>
              <div className="text-sm font-medium text-gray-400">
                Active orders
              </div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill"></i>
              </button>
              <ul
                className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                data-popper-id="popper-3"
                data-popper-placement="bottom-start"
                style={{
                  position: "absolute",
                  inset: "0 auto auto 0",
                  margin: 0,
                  transform: "translate3d(159.2px, 128.8px, 0px)",
                }}
                data-popper-reference-hidden=""
                data-popper-escaped=""
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-100 rounded-full h-4">
              <div
                className="h-full bg-blue-500 rounded-full p-1"
                style={{ width: "60%" }}
              >
                <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600 ml-4">60%</span>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">324</div>
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                  +30%
                </div>
              </div>
              <div className="text-sm font-medium text-gray-400">Visitors</div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill"></i>
              </button>
              <ul
                className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                data-popper-id="popper-4"
                data-popper-placement="bottom-start"
                style={{
                  position: "absolute",
                  inset: "0px auto auto 0px",
                  margin: 0,
                  transform: "translate3d(212px, 322.4px, 0px)",
                }}
                data-popper-reference-hidden=""
                data-popper-escaped=""
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="w-8 h-8 rounded-full object-cover block"
            />
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="w-8 h-8 rounded-full object-cover block -ml-3"
            />
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="w-8 h-8 rounded-full object-cover block -ml-3"
            />
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="w-8 h-8 rounded-full object-cover block -ml-3"
            />
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="w-8 h-8 rounded-full object-cover block -ml-3"
            />
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">
                <span className="text-base font-normal text-gray-400 align-top">
                  $
                </span>
                2,345
              </div>
              <div className="text-sm font-medium text-gray-400">
                Active orders
              </div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill"></i>
              </button>
              <ul
                className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                data-popper-id="popper-5"
                data-popper-placement="bottom-start"
                style={{
                  position: "absolute",
                  inset: "0 auto auto 0",
                  margin: 0,
                  transform: "translate3d(194.4px, 500px, 0px)",
                }}
                data-popper-reference-hidden=""
                data-popper-escaped=""
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="#"
            className="text-blue-500 font-medium text-sm hover:text-blue-600"
          >
            View details
          </a>
        </div>
      </div>
      <div class="grid grid-cols-1  md:grid-flow-col mb-6 gap-4">
        <div>
          <Card className="h-full p-3 rounded-md w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Members Update
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
                  </div>
                </Tabs>
              </div>
            </CardHeader>
            <CardBody className="overflow-auto px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(
                    ({ img, name, email, Number, message }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      const truncatedMessage = truncateMessage(message, 30);

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
                                  className="font-normal"
                                >
                                  {name}
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
                            <div className="flex cursor-pointer flex-col">
                              <Tooltip
                                content={
                                  <div style={{ maxWidth: "300px" }}>
                                    {message}
                                  </div>
                                }
                                position="top"
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {truncatedMessage}
                                </Typography>
                              </Tooltip>
                            </div>
                          </td>

                          <td className={classes}>
                            <Tooltip
                              content={copied ? "Copied!" : "Copy Message"}
                              className=""
                            >
                              <span
                                onClick={() => copyToClipboard(message)}
                                className="copy-message"
                              >
                                {copiedIcons[index] ? (
                                  <RiCheckLine className="h-4 cursor-pointer w-4" />
                                ) : (
                                  <RiFileCopy2Line className="h-4 cursor-pointer w-4" />
                                )}
                              </span>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
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
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">Order Statistics</div>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill"></i>
              </button>
              <ul
                className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                data-popper-id="popper-13"
                data-popper-placement="top-start"
                style={{
                  position: "absolute",
                  inset: "auto auto 0 0",
                  margin: "0",
                  transform: "translate3d(187.2px, 892.8px, 0px)",
                }}
                data-popper-reference-hidden=""
                data-popper-escaped=""
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="rounded-md border border-dashed border-gray-200 p-4">
              <div className="flex items-center mb-0.5">
                <div className="text-xl font-semibold">10</div>
                <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                  $80
                </span>
              </div>
              <span className="text-gray-400 text-sm">Active</span>
            </div>
            <div className="rounded-md border border-dashed border-gray-200 p-4">
              <div className="flex items-center mb-0.5">
                <div className="text-xl font-semibold">50</div>
                <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                  +$469
                </span>
              </div>
              <span className="text-gray-400 text-sm">Completed</span>
            </div>
            <div className="rounded-md border border-dashed border-gray-200 p-4">
              <div className="flex items-center mb-0.5">
                <div className="text-xl font-semibold">4</div>
                <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
                  -$130
                </span>
              </div>
              <span className="text-gray-400 text-sm">Canceled</span>
            </div>
          </div>
          <div>
            <div className="p-4">
              <canvas
                id="order-chart"
                width="47"
                height="23"
                className="block border-box h-19 w-38"
              ></canvas>
            </div>
          </div>
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="flex justify-between mb-4 items-start">
              <div className="font-medium">Earnings</div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-more-fill"></i>
                </button>
                <ul
                  className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                  data-popper-id="popper-14"
                  data-popper-placement="top-start"
                  style={ulStyles}
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                >
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px]">
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Service
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Earning
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
