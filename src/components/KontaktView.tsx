import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { FonLogo } from "./FonLogo";

interface KontaktViewProps {
  studentName: string;
  studentIndex: string;
}

export function KontaktView({ studentName, studentIndex }: KontaktViewProps) {
  const { isDarkMode } = useTheme();

  // Parse student name into first and last name if possible
  const nameParts = studentName.trim().split(/\s+/);
  const isDefaultPlacer = studentName === "Ime Prezime" || studentName === "Student Student";
  const detectedFirstName = isDefaultPlacer ? "" : (nameParts[0] || "");
  const detectedLastName = isDefaultPlacer ? "" : (nameParts.slice(1).join(" ") || "");

  // Form states
  const [ime, setIme] = useState(detectedFirstName);
  const [prezime, setPrezime] = useState(detectedLastName);
  const [studijskiProgram, setStudijskiProgram] = useState("Informacioni sistemi i tehnologije");
  const [problem, setProblem] = useState<"Uplata" | "Prijava ispita" | "Termin konsultacija" | "Drugo">("Uplata");
  const [poruka, setPoruka] = useState("");
  
  // Feedback states
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync with props if they change
  useEffect(() => {
    if (studentName && studentName !== "Ime Prezime" && studentName !== "Student Student") {
      const parts = studentName.trim().split(/\s+/);
      setIme(parts[0] || "");
      setPrezime(parts.slice(1).join(" ") || "");
    } else {
      setIme("");
      setPrezime("");
    }
  }, [studentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ime.trim() || !prezime.trim() || !poruka.trim()) {
      alert("Molimo Vas da popunite sva obavezna polja.");
      return;
    }

    // Trigger success notification
    setShowSuccess(true);
    
    // Clear message
    setPoruka("");
    
    // Auto hide success after 4 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
      
      {/* Left Column: Form Section */}
      <div className="lg:col-span-8">
        <form 
          onSubmit={handleSubmit}
          className={`relative p-8 rounded-2xl transition-all duration-300 ${
            isDarkMode 
              ? "bg-[#1E293B]/80 text-slate-100 border border-slate-700/60 shadow-black/30" 
              : "bg-[#EAEEF6] text-slate-800 border border-slate-200/50"
          }`}
        >
          {showSuccess && (
            <div className="absolute inset-0 bg-emerald-600/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-white text-center z-10 transition-all">
              <CheckCircle2 size={54} className="mb-3 animate-bounce" />
              <h3 className="text-xl font-bold mb-1">Poruka uspešno poslata!</h3>
              <p className="text-sm opacity-90 max-w-md">
                Studentska služba će obraditi Vaš zahtev i odgovoriti Vam u najkraćem mogućem roku na institucionalni email.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="mt-4 px-4 py-2 bg-white text-emerald-800 font-bold text-xs rounded-lg shadow hover:bg-slate-100 transition-colors"
              >
                U redu
              </button>
            </div>
          )}

          {/* Fields grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Field: Ime */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 select-none">
                Ime
              </label>
              <input
                type="text"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
                className={`w-full pb-1 text-sm font-semibold bg-transparent border-b-2 outline-none transition-all ${
                  isDarkMode 
                    ? "border-slate-700 text-white focus:border-amber-400" 
                    : "border-slate-400/80 text-slate-900 focus:border-[#1E4C9A]"
                }`}
              />
            </div>

            {/* Field: Prezime */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 select-none">
                Prezime
              </label>
              <input
                type="text"
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                required
                className={`w-full pb-1 text-sm font-semibold bg-transparent border-b-2 outline-none transition-all ${
                  isDarkMode 
                    ? "border-slate-700 text-white focus:border-amber-400" 
                    : "border-slate-400/80 text-slate-900 focus:border-[#1E4C9A]"
                }`}
              />
            </div>

            {/* Field: Studijski program */}
            <div className="flex flex-col text-left md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 select-none">
                Studijski program
              </label>
              <select
                value={studijskiProgram}
                onChange={(e) => setStudijskiProgram(e.target.value)}
                required
                className={`w-full pb-2 text-sm font-semibold bg-transparent border-b-2 outline-none transition-all cursor-pointer ${
                  isDarkMode 
                    ? "border-slate-700 text-white focus:border-amber-400 bg-slate-800" 
                    : "border-slate-400/80 text-slate-900 focus:border-[#1E4C9A]"
                }`}
              >
                <option value="Informacioni sistemi i tehnologije" className={isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}>
                  Informacioni sistemi i tehnologije
                </option>
                <option value="Menadžment i organizacija" className={isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}>
                  Menadžment i organizacija
                </option>
              </select>
            </div>

          </div>

          {/* Izaberite problem options checkbox design */}
          <div className="mt-8 text-left">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 select-none">
              Izaberite problem:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={problem === "Uplata"}
                  onChange={() => setProblem("Uplata")}
                  className={`w-4 h-4 rounded focus:ring-1 ${
                    isDarkMode 
                      ? "text-amber-400 focus:ring-amber-400/50 bg-slate-800 border-slate-700" 
                      : "text-blue-600 focus:ring-[#1E4C9A]/50 bg-white border-slate-300"
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200">
                  Uplata
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={problem === "Prijava ispita"}
                  onChange={() => setProblem("Prijava ispita")}
                  className={`w-4 h-4 rounded focus:ring-1 ${
                    isDarkMode 
                      ? "text-amber-400 focus:ring-amber-400/50 bg-slate-800 border-slate-700" 
                      : "text-blue-600 focus:ring-[#1E4C9A]/50 bg-white border-slate-300"
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200">
                  Prijava ispita
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={problem === "Termin konsultacija"}
                  onChange={() => setProblem("Termin konsultacija")}
                  className={`w-4 h-4 rounded focus:ring-1 ${
                    isDarkMode 
                      ? "text-amber-400 focus:ring-amber-400/50 bg-slate-800 border-slate-700" 
                      : "text-blue-600 focus:ring-[#1E4C9A]/50 bg-white border-slate-300"
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200">
                  Termin konsultacija
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={problem === "Drugo"}
                  onChange={() => setProblem("Drugo")}
                  className={`w-4 h-4 rounded focus:ring-1 ${
                    isDarkMode 
                      ? "text-amber-400 focus:ring-amber-400/50 bg-slate-800 border-slate-700" 
                      : "text-blue-600 focus:ring-[#1E4C9A]/50 bg-white border-slate-300"
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200">
                  Drugo
                </span>
              </label>

            </div>
          </div>

          {/* Poruka Textarea */}
          <div className="mt-8 flex flex-col text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 select-none">
              Poruka
            </label>
            <textarea
              placeholder="Napišite..."
              value={poruka}
              onChange={(e) => setPoruka(e.target.value)}
              required
              rows={4}
              className={`w-full text-sm font-medium bg-transparent border-b-2 py-1 outline-none resize-none transition-all ${
                isDarkMode 
                  ? "border-slate-700 text-white placeholder-slate-500 focus:border-amber-400" 
                  : "border-slate-300 text-slate-850 placeholder-slate-400 focus:border-[#1E4C9A]"
              }`}
            />
          </div>

          {/* Submit Button on Bottom Right */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-[#FFA41D] hover:bg-[#E08A00] text-slate-900 font-extrabold text-sm tracking-wide rounded-xl shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 cursor-pointer transition-all border border-amber-500/10"
            >
              <span>Pošalji</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </button>
          </div>

        </form>
      </div>

      {/* Right Column: Royal Blue Kontakt Board */}
      <div className="lg:col-span-4 flex flex-col gap-6 self-stretch justify-between">
        
        {/* Kontakt Blue Box */}
        <div className="bg-[#1E4C9A] text-white p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg gap-7 select-none border border-blue-700/50">
          
          <h3 className="text-xl font-bold tracking-tight border-b border-white/20 pb-2 w-full">
            Kontakt
          </h3>

          {/* Phone */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/15">
              <Phone size={18} />
            </div>
            <a 
              href="tel:+381113950813"
              className="text-sm font-semibold hover:underline tracking-wide hover:text-amber-200 transition-colors"
            >
              +381 11 3950 813
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/15">
              <Mail size={18} />
            </div>
            <a 
              href="mailto:studentska@fon.bg.ac.rs"
              className="text-sm font-semibold hover:underline hover:text-amber-200 transition-all break-all"
            >
              studentska@fon.bg.ac.rs
            </a>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center gap-2 px-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/15">
              <MapPin size={18} />
            </div>
            <span className="text-sm font-bold">Jove Ilića 154</span>
            <span className="text-xs text-white/70 max-w-[200px] leading-relaxed">
              Jove Ilića 154, Beograd 11000, Serbia
            </span>
          </div>

        </div>

        {/* Logo representation */}
        <div className="flex flex-col items-center justify-center">
          <div className={`p-4 rounded-xl shadow-sm border w-full flex items-center justify-center transition-colors ${
            isDarkMode ? "bg-[#1E293B]/60 border-slate-700/50" : "bg-white border-slate-200"
          }`}>
            <FonLogo />
          </div>
        </div>

      </div>

    </div>
  );
}
