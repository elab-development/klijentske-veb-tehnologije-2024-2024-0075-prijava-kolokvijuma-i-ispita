import React, { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { StudentPortal } from "./components/StudentPortal";
import { motion, AnimatePresence } from "motion/react";

type PageMode = "login" | "register" | "dashboard";

export default function App() {
  const [mode, setMode] = useState<PageMode>("login");
  const [studentData, setStudentData] = useState({
    name: "Ime Prezime",
    index: "2025/0001"
  });

  const handleLoginSuccess = (name: string, index: string) => {
    setStudentData({ name, index });
    setMode("dashboard");
  };

  const handleRegisterComplete = (name: string, index: string) => {
    setStudentData({ name, index });
    setMode("dashboard");
  };

  if (mode === "dashboard") {
    return (
      <StudentPortal 
        studentName={studentData.name} 
        studentIndex={studentData.index} 
        onLogout={() => setMode("login")} 
      />
    );
  }

  return (
    <div 
      className="min-h-screen w-full font-sans flex items-center justify-center text-slate-100 selection:bg-blue-600/30 overflow-x-hidden relative"
      style={{
        background: "linear-gradient(to bottom, #12376E 0%, #174EA6 44%, #5A9DEC 100%)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      <main className="w-full flex items-center justify-center py-10 z-10">
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
              <LoginPage 
                onNavigateToRegister={() => setMode("register")} 
                onLoginSuccess={handleLoginSuccess}
              />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
              <RegisterPage 
                onNavigateToLogin={() => setMode("login")} 
                onRegisterComplete={handleRegisterComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}