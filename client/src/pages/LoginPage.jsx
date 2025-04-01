import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { Button, Divider, Inputbox, Logo } from "../components";
import gladiatorImage from "../assets/gladiator3.png";
import useStore from "../store";
import { emailLogin, googleSignin } from "../utils/apiCalls";
import { saveUserInfo } from "../utils";

const LoginPage = () => {
  const { user, signIn, setIsLoading } = useStore();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = await googleSignin(tokenResponse?.access_token);
      if (user?.success) {
        saveUserInfo(user, signIn);
      } else {
        toast.error("Something went wrong. Try signing up.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Login failed. Try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await emailLogin(data);
    setIsLoading(false);
    if (result?.success) {
      saveUserInfo(result, signIn);
    } else {
      toast.error(result?.message);
    }
  };

  if (user.token) window.location.replace("/");

  return (
    <div className="flex w-full h-screen">
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center relative">
        <div
          className="absolute w-full h-full left-0 bg-cover opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent), url(${gladiatorImage})`,
            backgroundPosition: "50% center",
            backgroundSize: "cover",
          }}
        ></div>
        <Logo type="login" />
        <span className="text-2xl font-semibold text-white">Welcome back!</span>
      </div>

      <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#3b0764] to-black items-center px-10 md:px-20 lg:px-40">
        <div className="w-full flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-10">
          <div className="block mb-8 md:hidden">
            <Logo />
          </div>
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-200">
              Hesabına giriş yap
            </h2>
            <Button
              label="Google ile giriş yap"
              icon={<FcGoogle />}
              styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-100 dark:hover:bg-[#5b21b6] transition-all duration-300"
              onClick={googleLogin}
            />
            <Divider label="Email ile devam et" />
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Inputbox
                type="email"
                label="Email adresiniz"
                name="email"
                value={data?.email}
                isRequired
                placeholder="you@example.com"
                onChange={handleChange}
                icon={<FiMail className="text-gray-500" />}
              />
              <Inputbox
                type="password"
                label="Şifreniz"
                name="password"
                isRequired
                placeholder="********"
                value={data?.password}
                onChange={handleChange}
                icon={<FiLock className="text-gray-500" />}
              />
              <Button
                label="Giriş Yap"
                type="submit"
                styles="group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-black hover:bg-[#6d28d9] transition-all duration-300"
              />
            </form>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
              <p>
                Hesabın yok mu? {" "}
                <Link to="/sign-up" className="text-black font-medium">
                  Kayıt Ol
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;