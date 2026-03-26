import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import React from "react";

interface ProfessionnelleFormProps {
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

const ProfessionnelleForm = ({ onBack, onSubmit }: ProfessionnelleFormProps) => {
  const [form, setForm] = useState({
    raisonSociale: "", activite: "", adresse: "", telephone: "", email: "",
    responsableName: "", fonction: "",
    garantiesIncendie: [] as string[],
    garantiesVol: [] as string[],
    garantiesEaux: [] as string[],
    garantiesInformatique: [] as string[],
    antecedents: "",
    sinistres3ans: false,
    detailSinistres: "",
    declaration: false,
  });

  const toggle = (field: "garantiesIncendie" | "garantiesVol" | "garantiesEaux" | "garantiesInformatique", value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(x => x !== value) : [...prev[field], value]
    }));
  };

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Multirisque Professionnelle</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections.</p>
      </div>

      <Section title="Identification de l'entreprise">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Raison sociale</Label><Input className="h-9 text-sm rounded-lg" value={form.raisonSociale} onChange={e => setForm({...form, raisonSociale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Activité</Label><Input className="h-9 text-sm rounded-lg" value={form.activite} onChange={e => setForm({...form, activite: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse</Label><Input className="h-9 text-sm rounded-lg" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Téléphone</Label><Input className="h-9 text-sm rounded-lg" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Email</Label><Input className="h-9 text-sm rounded-lg" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Responsable</Label><Input className="h-9 text-sm rounded-lg" value={form.responsableName} onChange={e => setForm({...form, responsableName: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Fonction</Label><Input className="h-9 text-sm rounded-lg" value={form.fonction} onChange={e => setForm({...form, fonction: e.target.value})} /></div>
        </div>
      </Section>

      <Section title="Garanties – Incendie">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Incendie & explosion", "Dommages électriques", "Tempête", "Bris de machines", "Perte d'exploitation"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.garantiesIncendie.includes(g)} onCheckedChange={() => toggle("garantiesIncendie", g)} />{g}</label>
          ))}
        </div>
      </Section>

      <Section title="Garanties – Vol">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Vol par effraction", "Vol avec violence", "Détournement", "Vandalisme"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.garantiesVol.includes(g)} onCheckedChange={() => toggle("garantiesVol", g)} />{g}</label>
          ))}
        </div>
      </Section>

      <Section title="Garanties – Dégâts des eaux">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Fuites et débordements", "Infiltrations", "Rupture de canalisations"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.garantiesEaux.includes(g)} onCheckedChange={() => toggle("garantiesEaux", g)} />{g}</label>
          ))}
        </div>
      </Section>

      <Section title="Garanties – Tous Risques Informatique">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Matériel informatique", "Données & logiciels", "Pertes financières suite à panne", "Cyber-risques"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.garantiesInformatique.includes(g)} onCheckedChange={() => toggle("garantiesInformatique", g)} />{g}</label>
          ))}
        </div>
      </Section>

      <Section title="Antécédents du risque (3 dernières années)">
        <Textarea className="text-sm rounded-lg" placeholder="Historique des sinistres et mesures correctives..." value={form.antecedents} onChange={e => setForm({...form, antecedents: e.target.value})} rows={3} />
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.sinistres3ans} onCheckedChange={(v) => setForm({...form, sinistres3ans: !!v})} />Sinistres déclarés ces 3 dernières années</label>
        {form.sinistres3ans && <Textarea className="text-sm rounded-lg" placeholder="Détails des sinistres..." value={form.detailSinistres} onChange={e => setForm({...form, detailSinistres: e.target.value})} rows={2} />}
      </Section>

      <Section title="Signature">
        <p className="text-xs text-muted-foreground">Fait à Kinshasa, le {today}</p>
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.declaration} onCheckedChange={(v) => setForm({...form, declaration: !!v})} />Je certifie que les informations ci-dessus sont sincères et exactes</label>
      </Section>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm"><ArrowLeft className="h-3.5 w-3.5" /> Retour</Button>
        <Button onClick={() => onSubmit(form)} disabled={!form.declaration} className="gap-2 rounded-lg text-sm"><Send className="h-3.5 w-3.5" /> Soumettre</Button>
      </div>
    </div>
  );
};

export default ProfessionnelleForm;
