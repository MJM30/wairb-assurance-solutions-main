import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

import React from "react";

interface RCProfessionnelleFormProps {
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

const RCProfessionnelleForm = ({ onBack, onSubmit }: RCProfessionnelleFormProps) => {
  const [form, setForm] = useState({
    raisonSociale: "", adressePostale: "", situationGeographique: "", contacts: "",
    activite: "", compteContribuable: "", dateCreation: "",
    chiffreAffaires: "", effectif: "", formeJuridique: "",
    descriptionMissions: "", diplomesQualifications: "",
    montantGarantieSouhaite: "", antecedentsRC: "",
    declaration: false,
  });

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – RC Professionnelle</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections pour la Responsabilité Civile Professionnelle.</p>
      </div>

      <Section title="I - Identification de l'entreprise ou du professionnel">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Raison sociale / Nom</Label><Input className="h-9 text-sm rounded-lg" value={form.raisonSociale} onChange={e => setForm({...form, raisonSociale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Situation géographique</Label><Input className="h-9 text-sm rounded-lg" value={form.situationGeographique} onChange={e => setForm({...form, situationGeographique: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Contacts (Tél, Email)</Label><Input className="h-9 text-sm rounded-lg" value={form.contacts} onChange={e => setForm({...form, contacts: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Profession / Activité précise</Label><Input className="h-9 text-sm rounded-lg" value={form.activite} onChange={e => setForm({...form, activite: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Chiffre d'affaires estimé</Label><Input className="h-9 text-sm rounded-lg" value={form.chiffreAffaires} onChange={e => setForm({...form, chiffreAffaires: e.target.value})} /></div>
          
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs">Forme Juridique</Label>
            <div className="flex gap-4 mt-1">
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcp" value="Indépendant" id="indep" checked={form.formeJuridique === 'Indépendant'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="indep" className="text-xs">Indépendant</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcp" value="SA" id="sa_rcp" checked={form.formeJuridique === 'SA'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sa_rcp" className="text-xs">SA</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcp" value="SARL" id="sarl_rcp" checked={form.formeJuridique === 'SARL'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sarl_rcp" className="text-xs">SARL</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcp" value="Autre" id="autre_rcp" checked={form.formeJuridique === 'Autre'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="autre_rcp" className="text-xs">Autre</Label></div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="II - Détails sur l'activité et le risque">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Description détaillée de vos missions et prestations</Label><Textarea className="text-sm rounded-lg" value={form.descriptionMissions} onChange={e => setForm({...form, descriptionMissions: e.target.value})} rows={3}/></div>
          <div className="space-y-1.5"><Label className="text-xs">Qualifications, Agréments ou Diplômes pour exercer</Label><Input className="h-9 text-sm rounded-lg" value={form.diplomesQualifications} onChange={e => setForm({...form, diplomesQualifications: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Montant de garantie RC souhaité (Plafond par sinistre)</Label><Input className="h-9 text-sm rounded-lg" value={form.montantGarantieSouhaite} onChange={e => setForm({...form, montantGarantieSouhaite: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Antécédents (Avez-vous eu des réclamations RC ces 3 dernières années ?)</Label><Textarea className="text-sm rounded-lg" value={form.antecedentsRC} onChange={e => setForm({...form, antecedentsRC: e.target.value})} rows={2}/></div>
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

export default RCProfessionnelleForm;
