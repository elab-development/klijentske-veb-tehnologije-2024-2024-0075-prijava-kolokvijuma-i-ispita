import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { StudentPortal } from "./components/StudentPortal";
import { AnimatePresence } from "motion/react";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [studentData, setStudentData] = useState(() => {
    const saved = localStorage.getItem("student_data");
    return saved ? JSON.parse(saved) : { name: "Ime Prezime", index: "2025/0001" };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("is_logged_in") === "true";
  });

  const handleLoginSuccess = (name: string, index: string) => {
    const data = { name, index };
    setStudentData(data);
    setIsLoggedIn(true);
    localStorage.setItem("student_data", JSON.stringify(data));
    localStorage.setItem("is_logged_in", "true");
    navigate("/portal/home");
  };

  const handleRegisterComplete = (name: string, index: string) => {
    const data = { name, index };
    setStudentData(data);
    setIsLoggedIn(true);
    localStorage.setItem("student_data", JSON.stringify(data));
    localStorage.setItem("is_logged_in", "true");
    navigate("/portal/home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("student_data");
    navigate("/login");
  };

  // Safe navigation guard logic based on login state
  useEffect(() => {
    if (isLoggedIn) {
      if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
        navigate("/portal/home", { replace: true });
      }
    } else {
      if (location.pathname.startsWith("/portal")) {
        navigate("/login", { replace: true });
      }
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to={isLoggedIn ? "/portal/home" : "/login"} replace />} 
        />
        
        <Route 
          path="/login" 
          element={
            <div 
              className="min-h-screen w-full font-sans flex items-center justify-center text-slate-100 selection:bg-blue-600/30 overflow-x-hidden relative"
              style={{
                background: "linear-gradient(to bottom, #12376E 0%, #174EA6 44%, #5A9DEC 100%)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              <main className="w-full flex items-center justify-center py-10 z-10">
                <LoginPage 
                  onNavigateToRegister={() => navigate("/register")} 
                  onLoginSuccess={handleLoginSuccess}
                />
              </main>
            </div>
          } 
        />

        <Route 
          path="/register" 
          element={
            <div 
              className="min-h-screen w-full font-sans flex items-center justify-center text-slate-100 selection:bg-blue-600/30 overflow-x-hidden relative"
              style={{
                background: "linear-gradient(to bottom, #12376E 0%, #174EA6 44%, #5A9DEC 100%)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              <main className="w-full flex items-center justify-center py-10 z-10">
                <RegisterPage 
                  onNavigateToLogin={() => navigate("/login")} 
                  onRegisterComplete={handleRegisterComplete}
                />
              </main>
            </div>
          } 
        />

        <Route 
          path="/portal" 
          element={<Navigate to="/portal/home" replace />} 
        />

        <Route 
          path="/portal/:tab" 
          element={
            <StudentPortal 
              studentName={studentData.name} 
              studentIndex={studentData.index} 
              onLogout={handleLogout} 
            />
          } 
        />

        <Route 
          path="*" 
          element={<Navigate to={isLoggedIn ? "/portal/home" : "/login"} replace />} 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}