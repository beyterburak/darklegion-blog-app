import { useMantineColorScheme } from "@mantine/core";
import useStore from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useAnalytics } from "../hooks/post-hook";
import { toast, Toaster } from "sonner";
import Stats from "../components/Stats";
import Graph from "../components/Graph";
import clsx from "clsx";
import { RecentFollowerTable, RecentPostTable } from "../components/Table";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();

  const [visible, { toggle }] = useDisclosure(false);
  const theme = colorScheme === "dark";

  const { data, isPending, mutate } = useAnalytics(toast, toggle, user?.token);

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="w-full px-6 py-6">
      {/* İstatistikler */}
      <Stats dt={data} />

      {/* Grafik ve İstatistikler */}
      <div className="w-full py-8">
        <p className={clsx(
          "py-5 text-lg font-semibold",
          theme ? "text-gray-300" : "text-gray-700"
        )}>
          View Stats for Last 28 Days
        </p>
        <Graph dt={data?.viewStats} />
      </div>


      {/* Son Takipçiler & İçerikler */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Son takipçiler */}
        <div className="w-full md:w-1/3">
          <span className={clsx("py-5 text-lg font-semibold", theme ? "text-white" : "text-gray-700")}>
            Recent Followers
          </span>
          <RecentFollowerTable data={data?.last5Followers} theme={theme} />
        </div>

        {/* Son 5 İçerik */}
        <div className="w-full md:w-2/3">
          <span className={clsx("py-5 text-lg font-semibold", theme ? "text-white" : "text-gray-700")}>
            Recent 5 Contents
          </span>
          <RecentPostTable data={data?.last5Posts} theme={theme} />
        </div>
      </div>

      {/* Yükleme Animasyonu */}
      {isPending && <Loading visible={isPending} />}
    </div>
  );
};

export default Dashboard;
