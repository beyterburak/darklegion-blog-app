import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { BsPencilSquare } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

const mockdata = [
  { icon: IconGauge, label: "Dashboard", to: "dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics", to: "analytics" },
  { icon: IconCalendarStats, label: "Content", to: "contents" },
  { icon: IconUser, label: "Followers", to: "followers" },
  { icon: BsPencilSquare, label: "Create Post", to: "write" },
  { icon: IconSettings, label: "Settings" },
];

const NavbarLink = ({ icon: Icon, label, active, onClick, isDark }) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 100 }}>
      <UnstyledButton
        onClick={onClick}
        className={clsx(
          "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300",
          active
            ? isDark
              ? "bg-gradient-to-r from-purple-600 to-indigo-800 text-white shadow-md"
              : "bg-gradient-to-r from-indigo-500 to-purple-700 text-white shadow-md"
            : isDark
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-200"
        )}
        data-active={active || undefined}
      >
        <Icon
          style={{ width: rem(22), height: rem(22) }}
          stroke={1.5}
          className={isDark ? "text-gray-200" : "text-gray-800"}
        />
        <span className="text-sm font-medium">{label}</span>
      </UnstyledButton>
    </Tooltip>
  );
};

const Sidebar = ({ close = () => { } }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname?.slice(1);

  const handleClick = (to) => {
    close();
    navigate(to);
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={link.to === path}
      onClick={() => handleClick(link.to)}
      isDark={isDark}
    />
  ));

  return (
    <nav
      className={clsx(
        "h-full flex flex-col gap-6 border-r px-4 md:px-6 py-6 transition-all duration-300",
        isDark ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"
      )}
    >
      <Stack justify="center" gap={12}>{links}</Stack>

      <div className="flex justify-center mt-8">
        <ActionIcon
          onClick={() => setColorScheme(isDark ? "light" : "dark")}
          variant="filled"
          size="xl"
          aria-label="Toggle color scheme"
          className={clsx(
            "rounded-full transition-all duration-300",
            isDark
              ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
              : "bg-gray-300 hover:bg-gray-400 text-indigo-600"
          )}
        >
          {isDark ? <IconSun stroke={0.7} /> : <IconMoon stroke={0.7} />}
        </ActionIcon>
      </div>
    </nav>
  );
};

export default Sidebar;
