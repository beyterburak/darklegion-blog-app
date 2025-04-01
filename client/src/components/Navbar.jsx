import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
    FaFacebook,
    FaInstagram,
    FaTwitterSquare,
    FaYoutube,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import ThemeSwitch from "./Switch";
import useStore from "../store";
import { BiLogOut } from "react-icons/bi";

function getInitials(fullName) {
    const names = fullName.split(" ");
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
    return initials.join("");
}

const MobileMenu = ({ user, signOut }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="flex">
            <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-fit bg-white dark:bg-[#010409] z-50 flex flex-col py-10 items-center justify-center shadow-xl gap-8 font-mono font-semibold">
                    <Logo />
                    <ul className="flex flex-col gap-4 text-base text-black dark:text-gray-300">
                        {["/", "/about", "/contact"].map((path, index) => (
                            <li key={index} onClick={toggleMenu}>
                                <Link to={path} className={location.pathname === path ? "text-purple-950 font-bold" : ""}>
                                    {path === "/" ? "Ana Sayfa" : path === "/about" ? "Hakkımızda" : "İletişim"}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col items-center gap-4">
                        {user?.token ? (
                            <div className="flex flex-col items-center w-full">
                                <Link
                                    to={'/writer/' + user?.user._id}
                                    className="flex items-center gap-3 py-2 text-black dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                                >
                                    {user?.user.image ? (
                                        <img
                                            src={user?.user.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                        />
                                    ) : (
                                        <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                            {getInitials(user?.user.name)}
                                        </span>
                                    )}
                                    <span className="text-base font-medium">{user?.user.name}</span>
                                </Link>

                                <button
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:hover:text-red-400 transition-all duration-300 mt-2"
                                    onClick={signOut}
                                >
                                    <BiLogOut className="text-xl" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/sign-in">
                                <Button
                                    label="Sign in"
                                    styles="flex items-center justify-center bg-black dark:bg-purple-950 text-white px-4 py-1.5 rounded-full"
                                />
                            </Link>
                        )}
                    </div>
                    <ThemeSwitch />
                    <span
                        className='cursor-pointer text-xl font-semibold dark:text-white'
                        onClick={toggleMenu}
                    >
                        <AiOutlineClose />
                    </span>
                </div>
            )}
        </div>
    );
};

const Navbar = () => {
    const { user, signOut } = useStore();
    const [showProfile, setShowProfile] = useState(false);
    const location = useLocation();

    const handleSignOut = () => {
        localStorage.removeItem("userInfo");
        signOut();
    };

    return (
        <nav className="flex flex-col md:flex-row w-full py-5 items-center justify-between gap-4 md:gap-0">
            <div className="flex gap-2 text-[20px] md:hidden lg:flex">
                {/* YouTube */}
                <Link to="/" className="text-red-600 hover:text-red-700 transition">
                    <FaYoutube />
                </Link>

                {/* Facebook */}
                <Link to="/" className="text-blue-600 hover:text-blue-700 transition">
                    <FaFacebook />
                </Link>

                {/* Instagram */}
                <Link to="/" className="text-rose-600 hover:text-rose-700 transition">
                    <FaInstagram />
                </Link>

                {/* Twitter */}
                <Link to="/" className="text-blue-500 hover:text-blue-600 transition">
                    <FaTwitterSquare />
                </Link>
            </div>
            <Logo />
            <div className="hidden md:flex gap-14 items-center font-mono font-semibold">
                <ul className="flex gap-6 text-lg text-black dark:text-white">
                    {["/", "/about", "/contact"].map((path, index) => (
                        <Link key={index} to={path} className={location.pathname === path ? "text-purple-950 font-bold" : ""}>
                            {path === "/" ? "Ana Sayfa" : path === "/about" ? "Hakkımızda" : "İletişim"}
                        </Link>
                    ))}
                </ul>
                <ThemeSwitch />
                <div className="flex gap-2 items-center cursor-pointer">
                    {user?.token ? (
                        <div className="relative flex items-center">
                            <button
                                onClick={() => setShowProfile((prev) => !prev)}
                                className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
                            >
                                {user?.user.image ? (
                                    <img
                                        src={user?.user.image}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                                    />
                                ) : (
                                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                        {getInitials(user?.user.name)}
                                    </span>
                                )}
                                <span className="font-medium text-black dark:text-gray-300">
                                    {user?.user?.name.split(" ")[0]}
                                </span>
                            </button>

                            {showProfile && (
                                <div className="absolute top-12 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-6 flex flex-col rounded-lg w-48 z-50">
                                    <Link
                                        to={'/writer/' + user?.user._id}
                                        className="flex items-center gap-3 py-2 text-black dark:text-white hover:text-purple-800 dark:hover:text-purple-800 transition-all duration-300"
                                    >
                                        <img
                                            src={user?.user.image || "profile.png"}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-base font-medium">{user?.user.name}</span>
                                    </Link>
                                    <div className="border-t border-gray-300 my-2"></div>
                                    <button
                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:hover:text-red-400 transition-all duration-300"
                                        onClick={handleSignOut}
                                    >
                                        <BiLogOut className="text-xl" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/sign-in'>
                            <Button label='Giriş yap' styles='bg-black dark:bg-purple-950 text-white px-4 py-1.5 rounded-full' />
                        </Link>
                    )}
                </div>
            </div>
            <div className='block md:hidden'>
                <MobileMenu user={user} signOut={handleSignOut} />
            </div>
        </nav>
    );
};

export default Navbar;