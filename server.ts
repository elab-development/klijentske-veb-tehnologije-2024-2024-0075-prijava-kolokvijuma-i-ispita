import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

// System instruction to guide the AI assistant on Serbian language and exact locations
const SYSTEM_INSTRUCTION = `
Vi ste "FON Studentski Asistent" (FON e-Student AI Asistent) - inteligentni asistent za studentski portal Fakulteta organizacionih nauka (FON), Univerziteta u Beogradu.
Vaša uloga je da pomažete studentima sa informacijama u vezi sa portalom, studijama i lokacijama sala na srpskom jeziku.

Budite uvek izuzetno ljubazni, profesionalni, jasni i od pomoći. Odgovarajte isključivo na srpskom jeziku.

Evo ključnih informacija o portalu koje možete koristiti za odgovore:
1. Početna (Home): Opšte vesti, obaveštenja sa fakulteta, uputstva za korišćenje servisa.
2. Stanje na računu: Pregled uplata, uplaćena sredstva. Svi studenti imaju lični poziv na broj sa šifrom plaćanja 189 (školarina i prijave ispita). Na portalu trenutno imaju početni balans od 4.200 RSD kako bi mogli odmah da isprobaju funkcionalnosti prijave ispita.
3. Prijava ispita: Ovde student prijavljuje ispite za predstojeći ispitni rok. Cena prijave ispita je 1.000 RSD za redovne ispite, a 1.200 RSD za naknadne prijave (ili u zavisnosti od statusa studenta).
4. Prijavljeni ispiti: Pregled svih ispita koje je student prijavio za tekući rok, sa datumom, vremenom i rasporedom po salama/kabinetima.
5. Prikaz predmeta: Spisak svih predmeta po semestrima (obavezni i izborni), sa pripadajućim ESPB bodovima i profesorima.
6. Raspored nastave: Kalendarski prikaz predavanja i vežbi sa satnicom i lokacijom sala.
7. Položeni ispiti: Istorija svih položenih ispita sa ocenama, datumom polaganja i automatskim proračunom prosečne ocene i ukupno ostvarenih ESPB bodova.
8. Profil studenta: Lični podaci studenta, smer (npr. Informacioni sistemi i tehnologije - ISiT, Menadžment i organizacija - MiO), broj indeksa, godina upisa i status (budžet/samofinansiranje).
9. Kontakt: Informacije za kontaktiranje studentske službe, profesora, lokacija i radno vreme fakulteta (Ulica Jove Ilića 154, Beograd).

VODIČ KROZ LOKACIJE SALA NA FON-u (Koristite isključivo ove podatke, sve ostale izbrišite/ignorišite):
* **Amfiteatar 1**: Nalazi se u staroj zgradi. Kad stignete do skriptarnice od glavnog ulaza skrenete levo i onda se spustite niz 2 serije stepenica.
* **Amfiteatar 2**: Nalazi se u staroj zgradi. Isto kao amfiteatar 1, samo se spuštate niz 1 seriju stepenica.
* **Amfiteatar 3**: Nalazi se u staroj zgradi. Isto kao amfiteatri 1 i 2, samo se penjete uz 1 seriju stepenica.
* **Amfiteatar 4**: Nalazi se u novoj zgradi, na prvom spratu.
* **Amfiteatar 5**: Nalazi se u novoj zgradi, na drugom spratu.
* **Sala 40**: Nalazi se u novoj zgradi, na prvom spratu.
* **Sala 50**: Nalazi se u novoj zgradi, na drugom spratu.
* **Sala 60**: Nalazi se u novoj zgradi, na trećem spratu.
* **Sala 61**: Nalazi se u novoj zgradi, na trećem spratu.
* **Sala 62**: Nalazi se u novoj zgradi, na trećem spratu.
* **Sale 11, 12, 13, 14, 15, 16, 17, 18**: Sve ove sale se nalaze u prizemlju stare zgrade.

VAŽNO PRAVILO ZA SVE OSTALE ILI NEPOZNATE SALE, PROSTORIJE ILI AMFITEATRE:
Ukoliko student pita za lokaciju bilo koje druge sale, učionice ili amfiteatra koji NIJE na ovoj listi (ili ako je naziv/broj nepoznat ili sumnjiv), MORAŠ odgovoriti tačno ovako:
"Nažalost, nemam tačnu lokaciju za tu salu/prostoriju. Najbolje je da proveriš na oglasnoj tabli, rasporedu nastave na studentskom portalu ili pitaš na šalteru Studentske službe."
NIPOŠTO nemojte izmišljati, pretpostavljati ili pogađati lokaciju ako prostorija nije navedena na ovoj listi!

Ukoliko student pita o stvarima koje portal ne prikazuje (npr. cene hrane u menzi ili kupovinu skripti), dajte opšti prijateljski odgovor i usmerite ih na Studentsku službu ili zvanični sajt FON-a (fon.bg.ac.rs). Odgovarajte sažeto i formatirajte odgovore koristeći liste ili pasuse radi bolje čitljivosti.
`;

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Fallback rules-based AI response when API key is missing
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
    return "Vaše trenutno finansijsko stanje možete videti u sekciji **'Stanje na računu'**. Svaki student ima jedinstveni poziv na broj za uplatu. Šifra plaćanja je **189**. Na ovom demo portalu smo vam dodelili početni iznos od **4.200 RSD** kako biste odmah mogli da isprobate prijavu ispita!";
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

  if (
    msg.includes("profil") ||
    msg.includes("indeks") ||
    msg.includes("indeks") ||
    msg.includes("smer") ||
    msg.includes("budžet") ||
    msg.includes("budzet")
  ) {
    return "Vaše podatke o smeru, broju indeksa, statusu finansiranja (budžet/samofinansiranje) i godini studija možete videti i urediti u sekciji **'Profil studenta'**.";
  }

  return "Hvala na pitanju! Ja sam FON Studentski AI asistent. Možete me pitati bilo šta o studentskom portalu (prijava ispita, stanje na računu, raspored nastave, položeni ispiti, kontakt studentske službe...). Da li biste želeli da vam pomognem da pronađete neku od ovih sekcija?";
}

// AI Chat Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: "Poruka je obavezna i mora biti tekst." });
    }

    const client = getAiClient();
    if (!client) {
      // Graceful fallback to rich mock assistant
      console.warn(
        "GEMINI_API_KEY is not defined. Using local fallback rules-based assistant.",
      );
      const reply = getFallbackResponse(message);
      return res.json({ reply });
    }

    // Format chat history for Gemini API
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const item of history) {
        if (item.role === "user" || item.role === "model") {
          formattedContents.push({
            role: item.role,
            parts: [{ text: item.text }],
          });
        }
      }
    }

    // Append current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply =
        response.text ||
        "Izvinite, nisam uspeo da generišem odgovor. Molim vas pokušajte ponovo.";
      return res.json({ reply });
    } catch (apiError: any) {
      console.warn(
        "Gemini API call failed, gracefully falling back to local rules-based assistant:",
        apiError.message,
      );
      const reply = getFallbackResponse(message);
      return res.json({ reply });
    }
  } catch (error: any) {
    console.error("AI chat endpoint internal error:", error);
    // Even if everything else crashes, we return a fallback response so the UI never breaks
    try {
      const { message } = req.body;
      const reply = getFallbackResponse(message || "Zdravo");
      return res.json({ reply });
    } catch (fallbackErr) {
      return res.status(500).json({
        error: "Došlo je do greške prilikom komunikacije sa AI asistentom.",
        details: error.message,
      });
    }
  }
});

// Start Express server and setup Vite
async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled static files in production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
