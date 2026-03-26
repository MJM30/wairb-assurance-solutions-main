import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import React from "react";

interface PVTFormProps {
  onBack: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-background border rounded-xl overflow-hidden">
    <div className="px-5 py-3 border-b bg-muted/30">
      <h4 className="text-xs font-bold text-foreground">{title}</h4>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

const PVTForm = ({ onBack, onSubmit }: PVTFormProps) => {
  const [form, setForm] = useState({
    nomEntreprise: "", statutSociete: "", adresse: "", telephone: "", email: "",
    activitePrincipale: "", nombreEmployes: "",
    garanties: [] as string[],
    capitauxBatiment: "", capitauxContenu: "", capitauxPerteExpl: "",
    proxInstSensibles: false, proxInstDetail: "",
    securiteSite: [] as string[],
    antecedents10ans: "",
    sinistres: false, detailSinistres: "",
    modeReglement: "",
    declarationLegale: false,
  });

  const toggleArr = (field: "garanties" | "securiteSite", value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(x => x !== value) : [...prev[field], value]
    }));
  };

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Violence Politique & Terrorisme (PVT)</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Formulaire complet de proposition.</p>
      </div>

      <Section title="Identification du proposant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Nom de l'entreprise</Label><Input className="h-9 text-sm rounded-lg" value={form.nomEntreprise} onChange={e => setForm({...form, nomEntreprise: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Activité principale</Label><Input className="h-9 text-sm rounded-lg" value={form.activitePrincipale} onChange={e => setForm({...form, activitePrincipale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse</Label><Input className="h-9 text-sm rounded-lg" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Téléphone</Label><Input className="h-9 text-sm rounded-lg" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Email</Label><Input className="h-9 text-sm rounded-lg" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Nombre d'employés</Label><Input className="h-9 text-sm rounded-lg" value={form.nombreEmployes} onChange={e => setForm({...form, nombreEmployes: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Statut société</Label>
          <div className="flex flex-wrap gap-4">
            {["SARL", "SAS", "SA", "ONG", "Autre"].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.statutSociete === s} onCheckedChange={() => setForm({...form, statutSociete: s})} />{s}</label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Garanties & Capitaux assurés">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Violence politique", "Terrorisme", "Sabotage", "Émeutes & mouvements populaires", "Grèves", "Guerre civile"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.garanties.includes(g)} onCheckedChange={() => toggleArr("garanties", g)} />{g}</label>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="space-y-1.5"><Label className="text-xs">Capital – Bâtiment (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.capitauxBatiment} onChange={e => setForm({...form, capitauxBatiment: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Capital – Contenu (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.capitauxContenu} onChange={e => setForm({...form, capitauxContenu: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Perte d'exploitation (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.capitauxPerteExpl} onChange={e => setForm({...form, capitauxPerteExpl: e.target.value})} /></div>
        </div>
      </Section>

      <Section title="Environnement du risque">
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.proxInstSensibles} onCheckedChange={(v) => setForm({...form, proxInstSensibles: !!v})} />Proximité d'installations sensibles (ambassade, base militaire, etc.)</label>
        {form.proxInstSensibles && <Textarea className="text-sm rounded-lg" placeholder="Précisez..." value={form.proxInstDetail} onChange={e => setForm({...form, proxInstDetail: e.target.value})} rows={2} />}
      </Section>

      <Section title="Sécurité du site">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Gardiennage 24h", "Clôture / mur d'enceinte", "Caméras de surveillance", "Alarme intrusion", "Groupe électrogène", "Accès contrôlé"].map(s => (
            <label key={s} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.securiteSite.includes(s)} onCheckedChange={() => toggleArr("securiteSite", s)} />{s}</label>
          ))}
        </div>
      </Section>

      <Section title="Antécédents (10 dernières années)">
        <Textarea className="text-sm rounded-lg" placeholder="Historique des sinistres liés à la violence politique..." value={form.antecedents10ans} onChange={e => setForm({...form, antecedents10ans: e.target.value})} rows={3} />
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.sinistres} onCheckedChange={(v) => setForm({...form, sinistres: !!v})} />Sinistres déclarés ces 10 dernières années</label>
        {form.sinistres && <Textarea className="text-sm rounded-lg" placeholder="Détails..." value={form.detailSinistres} onChange={e => setForm({...form, detailSinistres: e.target.value})} rows={2} />}
      </Section>

      <Section title="Mode de règlement">
        <div className="flex flex-wrap gap-4">
          {["Annuel", "Semestriel", "Trimestriel", "Mensuel"].map(m => (
            <label key={m} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.modeReglement === m} onCheckedChange={() => setForm({...form, modeReglement: m})} />{m}</label>
          ))}
        </div>
      </Section>

      <Section title="Déclaration & Signature">
        <p className="text-xs text-muted-foreground">Fait à Kinshasa, le {today}</p>
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.declarationLegale} onCheckedChange={(v) => setForm({...form, declarationLegale: !!v})} />Je soussigné(e), certifie que les informations ci-dessus sont sincères et exactes et peuvent servir de base à l'établissement d'un contrat d'assurance.</label>
      </Section>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm"><ArrowLeft className="h-3.5 w-3.5" /> Retour</Button>
        <Button onClick={() => onSubmit(form)} disabled={!form.declarationLegale} className="gap-2 rounded-lg text-sm"><Send className="h-3.5 w-3.5" /> Soumettre</Button>
      </div>
    </div>
  );
};

export default PVTForm;
