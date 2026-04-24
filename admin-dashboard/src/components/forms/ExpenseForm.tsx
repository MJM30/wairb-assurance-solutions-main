import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { type ExpenseCategory, type Expense, getCategoryLabel, saveExpense } from '../../lib/storage';
import { Upload, X, CheckCircle2 } from 'lucide-react';

interface ExpenseFormProps {
  onClose: () => void;
  onRefresh: () => void;
  initialData?: Expense | null;
}

const CATEGORIES: ExpenseCategory[] = [
  'salaire', 'carburant', 'deplacement', 'loyer', 'marketing', 'logistique', 'maintenance', 'divers'
];

export default function ExpenseForm({ onClose, onRefresh, initialData }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: initialData ? initialData.amount.toString() : '',
    date: initialData ? initialData.date : new Date().toISOString().split('T')[0],
    category: initialData ? initialData.category : 'salaire' as ExpenseCategory,
    disburserName: initialData ? initialData.disburserName : '',
    recipientName: initialData ? initialData.recipientName : '',
    justification: initialData ? initialData.justification : '',
  });
  const [attachment, setAttachment] = useState<{ name: string; type: string; data: string } | null>(
    initialData?.attachment || null
  );
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("Le fichier est trop volumineux (max 1Mo).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment({
        name: file.name,
        type: file.type,
        data: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.disburserName || !formData.recipientName || !formData.justification) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    saveExpense({
      id: initialData ? initialData.id : `exp_${Date.now()}`,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      disburserName: formData.disburserName,
      recipientName: formData.recipientName,
      justification: formData.justification,
      attachment: attachment || undefined,
      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
      status: initialData ? initialData.status : 'effectue',
    });

    setSubmitted(true);
    onRefresh();
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ 
          width: 64, height: 64, borderRadius: 16, backgroundColor: 'var(--accent-bg)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' 
        }}>
          <CheckCircle2 size={32} color="var(--accent)" />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          {initialData ? "Dépense modifiée !" : "Dépense enregistrée !"}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
          {initialData ? "Les modifications ont été enregistrées avec succès." : "Le décaissement a été justifié et enregistré avec succès."}
        </p>
        <Button onClick={onClose} style={{ width: '100%' }}>Fermer</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <Label>Montant (USD)</Label>
          <Input 
            type="number" 
            placeholder="0.00" 
            value={formData.amount} 
            onChange={e => setFormData({...formData, amount: e.target.value})} 
            required 
          />
        </div>
        <div>
          <Label>Date de décaissement</Label>
          <Input 
            type="date" 
            value={formData.date} 
            onChange={e => setFormData({...formData, date: e.target.value})} 
            required 
          />
        </div>
      </div>

      <div>
        <Label>Catégorie</Label>
        <select 
          className="input" 
          style={{ width: '100%', height: 42 }}
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value as ExpenseCategory})}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
          ))}
        </select>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <Label>Nom du décaisseur (Responsable)</Label>
          <Input 
            placeholder="Ex: Jean Mukendi" 
            value={formData.disburserName} 
            onChange={e => setFormData({...formData, disburserName: e.target.value})} 
            required 
          />
        </div>
        <div>
          <Label>Nom du bénéficiaire (Récepteur)</Label>
          <Input 
            placeholder="Ex: Station Shell" 
            value={formData.recipientName} 
            onChange={e => setFormData({...formData, recipientName: e.target.value})} 
            required 
          />
        </div>
      </div>

      <div>
        <Label>Justification détaillée</Label>
        <Textarea 
          placeholder="Expliquez la raison du décaissement..." 
          value={formData.justification} 
          onChange={e => setFormData({...formData, justification: e.target.value})} 
          style={{ minHeight: 80 }}
          required 
        />
      </div>

      <div>
        <Label>Pièce jointe (Image/PDF - Max 1Mo)</Label>
        <div style={{ position: 'relative' }}>
          <input 
            type="file" 
            id="attachment-upload" 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          <label 
            htmlFor="attachment-upload"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
              border: '1px dashed var(--border)', borderRadius: 10, cursor: 'pointer',
              color: 'var(--text-secondary)', fontSize: 13, background: 'var(--bg-card)'
            }}
          >
            <Upload size={16} />
            {attachment ? <span>{attachment.name}</span> : <span>Choisir un fichier...</span>}
          </label>
          {attachment && (
            <button 
              type="button" 
              onClick={() => setAttachment(null)}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <Button variant="outline" type="button" onClick={onClose} style={{ flex: 1 }}>Annuler</Button>
        <Button type="submit" style={{ flex: 1 }}>
          {initialData ? "Mettre à jour" : "Enregistrer la dépense"}
        </Button>
      </div>
    </form>
  );
}
