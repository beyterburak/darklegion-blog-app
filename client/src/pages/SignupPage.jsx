import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Button, Divider, Inputbox, Logo } from "../components";
import gladiatorImage from "../assets/gladiator3.png";
import { getGoogleSignUp, emailSignUp } from "../utils/apiCalls";
import { MdSettingsInputSvideo } from "react-icons/md";
import useStore from "../store";
import { saveUserInfo, uploadFile } from "../utils";

const SignupPage = () => {
  const { user, signIn, setIsLoading } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      const user = await getGoogleSignUp(tokenResponse.access_token);
      setIsLoading(false);
      if (user?.success) {
        saveUserInfo(user, signIn);
      } else {
        toast.error(user?.message);
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await emailSignUp({ ...data, image: fileUrl });
    setIsLoading(false);
    if (result?.success) {
      saveUserInfo(result, signIn);
    } else {
      toast.error(result?.message);
    }
  };

  if (user.token) window.location.replace("/");

  useEffect(() => {
    file && uploadFile(setFileUrl, file);
  }, [file]);

  return (
    <div className="flex w-full h-[100vh]">
      {/* LEFT */}
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
        <span className="text-2xl font-semibold text-white">Welcome!</span>
      </div>

      {/* RIGHT */}
      <div className='flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#3b0764] to-black items-center px-4 md:px-20 lg:px-40'>
        <div className='w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-0 lg:px-8'>
          <div className='block mb-10 md:hidden -ml-8'>
            <Logo />
          </div>

          <div className="w-full space-y-6 flex flex-col justify-start items-center">
            <div className="max-w-md w-full flex gap-3 md:gap-4 items-center justify-center mb-12">
              {showForm && (
                <IoArrowBackCircleSharp
                  className='text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400'
                  onClick={() => setShowForm(false)}
                />
              )}
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                Bir hesap oluştur
              </h2>
            </div>

            {showForm ? (
              <form className="max-w-md w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col rounded-md shadow-sm space-y-px gap-6 mb-8">
                  <div className="w-full flex gap-4">
                    <Inputbox label="Adınız" type="text" name="firstName" isRequired={true} value={data.firstName} onChange={handleChange} placeholder="Name" />
                    <Inputbox label="Soyadınız" type="text" name="lastName" isRequired={true} value={data.lastName} onChange={handleChange} placeholder="Surname" />
                  </div>
                  <Inputbox type="email" label="Email adresiniz" name="email" isRequired={true} value={data.email} placeholder="you@example.com" onChange={handleChange} />
                  <Inputbox type="password" label="Şifreniz" name="password" isRequired={true} placeholder="********" value={data.password} onChange={handleChange} />
                </div>
                <Button label='Hesap Oluştur' type='submit' styles='group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-[#3b0764] hover:bg-[#3b0764] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b0764]' />
              </form>
            ) : (
              <div className="max-w-md w-full space-y-8">
                <Button label="Google ile kayıt ol" icon={<FcGoogle className="" />} styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300" onClick={() => googleLogin()} />
                <Divider label="Or continue with email" />
                <Button onClick={() => setShowForm(true)} label='Continue with email' styles='w-full gap-4 bg-white text-black dark:bg-[#3b0764] dark:text-white px-5 py-2.5 rounded-full border dark:border-none border-gray-300' />
              </div>
            )}
            <p className="max-w-md w-full text-center text-gray-600 dark:text-gray-300">Zaten hesabınız var mı? <Link to='/sign-in' className='text-black font-medium'>Giriş Yap</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
