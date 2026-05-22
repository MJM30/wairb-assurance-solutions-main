import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

import React from "react";

interface SanteFormProps {
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

const SanteForm = ({ onBack, onSubmit }: SanteFormProps) => {
  const [form, setForm] = useState({
    raisonSociale: "", adressePostale: "", situationGeographique: "", contacts: "",
    activite: "", compteContribuable: "", dateCreation: "",
    chiffreAffaires: "", masseSalariale: "", effectif: "", formeJuridique: "",
    couverture: "", personnesAssurees: "",
    historiqueSante: "",
    declaration: false,
  });

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Santé</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections pour la demande d'assurance Santé.</p>
      </div>

      <Section title="I - Identification de la société / de l'Assuré">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Raison sociale / Nom</Label><Input className="h-9 text-sm rounded-lg" value={form.raisonSociale} onChange={e => setForm({...form, raisonSociale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Situation géographique</Label><Input className="h-9 text-sm rounded-lg" value={form.situationGeographique} onChange={e => setForm({...form, situationGeographique: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Contacts (Tél, Email)</Label><Input className="h-9 text-sm rounded-lg" value={form.contacts} onChange={e => setForm({...form, contacts: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Activité(s) professionnelle(s)</Label><Input className="h-9 text-sm rounded-lg" value={form.activite} onChange={e => setForm({...form, activite: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Effectif à assurer</Label><Input className="h-9 text-sm rounded-lg" value={form.effectif} onChange={e => setForm({...form, effectif: e.target.value})} /></div>
          
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs">Forme Juridique (si entreprise)</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_s" value="SA" id="sa_s" checked={form.formeJuridique === 'SA'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sa_s" className="text-xs">SA</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_s" value="SNC" id="snc_s" checked={form.formeJuridique === 'SNC'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="snc_s" className="text-xs">SNC</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_s" value="SAS" id="sas_s" checked={form.formeJuridique === 'SAS'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sas_s" className="text-xs">SAS</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_s" value="SARL" id="sarl_s" checked={form.formeJuridique === 'SARL'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sarl_s" className="text-xs">SARL</Label></div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="II - Informations sur la Couverture">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs">Niveau de couverture souhaité</Label>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center space-x-2"><input type="radio" name="couverture" value="base" id="base" checked={form.couverture === 'base'} onChange={(e) => setForm({...form, couverture: e.target.value})} /><Label htmlFor="base" className="text-xs">Couverture de base (100% du tarif de convention)</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="couverture" value="intermediaire" id="intermediaire" checked={form.couverture === 'intermediaire'} onChange={(e) => setForm({...form, couverture: e.target.value})} /><Label htmlFor="intermediaire" className="text-xs">Couverture intermédiaire (Optique, Dentaire inclus)</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="couverture" value="premium" id="premium" checked={form.couverture === 'premium'} onChange={(e) => setForm({...form, couverture: e.target.value})} /><Label htmlFor="premium" className="text-xs">Premium (Remboursements optimisés, chambres particulières)</Label></div>
            </div>
          </div>
          
          <div className="space-y-1.5 md:col-span-2 mt-2"><Label className="text-xs">Personnes à assurer (Employés seuls, ou avec familles ?)</Label><Textarea className="text-sm rounded-lg" value={form.personnesAssurees} onChange={e => setForm({...form, personnesAssurees: e.target.value})} rows={2}/></div>
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Historique des assurances santé (Antécédents éventuels)</Label><Textarea className="text-sm rounded-lg" value={form.historiqueSante} onChange={e => setForm({...form, historiqueSante: e.target.value})} rows={2}/></div>
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

export default SanteForm;
