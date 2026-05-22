import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

import React from "react";

interface TousRisquesChantiersFormProps {
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

const TousRisquesChantiersForm = ({ onBack, onSubmit }: TousRisquesChantiersFormProps) => {
  const [form, setForm] = useState({
    maitreOuvrage: "", entrepreneurPrincipal: "", adressePostale: "", contacts: "",
    natureTravaux: "", situationChantier: "", coutProjet: "",
    debutTravaux: "", dureeTravaux: "", periodeMaintenance: "",
    bureauControle: "",
    risquesNaturels: false, detailRisquesNaturels: "",
    declaration: false,
  });

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Tous Risques Chantiers (TRC)</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections pour l'assurance Tous Risques Chantiers.</p>
      </div>

      <Section title="I - Identification des Intervenants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Maître d'ouvrage (Client)</Label><Input className="h-9 text-sm rounded-lg" value={form.maitreOuvrage} onChange={e => setForm({...form, maitreOuvrage: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Entrepreneur Principal</Label><Input className="h-9 text-sm rounded-lg" value={form.entrepreneurPrincipal} onChange={e => setForm({...form, entrepreneurPrincipal: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale (Entrepreneur)</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Contacts (Tél, Email)</Label><Input className="h-9 text-sm rounded-lg" value={form.contacts} onChange={e => setForm({...form, contacts: e.target.value})} /></div>
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Bureau de Contrôle / Ingénieur conseil</Label><Input className="h-9 text-sm rounded-lg" value={form.bureauControle} onChange={e => setForm({...form, bureauControle: e.target.value})} /></div>
        </div>
      </Section>

      <Section title="II - Description du Chantier">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Nature exacte des travaux à réaliser</Label><Textarea className="text-sm rounded-lg" value={form.natureTravaux} onChange={e => setForm({...form, natureTravaux: e.target.value})} rows={2}/></div>
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Situation géographique du chantier</Label><Input className="h-9 text-sm rounded-lg" value={form.situationChantier} onChange={e => setForm({...form, situationChantier: e.target.value})} /></div>
          
          <div className="space-y-1.5"><Label className="text-xs">Coût total du projet (Montant du marché)</Label><Input className="h-9 text-sm rounded-lg" value={form.coutProjet} onChange={e => setForm({...form, coutProjet: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Date de début des travaux</Label><Input type="date" className="h-9 text-sm rounded-lg" value={form.debutTravaux} onChange={e => setForm({...form, debutTravaux: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Durée prévue des travaux (en mois)</Label><Input className="h-9 text-sm rounded-lg" value={form.dureeTravaux} onChange={e => setForm({...form, dureeTravaux: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Période de maintenance prévue (en mois)</Label><Input className="h-9 text-sm rounded-lg" value={form.periodeMaintenance} onChange={e => setForm({...form, periodeMaintenance: e.target.value})} /></div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.risquesNaturels} onCheckedChange={(v) => setForm({...form, risquesNaturels: !!v})} />Y a-t-il une exposition particulière aux risques naturels (inondation, éboulement, etc.) ?</label>
          {form.risquesNaturels && <Textarea className="text-sm rounded-lg" placeholder="Précisez les risques naturels..." value={form.detailRisquesNaturels} onChange={e => setForm({...form, detailRisquesNaturels: e.target.value})} rows={2} />}
        </div>
      </Section>

      <Section title="Signature">
        <p className="text-xs text-muted-foreground">Fait à Kinshasa, le {today}</p>
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.declaration} onCheckedChange={(v) => setForm({...form, declaration: !!v})} />Je certifie que les renseignements contenus dans la présente demande sont sincères et reflètent la réalité du risque.</label>
      </Section>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm"><ArrowLeft className="h-3.5 w-3.5" /> Retour</Button>
        <Button onClick={() => onSubmit(form)} disabled={!form.declaration} className="gap-2 rounded-lg text-sm"><Send className="h-3.5 w-3.5" /> Soumettre</Button>
      </div>
    </div>
  );
};

export default TousRisquesChantiersForm;
