import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  X,
  MessageSquare,
  Sparkles,
  AlertCircle,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

interface AiAssistantProps {
  studentName: string;
  studentIndex: string;
  activeTab: string;
  isDarkMode: boolean;
}

// Quick suggested questions
const SUGGESTED_QUESTIONS = [
  { text: "Kako da prijavim ispite?", label: "Prijava ispita" },
  { text: "Koliko imam novca na računu?", label: "Stanje na računu" },
  { text: "Gde je studentska služba?", label: "Kontakt" },
  { text: "Koje predmete slušam?", label: "Predmeti" },
];

function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (
    msg.includes("zdravo") ||
    msg.includes("ćao") ||
    msg.includes("cao") ||
    msg.includes("pozrav")
  ) {
    return "Zdravo! Ja sam vaš FON Studentski Asistent. Kako vam mogu pomoći danas? Možete me pitati o prijavi ispita, stanju na računu, položenim ispitima ili kontaktu sa studentskom službom.";
  }

  // Exact room location checks in fallback mode
  if (
    msg.includes("sala") ||
    msg.includes("amfiteatar") ||
    msg.includes("amf") ||
    msg.includes("ucionica") ||
    msg.includes("učionica") ||
    msg.includes("gde se nalazi") ||
    msg.includes("gde je") ||
    msg.includes("kabinet") ||
    msg.includes("prostorij")
  ) {
    if (
      msg.includes("amfiteatar 1") ||
      msg.includes("amfiteatar jedan") ||
      msg.includes("amf 1") ||
      msg.includes("amfiteatru 1")
    ) {
      return "**Amfiteatar 1** se nalazi u staroj zgradi. Kad stignete do skriptarnice od glavnog ulaza skrenete levo i onda se spustite niz 2 serije stepenica.";
    }
    if (
      msg.includes("amfiteatar 2") ||
      msg.includes("amfiteatar dva") ||
      msg.includes("amf 2") ||
      msg.includes("amfiteatru 2")
    ) {
      return "**Amfiteatar 2** se nalazi u staroj zgradi. Isto kao amfiteatar 1, samo se spuštate niz 1 seriju stepenica.";
    }
    if (
      msg.includes("amfiteatar 3") ||
      msg.includes("amfiteatar tri") ||
      msg.includes("amf 3") ||
      msg.includes("amfiteatru 3")
    ) {
      return "**Amfiteatar 3** se nalazi u staroj zgradi. Isto kao amfiteatri 1 i 2, samo se penjete uz 1 seriju stepenica.";
    }
    if (
      msg.includes("amfiteatar 4") ||
      msg.includes("amfiteatar četiri") ||
      msg.includes("amfiteatar cetiri") ||
      msg.includes("amf 4") ||
      msg.includes("amfiteatru 4")
    ) {
      return "**Amfiteatar 4** se nalazi u novoj zgradi na prvom spratu.";
    }
    if (
      msg.includes("amfiteatar 5") ||
      msg.includes("amfiteatar pet") ||
      msg.includes("amf 5") ||
      msg.includes("amfiteatru 5")
    ) {
      return "**Amfiteatar 5** se nalazi u novoj zgradi na drugom spratu.";
    }

    if (msg.includes("40")) {
      return "**Sala 40** se nalazi u novoj zgradi na prvom spratu.";
    }
    if (msg.includes("50")) {
      return "**Sala 50** se nalazi u novoj zgradi na drugom spratu.";
    }
    if (msg.includes("60")) {
      return "**Sala 60** se nalazi u novoj zgradi na trećem spratu.";
    }
    if (msg.includes("61")) {
      return "**Sala 61** se nalazi u novoj zgradi na trećem spratu.";
    }
    if (msg.includes("62")) {
      return "**Sala 62** se nalazi u novoj zgradi na trećem spratu.";
    }

    // Check for rooms 11 to 18
    const room11to18Match = msg.match(/\b(11|12|13|14|15|16|17|18)\b/);
    if (room11to18Match) {
      const num = room11to18Match[1];
      return `**Sala ${num}** se nalazi u **prizemlju stare zgrade**.`;
    }

    // Default room fallback when not recognized
    return "Nažalost, nemam tačnu lokaciju za tu salu/prostoriju. Najbolje je da proveriš na oglasnoj tabli, rasporedu nastave na studentskom portalu ili pitaš na šalteru Studentske službe.";
  }

  if (
    msg.includes("prijava") ||
    msg.includes("prijavim") ||
    msg.includes("ispit")
  ) {
    return "Ispite možete prijaviti odlaskom na karticu **'Prijava ispita'** u levom meniju. Cena prijave ispita u redovnom roku iznosi 1.000 RSD. Proverite da li imate dovoljno sredstava na svom e-student računu pre prijave! Ukoliko nemate, posetite sekciju **'Stanje na računu'** za uputstva za uplatu.";
  }

  if (
    msg.includes("stanje") ||
    msg.includes("račun") ||
    msg.includes("racun") ||
    msg.includes("uplata") ||
    msg.includes("novac") ||
    msg.includes("balans")
  ) {
    return "Vaše trenutno finansijsko stanje možete videti u sekciji **'Stanje na računu'**. Svaki student ima jedinstveni poziv na broj za uplatu. Šifra plaćanja je **189**. Na ovom demo portalu smo vam dodelili početni iznos od **4.200 RSD** kako biste odmah mogli da isprobaju prijavu ispita!";
  }

  if (
    msg.includes("položen") ||
    msg.includes("polozen") ||
    msg.includes("ocena") ||
    msg.includes("prosek") ||
    msg.includes("ocen") ||
    msg.includes("espb")
  ) {
    return "Pregled svih položenih ispita, ocena, kao i proračun prosečne ocene i ukupnih ESPB bodova možete pronaći na kartici **'Položeni ispiti'**.";
  }

  if (
    msg.includes("raspored") ||
    msg.includes("predavanje") ||
    msg.includes("vežb") ||
    msg.includes("vezb") ||
    msg.includes("čas") ||
    msg.includes("cas")
  ) {
    return "Vaš nedeljni i mesečni raspored predavanja i vežbi nalazi se na kartici **'Raspored nastave'**.";
  }

  if (
    msg.includes("kontakt") ||
    msg.includes("studentska") ||
    msg.includes("služba") ||
    msg.includes("sluzba") ||
    msg.includes("mail") ||
    msg.includes("telefon") ||
    msg.includes("lokacija")
  ) {
    return "Sve kontakt informacije Fakulteta organizacionih nauka, uključujući e-mail adrese studentskih službi, radno vreme šaltera i adresu fakulteta (Jove Ilića 154, Voždovac), možete naći u sekciji **'Kontakt'**.";
  }

  return "Hvala na pitanju! Ja sam FON Studentski AI asistent. Možete me pitati bilo šta o studentskom portalu (prijava ispita, stanje na računu, raspored nastave, položeni ispiti, kontakt studentske službe...). Da li biste želeli da vam pomognem da pronađete neku od ovih sekcija?";
}

