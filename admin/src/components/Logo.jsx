import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className="font-custom flex justify-center items-center gap-2">
      <Link
        to="/"
        className={`relative z-10 text-3xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-purple-500 dark:to-indigo-800 dark:bg-clip-text dark:text-transparent 
          transition-all duration-300 ease-in-out transform hover:scale-105 ${type ? "text-4xl" : ""}`}
      >
        Dark
        <span
          className={`text-4xl bg-gradient-to-r from-indigo-800 to-purple-500 bg-clip-text text-transparent 
            transition-all duration-300 ease-in-out hover:glow-effect ${type ? "text-5xl font-bold" : ""}`}
        >
          Legion
        </span>
      </Link>

      <style>
        {`
          .glow-effect {
            text-shadow: 0px 0px 8px rgba(147, 51, 234, 0.9),
                         0px 0px 15px rgba(147, 51, 234, 0.7),
                         0px 0px 25px rgba(147, 51, 234, 0.5);
          }
        `}
      </style>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
          .font-custom {
            font-family: 'Orbitron', sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default Logo;
