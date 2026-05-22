import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

import React from "react";

interface ManipulationProduitsPetroliersFormProps {
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

const ManipulationProduitsPetroliersForm = ({ onBack, onSubmit }: ManipulationProduitsPetroliersFormProps) => {
  const [form, setForm] = useState({
    raisonSociale: "", adressePostale: "", situationGeographique: "", contacts: "",
    activite: "", compteContribuable: "", dateCreation: "",
    natureProduits: "", volumeManipule: "",
    moyensStockage: "", mesuresSecuriteIncendie: "", mesuresSecuriteEnvironnement: "",
    autorisationExercice: false, declaration: false,
  });

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Manipulation des Produits Pétroliers</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections pour l'assurance relative aux produits pétroliers.</p>
      </div>

      <Section title="I - Identification de la société">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Raison sociale</Label><Input className="h-9 text-sm rounded-lg" value={form.raisonSociale} onChange={e => setForm({...form, raisonSociale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Situation géographique</Label><Input className="h-9 text-sm rounded-lg" value={form.situationGeographique} onChange={e => setForm({...form, situationGeographique: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Contacts</Label><Input className="h-9 text-sm rounded-lg" value={form.contacts} onChange={e => setForm({...form, contacts: e.target.value})} /></div>
        </div>
      </Section>

      <Section title="II - Risques Spécifiques Pétroliers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Nature exacte des produits manipulés (Essence, Gasoil, Jet A1, etc.)</Label><Input className="h-9 text-sm rounded-lg" value={form.natureProduits} onChange={e => setForm({...form, natureProduits: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Volume annuel manipulé / stocké</Label><Input className="h-9 text-sm rounded-lg" value={form.volumeManipule} onChange={e => setForm({...form, volumeManipule: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Moyens de stockage (Cuves enterrées, aériennes, capacité)</Label><Input className="h-9 text-sm rounded-lg" value={form.moyensStockage} onChange={e => setForm({...form, moyensStockage: e.target.value})} /></div>
          
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Mesures de sécurité incendie (Extincteurs, détection, etc.)</Label><Textarea className="text-sm rounded-lg" value={form.mesuresSecuriteIncendie} onChange={e => setForm({...form, mesuresSecuriteIncendie: e.target.value})} rows={2}/></div>
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Mesures de prévention environnementale (Bacs de rétention, etc.)</Label><Textarea className="text-sm rounded-lg" value={form.mesuresSecuriteEnvironnement} onChange={e => setForm({...form, mesuresSecuriteEnvironnement: e.target.value})} rows={2}/></div>
        </div>
        
        <div className="space-y-2 mt-4">
          <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.autorisationExercice} onCheckedChange={(v) => setForm({...form, autorisationExercice: !!v})} />Possédez-vous les autorisations gouvernementales requises pour cette activité ?</label>
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

export default ManipulationProduitsPetroliersForm;
