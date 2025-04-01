import { IconArrowDownRight, IconArrowsDiff, IconArrowUpRight } from "@tabler/icons-react";
import { BsEye, BsPostcardHeart } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { formatNumber } from "../utils";

const icons = {
  user: FaUsersCog,
  view: BsEye,
  post: BsPostcardHeart,
  users: FaUsers,
};

const calculateDiff = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(2);
};

const getPreviousMonthData = (currentDate, history) => {
  if (!currentDate || !history?.length) return null;
  const currentMonth = new Date(currentDate).getMonth();
  const currentYear = new Date(currentDate).getFullYear();
  return history.find(({ date }) => {
    const historyDate = new Date(date);
    return (
      historyDate.getMonth() === (currentMonth === 0 ? 11 : currentMonth - 1) &&
      historyDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear)
    );
  });
};

const Stats = ({ dt, history }) => {
  const prevMonth = getPreviousMonthData(dt?.date, history) || {};
  const data = [
    { title: "Total Post", icon: "post", value: dt?.totalPosts ?? 0, diff: calculateDiff(dt?.totalPosts ?? 0, prevMonth?.totalPosts ?? 0) },
    { title: "Followers", icon: "users", value: dt?.followers ?? 0, diff: calculateDiff(dt?.followers ?? 0, prevMonth?.followers ?? 0) },
    { title: "Total Views", icon: "view", value: dt?.totalViews ?? 0, diff: calculateDiff(dt?.totalViews ?? 0, prevMonth?.totalViews ?? 0) },
    { title: "Total Writers", icon: "user", value: dt?.totalWriters ?? 0, diff: calculateDiff(dt?.totalWriters ?? 0, prevMonth?.totalWriters ?? 0) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff === 0 ? IconArrowsDiff : stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
        return (
          <div
            key={stat.title}
            className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</h3>
              <Icon className="text-gray-500 dark:text-gray-400" size={24} />
            </div>
            <div className="flex items-end gap-2 mt-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatNumber(stat.value)}</p>
              <span
                className={
                  stat.diff === 0
                    ? "text-orange-500"
                    : stat.diff > 0
                      ? "text-green-500"
                      : "text-red-500"
                }
              >
                {stat.diff}%
              </span>
              <DiffIcon
                size={16}
                className={
                  stat.diff === 0
                    ? "text-orange-500"
                    : stat.diff > 0
                      ? "text-green-500"
                      : "text-red-500"
                }
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Compare to previous month</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
