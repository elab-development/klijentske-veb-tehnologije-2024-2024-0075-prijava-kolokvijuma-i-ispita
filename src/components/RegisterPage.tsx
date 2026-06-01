import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FonLogo } from "./FonLogo";
import { 
  Loader2, 
  CheckCircle2, 
  Upload, 
  Phone, 
  Mail, 
  FileText, 
  X, 
  MapPin, 
  Maximize2 
} from "lucide-react";

interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onRegisterComplete?: (name: string, indexNum: string) => void;
}

export function RegisterPage({ onNavigateToLogin, onRegisterComplete }: RegisterPageProps) {
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [indexNum, setIndexNum] = useState("");
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Checkbox agreement
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Loading & Flow control
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Full validation check
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Check if all fields are populated
    if (!firstName.trim()) {
      setErrorMsg("Molimo unesite Vaše ime.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMsg("Molimo unesite Vaše prezime.");
      return;
    }
    if (!city.trim()) {
      setErrorMsg("Molimo unesite Vaš grad.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Molimo unesite broj telefona.");
      return;
    }
    if (!jmbg.trim()) {
      setErrorMsg("Molimo unesite Vaš JMBG.");
      return;
    }
    if (!indexNum.trim()) {
      setErrorMsg("Molimo unesite broj indeksa.");
      return;
    }

    // 2. Check if index file has been uploaded
    if (!selectedFile) {
      setErrorMsg("Molimo zakačite sliku prve dve stranice Vašeg indeksa.");
      return;
    }

    // 3. Confirm that square checkbox is checked
    if (!acceptedTerms) {
      setErrorMsg("Morate potvrditi da su uneti podaci ispravni i saglasiti se sa njihovim hrišćenjem.");
      return;
    }

    // Show beautiful mock loading screen
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegSuccess(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1240px] px-4 md:px-0 transition-all duration-300">
      {/* "Registrujte se" Title above the card */}
      <h1 className="text-white text-[32px] font-medium tracking-wide text-center mb-5 select-none">
        Registrujte se
      </h1>

      {/* Main Split registration container */}
      <div className="bg-[#EDF2FA] rounded-[16px] shadow-2xl p-6 md:p-8 w-full border border-white/20 relative">
        <AnimatePresence mode="wait">
          {!regSuccess ? (
            <motion.form
              key="register-split-form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Input Form Fields (7 cols of 12) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* 1. Row: Ime & Prezime */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-gray-700 text-[14.5px] font-semibold select-none pl-1">
                      Ime
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Petar"
                      className="w-full h-[44px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-gray-700 text-[14.5px] font-semibold select-none pl-1">
                      Prezime
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Petrović"
                      className="w-full h-[44px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                    />
                  </div>
                </div>

                {/* 2. Row: Grad & Broj telefona */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-gray-700 text-[14.5px] font-semibold select-none pl-1">
                      Grad
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Beograd"
                      className="w-full h-[44px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-gray-700 text-[14.5px] font-semibold select-none pl-1">
                      Broj telefona
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+381"
                      className="w-full h-[44px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                    />
                  </div>
                </div>

                {/* 3. Row: JMBG & Broj indeksa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-gray-700 text-[14.5px] font-semibold select-none pl-1">
                      JMBG
                    </label>
                    <input
                      type="text"
                      maxLength={13}
                      value={jmbg}
                      onChange={(e) => setJmbg(e.target.value.replace(/\D/g, ""))}
                      placeholder="Unesite 13 cifara"
                      className="w-full h-[44px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-gray-700 text-[14.5px] font-semibold select-none pl-1">
                      Broj indeksa (godina upisa/broj)
                    </label>
                    <input
                      type="text"
                      value={indexNum}
                      onChange={(e) => setIndexNum(e.target.value)}
                      placeholder="2025/0001"
                      className="w-full h-[44px] px-4 rounded-[8px] bg-white border border-slate-200 text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#1E4C9A]/40 focus:border-[#1E4C9A] transition-all"
                    />
                  </div>
                </div>

                {/* 4. Custom Drag-and-Drop Index File Uploader Box */}
                <div className="flex flex-col text-left gap-1 mt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf"
                  />
                  
                  <div
                    onClick={triggerFileSelect}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full py-6 px-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer select-none transition-all ${
                      selectedFile 
                        ? "border-green-500 bg-green-50/40" 
                        : isDragging
                        ? "border-[#1E4C9A] bg-[#1E4C9A]/10"
                        : "border-[#1E4C9A]/30 hover:border-[#1E4C9A] hover:bg-[#1E4C9A]/5 bg-transparent"
                    }`}
                  >
                    {!selectedFile ? (
                      <>
                        <Upload className="text-[#1E4C9A] h-6 w-6 animate-pulse" />
                        <span className="text-[#1E4C9A] font-medium text-[14.5px]">
                          Upload Additional file
                        </span>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 w-full max-w-sm px-2 text-sm justify-between bg-white py-1.5 px-3 rounded border border-green-200 shadow-sm animate-fade-in">
                        <div className="flex items-center gap-2 overflow-hidden truncate">
                          <FileText className="text-green-600 shrink-0" size={18} />
                          <span className="font-semibold text-gray-800 truncate">
                            {selectedFile.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[#4B5563] text-[12px] font-medium mt-1 leading-normal">
                    Zakačite sliku indeksa tako da se vide prve dve stranice.
                  </p>
                </div>

                {/* Checkbox item */}
                <div className="flex items-start gap-2.5 mt-3 text-left">
                  <input
                    id="accept-terms-check"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1E4C9A] focus:ring-[#1E4C9A] cursor-pointer"
                  />
                  <label 
                    htmlFor="accept-terms-check"
                    className="text-[#1F2937] text-[12.5px] font-medium leading-relaxed select-none cursor-pointer"
                  >
                    Potvrđujem da su uneti podaci ispravni i saglasan sam da se koriste.
                  </label>
                </div>

                {/* Validation warnings */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs font-semibold text-left mt-1"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                {/* Submit button bar */}
                <div className="flex justify-start mt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-[200px] h-[46px] rounded-[8px] bg-[#1E4C9A] text-white font-semibold text-[15px] hover:bg-[#163E75] active:scale-[0.98] transition-all flex items-center justify-center shadow-md shadow-[#1E4C9A]/20 cursor-pointer disabled:opacity-80"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin text-white" size={20} />
                    ) : (
                      "Registruj se"
                    )}
                  </button>
                </div>

              </div>

              {/* Right Column: Google Maps Placeholder, Contact info, and Logo (5 cols of 12) */}
              <div className="lg:col-span-5 flex flex-col gap-5 h-full justify-between">
                
                {/* Embedded Map mockup container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden border border-slate-300 shadow bg-white flex flex-col">
                  
                  {/* Real-world maps integration placeholder/wrapper.
                      To plug in a real-world Google Maps API:
                      Simply replace the mock HTML structure below with:
                      <iframe 
                        className="w-full h-full border-0"
                        src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Fakultet+organizacionih+nauka,Beograd" 
                        allowFullScreen>
                      </iframe>
                  */}

                  {/* Aesthetic satellite background lines simulation simulating Google Maps */}
                  <div className="absolute inset-0 bg-[#E5E9F0] pointer-events-none select-none">
                    {/* Simulated map roads and grids */}
                    <div className="absolute w-[2px] h-full left-1/3 bg-white" />
                    <div className="absolute w-[2px] h-full left-2/3 bg-white" />
                    <div className="absolute h-[2px] w-full top-1/4 bg-white" />
                    <div className="absolute h-[2px] w-full top-3/4 bg-white" />
                    <div className="absolute w-28 h-28 rounded-full bg-[#D1D9E6]/30 blur-md left-[15%] top-[10%]" />
                    <div className="absolute w-24 h-24 rounded-full bg-green-100/40 left-[40%] top-[45%]" />
                    
                    {/* Tiny visual parks / river indicators */}
                    <div className="absolute left-[8%] top-[55%] w-16 h-12 rounded-lg bg-[#C1D7AE]/40 rotate-12" />
                    <div className="absolute right-[10%] top-[15%] w-24 h-16 bg-[#C1D7AE]/40 -skew-x-12" />

                    {/* Fictional local text landmarks to resemble genuine maps */}
                    <span className="absolute text-[8px] font-semibold text-zinc-400 left-[5%] top-[35%] tracking-wide uppercase select-none">
                      VOŽDOVAC
                    </span>
                    <span className="absolute text-[8px] font-semibold text-zinc-400 right-[8%] bottom-[20%] tracking-wide uppercase select-none">
                      BANJICA
                    </span>
                    <span className="absolute text-[8px] font-semibold text-zinc-400 left-[40%] top-[5%] tracking-wide uppercase select-none">
                      AUTOKOMANDA
                    </span>
                  </div>

                  {/* Mock Marker representing FON */}
                  <div className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      {/* Pulse ring indicating location focus */}
                      <span className="absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-40 animate-ping" />
                      <div className="bg-red-600 p-2 rounded-full shadow-lg relative z-10 text-white">
                        <MapPin size={18} />
                      </div>
                    </div>
                    <div className="mt-1 bg-white/95 border border-zinc-200/80 px-2 py-0.5 rounded shadow text-[10px] font-bold text-gray-800 uppercase tracking-tight relative max-w-[120px] text-center whitespace-normal select-none">
                      Fakultet organizacionih nauka
                    </div>
                  </div>

                  {/* Overlaid location info badge exactly as rendered in standard Google Maps widgets */}
                  <div className="absolute top-3 left-3 bg-white p-3 rounded shadow-md border border-zinc-200/60 text-left max-w-[240px] z-10 flex gap-2 select-none">
                    <div className="flex-1">
                      <h4 className="text-[12px] font-bold text-gray-900 leading-tight">
                        Jove Ilića 154
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-snug mt-0.5">
                        Jove Ilića 154, Beograd 11000, Serbia
                      </p>
                      <span className="text-[9px] font-bold text-blue-600 hover:underline mt-1 inline-block">
                        Vidi veću mapu
                      </span>
                    </div>
                    <div className="text-blue-600 p-1 hover:bg-slate-100 rounded self-start">
                      <Maximize2 size={13} />
                    </div>
                  </div>

                  {/* Maps logo bottom alignment for aesthetic precision */}
                  <div className="absolute bottom-1 right-2 pointer-events-none select-none text-[10px] font-semibold text-slate-400 tracking-tight">
                    Google
                  </div>
                </div>

                {/* PLACEHOLDER: Communication channels - dynamic links and FON Logo aligned horizontally in a single row (no wrap) */}
                <div className="flex flex-row flex-nowrap items-center justify-between gap-2.5 px-0.5 mt-2.5 w-full select-none">
                  
                  {/* Phone contact channel */}
                  <a 
                    href="tel:+381113950813"
                    className="flex items-center gap-1.5 text-gray-800 hover:text-black transition-colors shrink-0"
                  >
                    <Phone size={15} className="text-black stroke-[2.5]" />
                    <span id="fon-phone-link" className="text-[12.5px] font-bold underline underline-offset-2 tracking-tight whitespace-nowrap">
                      +381 11 3950 813
                    </span>
                  </a>

                  {/* Email contact channel */}
                  <a 
                    href="mailto:studentska@fon.bg.ac.rs"
                    className="flex items-center gap-1.5 text-gray-800 hover:text-black transition-colors shrink-0"
                  >
                    <Mail size={15} className="text-black stroke-[2.5]" />
                    <span id="fon-email-link" className="text-[12.5px] font-bold underline underline-offset-2 tracking-tight whitespace-nowrap">
                      studentska@fon.bg.ac.rs
                    </span>
                  </a>

                  {/* PLACEHOLDER: Place/Insert image logo of the faculty inside FonLogo or swap FonLogo */}
                  <div className="shrink-0">
                    <FonLogo />
                  </div>

                </div>

              </div>

              {/* Embedded login routing footer link in a single line across the bottom spanning 12 cols */}
              <div className="lg:col-span-12 mt-4 pt-4 border-t border-slate-300/40 text-left select-none">
                <span className="text-gray-500 text-[14.5px] font-medium whitespace-nowrap">
                  Već imate studentski nalog?{" "}
                </span>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-[#1E4C9A] hover:text-[#2563EB] text-[14.5px] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer inline whitespace-nowrap"
                >
                  Prijavite se.
                </button>
              </div>

            </motion.form>
          ) : (
            <motion.div
              key="reg-split-success-info"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle2 className="text-[#10B981] w-16 h-16 mb-4 animate-bounce" />
              <h2 className="text-[22px] font-semibold text-gray-800 mb-1.5">
                Dokumentacija predata i nalog uspešno konfigurisan!
              </h2>
              <p className="text-gray-500 text-[14.5px] max-w-[420px] mb-8 leading-relaxed">
                Poštovani, zahtev za registraciju studentskog naloga je uspešno zaprimljen. Podaci i indeks će biti verifikovani uskoro.
              </p>

              <button
                type="button"
                onClick={() => {
                  if (onRegisterComplete) {
                    onRegisterComplete(`${firstName} ${lastName}`, indexNum);
                  } else {
                    onNavigateToLogin();
                  }
                }}
                className="px-8 py-3 bg-[#1E4C9A] text-white hover:bg-[#163E75] text-[15px] font-semibold rounded-lg transition-all shadow-md shadow-[#1E4C9A]/20 duration-150 cursor-pointer"
              >
                Uđi u studentski portal
              </button>

              <div className="mt-12 flex justify-center w-full">
                <FonLogo />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
