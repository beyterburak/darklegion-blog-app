import React, { useEffect } from "react";
import useCommentStore from "../store/commentStore";
import useStore from "../store";
import { Modal, Button } from "@mantine/core";
import { useComments, useDeleteComment } from "../hooks/post-hook";
import NoProfile from "../assets/profile.png";
import { useMantineColorScheme } from '@mantine/core';

const Comments = () => {
  const { openComment, commentId, setOpen } = useCommentStore();
  const { user } = useStore();
  const { colorScheme } = useMantineColorScheme();

  const { data, mutate } = useComments();

  const useDelete = useDeleteComment(user?.token);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    useDelete.mutate({ id, postId: commentId });
  };

  useEffect(() => {
    mutate(commentId);
  }, [commentId]);

  return (
    <>
      <Modal
        opened={openComment}
        onClose={handleClose}
        title={`Comments (${data?.data?.length})`}
        centered
        size="lg"
        classNames={{
          modal: `rounded-lg ${colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`,
          title: `text-lg font-semibold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`,
          close: colorScheme === 'dark' ? 'text-white' : 'text-black', // Close button color
        }}
      >
        <div className={`w-full h-full pb-6 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
          <div className="w-full h-full flex flex-col gap-6 px-4">
            {data?.data?.map(({ _id, user, desc, createdAt }) => (
              <div
                key={_id}
                className={`w-full flex gap-4 py-4 px-6 rounded-lg shadow-lg ${colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <img
                  src={user?.image || NoProfile}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-lg">
                        {user.name}
                      </p>
                      <span className="text-sm text-gray-500 italic">
                        {new Date(createdAt).toDateString()}
                      </span>
                    </div>

                    <span
                      className="text-sm text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </span>
                  </div>

                  <p className={`text-base mt-2 ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Comments;
