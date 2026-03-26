import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface ClientInfo {
  nom: string;
  email: string;
  telephone: string;
  adressePhysique: string;
  adressePostale: string;
  domaineActivite: string;
  ville: string;
  pays: string;
}

interface ClientInfoFormProps {
  data: ClientInfo;
  onChange: (data: ClientInfo) => void;
  onNext: () => void;
}

const ClientInfoForm = ({ data, onChange, onNext }: ClientInfoFormProps) => {
  const update = (field: keyof ClientInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const isValid = data.nom && data.email && data.telephone && data.ville && data.pays;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-foreground">Informations générales</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Renseignez vos coordonnées pour commencer votre demande.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {([
          ["nom", "Nom complet *", "text"],
          ["email", "Adresse email *", "email"],
          ["telephone", "Téléphone *", "tel"],
          ["adressePhysique", "Adresse physique", "text"],
          ["adressePostale", "Adresse postale", "text"],
          ["domaineActivite", "Domaine d'activité", "text"],
          ["ville", "Ville *", "text"],
          ["pays", "Pays *", "text"],
        ] as const).map(([field, label, type]) => (
          <div key={field} className="space-y-1.5">
            <Label htmlFor={field} className="text-xs font-medium text-muted-foreground">
              {label}
            </Label>
            <Input
              id={field}
              type={type}
              value={data[field]}
              onChange={(e) => update(field, e.target.value)}
              placeholder={label.replace(" *", "")}
              className="h-9 text-sm rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={onNext} disabled={!isValid} className="gap-2 rounded-lg text-sm">
          Suivant
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default ClientInfoForm;
