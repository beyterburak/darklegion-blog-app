import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OTPVerification from "./pages/OTPVerification";
import StartPage from "./pages/StartPage";
import useStore from "./store/index";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Followers from "./pages/Followers";
import Contents from "./pages/Content";
import WritePost from "./pages/WritePost";
import { Toaster } from "sonner";

function Layout() {
  const { user } = useStore((state) => state);

  const location = useLocation();

  return user?.token ? (
    <div className='w-full h-screen'>
      <Navbar />
      <div className='w-full h-full flex border-t pt-16 '>
        <div className='hidden lg:flex '>
          <Sidebar />
        </div>

        <div className='w-full flex-1 px-8 py-4 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className='w-full min-h-screen'>
      <Routes>
        <Route element={<Layout />}>
          <Route index psth='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/followers' element={<Followers />} />
          <Route path='/contents' element={<Contents />} />
          <Route path='/write/:postId?' element={<WritePost />} />
        </Route>

        <Route path='/auth' element={<StartPage />} />
        <Route path='/otp-verification' element={<OTPVerification />} />
      </Routes>

      <Toaster
        position="bottom-right"
        expand={true} // Açılan bildirimleri düzgün gösterir
        richColors={true} // Modern renk geçişleri ekler
        containerStyle={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 99999, // Üst katmanda olsun
        }}
        toastOptions={{
          className: "shadow-2xl rounded-xl border border-purple-900 dark:border-purple-700",
          style: {
            background: "linear-gradient(135deg, #0a0a0a, #1b0033)", // Siyah & Mor degrade
            color: "#d8b4fe", // Parlak mor yazı
            borderRadius: "16px",
            padding: "18px 22px",
            boxShadow: "0px 10px 20px rgba(168, 85, 247, 0.5)", // Mor ışık efekti
            transition: "all 0.3s ease-in-out",
            backdropFilter: "blur(8px)", // Şeffaf cam efekti
          },
          classNames: {
            success: "bg-purple-700 text-white shadow-md",
            error: "bg-red-600 text-white shadow-md",
            warning: "bg-yellow-500 text-black shadow-md",
            info: "bg-blue-500 text-white shadow-md",
          },
          duration: 4000, // Bildirim 4 saniye ekranda kalır
        }}
      />
    </main>
  );
}

export default App;
