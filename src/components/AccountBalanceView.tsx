import React, { useState } from "react";
import { CreditCard, Printer, CheckCircle, RefreshCw, FileText, Info } from "lucide-react";
import { AcademicRegistry } from "../class/AcademicStats";
import { PaymentRecord } from "../models/PaymentRecord";
import { useTheme } from "../context/ThemeContext";

export const initialPayments: PaymentRecord[] = [
  { id: "1", type: "Školarina", amount: "31.000", installments: "4", date: "05.08.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "2", type: "Školarina", amount: "31.000", installments: "4", date: "04.08.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "3", type: "Prijava ispita", amount: "2.000", installments: "1", date: "03.08.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "4", type: "Školarina", amount: "31.000", installments: "5", date: "29.07.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "5", type: "Školarina", amount: "50.000", installments: "6", date: "28.07.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" }
];

interface AccountBalanceViewProps {
  studentName?: string;
  studentIndex?: string;
  payments: PaymentRecord[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

export function AccountBalanceView({ 
  studentName = "Ime Prezime", 
  studentIndex = "2025/0001",
  payments,
  setPayments,
  accountBalance,
  setAccountBalance
}: AccountBalanceViewProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  const formatSerbianCurrency = (val: number) => {
    return AcademicRegistry.formatCurrency(val);
  };

  const handleSprovediUplatu = () => {
    // Clean to get real numerical value
    const cleanedAmount = amountValue
      .replace(/[^\d,.]/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".");
    
    const parsedNum = parseFloat(cleanedAmount) || 0;
    if (parsedNum <= 0) {
      alert("Molimo unesite ispravan iznos.");
      return;
    }

    // Determine clean presentation for amount (truncate decimal if it is simple ,00)
    let displayAmount = amountValue;
    if (displayAmount.includes(",")) {
      displayAmount = displayAmount.split(",")[0];
    } else if (displayAmount.includes(".")) {
      displayAmount = displayAmount.split(".")[0];
    }

    const newRecord: PaymentRecord = {
      id: String(Date.now()),
      type: purposeOfPayment || "Uplata na račun",
      amount: displayAmount,
      installments: "1",
      date: new Date().toLocaleDateString("sr-RS"),
      yearOfStudy: "prva",
      status: "proknjiženo",
      paymentCode: paymentCode || "189"
    };

    setPayments(prev => [newRecord, ...prev]);
    setAccountBalance(prev => prev + parsedNum);
    setSuccessMessage(`Uplata od ${amountValue} RSD je proknjižena! Sredstva su odmah legla na Vaš račun.`);

    // Auto clear alert
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };
  
  // Custom states for interactive slip
  const [payerName, setPayerName] = useState(studentName);
  const [payerAddress, setPayerAddress] = useState("Jove Ilića 154, Beograd");
  const [purposeOfPayment, setPurposeOfPayment] = useState("Školarina");
  const [recipient, setRecipient] = useState("Fakultet organizacionih nauka - Univerzitet u Beogradu");
  const [paymentCode, setPaymentCode] = useState("189");
  const [amountValue, setAmountValue] = useState("31.000,00");
  const [recipientAccount, setRecipientAccount] = useState("840-0000032902845-54");
  const [modelValue, setModelValue] = useState("97");

  // Dynamic Poziv na broj calculation based on student info
  const cleanedIndex = studentIndex ? studentIndex.replace(/[^0-9]/g, "") : "20250001";
  const defaultReference = `7311${cleanedIndex}`;
  const [referenceValue, setReferenceValue] = useState(defaultReference);

  const handleRowSelect = (payment: PaymentRecord) => {
    setPayerName(studentName);
    setPurposeOfPayment(payment.type);
    
    // Convert e.g., "31.000" to "31.000,00"
    const parsedAmount = payment.amount.includes(",") ? payment.amount : `${payment.amount},00`;
    setAmountValue(parsedAmount);
    
    setPaymentCode(payment.paymentCode || "189");
    
    // Keep reference updated
    if (payment.type === "Prijava ispita") {
      setPurposeOfPayment("Prijava ispita za ispitni rok");
      setReferenceValue(`7311${cleanedIndex}`);
    } else {
      setPurposeOfPayment("Školarina - Rata za osnovne studije");
      setReferenceValue(`7311${cleanedIndex}`);
    }
  };

  const handlePrint = () => {
    // Standard window print
    window.print();
  };

  const trBorderClass = isDarkMode ? "border-slate-800" : "border-black";
  const cellBorderClass = isDarkMode ? "border-slate-800" : "border-black";

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn select-none">

      {/* Dynamic Success Alert */}
      {successMessage && (
        <div className={`border rounded-2xl p-4 text-xs font-semibold flex items-center gap-3 animate-fadeIn text-left print:hidden shadow-sm ${
          isDarkMode ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-emerald-50 border-emerald-300 text-emerald-800"
        }`}>
          <div className="p-2 bg-emerald-500 text-white rounded-xl shrink-0">
            <CheckCircle size={16} />
          </div>
          <div className="flex-1">
            <p className="font-bold">Uplata proknjižena!</p>
            <p className={`font-normal mt-0.5 ${isDarkMode ? "text-emerald-400" : "text-emerald-700/95"}`}>{successMessage}</p>
          </div>
        </div>
      )}
      
      {/* Informative Header card */}
      <div className={`rounded-2xl shadow p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden border transition-all duration-300 ${
        isDarkMode 
          ? "bg-[#1E293B]/80 border-slate-700/60 text-white shadow-black/25" 
          : "bg-white border-slate-200 text-slate-800"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${
            isDarkMode ? "bg-blue-950/50 text-[#5E97F6]" : "bg-blue-50 text-[#1E4C9A]"
          }`}>
            <CreditCard size={24} />
          </div>
          <div className="text-left">
            <h2 className={`text-lg font-bold leading-normal ${isDarkMode ? "text-white" : "text-slate-900"}`}>Stanje na finansijskoj kartici</h2>
            <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Pregled svih ostvarenih uplata, školarina i trenutnog stanja na ličnom računu akademca.</p>
          </div>
        </div>

        <button 
          onClick={handlePrint}
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-xl text-xs font-semibold shadow-sm transition-all focus:outline-none cursor-pointer ${
            isDarkMode ? "bg-amber-500 hover:bg-amber-600 !text-slate-950" : "bg-[#1E4C9A] hover:bg-[#153a77]"
          }`}
        >
          <Printer size={15} />
          Odštampaj nalog
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Balance table mirroring user screenshot exactly */}
        <div className={`rounded-2xl p-6 shadow border transition-all duration-300 lg:col-span-12 xl:col-span-7 print:shadow-none print:border-none print:p-0 ${
          isDarkMode ? "bg-[#1E293B]/80 border-slate-705/30 shadow-black/35" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center justify-between mb-4 print:hidden">
            <span className={`font-bold text-sm tracking-tight flex items-center gap-2 ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
              <FileText size={16} className={isDarkMode ? "text-[#5E97F6]" : "text-[#1E4C9A]"} />
              Istorija uplata i zaduženja
            </span>
            <span className={`text-[10px] p-1 px-2.5 rounded-full font-medium ${
              isDarkMode ? "text-slate-400 bg-slate-800" : "text-slate-400 bg-slate-100"
            }`}>
              Klikni na bilo koji red da popuniš uplatnicu ispod
            </span>
          </div>

          {/* Core Table styled identically to the design file */}
          <div className="w-full overflow-x-auto select-none rounded-lg border border-black/40">
            <table className={`w-full min-w-[650px] border-collapse text-xs ${
              isDarkMode ? "bg-[#141c2c] text-slate-100" : "bg-white text-slate-900"
            }`}>
              <thead>
                <tr className={`border-b ${
                  isDarkMode ? "bg-[#141b2a] border-slate-700/60 text-slate-200" : "bg-[#f8fafc] border-black"
                }`}>
                  <th className={`border font-extrabold text-center py-2.5 px-3 uppercase tracking-wider ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50"}`}>Tip uplate</th>
                  <th className={`border font-extrabold text-center py-2.5 px-3 uppercase tracking-wider ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50"}`}>Iznos (RSD)</th>
                  <th className={`border font-extrabold text-center py-2.5 px-3 uppercase tracking-wider text-center ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50"}`}>Broj rata</th>
                  <th className={`border font-extrabold text-center py-2.5 px-3 uppercase tracking-wider ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50"}`}>Datum uplate</th>
                  <th className={`border font-extrabold text-center py-2.5 px-3 uppercase tracking-wider ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50"}`}>Godina studija</th>
                  <th className={`border font-extrabold text-center py-2.5 px-3 uppercase tracking-wider ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50"}`}>Status upisa</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr 
                    key={payment.id}
                    title="Klikni da popuniš nalog za uplatu"
                    onClick={() => handleRowSelect(payment)}
                    className={`cursor-pointer transition-colors duration-150 border-b ${
                      isDarkMode 
                        ? "hover:bg-[#1f2c41] active:bg-[#25354e] border-slate-800/80" 
                        : "hover:bg-blue-50/60 active:bg-blue-100 border-black/50"
                    }`}
                  >
                    <td className={`border py-2.5 px-3 text-left font-medium ${isDarkMode ? "border-slate-800 text-slate-200" : "border-black text-slate-800"}`}>
                      {payment.type}
                    </td>
                    <td className={`border py-2.5 px-3 text-right font-semibold font-mono ${isDarkMode ? "border-slate-800" : "border-black"}`}>{payment.amount}</td>
                    <td className={`border py-2.5 px-3 text-center font-mono ${isDarkMode ? "border-slate-800" : "border-black"}`}>{payment.installments}</td>
                    <td className={`border py-2.5 px-3 text-center font-mono ${isDarkMode ? "border-slate-800" : "border-black"}`}>{payment.date}</td>
                    <td className={`border py-2.5 px-3 text-center ${isDarkMode ? "border-slate-800" : "border-black"}`}>{payment.yearOfStudy}</td>
                    <td className={`border py-2.5 px-3 text-center ${isDarkMode ? "border-slate-800 text-slate-300" : "border-black text-slate-700"}`}>{payment.status}</td>
                  </tr>
                ))}
                
                {/* Stanje na racunu exact match background card footer */}
                <tr className={`border-t-2 font-extrabold text-sm ${
                  isDarkMode 
                    ? "bg-[#162135] border-slate-700 text-white" 
                    : "bg-[#e2e8f0]/85 border-black/90 text-slate-900"
                }`}>
                  <td colSpan={6} className={`border py-3 px-4 text-center tracking-wide text-[13px] md:text-sm ${isDarkMode ? "border-slate-800" : "border-black"}`}>
                    Stanje na računu: <span className={isDarkMode ? "text-amber-400 font-bold" : "text-[#1E4C9A]"}>{formatSerbianCurrency(accountBalance)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`mt-3 flex gap-2 items-start text-left text-[11px] p-3 rounded-lg border print:hidden select-none ${
            isDarkMode 
              ? "bg-[#111a2f] border-slate-800/80 text-slate-400" 
              : "bg-slate-50 border-slate-100 text-slate-500"
          }`}>
            <Info size={15} className={`mt-0.5 shrink-0 ${isDarkMode ? "text-amber-400" : "text-blue-500"}`} />
            <p>
              Uplatnice se evidentiraju u roku od 24 sata od momenta uplate u pošti ili banci. Finansijski saldo automatski kontroliše studentska služba i omogućava upis ispita u redovnim i vanrednim rokovima.
            </p>
          </div>
        </div>

        {/* Right column: Slip generator and visual Nalog za uplatu */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-5">
          
          {/* Controls to manually change values for the student */}
          <div className={`rounded-2xl p-5 shadow border text-left print:hidden transition-all duration-300 ${
            isDarkMode ? "bg-[#1E293B]/80 border-slate-705/30 text-white shadow-black/35" : "bg-white border-slate-200"
          }`}>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <RefreshCw size={14} className={isDarkMode ? "text-amber-400 animate-spin-slow" : "text-blue-500"} />
              Kontrola uplatnice
            </h3>
            
            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="col-span-2">
                <label className={`block font-medium mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Uplatilac (Ime, prezime, adresa)</label>
                <input 
                  type="text" 
                  value={payerName} 
                  onChange={(e) => setPayerName(e.target.value)}
                  className={`w-full px-2.5 py-1.5 border rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDarkMode 
                      ? "bg-[#121824] border-slate-800 text-slate-100 focus:ring-amber-400" 
                      : "border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              <div className="col-span-2">
                <label className={`block font-medium mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Svrha uplate</label>
                <input 
                  type="text" 
                  value={purposeOfPayment} 
                  onChange={(e) => setPurposeOfPayment(e.target.value)}
                  className={`w-full px-2.5 py-1.5 border rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDarkMode 
                      ? "bg-[#121824] border-slate-800 text-slate-100 focus:ring-amber-400" 
                      : "border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              <div>
                <label className={`block font-medium mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Iznos (RSD)</label>
                <input 
                  type="text" 
                  value={amountValue} 
                  onChange={(e) => setAmountValue(e.target.value)}
                  className={`w-full px-2.5 py-1.5 border rounded-lg text-xs font-semibold font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDarkMode 
                      ? "bg-[#121824] border-slate-800 text-slate-100 focus:ring-amber-400" 
                      : "border-slate-200 text-slate-800 whitespace-nowrap"
                  }`}
                />
              </div>

              <div>
                <label className={`block font-medium mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Poziv na broj</label>
                <input 
                  type="text" 
                  value={referenceValue} 
                  onChange={(e) => setReferenceValue(e.target.value)}
                  className={`w-full px-2.5 py-1.5 border rounded-lg text-xs font-semibold font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDarkMode 
                      ? "bg-[#121824] border-slate-800 text-slate-100 focus:ring-amber-400" 
                      : "border-slate-200 text-slate-800 whitespace-nowrap"
                  }`}
                />
              </div>
            </div>
            
            <div className="mt-4 flex gap-1.5">
              <button 
                onClick={() => {
                  setPurposeOfPayment("Upis ispita i overa semestra");
                  setAmountValue("2.000,00");
                  setPaymentCode("189");
                }}
                className={`flex-1 py-1.5 px-1 text-[10px] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer ${
                  isDarkMode 
                    ? "bg-[#121824] hover:bg-slate-800 text-amber-400 border border-slate-800" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-transparent"
                }`}
              >
                + Prijava ispita
              </button>
              <button 
                onClick={() => {
                  setPurposeOfPayment("Školarina - Rata akademija");
                  setAmountValue("31.000,00");
                  setPaymentCode("189");
                }}
                className={`flex-1 py-1.5 px-1 text-[10px] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer ${
                  isDarkMode 
                    ? "bg-[#121824] hover:bg-slate-800 text-amber-400 border border-slate-800" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-transparent"
                }`}
              >
                + Rata školarine
              </button>
              <button 
                onClick={() => {
                  setPurposeOfPayment("Školarina - Uplata semestra");
                  setAmountValue("50.000,00");
                  setPaymentCode("189");
                }}
                className={`flex-1 py-1.5 px-1 text-[10px] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer ${
                  isDarkMode 
                    ? "bg-[#121824] hover:bg-slate-800 text-amber-400 border border-slate-800" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-transparent"
                }`}
              >
                + Cela školarina
              </button>
            </div>
            <button
              onClick={handleSprovediUplatu}
              className={`mt-4 w-full py-2.5 px-4 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 ${
                isDarkMode 
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/20" 
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
              }`}
            >
              <CheckCircle size={15} />
              Izvrši uplatu (Proknjiži na račun)
            </button>
          </div>

          {/* Genuine Authentic Serbian "Nalog za Uplatu" paper visual representation */}
          <div className={`p-4 sm:p-5 rounded-2xl shadow border select-none overflow-x-auto print:shadow-none print:border-none print:p-0 transition-all duration-300 ${
            isDarkMode ? "bg-[#1E293B]/80 border-slate-705/30 shadow-black/35" : "bg-white border-slate-200"
          }`}>
            <div className="uplatnica-print-target min-w-[480px] max-w-full text-left font-serif text-[#0b0c10] bg-[#FFFDEF] border-2 border-[#b45309] rounded p-4 relative overflow-hidden leading-snug">
              
              {/* Slip Header watermark */}
              <div className="flex justify-between items-center pb-2.5 border-b-2 border-[#b45309]">
                <span className="text-[10px] tracking-widest font-bold font-sans opacity-95 text-[#b45309]">UPLATILAC</span>
                <span className="text-sm font-black font-sans tracking-wider select-none text-[#b45309]">NALOG ZA UPLATU</span>
              </div>

              {/* Main divided canvas slip representation */}
              <div className="grid grid-cols-12 gap-x-4 mt-2.5 text-[9px] font-sans">
                
                {/* Left Columns: Textboxes for text info (uplatilac, svrha, primalac) */}
                <div className="col-span-7 flex flex-col gap-3">
                  <div>
                    <label className="block text-[8px] font-bold text-[#b45309] tracking-tight uppercase leading-none mb-1">Uplatilac</label>
                    <div className="w-full h-[52px] bg-white border-2 border-[#b45309]/90 rounded p-1 text-[10px] font-semibold text-black overflow-hidden whitespace-normal font-sans border-r-2" style={{ textWrap: 'wrap' }}>
                      <p className="font-bold tracking-wide uppercase text-[#1e293b]">{payerName}</p>
                      <p className="opacity-90 mt-0.5 text-[9px] text-slate-700">{payerAddress}</p>
                      <p className="opacity-80 text-[8px] font-mono text-slate-500">Indeks: {studentIndex}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold text-[#b45309] tracking-tight uppercase leading-none mb-1">Svrha uplate</label>
                    <div className="w-full h-[40px] bg-white border-2 border-[#b45309]/90 rounded p-1 text-[10px] font-semibold text-slate-800 overflow-hidden leading-tight font-sans">
                      {purposeOfPayment}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold text-[#b45309] tracking-tight uppercase leading-none mb-1">Primalac</label>
                    <div className="w-full h-[48px] bg-white border-2 border-[#b45309]/90 rounded p-1 text-[9px] font-semibold text-slate-800 overflow-hidden leading-tight font-sans">
                      <p className="font-bold">{recipient}</p>
                      <p className="opacity-85 text-[8px] text-slate-600">Jove Ilića 154, 11000 Voždovac, Beograd</p>
                    </div>
                  </div>
                </div>

                {/* Right Columns: Numerical and System-Critical Codes */}
                <div className="col-span-5 flex flex-col gap-3 pl-1 border-l border-[#b45309]/30">
                  
                  {/* Row Code/Valuta/Iznos block */}
                  <div className="grid grid-cols-12 gap-1 bg-transparent">
                    <div className="col-span-3">
                      <label className="block text-[7px] font-bold text-[#b45309] tracking-tighter leading-none text-center mb-1">šifra pl.</label>
                      <div className="w-full h-[26px] bg-white border-2 border-[#b45309]/90 rounded flex items-center justify-center font-bold text-xs text-black font-mono">
                        {paymentCode}
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[7px] font-bold text-[#b45309] tracking-tighter leading-none text-center mb-1">valuta</label>
                      <div className="w-full h-[26px] bg-white border-2 border-[#b45309]/90 rounded flex items-center justify-center font-bold text-[10px] text-black font-mono">
                        RSD
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label className="block text-[7px] font-bold text-[#b45309] tracking-tighter leading-none mb-1 text-center">iznos</label>
                      <div className="w-full h-[26px] bg-white border-2 border-[#b45309]/90 rounded flex items-center justify-end pr-2.5 font-extrabold text-xs text-black font-mono">
                        {amountValue}
                      </div>
                    </div>
                  </div>

                  {/* Recipient Bank Account line */}
                  <div>
                    <label className="block text-[8px] font-bold text-[#b45309] tracking-tight leading-none mb-1">račun primaoca</label>
                    <div className="w-full h-[26px] bg-white border-2 border-[#b45309]/90 rounded flex items-center justify-center font-black tracking-widest text-[11px] text-black font-mono">
                      {recipientAccount}
                    </div>
                  </div>

                  {/* Model and Poziv na broj */}
                  <div className="grid grid-cols-12 gap-1 text-left">
                    <div className="col-span-3">
                      <label className="block text-[7px] font-bold text-[#b45309] tracking-tighter leading-none text-center mb-1">model</label>
                      <div className="w-full h-[26px] bg-white border-2 border-[#b45309]/90 rounded flex items-center justify-center font-bold text-xs text-black font-mono">
                        {modelValue}
                      </div>
                    </div>
                    
                    <div className="col-span-9">
                      <label className="block text-[7px] font-bold text-[#b45309] tracking-tighter leading-none mb-1 pl-1">poziv na broj (odobrenje)</label>
                      <div className="w-full h-[26px] bg-white border-2 border-[#b45309]/90 rounded flex items-center pl-2 font-bold text-[11px] text-black font-mono tracking-wider overflow-hidden">
                        {referenceValue}
                      </div>
                    </div>
                  </div>

                  {/* Small stamp background representation */}
                  <div className="mt-2.5 flex justify-end items-end relative opacity-70">
                    <div className="absolute right-0 bottom-1 w-[42px] h-[42px] border border-blue-600/30 rounded-full flex flex-col justify-center items-center font-bold font-sans text-[5px] text-blue-600/40 pointer-events-none tracking-normal">
                      <span>IPS PLAĆANJE</span>
                      <span className="font-mono text-[4px]">FON BEOGRAD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer signature / timestamp sections */}
              <div className="mt-4 border-t border-black/25 pt-2.5 grid grid-cols-12 gap-2 text-[7px] text-gray-600 font-sans">
                <div className="col-span-4 border-r border-black/10 pr-2">
                  <p className="font-bold text-[6px] text-[#b45309] uppercase leading-none">Pečat i potpis uplatioca</p>
                  <div className="h-[22px]" />
                  <div className="border-t border-black/30 w-full" />
                </div>
                <div className="col-span-4 border-r border-black/10 px-1 text-center font-bold">
                  <p className="font-bold text-[6px] text-[#b45309] uppercase leading-none">Mesto i datum prijema</p>
                  <p className="mt-1 font-semibold text-black/80 text-[7px] font-mono">Beograd, {new Date().toLocaleDateString("sr-RS")}</p>
                </div>
                <div className="col-span-4 pl-2 text-right">
                  <p className="font-bold text-[6px] text-[#b45309] uppercase leading-none font-bold">Datum valute</p>
                  <p className="mt-1 font-semibold text-black/80 text-[7px] font-mono">{(new Date()).toLocaleDateString("sr-RS")}</p>
                </div>
              </div>
            </div>
            
            <div className={`mt-3 flex gap-1 items-center justify-center text-[10px] font-semibold py-1.5 px-3 rounded-lg border select-none print:hidden ${
              isDarkMode 
                ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-400" 
                : "bg-emerald-50 border-emerald-100 text-emerald-600"
            }`}>
              <CheckCircle size={13} strokeWidth={2.5} className="text-emerald-500 mr-1" />
              Generator naložen pozivom na broj modela 97
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
