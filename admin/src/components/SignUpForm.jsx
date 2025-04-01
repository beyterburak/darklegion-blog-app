import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/auth-hook";
import { uploadFile } from "../utils";
import { PasswordStrength } from "./PasswordStrength";
import { clsx } from "clsx";

const SignUpForm = ({ toast, isSignin, setIsSignin, toggle, setFormClose }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { mutate } = useSignUp(toast, toggle);
  const [strength, setStrength] = useState(0);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [passValue, setPassValue] = useInputState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 3 ? "First name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (values) => {
    if (!isSignin && strength < 90) return;
    setFormClose(true);

    const res = mutate({
      ...values,
      password: passValue,
      image: fileURL,
      accountType: "Writer",
    });
  };

  useEffect(() => {
    file && uploadFile(setFileURL, file);
  }, [file]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className='flex flex-col gap-3'
    >
      <div className="w-full flex gap-2">
        <TextInput
          className="w-full"
          withAsterisk
          label="First Name"
          placeholder="First Name"
          styles={{
            label: { color: theme ? "#E5E7EB" : "#1F2937" }, // Etiket rengi
            input: {
              backgroundColor: theme ? "#1F2937" : "#FFFFFF", // Input arkaplanı
              color: theme ? "#F3F4F6" : "#1F2937", // Input text rengi
              borderColor: theme ? "#374151" : "#E5E7EB",
            },
          }}
          {...form.getInputProps("firstName")}
        />
        <TextInput
          className="w-full"
          withAsterisk
          label="Last Name"
          placeholder="Last Name"
          styles={{
            label: { color: theme ? "#E5E7EB" : "#1F2937" },
            input: {
              backgroundColor: theme ? "#1F2937" : "#FFFFFF",
              color: theme ? "#F3F4F6" : "#1F2937",
              borderColor: theme ? "#374151" : "#E5E7EB",
            },
          }}
          {...form.getInputProps("lastName")}
        />
      </div>

      <TextInput
        withAsterisk
        label="Email Address"
        placeholder="your@email.com"
        styles={{
          label: { color: theme ? "#E5E7EB" : "#1F2937" },
          input: {
            backgroundColor: theme ? "#1F2937" : "#FFFFFF",
            color: theme ? "#F3F4F6" : "#1F2937",
            borderColor: theme ? "#374151" : "#E5E7EB",
          },
        }}
        {...form.getInputProps("email")}
      />


      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={false}
      />

      <Group className={`w-full flex  justify-between`} mt='md'>
        <div className={`flex flex-col items-center justify-between`}>
          <label
            className={clsx(
              "flex items-center gap-1 text-base cursor-pointer",
              theme ? "text-gray-500" : "text-slate-700"
            )}
            htmlFor='imgUpload'
          >
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
              id='imgUpload'
              data-max-size='5120'
              accept='.jpg, .png, .jpeg'
            />
            <BiImages />
            <span>Picture</span>
          </label>
        </div>

        <Button
          type='submit'
          className={clsx(theme ? "bg-purple-950" : "bg-black")}
        >
          Submit
        </Button>
      </Group>
      <p className="text-sm text-gray-900 dark:text-gray-200">
        {isSignin ? "Don't have an account?" : "Already have an account?"}
        <span
          className={clsx(
            "underline cursor-pointer ml-1",
            theme ? "text-purple-400" : "text-black"
          )}
          onClick={() => setIsSignin((prev) => !prev)}
        >
          {isSignin ? "Sign up" : "Sign in"}
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
