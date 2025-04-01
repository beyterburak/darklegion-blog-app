import {
  Button,
  Select,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useStore from "../store";
import { createSlug, uploadFile } from "../utils";

import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BiImages } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import { useCreatePost } from "../hooks/post-hook";
import clsx from "clsx";

const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();

  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);

  const [category, setCategory] = useState("League Of Legends");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [preview, setPreview] = useState(null);

  const theme = colorScheme === "dark";

  let editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write post here...." }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleSubmit = async () => {
    if (!fileURL || !category || !title) {
      toast.error("All fileds are required");
      return;
    }

    const slug = createSlug(title);

    mutate({
      title,
      slug,
      cat: category,
      img: fileURL,
      desc: editor.getHTML(),
    });
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Bellek sızıntısını önler
    }
  }, [file]);

  useEffect(() => {
    file && uploadFile(setFileURL, file);
  }, [file]);

  return (
    <>
      <RichTextEditor
        editor={editor}
        styles={{
          content: {
            backgroundColor: theme ? "#1F2937" : "#FFFFFF",
            color: theme ? "#F3F4F6" : "#1F2937",
            borderColor: theme ? "#374151" : "#E5E7EB",
            borderRadius: "8px",
            padding: "16px",
            minHeight: "250px",
            boxShadow: theme
              ? "0px 4px 6px rgba(0, 0, 0, 0.3)"
              : "0px 4px 6px rgba(0, 0, 0, 0.1)",
          },
          toolbar: {
            backgroundColor: theme ? "#111827" : "#F9FAFB",
            borderBottom: `1px solid ${theme ? "#374151" : "#E5E7EB"}`,
            borderRadius: "8px 8px 0 0",
            padding: "8px 12px",
            boxShadow: theme
              ? "0px 2px 4px rgba(0, 0, 0, 0.2)"
              : "0px 2px 4px rgba(0, 0, 0, 0.05)",
          },
          control: {
            color: theme ? "#E5E7EB" : "#1F2937",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: theme ? "#374151" : "#E5E7EB",
              color: theme ? "#FFFFFF" : "#111827",
              transform: "scale(1.1)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          },
        }}
      >
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8">
          <TextInput
            withAsterisk
            label="Post title"
            className="w-full flex-1 rounded-lg p-3 transition-all duration-200 dark:text-gray-400"
            styles={{
              input: {
                backgroundColor: theme ? "#1F2937" : "#FFFFFF",
                color: theme ? "#F3F4F6" : "#1F2937",
                borderColor: theme ? "#374151" : "#E5E7EB",
                borderRadius: "8px",
                padding: "12px",
                transition: "all 0.2s ease-in-out",
                "&:focus": {
                  borderColor: theme ? "#60A5FA" : "#2563EB",
                  boxShadow: "0 0 8px rgba(96, 165, 250, 0.5)",
                },
              },
            }}
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            label="Category"
            defaultValue="GameAlert"
            placeholder="Pick a category"
            className="w-full flex-1 rounded-lg p-3 transition-all duration-200 dark:text-gray-400"
            data={[
              "GameAlert",
              "PlayStation",
              "Xbox",
              "Steam",
              "Epic Games",
              "League Of Legends",
              "Valorant",
              "Genshin Impact",
              "Fortnite",
              "GTA V",
              "CS2",
            ]}
            styles={{
              input: {
                backgroundColor: theme ? "#1F2937" : "#FFFFFF",
                color: theme ? "#F3F4F6" : "#1F2937",
                borderColor: theme ? "#374151" : "#E5E7EB",
                borderRadius: "8px",
                padding: "12px",
                transition: "all 0.2s ease-in-out",
                "&:focus": {
                  borderColor: theme ? "#60A5FA" : "#2563EB",
                  boxShadow: "0 0 8px rgba(96, 165, 250, 0.5)",
                },
              },
              dropdown: {
                backgroundColor: theme ? "#111827" : "#FFFFFF",
                color: theme ? "#F3F4F6" : "#1F2937",
                borderRadius: "8px",
                borderColor: theme ? "#374151" : "#E5E7EB",
                boxShadow: theme
                  ? "0px 4px 6px rgba(0, 0, 0, 0.3)"
                  : "0px 4px 6px rgba(0, 0, 0, 0.1)",
              },
              item: {
                color: theme ? "#E5E7EB" : "#1F2937",
                transition: "all 0.2s ease-in-out",
                "&[data-selected]": {
                  backgroundColor: theme ? "#60A5FA" : "#2563EB",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                },
                "&:hover": {
                  backgroundColor: theme ? "#374151" : "#E5E7EB",
                },
              },
            }}
          />


          {/* Image Upload */}
          <label className="flex items-center gap-1 text-base cursor-pointer">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages className={clsx(theme ? "text-gray-300" : "text-gray-600")} />
            <span className={clsx(theme ? "text-gray-300" : "text-gray-600")}>Post Image</span>
          </label>

          {/* Image Preview */}
          {preview && (
            <div className="w-full flex justify-center mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Bubble Menu (Inline Formatting) */}
        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}

        {/* Toolbar */}
        <RichTextEditor.Toolbar sticky stickyOffset={20}>
          {/* Color Picker */}
          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />

          {/* Custom Colors */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={true}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          {/* Clear Color */}
          <RichTextEditor.UnsetColor />

          {/* Formatting Options */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          {/* Header Styles */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          {/* Other Formatting Options */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          {/* Link Formatting */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          {/* Alignment Options */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        {/* Editor Content */}
        <RichTextEditor.Content className="px-3 py-4" />
      </RichTextEditor >

      {/* Submit Button */}
      <div className="w-full flex items-end justify-end mt-6" >
        <Button
          className={clsx(
            theme ? "bg-blue-900" : "bg-black",
            "text-white py-2 px-4 rounded-md"
          )}
          onClick={() => handleSubmit()}
        >
          Submit Post
        </Button>
      </div>

      {/* Loading Spinner */}
      < Loading visible={isPending} />

    </>
  );
};

export default WritePost;
