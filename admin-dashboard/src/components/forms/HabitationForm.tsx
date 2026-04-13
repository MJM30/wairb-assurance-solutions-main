import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

interface HabitationFormProps {
  onBack: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
}

const HabitationForm = ({ onBack, onSubmit }: HabitationFormProps) => {
  const [form, setForm] = useState({
    nomPrenom: "", profession: "", adressePostale: "", telephone: "",
    qualite: "" as string,
    natureRisque: "" as string,
    situationGeo: "", valeurBatiment: "", loyerMensuel: "", contenuMobilier: "",
    nombrePieces: "", superficie: "",
    garanties: [] as string[],
    mesuresProtection: "",
    contratIndexe: false, objetsPrecieux: false,
    declaration: false,
  });

  const toggleGarantie = (g: string) => {
    setForm(prev => ({
      ...prev,
      garanties: prev.garanties.includes(g) ? prev.garanties.filter(x => x !== g) : [...prev.garanties, g]
    }));
  };

  const Section = ({ title, num, children }: { title: string; num: string; children: React.ReactNode }) => (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-card)]">
        <h4 className="text-xs font-bold text-[var(--accent)] uppercase letter-spacing-wide">{num} — {title}</h4>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase">Questionnaire – Multirisque Habitation</h3>
        <p className="text-xs text-[var(--text-muted)] mt-1">Remplissez toutes les sections du formulaire.</p>
      </div>

      <Section title="Identification du Proposant" num="1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Nom & Prénom</Label><Input className="h-9 text-sm rounded-lg" value={form.nomPrenom} onChange={e => setForm({...form, nomPrenom: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Profession</Label><Input className="h-9 text-sm rounded-lg" value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Adresse postale</Label><Input className="h-9 text-sm rounded-lg" value={form.adressePostale} onChange={e => setForm({...form, adressePostale: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Téléphone</Label><Input className="h-9 text-sm rounded-lg" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} /></div>
        </div>
        <div className="space-y-3 pt-2">
          <Label className="text-xs text-[var(--text-secondary)]">Qualité par rapport au bâtiment</Label>
          <div className="flex flex-wrap gap-4">
            {["Locataire", "Propriétaire", "Copropriétaire"].map(q => (
              <label key={q} className="flex items-center gap-2 text-xs cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                <Checkbox checked={form.qualite === q} onCheckedChange={() => setForm({...form, qualite: q})} />{q}
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Identification du risque" num="2">
        <div className="space-y-3">
          <Label className="text-xs text-[var(--text-secondary)]">Nature du risque</Label>
          <div className="flex flex-wrap gap-4">
            {["Villa", "Duplex", "Appartement"].map(n => (
              <label key={n} className="flex items-center gap-2 text-xs cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                <Checkbox checked={form.natureRisque === n} onCheckedChange={() => setForm({...form, natureRisque: n})} />{n}
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Situation géographique</Label><Input className="h-9 text-sm rounded-lg" value={form.situationGeo} onChange={e => setForm({...form, situationGeo: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Valeur du bâtiment (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.valeurBatiment} onChange={e => setForm({...form, valeurBatiment: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Loyer mensuel (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.loyerMensuel} onChange={e => setForm({...form, loyerMensuel: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Contenu / Mobilier (USD)</Label><Input className="h-9 text-sm rounded-lg" value={form.contenuMobilier} onChange={e => setForm({...form, contenuMobilier: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Nombre de pièces</Label><Input className="h-9 text-sm rounded-lg" value={form.nombrePieces} onChange={e => setForm({...form, nombrePieces: e.target.value})} /></div>
          <div className="space-y-1.5"><Label className="text-xs text-[var(--text-secondary)]">Superficie développée (m²)</Label><Input className="h-9 text-sm rounded-lg" value={form.superficie} onChange={e => setForm({...form, superficie: e.target.value})} /></div>
        </div>
      </Section>

      <Section title="Garanties souhaitées" num="3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Incendie", "Explosion", "Bris de glace", "Tempête", "Dommages électriques", "Dégâts des eaux", "RC chef de famille"].map(g => (
            <label key={g} className="flex items-center gap-2 text-xs cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
              <Checkbox checked={form.garanties.includes(g)} onCheckedChange={() => toggleGarantie(g)} />{g}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Mesures de protection" num="4">
        <Textarea className="text-sm rounded-lg bg-[var(--bg-primary)] border-[var(--border)]" placeholder="Décrivez les mesures de protection existantes..." value={form.mesuresProtection} onChange={e => setForm({...form, mesuresProtection: e.target.value})} rows={3} />
      </Section>

      <Section title="Déclarations diverses" num="5">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs cursor-pointer text-[var(--text-primary)]"><Checkbox checked={form.contratIndexe} onCheckedChange={(v) => setForm({...form, contratIndexe: !!v})} />Contrat indexé</label>
          <label className="flex items-center gap-2 text-xs cursor-pointer text-[var(--text-primary)]"><Checkbox checked={form.objetsPrecieux} onCheckedChange={(v) => setForm({...form, objetsPrecieux: !!v})} />Objets précieux {">"} 30% de la valeur totale</label>
          <label className="flex items-center gap-2 text-xs cursor-pointer text-[var(--text-primary)]"><Checkbox checked={form.declaration} onCheckedChange={(v) => setForm({...form, declaration: !!v})} />Je certifie que les informations ci-dessus sont sincères et exactes</label>
        </div>
      </Section>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="gap-2 rounded-lg text-sm border-[var(--border)]"><ArrowLeft className="h-3.5 w-3.5" /> Retour</Button>
        <Button onClick={() => onSubmit(form)} disabled={!form.declaration} className="gap-2 rounded-lg text-sm bg-[var(--accent)] text-black hover:bg-[var(--accent-light)]"><Send className="h-3.5 w-3.5" /> Soumettre</Button>
      </div>
    </div>
  );
};

export default HabitationForm;
