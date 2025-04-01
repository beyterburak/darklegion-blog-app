import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className="font-custom flex justify-center items-center gap-2">
      {/* <Link
        to="/"
        className={`relative z-10 text-3xl font-bold dark:text-white text-purple-200 ${type && "text-4xl"
          } glow-effect`}
      >
        Dark
        <span className={`text-4xl text-purple-500 glow-effect ${type && "text-5xl font-bold"}`}>
          Legion
        </span>
      </Link> */}

      <Link
        to="/"
        className={`relative z-10 text-3xl font-bold dark:text-white bg-gradient-to-r from-purple-500 to-indigo-800 bg-clip-text text-transparent 
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

// import { Link } from "react-router-dom";

// const Logo = ({ type }) => {
//   return (
//     <div className="relative font-mono">
//         <Link
//           to="/"
//           className={`relative z-10 text-3xl font-bold dark:text-white ${type && "text-white text-4xl"
//             }`}
//         >
//           Dark
//           <span
//             className={`text-4xl text-purple-950 ${type && " text-5xl font-bold"}`}
//           >
//             Legion
//           </span>
//         </Link>
//     </div>
//   );
// };

// export default Logo;