export function AiAssistant({
  studentName,
  studentIndex,
  activeTab,
  isDarkMode,
}: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      let welcomeText = `Zdravo ${studentName}! Ja sam tvoj **FON e-Student AI Asistent**. 🎓 \n\nMogu ti pomoći sa informacijama o ispitnim rokovima, stanju na računu, prijavi ispita ili rasporedu.`;

      // Personalize welcome message based on the active tab
      if (activeTab === "stanje") {
        welcomeText +=
          "\n\nVidim da trenutno pregledaš **stanje na računu**. Želiš li da ti objasnim kako funkcioniše uplatnica i šifra plaćanja 189?";
      } else if (activeTab === "prijava") {
        welcomeText +=
          "\n\nTrenutno si na kartici **prijava ispita**. Ne zaboravi da je cena prijave ispita u redovnom roku 1.000 RSD, i da na računu moraš imati dovoljno sredstava!";
      } else if (activeTab === "polozeni") {
        welcomeText +=
          "\n\nPregledaš **položene ispite**. Čestitam na dosadašnjem uspehu! Mogu ti pomoći da sračunamo preostale ESPB bodove.";
      } else if (activeTab === "raspored") {
        welcomeText +=
          "\n\nNa kartici si za **raspored nastave**. Želiš li uputstva o lokacijama kabineta ili amfiteatara na FON-u?";
      }

      setMessages([
        {
          role: "model",
          text: welcomeText,
          timestamp: new Date(),
        },
      ]);
    }
  }, [activeTab, studentName, messages.length]);

  // Scroll to bottom of the chat container without affecting the outer page scroll
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      const container = chatContainerRef.current;
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setError(null);
    setIsLoading(true);

    // Add user message
    const userMsg: Message = {
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    try {
      // Map message history to Gemini expected structure
      const apiHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: apiHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Mrežna greška. Molimo pokušajte ponovo.");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.warn(
        "AI assistant endpoint not reachable or returned error, falling back to client-side logic:",
        err,
      );
      const fallbackReply = getFallbackResponse(trimmed);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: fallbackReply,
            timestamp: new Date(),
          },
        ]);
      }, 600);
    } finally {
      setIsLoading(false);
    }
  };

  // Render text containing Markdown-like bold formatting securely
  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-amber-400">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative w-full">
      {/* Trigger Button in Left Sidebar */}
      <button
        id="ai-agent-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex-1 md:w-full flex items-center justify-between gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all border group relative cursor-pointer ${
          isOpen
            ? "bg-amber-400 text-slate-900 border-amber-400 shadow-lg shadow-amber-400/20"
            : "bg-white/5 hover:bg-white/10 text-amber-300 border-amber-400/30 hover:border-amber-400/60"
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Circular Icon with FON Logo Emblem */}
          <div className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden shrink-0 border border-amber-400/40 group-hover:border-amber-400 transition-colors">
            {!logoError ? (
              <img
                src="/logofon.png"
                alt="FON Logo"
                className="w-4 h-4 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-[10px] font-black text-amber-400 select-none">
                Ф
              </span>
            )}
          </div>
          <div className="text-left overflow-hidden">
            <p
              className={`font-bold tracking-wide select-none leading-none ${isOpen ? "text-slate-950" : "text-white"}`}
            >
              FON AI Asistent
            </p>
            <p
              className={`text-[9px] font-mono select-none leading-none mt-1 ${isOpen ? "text-slate-800" : "text-amber-400"}`}
            >
              Slobodno pitaj
            </p>
          </div>
        </div>

        {/* Active glowing indicator */}
        <div className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
      </button>

      {/* Floating Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-agent-window"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-2xl flex flex-col overflow-hidden shadow-2xl border transition-colors duration-300 ${
              isDarkMode
                ? "bg-[#111622]/98 border-slate-800 shadow-black/90"
                : "bg-[#1e2536]/98 border-slate-700 shadow-black/80"
            }`}
            style={{
              maxHeight: "calc(100vh - 48px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#173e75] to-[#1E4C9A] border-b border-slate-700/60 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-amber-400">
                  {!logoError ? (
                    <img
                      src="/logofon.png"
                      alt="FON Logo"
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-black text-amber-400">Ф</span>
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    FON e-Student
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                    <span className="text-[10px] font-mono text-slate-300">
                      AI Agent je aktivan
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Zatvori prozor"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 text-left custom-scrollbar bg-slate-950/20"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {msg.role !== "user" && (
                    <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/40 text-[10px] font-black text-amber-400 shrink-0 mt-0.5 select-none">
                      Ф
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-amber-400 text-slate-950 rounded-tr-none font-medium"
                        : "bg-slate-800/80 text-slate-100 rounded-tl-none border border-slate-700/30"
                    }`}
                  >
                    <p className="whitespace-pre-line">
                      {renderMessageText(msg.text)}
                    </p>
                    <span
                      className={`text-[9px] block text-right mt-1.5 font-mono ${
                        msg.role === "user"
                          ? "text-slate-800"
                          : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString("sr-RS", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/40 text-[10px] font-black text-amber-400 shrink-0 mt-0.5">
                    Ф
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/30 rounded-2xl rounded-tl-none p-3 text-slate-300">
                    <div className="flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error indicator */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-xs">
                  <AlertCircle size={16} className="shrink-0" />
                  <p className="flex-1">{error}</p>
                  <button
                    onClick={() =>
                      handleSend(
                        messages[messages.length - 1]?.text || "Zdravo",
                      )
                    }
                    className="p-1 rounded bg-red-900/30 hover:bg-red-900/50 text-red-300 transition-all cursor-pointer"
                    title="Pokušaj ponovo"
                  >
                    <RefreshCw size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Suggestions (Only when user has not typed much, or as helper options) */}
            {messages.length <= 2 && !isLoading && (
              <div className="p-3 bg-slate-900/40 border-t border-slate-800/50 shrink-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 text-left">
                  Preporučena pitanja:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.text)}
                      className="text-[10px] font-medium bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-amber-300 border border-slate-700/50 p-1.5 px-2.5 rounded-full transition-all cursor-pointer text-left flex items-center gap-1 group"
                    >
                      <span>{q.label}</span>
                      <ChevronRight
                        size={10}
                        className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-[#111622] border-t border-slate-800/80 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pitajte AI asistenta..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 text-slate-100 border border-slate-850 focus:border-amber-400/60 rounded-xl px-3 py-2 text-xs focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-amber-400 hover:bg-amber-350 text-slate-950 disabled:opacity-40 disabled:hover:bg-amber-400 transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="Pošalji poruku"
              >
                <Send size={14} className="stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
