import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

import React from "react";

interface CautionFormProps {
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

const CautionForm = ({ onBack, onSubmit }: CautionFormProps) => {
  const [form, setForm] = useState({
    raisonSociale: "", adressePostale: "", situationGeographique: "", contacts: "",
    situationSite: "", activite: "", compteContribuable: "", dateCreation: "",
    chiffreAffaires: "", masseSalariale: "", effectif: "", formeJuridique: "",
    capitalSocial: "", historique: "", objetCaution: "", autoriteContractante: "",
    typesCautions: [] as string[], montantCautionne: "",
    debutTravaux: "", finTravaux: "",
    travauxDemarres: false, detailsDemarrage: "", tauxRealisation: "",
    cautionsWairb: "", cautionsAutres: "", financement: "", institutionFinanciere: "",
    memo: "",
    documentsFournis: [] as string[],
    declaration: false,
  });

  const toggleCaution = (value: string) => {
    setForm(prev => ({
      ...prev,
      typesCautions: prev.typesCautions.includes(value) ? prev.typesCautions.filter(x => x !== value) : [...prev.typesCautions, value]
    }));
  };

  const toggleDocument = (value: string) => {
    setForm(prev => ({
      ...prev,
      documentsFournis: prev.documentsFournis.includes(value) ? prev.documentsFournis.filter(x => x !== value) : [...prev.documentsFournis, value]
    }));
  };

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const cautionOptions = [
    "Provisoire ou soumission", "Définitive ou bonne exécution", "Avance de démarrage", 
    "Retenue de Garantie", "Agents/courtiers d'assurance", "Agence de voyage", 
    "Agents immobiliers", "Crédit de remboursement TVA", "Ets scolaires privés", 
    "Universités Privées", "Garantie Financière", "Agrément de transitaire en douane", 
    "Exportateur de bois"
  ];

  const documentOptions = [
    "Statuts de la société & Copie du RCCM",
    "Plaquette de présentation et organigramme",
    "CV du ou des dirigeants",
    "Etats financiers (Bilan et comptes de résultats)",
    "Modèle de l'acte de cautionnement sollicité",
    "Documents de marché (cahier appel d'offre, marché signé, PV)",
    "Copie du contrat commercial"
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Caution</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections pour la demande de caution.</p>
      </div>

      <Section title="I - Identification de la société">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Raison sociale</Label><Input className="h-9 text-sm rounded-lg" value={form.raisonSociale} onChange={e => setForm({...form, raisonSociale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Situation géographique</Label><Input className="h-9 text-sm rounded-lg" value={form.situationGeographique} onChange={e => setForm({...form, situationGeographique: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Contacts</Label><Input className="h-9 text-sm rounded-lg" value={form.contacts} onChange={e => setForm({...form, contacts: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Activité(s)</Label><Input className="h-9 text-sm rounded-lg" value={form.activite} onChange={e => setForm({...form, activite: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Compte contribuable</Label><Input className="h-9 text-sm rounded-lg" value={form.compteContribuable} onChange={e => setForm({...form, compteContribuable: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Chiffre d'affaires</Label><Input className="h-9 text-sm rounded-lg" value={form.chiffreAffaires} onChange={e => setForm({...form, chiffreAffaires: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Effectif du personnel</Label><Input className="h-9 text-sm rounded-lg" value={form.effectif} onChange={e => setForm({...form, effectif: e.target.value})} /></div>
          
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs">Forme Juridique</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique" value="SA" id="sa" checked={form.formeJuridique === 'SA'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sa" className="text-xs">SA</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique" value="SNC" id="snc" checked={form.formeJuridique === 'SNC'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="snc" className="text-xs">SNC</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique" value="SAS" id="sas" checked={form.formeJuridique === 'SAS'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sas" className="text-xs">SAS</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="formeJuridique" value="SARL" id="sarl" checked={form.formeJuridique === 'SARL'} onChange={(e) => setForm({...form, formeJuridique: e.target.value})} /><Label htmlFor="sarl" className="text-xs">SARL</Label></div>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Objet de la caution</Label><Textarea className="text-sm rounded-lg" value={form.objetCaution} onChange={e => setForm({...form, objetCaution: e.target.value})} rows={2}/></div>
          <div className="space-y-1.5 md:col-span-2"><Label className="text-xs">Nom de l'Autorité Contractante</Label><Input className="h-9 text-sm rounded-lg" value={form.autoriteContractante} onChange={e => setForm({...form, autoriteContractante: e.target.value})} /></div>
        </div>
      </Section>

      <Section title="II - Garanties Souhaitées">
        <div className="space-y-3">
          <Label className="text-xs font-semibold">Types de cautions demandées</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {cautionOptions.map(g => (
              <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.typesCautions.includes(g)} onCheckedChange={() => toggleCaution(g)} />{g}</label>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="space-y-1.5"><Label className="text-xs">Montant cautionné</Label><Input className="h-9 text-sm rounded-lg" value={form.montantCautionne} onChange={e => setForm({...form, montantCautionne: e.target.value})} /></div>
            <div className="space-y-1.5"><Label className="text-xs">Début des travaux</Label><Input type="date" className="h-9 text-sm rounded-lg" value={form.debutTravaux} onChange={e => setForm({...form, debutTravaux: e.target.value})} /></div>
            <div className="space-y-1.5"><Label className="text-xs">Fin des travaux</Label><Input type="date" className="h-9 text-sm rounded-lg" value={form.finTravaux} onChange={e => setForm({...form, finTravaux: e.target.value})} /></div>
            <div className="space-y-1.5"><Label className="text-xs">Taux de réalisation</Label><Input className="h-9 text-sm rounded-lg" value={form.tauxRealisation} onChange={e => setForm({...form, tauxRealisation: e.target.value})} /></div>
          </div>

          <div className="space-y-2 mt-4">
            <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.travauxDemarres} onCheckedChange={(v) => setForm({...form, travauxDemarres: !!v})} />Les travaux ont-ils déjà démarré sur le terrain ?</label>
            {form.travauxDemarres && <Textarea className="text-sm rounded-lg" placeholder="Si oui, quand et où ?" value={form.detailsDemarrage} onChange={e => setForm({...form, detailsDemarrage: e.target.value})} rows={2} />}
          </div>
        </div>
      </Section>

      <Section title="III - Cautions Délivrées">
        <div className="space-y-4">
          <div className="space-y-1.5"><Label className="text-xs">Cautions déjà délivrées par WAIRB (les 3-4 plus récentes)</Label><Textarea className="text-sm rounded-lg" value={form.cautionsWairb} onChange={e => setForm({...form, cautionsWairb: e.target.value})} rows={2}/></div>
          <div className="space-y-1.5"><Label className="text-xs">Cautions délivrées par d'autres sociétés d'Assurance</Label><Textarea className="text-sm rounded-lg" value={form.cautionsAutres} onChange={e => setForm({...form, cautionsAutres: e.target.value})} rows={2}/></div>
          
          <div className="space-y-2">
            <Label className="text-xs">Comment votre marché est-il financé ?</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2"><input type="radio" name="financement" value="autorite" id="autorite" checked={form.financement === 'autorite'} onChange={(e) => setForm({...form, financement: e.target.value})} /><Label htmlFor="autorite" className="text-xs">Par l'Autorité Contractante du Marché</Label></div>
              <div className="flex items-center space-x-2"><input type="radio" name="financement" value="institution" id="institution" checked={form.financement === 'institution'} onChange={(e) => setForm({...form, financement: e.target.value})} /><Label htmlFor="institution" className="text-xs">Par une institution financière</Label></div>
            </div>
            {form.financement === "institution" && <Input className="h-9 text-sm rounded-lg mt-2" placeholder="Laquelle ?" value={form.institutionFinanciere} onChange={e => setForm({...form, institutionFinanciere: e.target.value})} />}
          </div>
        </div>
      </Section>

      <Section title="IV - Eléments à joindre dans le dossier">
        <div className="grid grid-cols-1 gap-2.5">
          {documentOptions.map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.documentsFournis.includes(g)} onCheckedChange={() => toggleDocument(g)} />{g}</label>
          ))}
        </div>
      </Section>

      <Section title="Signature">
        <p className="text-xs text-muted-foreground">Fait à Kinshasa, le {today}</p>
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.declaration} onCheckedChange={(v) => setForm({...form, declaration: !!v})} />Le demandeur certifie que les renseignements contenus dans la présente demande et les pièces jointes sont sincères et reflètent la réalité du risque.</label>
      </Section>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm"><ArrowLeft className="h-3.5 w-3.5" /> Retour</Button>
        <Button onClick={() => onSubmit(form)} disabled={!form.declaration} className="gap-2 rounded-lg text-sm"><Send className="h-3.5 w-3.5" /> Soumettre</Button>
      </div>
    </div>
  );
};

export default CautionForm;
