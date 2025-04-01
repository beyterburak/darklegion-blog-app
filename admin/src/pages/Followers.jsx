import { Pagination, Table, useMantineColorScheme } from "@mantine/core";
import useStore from "../store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useFollowers } from "../hooks/followers-hook";
import { toast, Toaster } from "sonner";
import { formatNumber, getInitials, updateURL } from "../utils";
import Loading from "../components/Loading";
import moment from "moment";

const Followers = () => {
  const { colorScheme } = useMantineColorScheme();

  const { user } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [visible, { toggle }] = useDisclosure(false);
  const { data, isPending, mutate } = useFollowers(toast, toggle, user?.token);
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const theme = colorScheme === "dark";

  useEffect(() => {
    const fetchFollowers = () => {
      updateURL({ page, navigate, location });
      mutate(page);
    };

    fetchFollowers();
  }, [page]);

  return (
    <div className='w-full flex flex-col'>
      <p
        className={`${theme ? "text-white" : "text-slate-700"
          } text-lg pb-1 font-semibold `}
      >
        Followers (
        <span className='text-sm'>
          {data?.data?.length * data?.page + " of " + data?.total + " records"}
        </span>
        )
      </p>

      <Table highlightOnHover withTableBorder className='flex-1'>
        <Table.Thead>
          <Table.Tr className={theme ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}>
            <Table.Th className="text-lg font-semibold">Image</Table.Th>
            <Table.Th className="text-lg font-semibold">Name</Table.Th>
            <Table.Th className="text-lg font-semibold">Account</Table.Th>
            <Table.Th className="text-lg font-semibold">Followers</Table.Th>
            <Table.Th className="text-lg font-semibold">Joined Date</Table.Th>
          </Table.Tr>
        </Table.Thead>


        <Table.Tbody>
          {data?.data?.map(({ _id, followerId, createdAt }) => (
            <Table.Tr key={_id} className={theme ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"}>
              <Table.Td className="flex gap-2 items-center">
                {followerId.image ? (
                  <img
                    src={followerId.image}
                    alt={followerId.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <p className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-700 text-white text-xl">
                    {getInitials(followerId.name)}
                  </p>
                )}
              </Table.Td>

              <Table.Td>
                <p className="text-base font-medium">{followerId.name}</p>
                <span className="text-sm font-medium text-purple-700">{followerId?.email}</span>
              </Table.Td>

              <Table.Td>
                <p
                  className={`${followerId?.accountType === "User" ? "bg-rose-800 text-rose-800" : "bg-blue-800 text-blue-800"
                    } bg-opacity-30 font-semibold px-4 py-1 rounded-full w-fit`}
                >
                  {followerId?.accountType}
                </p>
              </Table.Td>

              <Table.Td>
                <div className="flex gap-1 items-center">
                  {formatNumber(followerId?.followers.length ?? 0)}
                </div>
              </Table.Td>

              <Table.Td>{moment(createdAt).fromNow()}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>


        {data?.data?.length < 1 && (
          <Table.Caption className={`${theme ? "text-gray-200" : "text-gray-500"}`}>
            No Data Found.
          </Table.Caption>
        )}

      </Table>

      <div className="w-full mt-5 flex items-center justify-center">
        <Pagination
          total={data?.numOfPages}
          siblings={1}
          defaultValue={data?.page}
          withEdges
          onChange={(value) => setPage(value)}
          classNames={{
            root: "flex items-center gap-3",
            control: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md py-2 px-4 transition-all duration-300",
            controlHovered: "bg-gray-300 dark:bg-gray-600",
            controlDisabled: "bg-gray-400 dark:bg-gray-500",
            item: "text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300",
            itemActive: "bg-blue-500 text-white",
          }}
        />
      </div>


      <Loading visible={isPending} />
    </div>
  );
};

export default Followers;
