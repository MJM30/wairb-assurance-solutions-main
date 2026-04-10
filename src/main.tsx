import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 🔗 Tracking visiteurs — partagé avec le tableau de bord admin
(function recordVisit() {
  const VISITORS_KEY = "wairb_visitors";
  const today = new Date().toISOString().split("T")[0];
  const raw = localStorage.getItem(VISITORS_KEY);
  let records: { date: string; count: number }[] = [];
  try { records = raw ? JSON.parse(raw) : []; } catch { records = []; }
  const idx = records.findIndex(r => r.date === today);
  if (idx >= 0) records[idx].count += 1;
  else records.push({ date: today, count: 1 });
  if (records.length > 30) records.splice(0, records.length - 30);
  localStorage.setItem(VISITORS_KEY, JSON.stringify(records));
})();

createRoot(document.getElementById("root")!).render(<App />);

