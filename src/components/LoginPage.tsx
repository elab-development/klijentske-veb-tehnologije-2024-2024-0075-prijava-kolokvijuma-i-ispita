import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FonLogo } from "./FonLogo";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: (name: string, indexNum: string) => void;
}

export function LoginPage({ onNavigateToRegister, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple robust student email validation
    if (!email) {
      setErrorMsg("Molimo unesite email adresu.");
      return;
    }

    if (!password) {
      setErrorMsg("Molimo unesite lozinku.");
      return;
    }

    // Typical University student email check (optional warning, but keeps form fillable)
    if (!email.includes("@")) {
      setErrorMsg("Unesite ispravnu email adresu.");
      return;
    }

    // Set mock loading state for a highly satisfying feedback loop
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      
      // Extract initials or name if possible from email, otherwise use elegant mockup defaults
      const prefix = email.split("@")[0];
      let resolvedName = "Ime Prezime";
      let resolvedIndex = "2025/0001";
      
      if (prefix.toLowerCase() === "pajinlaptop") {
        resolvedName = "Jovan Pajčin";
        resolvedIndex = "2023/3858";
      } else if (prefix.length > 4) {
        // e.g. "petarpetrovic" -> Petar Petrovic
        const clean = prefix.replace(/[0-9]/g, "");
        if (clean.length > 5) {
          resolvedName = clean.charAt(0).toUpperCase() + clean.slice(1, 5) + " " + clean.charAt(5).toUpperCase() + clean.slice(6);
        }
      }
      
      // Let the success animation display for a brief 750ms before routing to the portal
      setTimeout(() => {
        onLoginSuccess(resolvedName, resolvedIndex);
      }, 750);
    }, 1200);
  };

  return (
    <div className="w-full max-w-[440px] px-4 md:px-0">
      {/* "Prijavite se" Header above the card */}
      <h1 className="text-white text-[32px] font-medium tracking-wide text-left mb-5 select-none pl-1">
        Prijavite se
      </h1>

      {/* Main Login Card */}
      <div className="bg-[#EDF2FA] rounded-[16px] shadow-2xl p-8 pb-7 w-full border border-white/20 relative">
        <AnimatePresence mode="wait">
          {!loginSuccess ? (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Email block */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-gray-600 text-[14.5px] font-medium select-none pl-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ipggggbbbb@student.xyz.bg.ac.rs"
                  className="w-full h-[46px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                />
              </div>

              {/* Password block */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-gray-600 text-[14.5px] font-medium select-none pl-1">
                  Lozinka
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[46px] pl-4 pr-11 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E4C9A] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error warning rendering */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-xs font-medium pl-1"
                >
                  {errorMsg}
                </motion.div>
              )}

              {/* Log In Button - "Prijavi se" */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[46px] rounded-[8px] bg-[#1E4C9A] text-white font-medium text-[15px] hover:bg-[#163E75] active:scale-[0.98] transition-all flex items-center justify-center shadow-md shadow-[#1E4C9A]/20 cursor-pointer disabled:opacity-80"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin text-white" size={20} />
                ) : (
                  "Prijavi se"
                )}
              </button>

              {/* FON Logo offset on the right side */}
              <div className="flex justify-end mt-4">
                <FonLogo />
              </div>

              {/* Bottom footer text inside the card - left-aligned in a single line, below the logo */}
              <div className="mt-3 pt-3.5 border-t border-slate-200/45 text-left select-none">
                <span className="text-gray-500 text-[14px] font-medium whitespace-nowrap">
                  Nemate studentski nalog?{" "}
                </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-[#1E4C9A] hover:text-[#2563EB] text-[14px] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer inline whitespace-nowrap"
                >
                  Registrujte se.
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <CheckCircle2 className="text-[#10B981] w-14 h-14 mb-4 animate-bounce" />
              <h2 className="text-[20px] font-semibold text-gray-800 mb-1">
                Uspešna prijava!
              </h2>
              <p className="text-gray-500 text-sm max-w-[280px] mb-6">
                Dobrodošli na studentski portal Fakulteta organizacionih nauka.
              </p>

              <button
                type="button"
                onClick={() => {
                  setLoginSuccess(false);
                  setEmail("");
                  setPassword("");
                }}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                Nazad na prijavu
              </button>

              <div className="mt-8 flex justify-center w-full">
                <FonLogo />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
