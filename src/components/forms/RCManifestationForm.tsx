import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

import React from "react";

interface RCManifestationFormProps {
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

const RCManifestationForm = ({ onBack, onSubmit }: RCManifestationFormProps) => {
  const [form, setForm] = useState({
    raisonSociale: "", adressePostale: "", situationGeographique: "", contacts: "",
    activite: "", compteContribuable: "", dateCreation: "",
    chiffreAffaires: "", masseSalariale: "", effectif: "", formeJuridique: "",
    nomManifestation: "", lieuManifestation: "", datesManifestation: "",
    nombreParticipants: "", budgetManifestation: "", mesuresSecurite: "",
    declaration: false,
  });

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – RC Manifestation</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections pour l'assurance Responsabilité Civile Manifestation.</p>
      </div>

      <Section title="I - Identification de l'Organisateur">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Raison sociale / Nom de l'Organisateur</Label><Input className="h-9 text-sm rounded-lg" value={form.raisonSociale} onChange={e => setForm({...form, raisonSociale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Situation géographique</Label><Input className="h-9 text-sm rounded-lg" value={form.situationGeographique} onChange={e => setForm({...form, situationGeographique: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Contacts (Tél, Email)</Label><Input className="h-9 text-sm rounded-lg" value={form.contacts} onChange={e => setForm({...form, contacts: e.target.value})} /></div>
          
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs">Forme Juridique (si entreprise/association)</Label>
            <div className="flex gap-4 mt-1">
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcm" value="Association" id="asso" checked={form.formeJuridique === 'Association'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="asso" className="text-xs">Association</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcm" value="SA" id="sa_rcm" checked={form.formeJuridique === 'SA'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sa_rcm" className="text-xs">SA</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcm" value="SARL" id="sarl_rcm" checked={form.formeJuridique === 'SARL'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sarl_rcm" className="text-xs">SARL</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique_rcm" value="Autre" id="autre_rcm" checked={form.formeJuridique === 'Autre'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="autre_rcm" className="text-xs">Autre</Label></div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="II - Détails de la Manifestation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Nom de la manifestation</Label><Input className="h-9 text-sm rounded-lg" value={form.nomManifestation} onChange={e => setForm({...form, nomManifestation: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Lieu exact</Label><Input className="h-9 text-sm rounded-lg" value={form.lieuManifestation} onChange={e => setForm({...form, lieuManifestation: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Dates (du ... au ...)</Label><Input className="h-9 text-sm rounded-lg" value={form.datesManifestation} onChange={e => setForm({...form, datesManifestation: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Nombre de participants/spectateurs prévus</Label><Input className="h-9 text-sm rounded-lg" value={form.nombreParticipants} onChange={e => setForm({...form, nombreParticipants: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Budget estimé de la manifestation</Label><Input className="h-9 text-sm rounded-lg" value={form.budgetManifestation} onChange={e => setForm({...form, budgetManifestation: e.target.value})} /></div>
          
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Mesures de sécurité prévues (Sécurité privée, pompiers, etc.)</Label><Textarea className="text-sm rounded-lg" value={form.mesuresSecurite} onChange={e => setForm({...form, mesuresSecurite: e.target.value})} rows={3}/></div>
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

export default RCManifestationForm;
