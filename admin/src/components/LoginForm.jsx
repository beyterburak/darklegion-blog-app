import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/index";
import { PasswordStrength } from "./PasswordStrength";
import { useSignin } from "../hooks/auth-hook";

const LoginForm = ({ toast, isSignin, setIsSignin, toggle, setFormClose }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { signIn } = useStore();
  const { data, isPemding, isSuccess, mutate } = useSignin(toast, toggle);

  const [strength, setStrength] = useState(0);
  const [passValue, setPassValue] = useInputState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    setFormClose(true);

    mutate({
      ...values,
      password: passValue,
    });

    if (isSuccess) {
      setFormClose(false);
      setTimeout(() => {
        signIn(data);

        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className='flex flex-col gap-4'
    >
      <TextInput
        withAsterisk
        label="Email Address"
        placeholder="your@email.com"
        {...form.getInputProps("email")}
        className={clsx(
          "w-full rounded-md",
          theme ? "text-gray-200 border-gray-500" : "bg-white text-black border-gray-300"
        )}
      />

      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={true}
      />

      <Group
        className={clsx(
          "w-full flex",
          isSignin ? "justify-end" : " justify-between"
        )}
        mt='md'
      >
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

export default LoginForm;
