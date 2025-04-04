import {
  Button,
  Menu,
  Pagination,
  Table,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store/index.js";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useAction, useContent, useDeletePost } from "../hooks/post-hook";
import { formatNumber, updateURL } from "../utils";
import clsx from "clsx";
import { Toaster, toast } from "sonner";
import { AiOutlineEye, AiOutlineSetting } from "react-icons/ai";
import { MdMessage, MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../components/Loading";
import ConfirmDialog from "../components/ConfirmDialog";
import useCommentStore from "../store/commentStore";
import Comments from "../components/Comments";

const Contents = () => {
  const { colorScheme } = useMantineColorScheme();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { user } = useStore();
  const { setOpen, commentId, setCommentId } = useCommentStore();

  const { data, isPending, mutate } = useContent(toast, toggle, user?.token);
  const useDelete = useDeletePost(toast, user?.token);
  const useActions = useAction(toast, user?.token);

  const [selected, setSelected] = useState("");
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const theme = colorScheme === "dark";

  const fetchContent = async () => {
    updateURL({ page, navigate, location });
    mutate(page);
  };

  const handleComment = (id, size) => {
    if (size > 0) {
      setCommentId(id);
      setOpen(true);
    }
  };

  const handlePerformAction = (val, id, status) => {
    setSelected(id);
    setType(val);
    setStatus(status);
    open();
  };

  const handleActions = () => {
    switch (type) {
      case "delete":
        useDelete.mutate(selected);
        break;
      case "status":
        useActions.mutate({ id: selected, status });
        break;
    }
    fetchContent();
    close();
  };

  useEffect(() => {
    fetchContent();
  }, [page]);

  return (
    <>
      <div className='w-full h-full flex flex-col'>
        <p
          className={clsx(
            "text-xl pb-2 font-bold",
            theme ? "text-gray-200" : "text-gray-800"
          )}
        >
          Contents (
          <span className="text-indigo-500 font-semibold">
            {data?.data?.length * data?.page + " of " + data?.totalPost + " records"}
          </span>
          )
        </p>

        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr className={theme ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}>
              <Table.Th>Post Title</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Views</Table.Th>
              <Table.Th>Comments</Table.Th>
              <Table.Th>Post Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {data?.data?.length > 0 &&
              data.data.map((el) => (
                <Table.Tr key={el._id} className={theme ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"}>
                  <Table.Td className='flex gap-2 items-center'>
                    <img
                      src={el?.img}
                      alt={el?.title}
                      className='w-12 h-12 rounded-full object-cover shadow-sm'
                    />
                    <p className='text-base truncate max-w-[150px] font-medium'>{el?.title}</p>
                  </Table.Td>

                  <Table.Td>{el?.cat}</Table.Td>

                  <Table.Td>
                    <div className='flex gap-1 items-center'>
                      <AiOutlineEye size={18} />
                      {formatNumber(el?.views?.length)}
                    </div>
                  </Table.Td>

                  <Table.Td onClick={() => handleComment(el?._id, el?.comments?.length)}>
                    <div className='flex gap-1 items-center cursor-pointer'>
                      <MdMessage size={18} className='text-indigo-500' />
                      {formatNumber(el?.comments?.length)}
                    </div>
                  </Table.Td>

                  <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>

                  <Table.Td>
                    <span className={`px-4 py-1.5 rounded-full font-semibold ${el?.status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {el?.status === true ? "Active" : "Disabled"}
                    </span>
                  </Table.Td>

                  <Table.Td width={5}>
                    <Menu shadow='lg' width={200}>
                      <Menu.Target>
                        <Button variant="subtle">
                          <BiDotsVerticalRounded className="text-lg" />
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown
                        classNames={{
                          dropdown: `rounded-lg ${colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`, // Koyu tema için arka plan rengini koyulaştırdık
                          item: `font-semibold ${colorScheme === 'dark' ? 'text-white' : 'text-black'} hover:${colorScheme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`,
                          divider: 'border-gray-300',
                          label: `text-sm ${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`,
                        }}
                      >
                        <Menu.Item
                          leftSection={
                            <AiOutlineSetting
                              className={`${colorScheme === "dark" ? "text-white" : "text-gray-900"
                                }`} // Simge rengini tema ile uyumlu hale getirdik
                            />
                          }
                          onClick={() => handlePerformAction("status", el?._id, !el?.status)}
                          classNames={{
                            item: `font-semibold ${colorScheme === "dark" ? "text-white" : "text-black"
                              } hover:${colorScheme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                              } transition-all duration-200` // Hover durumunda arka plan rengini değiştirdik
                          }}
                        >
                          {el?.status ? (
                            <span className="text-red-500">{el?.status ? "Disable" : "Enable"}</span>
                          ) : (
                            <span className="text-green-500">{el?.status ? "Disable" : "Enable"}</span>
                          )}
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>

                        <Menu.Item
                          color="red"
                          leftSection={<MdOutlineDeleteOutline />}
                          onClick={() => handlePerformAction("delete", el?._id)}
                          classNames={{
                            item: `text-red-600 hover:bg-red-600 hover:text-white ${colorScheme === 'dark' ? 'bg-opacity-40' : 'bg-opacity-100'}`, // Koyu temada kırmızı öğe vurgulandı
                          }}
                        >
                          Delete Post
                        </Menu.Item>
                      </Menu.Dropdown>

                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        <div className="w-full mt-5 flex items-center justify-center">
          <Pagination
            total={data?.numOfPage}
            siblings={1}
            defaultValue={data?.page}
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

      <ConfirmDialog message='Are you sure you want to perform this action?' opened={opened} close={close} handleClick={handleActions} />
      {commentId && <Comments />}
    </>
  );
};

export default Contents;