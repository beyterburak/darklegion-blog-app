import { Routes, Route, Outlet } from "react-router-dom";
import { BlogDetails, CategoriesPage, Home, LoginPage, SignupPage, WriterPage } from "./pages";
import { Footer, Loading, Navbar } from "./components";
import useStore from "./store";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "sonner";

function Layout() {
  return (
    <div className="w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-29=8">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { theme, isLoading } = useStore();

  return (
    <main className={theme}>
      <div className="w-full min-h-screen relative bg-white dark:bg-[#010409]">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/:slug/:id?" element={<BlogDetails />} />
            <Route path="/writer/:id" element={<WriterPage />} />
          </Route>

          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
        </Routes>

        {isLoading && <Loading />}

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

      </div>
    </main>
  );
}

export default App;
