import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import React from "react";

interface AutoFormProps {
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

const AutoForm = ({ onBack, onSubmit }: AutoFormProps) => {
  const [form, setForm] = useState({
    nomPrenom: "", dateNaissance: "", profession: "", adressePostale: "",
    adressePhysique: "", telephone: "", email: "",
    situationFamiliale: "",
    qualiteVehicule: "",
    marque: "", modele: "", anneeFabrication: "", immatriculation: "",
    numeroChassis: "", typeCarburant: "", puissanceFiscale: "",
    nombrePlaces: "", valeurVehicule: "",
    usageVehicule: "", kilometrageAnnuel: "", zoneCirculation: "",
    garanties: [] as string[],
    assurePrecedent: false, compagniePrecedente: "", sinistresDeclares: false, detailSinistres: "",
    securite: [] as string[],
    lieuStationnement: "",
    declaration: false,
  });

  const toggleArr = (field: "garanties" | "securite", value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(x => x !== value) : [...prev[field], value]
    }));
  };

  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Questionnaire – Assurance Automobile</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Remplissez toutes les sections.</p>
      </div>

      <Section title="I — Identification du Proposant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Nom & Prénom</Label><Input className="h-9 text-sm rounded-lg" value={form.nomPrenom} onChange={e => setForm({...form, nomPrenom: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Date de naissance</Label><Input className="h-9 text-sm rounded-lg" type="date" value={form.dateNaissance} onChange={e => setForm({...form, dateNaissance: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Profession</Label><Input className="h-9 text-sm rounded-lg" value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Adresse physique</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePhysique} onChange={e => setForm({...form, adressePhysique: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Téléphone</Label><Input className="h-9 text-sm rounded-lg" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Email</Label><Input className="h-9 text-sm rounded-lg" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Situation familiale</Label>
          <div className="flex flex-wrap gap-4">
            {["Célibataire", "Marié(e)", "Autre"].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.situationFamiliale === s} onCheckedChange={() => setForm({...form, situationFamiliale: s})} />{s}</label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="II — Qualité par rapport au véhicule">
        <div className="flex flex-wrap gap-4">
          {["Propriétaire", "Locataire", "Crédit-bail", "Conducteur principal", "Conducteur secondaire"].map(q => (
            <label key={q} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.qualiteVehicule === q} onCheckedChange={() => setForm({...form, qualiteVehicule: q})} />{q}</label>
          ))}
        </div>
      </Section>

      <Section title="III — Identification du véhicule">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Marque</Label><Input className="h-9 text-sm rounded-lg" value={form.marque} onChange={e => setForm({...form, marque: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Modèle</Label><Input className="h-9 text-sm rounded-lg" value={form.modele} onChange={e => setForm({...form, modele: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Année de fabrication</Label><Input className="h-9 text-sm rounded-lg" value={form.anneeFabrication} onChange={e => setForm({...form, anneeFabrication: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">N° d'immatriculation</Label><Input className="h-9 text-sm rounded-lg" value={form.immatriculation} onChange={e => setForm({...form, immatriculation: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">N° de châssis (VIN)</Label><Input className="h-9 text-sm rounded-lg" value={form.numeroChassis} onChange={e => setForm({...form, numeroChassis: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Puissance fiscale</Label><Input className="h-9 text-sm rounded-lg" value={form.puissanceFiscale} onChange={e => setForm({...form, puissanceFiscale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Nombre de places</Label><Input className="h-9 text-sm rounded-lg" value={form.nombrePlaces} onChange={e => setForm({...form, nombrePlaces: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs">Valeur actuelle (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.valeurVehicule} onChange={e => setForm({...form, valeurVehicule: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Type de carburant</Label>
          <div className="flex flex-wrap gap-4">
            {["Essence", "Diesel", "Hybride", "Électrique"].map(c => (
              <label key={c} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.typeCarburant === c} onCheckedChange={() => setForm({...form, typeCarburant: c})} />{c}</label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="IV — Usage du véhicule">
        <div className="flex flex-wrap gap-4">
          {["Usage privé", "Usage professionnel", "Taxi / Transport public", "Location", "Livraison"].map(u => (
            <label key={u} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.usageVehicule === u} onCheckedChange={() => setForm({...form, usageVehicule: u})} />{u}</label>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs">Kilométrage annuel estimé (km)</Label><Input className="h-9 text-sm rounded-lg" value={form.kilometrageAnnuel} onChange={e => setForm({...form, kilometrageAnnuel: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Zone principale de circulation</Label>
          <div className="flex flex-wrap gap-4">
            {["Urbaine", "Nationale", "Internationale"].map(z => (
              <label key={z} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.zoneCirculation === z} onCheckedChange={() => setForm({...form, zoneCirculation: z})} />{z}</label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="V — Garanties souhaitées">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Responsabilité Civile (obligatoire)", "Défense et recours", "Vol", "Incendie", "Bris de glace", "Dommages tous accidents", "Protection du conducteur", "Assistance dépannage", "Catastrophes naturelles", "Émeutes / Actes de vandalisme"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.garanties.includes(g)} onCheckedChange={() => toggleArr("garanties", g)} />{g}</label>
          ))}
        </div>
      </Section>

      <Section title="VI — Antécédents du risque (3 dernières années)">
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.assurePrecedent} onCheckedChange={(v) => setForm({...form, assurePrecedent: !!v})} />Avez-vous été assuré ?</label>
        {form.assurePrecedent && <div className="space-y-1.5"><Label className="text-xs">Nom de la compagnie</Label><Input className="h-9 text-sm rounded-lg" value={form.compagniePrecedente} onChange={e => setForm({...form, compagniePrecedente: e.target.value})} /></div>}
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.sinistresDeclares} onCheckedChange={(v) => setForm({...form, sinistresDeclares: !!v})} />Sinistres déclarés ?</label>
        {form.sinistresDeclares && <Textarea className="text-sm rounded-lg" placeholder="Date, nature du sinistre, montant approximatif..." value={form.detailSinistres} onChange={e => setForm({...form, detailSinistres: e.target.value})} rows={3} />}
      </Section>

      <Section title="VII — Mesures de sécurité">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {["Alarme", "Antivol mécanique", "Traceur GPS", "Garage fermé", "Caméra embarquée"].map(s => (
            <label key={s} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.securite.includes(s)} onCheckedChange={() => toggleArr("securite", s)} />{s}</label>
          ))}
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Lieu de stationnement habituel</Label>
          <div className="flex flex-wrap gap-4">
            {["Garage privé", "Parking surveillé", "Voie publique"].map(l => (
              <label key={l} className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.lieuStationnement === l} onCheckedChange={() => setForm({...form, lieuStationnement: l})} />{l}</label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="VIII — Déclaration">
        <p className="text-xs text-muted-foreground">Fait à Kinshasa, le {today}</p>
        <label className="flex items-center gap-2 text-xs cursor-pointer"><Checkbox checked={form.declaration} onCheckedChange={(v) => setForm({...form, declaration: !!v})} />Je soussigné(e), certifie que les informations ci-dessus sont sincères et exactes et peuvent servir de base à l'établissement d'un contrat d'assurance.</label>
      </Section>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm"><ArrowLeft className="h-3.5 w-3.5" /> Retour</Button>
        <Button onClick={() => onSubmit(form)} disabled={!form.declaration} className="gap-2 rounded-lg text-sm"><Send className="h-3.5 w-3.5" /> Soumettre</Button>
      </div>
    </div>
  );
};

export default AutoForm;
