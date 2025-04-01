import { Table } from "@mantine/core";
import { formatNumber, getInitials } from "../utils";
import moment from "moment";
import clsx from "clsx";

export const RecentFollowerTable = ({ data, theme }) => {
  return (
    <Table
      highlightOnHover
      withColumnBorders
      className={clsx("rounded-2xl shadow-lg", theme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700")}
    >
      <Table.Thead>
        <Table.Tr className={clsx(theme ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>
          <Table.Th>Follower</Table.Th>
          <Table.Th>Join Date</Table.Th>
        </Table.Tr>
      </Table.Thead>

      {data?.length === 0 && <Table.Caption className="py-4">No Data Found.</Table.Caption>}

      <Table.Tbody>
        {data?.map(({ _id, createdAt, followerId: follower }) => (
          <Table.Tr key={_id} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Table.Td className="flex gap-4 items-center py-3">
              {follower?.image ? (
                <img src={follower.image} alt={follower.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <p className="w-10 h-10 rounded-full flex justify-center items-center bg-blue-700 text-white font-semibold">
                  {getInitials(follower.name)}
                </p>
              )}

              <div>
                <p className="text-base font-medium">{follower.name}</p>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium text-purple-700">{follower.accountType}</span>
                  {follower.followers.length > 0 && (
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                      {formatNumber(follower.followers.length)}
                    </span>
                  )}
                </div>
              </div>
            </Table.Td>

            <Table.Td>{moment(createdAt).fromNow()}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export const RecentPostTable = ({ data, theme }) => {
  return (
    <Table
      highlightOnHover
      withColumnBorders
      className={clsx("rounded-2xl shadow-lg", theme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700")}
    >
      <Table.Thead>
        <Table.Tr className={clsx(theme ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>
          <Table.Th>Post Title</Table.Th>
          <Table.Th>Views</Table.Th>
          <Table.Th>Post Date</Table.Th>
        </Table.Tr>
      </Table.Thead>

      {data?.length === 0 && <Table.Caption className="py-4">No Data Found.</Table.Caption>}

      <Table.Tbody>
        {data?.map((el) => (
          <Table.Tr key={el?._id} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Table.Td className="flex gap-4 items-center py-3">
              <img src={el?.img} alt={el?.title} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-base font-medium">{el?.title}</p>
                <span className="text-sm font-medium text-purple-700">{el?.cat}</span>
              </div>
            </Table.Td>

            <Table.Td className="text-center">{formatNumber(el?.views.length)}</Table.Td>
            <Table.Td className="text-center">{moment(el?.createdAt).fromNow()}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
