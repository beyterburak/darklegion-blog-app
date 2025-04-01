import {
  Button,
  Drawer,
  Menu,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import useStore from "../store";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const MobileDrawer = ({ theme }) => {
  const { user } = useStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        classNames={{
          drawer: theme ? "bg-gray-900" : "bg-white", // Drawer arka planı tema uyumlu
        }}
      >
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>

        <Sidebar close={close} />

        <div className="w-full mt-10 ml-4">
          <UserMenu user={user?.user} theme={theme} />
        </div>
      </Drawer>

      <Button
        className={clsx(
          "rounded-full p-2 transition-all duration-300",
          theme ? "text-white bg-gray-800 hover:bg-gray-700" : "text-gray-800 bg-gray-200 hover:bg-gray-300"
        )}
        onClick={open}
      >
        <BiMenu className="text-2xl" />
      </Button>
    </>
  );
};

function UserMenu({ user, theme }) {
  const { signOut } = useStore();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          className={clsx(
            "flex items-center gap-2 rounded-full transition-all duration-300",
            theme
              ? "text-gray-300 hover:bg-gray-700"  // Koyu temada açık renkli yazılar
              : "text-black hover:bg-gray-200"  // Açık temada koyu renkli yazılar
          )}
        >
          <img
            src={user?.image}
            alt="Profile"
            className="w-9 h-9 rounded-full border border-gray-500"
          />
          <div className="flex flex-col items-start ml-1">
            <p className={clsx(
              "font-medium",
              theme ? "text-gray-100" : "text-gray-900"  // Temaya göre yazı rengi
            )}>
              {user?.name}
            </p>
            <span className={clsx(
              "text-sm font-normal",
              theme ? "text-gray-300" : "text-gray-700"  // Temaya göre yazı rengi
            )}>
              {user?.accountType}
            </span>
          </div>
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        classNames={{
          root: theme ? "bg-gray-900 dark:bg-gray-900" : "bg-white dark:bg-gray-800", // Drawer ve Menü Arkaplanı
          label: theme ? "text-gray-100 text-sm font-semibold" : "text-gray-900 text-sm font-semibold", // Menü Başlıkları
          item: theme
            ? "text-gray-200 hover:bg-blue-600 hover:text-white dark:text-gray-300"
            : "text-gray-900 hover:bg-blue-600 hover:text-white dark:text-gray-700",  // Menü öğeleri
          itemActive: theme ? "bg-blue-600 text-white" : "bg-blue-600 text-white", // Aktif öğe
          divider: theme ? "border-gray-700" : "border-gray-300",  // Bölücü
        }}
      >
        <Menu.Label className={clsx(
          theme ? "text-gray-100" : "text-gray-900"
        )}>
          Account
        </Menu.Label>

        <Menu.Item
          leftSection={<FaUser style={{ width: "1rem", height: "1rem" }} />}
          className={clsx(
            "flex items-center gap-3 py-2 px-4 text-sm",
            theme ? "text-gray-100 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-200"
          )}
        >
          Profile
        </Menu.Item>

        <Menu.Item
          leftSection={<AiOutlineLogout style={{ width: "1rem", height: "1rem" }} />}
          onClick={() => handleSignOut()}
          className={clsx(
            "flex items-center gap-3 py-2 px-4 text-sm",
            theme ? "text-gray-100 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-200"
          )}
        >
          Logout
        </Menu.Item>


        <Menu.Divider />

        <Menu.Label className={clsx(
          theme ? "text-gray-100" : "text-gray-900"
        )}>
          Danger Zone
        </Menu.Label>

        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: "1rem", height: "1rem" }} />}
          onClick={() => { /* Delete account logic */ }}
          className="flex items-center gap-3 py-2 px-4 text-sm text-red-500 hover:bg-red-700 hover:text-white"
        >
          Delete Account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

const Navbar = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user, signInModal, setSignInModal } = useStore();
  const location = useLocation();
  const theme = colorScheme === "dark";

  const handleLogin = () => {
    location.pathname === "/auth" && setSignInModal(!signInModal);
  };

  return (
    <div
      className={clsx(
        "w-full fixed top-0 z-50 flex flex-row px-4 md:px-6 py-4 md:py-5 items-center justify-between gap-4 shadow-md transition-all duration-300",
        theme ? "bg-gray-900 shadow-gray-800" : "bg-white shadow-gray-300"
      )}
    >
      {user && (
        <div className="block lg:hidden">
          <MobileDrawer theme={theme} />
        </div>
      )}

      <div className="hidden lg:flex gap-3 pl-12 text-[22px]">
        <Link to="/" className="text-red-500 hover:scale-110 transition-all">
          <FaYoutube />
        </Link>
        <Link to="/" className="text-blue-600 hover:scale-110 transition-all">
          <FaFacebook />
        </Link>
        <Link to="/" className="text-pink-500 hover:scale-110 transition-all">
          <FaInstagram />
        </Link>
        <Link to="/" className="text-blue-400 hover:scale-110 transition-all">
          <FaTwitterSquare />
        </Link>
      </div>

      <Logo />

      <div className="flex gap-14 items-center">
        <div className="flex gap-2 items-center">
          {user?.token ? (
            <UserMenu user={user?.user} theme={theme} />
          ) : (
            <Link
              to="/auth"
              onClick={handleLogin}
              className={clsx(
                "flex items-center gap-2 rounded-full text-base px-3 py-1 transition-all duration-300",
                theme ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"
              )}
            >
              <span>Login</span>
              <MdArrowForward />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
