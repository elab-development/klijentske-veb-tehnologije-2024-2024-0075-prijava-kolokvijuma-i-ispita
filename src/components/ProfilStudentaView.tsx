import React, { useState, useMemo, useRef } from "react";
import {
  User,
  ShieldCheck,
  RotateCw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";
import { StudentCardManager } from "../class/StudentCardManager";

interface ProfilStudentaViewProps {
  studentName: string;
  studentIndex: string;
}

// Map Latin names/chars to Serbian Cyrillic
function transliterateToCyrillic(text: string): string {
  const map: Record<string, string> = {
    A: "А",
    B: "Б",
    V: "В",
    G: "Г",
    D: "Д",
    Đ: "Ђ",
    E: "Е",
    Ž: "Ж",
    Z: "З",
    I: "И",
    J: "Ј",
    K: "К",
    L: "Л",
    M: "М",
    N: "Н",
    O: "О",
    P: "П",
    R: "Р",
    S: "С",
    T: "Т",
    Ć: "Ћ",
    U: "У",
    F: "Ф",
    H: "Х",
    C: "Ц",
    Č: "Ч",
    Š: "Ш",
    a: "а",
    b: "б",
    v: "в",
    g: "г",
    d: "д",
    đ: "ђ",
    e: "е",
    ž: "ж",
    z: "з",
    i: "и",
    j: "ј",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    r: "р",
    s: "с",
    t: "т",
    ć: "ћ",
    u: "у",
    f: "ф",
    h: "х",
    c: "ц",
    č: "ч",
    š: "ш",
  };

  let result = text;
  result = result.replace(/Lj/g, "Љ").replace(/lj/g, "љ");
  result = result.replace(/Nj/g, "Њ").replace(/nj/g, "њ");
  result = result.replace(/Dž/g, "Џ").replace(/dž/g, "џ");
  result = result.replace(/DŽ/g, "Џ");

  return result
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

export function ProfilStudentaView({
  studentName,
  studentIndex,
}: ProfilStudentaViewProps) {
  // Instantiate student card manager
  const cardManager = useMemo(() => new StudentCardManager(), []);

  // Set default details based on index or placeholders
  const isDemoUser =
    studentIndex === "2025/0001" || studentIndex === "2023/3858";

  const studentDetails = useMemo(() => {
    return {
      fullName: transliterateToCyrillic(studentName),
      parentName: transliterateToCyrillic(isDemoUser ? "Goran" : "Zoran"),
      index: studentIndex,
      jmbg: isDemoUser ? "0206004710034" : "1509003710129",
      email: `${studentName.toLowerCase().replace(/\s+/g, ".")}@is.fon.bg.ac.rs`,
      phone: "+381 64 123 4567",
      studyProgram: "Информациони системи и технологије",
      module: "Софтверско инжењерство",
      financialStatus: "Буџет",
    };
  }, [studentName, studentIndex, isDemoUser]);

  // Derived student card info
  const cardData = useMemo(() => {
    const birthdate = cardManager.parseBirthdateFromJmbg(studentDetails.jmbg);
    const rawCardNumber = cardManager.generateCardNumber(
      studentDetails.index,
      studentDetails.jmbg,
    );
    const isicFormatted = cardManager.formatIsicNumber(rawCardNumber);
    const dates = cardManager.calculateDates(studentDetails.index);

    return {
      birthdate,
      cardNumber: rawCardNumber,
      isicFormatted,
      issued: dates.issued,
      validUntil: dates.validUntil,
    };
  }, [cardManager, studentDetails]);

  // Visual card controls
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, r: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Card tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Normalize values
    const rX = (mouseY / (height / 2)) * -10; // tilt limit
    const rY = (mouseX / (width / 2)) * 10;

    // Highlight coordinate
    const percentageX = ((e.clientX - rect.left) / width) * 100;
    const percentageY = ((e.clientY - rect.top) / height) * 100;

    setTilt({ x: percentageX, y: percentageY, r: 1 });
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setTilt((prev) => ({ ...prev, r: 0 }));
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const displayName = studentDetails.fullName.toUpperCase();
  const displayFaculty =
    "УНИВЕРЗИТЕТ У БЕОГРАДУ\nФАКУЛТЕТ ОРГАНИЗАЦИОНИХ НАУКА";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      {/* Left Column: Card + Details */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Virtual Student Card Interactive Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 select-none">
                <Sparkles size={18} className="text-teal-600 animate-pulse" />
                Виртуелна студентска картица (ISIC)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Интерактивни приказ Ваше званичне ИСИЦ идентификационе картице
              </p>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="btn-flip-card"
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <RotateCw
                  size={14}
                  className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`}
                />
                Окрени картицу
              </button>
            </div>
          </div>

          {/* Perspective Container with strict 1.586 credit card ratio */}
          <div className="w-full flex justify-center py-4 select-none">
            <div
              id="isic-card-3d-wrapper"
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full max-w-[480px] aspect-[1.586] rounded-2xl shadow-xl transition-all duration-300 ease-out cursor-pointer overflow-hidden border border-teal-500/10"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card Holographic / Gloss shine overlay */}
              {tilt.r === 1 && !isFlipped && (
                <div
                  className="absolute inset-0 pointer-events-none z-30 opacity-30 transition-opacity duration-150"
                  style={{
                    background: `radial-gradient(circle at ${tilt.x}% ${tilt.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%), linear-gradient(${tilt.x + tilt.y}deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)`,
                    mixBlendMode: "overlay",
                  }}
                />
              )}

              {/* CARD FRONT SIDE */}
              <div
                className={`absolute inset-0 w-full h-full bg-gradient-to-br from-[#009E96] via-[#10bebe] to-[#00807a] flex flex-col justify-between p-[3.5%] transition-all duration-500 [backface-visibility:hidden] ${
                  isFlipped
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
              >
                {/* Curved waves on teal background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 480 302"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 120 C 120 180, 280 60, 480 140 L 480 302 L 0 302 Z"
                      fill="#ffffff"
                      fillOpacity="0.25"
                    />
                    <path
                      d="M0 160 C 180 230, 320 80, 480 190 L 480 302 L 0 302 Z"
                      fill="#ffffff"
                      fillOpacity="0.15"
                    />
                    <circle
                      cx="420"
                      cy="80"
                      r="120"
                      fill="#00e5ff"
                      fillOpacity="0.15"
                    />
                  </svg>
                </div>

                {/* Top Section - Teal Header Bar containing White ISIC Plate & UNESCO Badge */}
                <div className="absolute top-0 inset-x-0 h-[24%] flex justify-between items-start z-10 pointer-events-none">
                  {/* Slanted White Plate for ISIC Brand logo */}
                  <div
                    className="bg-white h-full w-[54%] flex items-center pl-[4.5%] gap-[6%] shadow-md"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
                    }}
                  >
                    <div className="w-[28%] aspect-square rounded-full bg-[#009E96] flex items-center justify-center font-black text-[3.2vw] sm:text-[17px] text-white shadow-sm shrink-0">
                      ISIC
                    </div>
                    <div className="flex flex-col justify-center leading-none">
                      <span className="text-[1.2vw] sm:text-[7px] font-extrabold text-[#009E96] tracking-[0.12em] uppercase leading-none">
                        INTERNATIONAL
                      </span>
                      <span className="text-[2.8vw] sm:text-[16px] font-black text-slate-800 tracking-tighter leading-none my-[3px]">
                        STUDENT
                      </span>
                      <span className="text-[1vw] sm:text-[6px] font-extrabold text-teal-600 uppercase tracking-[0.18em] leading-none">
                        IDENTITY CARD
                      </span>
                    </div>
                  </div>

                  {/* UNESCO Badge & ISIC ID Number */}
                  <div className="h-full flex items-center gap-[5%] pr-[3.5%]">
                    <div className="flex items-center gap-[8px] opacity-95 shrink-0">
                      {/* UNESCO Columns Icon in dark teal */}
                      <div className="flex flex-col items-center shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-[4.2vw] h-[4.2vw] max-w-[26px] max-h-[26px] text-slate-800"
                          fill="currentColor"
                        >
                          <path d="M12 2L2 7v2h20V7L12 2zm-8 8v9h2v-9H4zm4 0v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2zM2 20v2h20v-2H2z" />
                        </svg>
                        <span className="text-[1vw] sm:text-[5.5px] font-serif font-black text-slate-800 tracking-widest leading-none mt-[1px]">
                          UNESCO
                        </span>
                      </div>
                      <span className="text-[1.2vw] sm:text-[7.5px] font-black text-slate-800 leading-tight uppercase">
                        UNESCO
                        <br />
                        ASSOCIATE
                      </span>
                    </div>
                    <div className="h-[55%] w-[1px] bg-slate-400/30 mx-[2px]" />
                    <div className="flex flex-col text-right shrink-0">
                      <span className="text-[1.1vw] sm:text-[6px] text-slate-600 font-bold tracking-wide uppercase leading-none">
                        ISIC card number
                      </span>
                      <span className="text-[2vw] sm:text-[11.5px] font-mono font-black tracking-wide text-slate-800 leading-tight mt-[1px]">
                        {cardData.isicFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Body Section (Chips, Logos, and Portrait placement) */}
                {/* Background underneath the top bar: light blue gradient */}
                <div className="absolute inset-x-0 top-[24%] bottom-[32%] bg-gradient-to-b from-[#dbfcfb] to-[#f4fdfd] p-[3.5%] flex flex-col justify-between">
                  {/* Left row: chip & logos */}
                  <div className="w-[66%] flex flex-col justify-between h-full">
                    {/* Golden chip & EYCA, Serbian Coat of Arms */}
                    <div className="flex items-center gap-[6%] mt-[1%]">
                      {/* Standard credit card gold chip */}
                      <div className="w-[17%] aspect-[1.3] rounded-md bg-gradient-to-br from-yellow-100 via-amber-300 to-amber-500 border border-amber-600/30 shadow-sm relative overflow-hidden flex flex-col justify-between p-[2%] shrink-0">
                        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                        <div className="border-b border-r border-amber-600/30 w-1/2 h-1/2" />
                        <div className="border-t border-r border-amber-600/30 w-1/2 h-1/2" />
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-600/30" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-600/30" />
                        <div className="absolute w-[30%] aspect-square rounded-full border border-amber-600/30 bg-amber-300/40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>

                      {/* EYCA */}
                      <div className="flex items-center gap-[8px] shrink-0">
                        {/* Yellow text on pink background for EYCA badge */}
                        <div className="bg-[#E2007A] text-[#FFF200] w-[8vw] h-[8vw] sm:w-[44px] sm:h-[44px] rounded-lg flex flex-col justify-center items-center shadow-sm select-none font-sans italic leading-none font-black text-[2.2vw] sm:text-[12px] tracking-tighter shrink-0">
                          <span className="ml-[-3px]">ey</span>
                          <span className="mr-[-3px] mt-[-2px]">ca</span>
                        </div>
                        <div className="flex flex-col justify-center leading-none">
                          <span className="text-[1.3vw] sm:text-[8.5px] font-extrabold text-[#E2007A] uppercase tracking-tight">
                            European
                          </span>
                          <span className="text-[1.8vw] sm:text-[10.5px] font-black text-[#E2007A] uppercase tracking-tighter mt-[1.2px]">
                            Youth Card
                          </span>
                        </div>
                      </div>

                      {/* Serbian Flag/Grb (Real Coat of Arms Vector from Wikimedia Commons served via reliable weserv image proxy) */}
                      <img
                        src="/srbgrb.png"
                        alt="Grb Srbije"
                        className="w-[12.5vw] sm:w-[62px] h-auto drop-shadow-md shrink-0 select-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Studies At section */}
                    <div className="flex flex-col mt-[2%] leading-tight">
                      <span className="text-[1.1vw] sm:text-[6.5px] font-extrabold text-[#009E96] tracking-wide uppercase">
                        Студира на | Studies at
                      </span>
                      <p className="text-[1.8vw] sm:text-[10px] font-black text-slate-800 whitespace-pre-line uppercase tracking-wide leading-tight mt-[1px]">
                        {displayFaculty}
                      </p>
                    </div>
                  </div>

                  {/* Absolute Portrait container on the right side spanning multiple layers */}
                  <div className="absolute right-[4%] top-[-10%] w-[25%] h-[120%] bg-white border border-slate-300 rounded-lg p-[1.5%] shadow-md flex items-center justify-center overflow-hidden z-20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

                    {/* Graphic portrait avatar placeholder */}
                    <div className="w-full h-full bg-slate-100 rounded border border-slate-150 overflow-hidden flex flex-col items-center justify-end relative">
                      <svg
                        className="w-[70%] h-[70%] text-slate-300 absolute top-[15%]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>

                      {/* Holographic custom watermarking over the face */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/5 to-transparent pointer-events-none rotate-45 transform scale-150" />

                      <div className="w-full py-[4%] bg-teal-600 text-[1.3vw] sm:text-[7.5px] font-black text-white text-center uppercase tracking-wider z-10">
                        STUDENT
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Contains Metadata Fields */}
                <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[#ffffff] border-t border-slate-200 p-[3.5%] flex flex-col justify-between z-10">
                  <div className="grid grid-cols-12 h-full items-center gap-[2%]">
                    {/* Col 1: Cardholder Name & Birthdate */}
                    <div className="col-span-5 flex flex-col justify-center h-full border-r border-slate-100 pr-[4%]">
                      <span className="text-[1.1vw] sm:text-[6.5px] font-bold text-slate-400 leading-none">
                        Име и презиме | Cardholder name
                      </span>
                      <span className="text-[1.9vw] sm:text-[11.5px] font-black text-slate-800 uppercase tracking-wide truncate mt-[2px] leading-tight">
                        {displayName}
                      </span>

                      <span className="text-[1.1vw] sm:text-[6.5px] font-bold text-slate-400 leading-none mt-[4%]">
                        Датум рођења | Date of birth
                      </span>
                      <span className="text-[1.7vw] sm:text-[10px] font-mono font-black text-slate-700 mt-[1px] leading-tight">
                        {cardData.birthdate}
                      </span>
                    </div>

                    {/* Col 2: Dates (Issued / Valid) */}
                    <div className="col-span-4 flex flex-col justify-center h-full border-r border-slate-100 px-[4%]">
                      <span className="text-[1.1vw] sm:text-[6.5px] font-bold text-slate-400 leading-none">
                        Датум издавања | Issued
                      </span>
                      <span className="text-[1.7vw] sm:text-[10px] font-mono font-black text-slate-700 mt-[2px] leading-tight">
                        {cardData.issued}
                      </span>

                      <span className="text-[1.1vw] sm:text-[6.5px] font-bold text-slate-400 leading-none mt-[4%]">
                        Важи до | Valid Until
                      </span>
                      <span className="text-[1.7vw] sm:text-[10px] font-mono font-black text-rose-600 mt-[1px] leading-tight">
                        {cardData.validUntil}
                      </span>
                    </div>

                    {/* Col 3: Student index / Real ID */}
                    <div className="col-span-3 flex flex-col justify-center h-full pl-[4%]">
                      <span className="text-[1.1vw] sm:text-[6.5px] font-bold text-slate-400 leading-none">
                        Број индекса | Student ID
                      </span>
                      <span className="text-[1.7vw] sm:text-[10px] font-mono font-black text-teal-700 mt-[2px] leading-tight">
                        {studentDetails.index}
                      </span>

                      <span className="text-[1.1vw] sm:text-[6.5px] font-bold text-slate-400 leading-none mt-[4%]">
                        Број картице | Card No.
                      </span>
                      <span className="text-[1.6vw] sm:text-[9.5px] font-mono font-bold text-slate-600 mt-[1px] truncate leading-none">
                        {cardData.cardNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD BACK SIDE */}
              <div
                className={`absolute inset-0 w-full h-full bg-[#EBF9F9] flex flex-col justify-between p-[4%] border border-teal-500/20 rounded-2xl shadow-xl transition-all duration-500 [backface-visibility:hidden] ${
                  isFlipped
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Magnetic Stripe */}
                <div className="absolute top-[8%] left-0 right-0 h-[12%] bg-neutral-800" />

                {/* Back Header */}
                <div className="mt-[16%] flex justify-between items-start z-10">
                  <div className="flex flex-col">
                    <span className="text-[1.6vw] sm:text-[9px] font-black text-teal-800 tracking-wide uppercase leading-none">
                      РЕПУБЛИКА СРБИЈА
                    </span>
                    <span className="text-[1vw] sm:text-[6px] text-slate-500 font-bold leading-tight uppercase mt-[1px]">
                      Министарство просвете, науке и технолошког развоја
                    </span>
                  </div>
                  <div className="w-[8%] aspect-square rounded-full border border-teal-200 flex items-center justify-center bg-white shadow-inner max-w-[32px]">
                    <FonLogo />
                  </div>
                </div>

                {/* Central bar code representation */}
                <div className="flex flex-col items-center justify-center my-[1.5%] z-10">
                  <div className="bg-white px-[4%] py-[2%] rounded border border-slate-200 flex flex-col items-center shadow-sm">
                    {/* Barcode Mock Lines */}
                    <div className="flex items-center gap-[1.5px] h-[3vw] min-h-[16px] max-h-[32px] select-none">
                      <div className="w-[1.5px] bg-black h-full" />
                      <div className="w-[3px] bg-black h-full" />
                      <div className="w-[1px] bg-black h-full" />
                      <div className="w-[1.5px] bg-black h-full" />
                      <div className="w-[4px] bg-black h-full" />
                      <div className="w-[1.5px] bg-black h-full" />
                      <div className="w-[1px] bg-black h-full" />
                      <div className="w-[3px] bg-black h-full" />
                      <div className="w-[2px] bg-black h-full" />
                      <div className="w-[1px] bg-black h-full" />
                      <div className="w-[4px] bg-black h-full" />
                      <div className="w-[1.5px] bg-black h-full" />
                      <div className="w-[2px] bg-black h-full" />
                      <div className="w-[1px] bg-black h-full" />
                      <div className="w-[3px] bg-black h-full" />
                    </div>
                    <span className="text-[1.4vw] sm:text-[8px] font-mono text-slate-700 mt-[1.5px] tracking-[3px]">
                      *{studentDetails.index}*
                    </span>
                  </div>
                </div>

                {/* Warning and standard terms */}
                <div className="text-[1vw] sm:text-[6.5px] text-slate-500 leading-normal px-[2%] text-center font-semibold border-t border-slate-300/40 pt-[2%]">
                  Картица је лична и непреносива. Свака злоупотреба подлеже
                  академском дисциплинском правилнику ФОН-а и ИСИЦ асоцијације.
                  <br />У случају проналаска вратити на адресу: Јове Илића 154,
                  Београд. Тел: +381 11 3950 800.
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-1.5 text-xs text-slate-500 mt-1 text-center select-none">
            <AlertCircle size={13} className="text-slate-400" />
            <span>
              Кликните на картицу или дугме "Окрени картицу" да бисте видели
              другу страну
            </span>
          </div>
        </div>

        {/* Profile Card Container matching screenshot style */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-150 select-none">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2.5">
              Административни подаци о студенту
            </h2>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
              <User size={20} />
            </div>
          </div>

          {/* Table representing exactly the screenshot */}
          <div className="border-2 border-black rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {/* 1. Ime i prezime */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Име и презиме
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.fullName}
                  </td>
                </tr>

                {/* 2. Ime jednog roditelja */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Име једног родитеља
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.parentName}
                  </td>
                </tr>

                {/* 3. Broj indeksa */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Број индекса
                  </td>
                  <td className="w-1/2 py-3 px-4 text-[#1E4C9A] font-bold text-xs sm:text-sm text-center font-mono">
                    {studentDetails.index}
                  </td>
                </tr>

                {/* 4. JMBG */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    ЈМБГ
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center font-mono tracking-wider">
                    {studentDetails.jmbg}
                  </td>
                </tr>

                {/* 5. Email */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Е-пошта
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-[11px] sm:text-xs text-center break-all select-all">
                    {studentDetails.email}
                  </td>
                </tr>

                {/* 6. Broj telefona */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Број телефона
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.phone}
                  </td>
                </tr>

                {/* 7. Studijski program */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Студијски програм
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-bold text-xs sm:text-sm text-center">
                    {studentDetails.studyProgram}
                  </td>
                </tr>

                {/* 8. Modul */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Модул
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.module}
                  </td>
                </tr>

                {/* 9. Status finansiranja */}
                <tr>
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Статус финансирања
                  </td>
                  <td className="w-1/2 py-3 px-4 text-emerald-700 font-extrabold text-xs sm:text-sm text-center">
                    <span className="inline-block bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                      {studentDetails.financialStatus}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Calendar & Emblem */}
      <div className="lg:col-span-4 flex flex-col gap-5 self-stretch">
        <Calendar />

        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow border border-slate-200 p-6 min-h-[140px]">
          <div className="max-w-[145px] w-full flex items-center justify-center opacity-90">
            <FonLogo />
          </div>
        </div>
      </div>
    </div>
  );
}
