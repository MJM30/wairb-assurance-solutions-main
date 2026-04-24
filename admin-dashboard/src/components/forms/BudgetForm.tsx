import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { type ExpenseCategory, getCategoryLabel, saveExpenseBudget, getAllExpenseBudgets } from '../../lib/storage';
import { Target, CheckCircle2 } from 'lucide-react';

interface BudgetFormProps {
  onClose: () => void;
  onRefresh: () => void;
}

const CATEGORIES: ExpenseCategory[] = [
  'salaire', 'carburant', 'deplacement', 'loyer', 'marketing', 'logistique', 'maintenance', 'divers'
];

export default function BudgetForm({ onClose, onRefresh }: BudgetFormProps) {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState((now.getMonth() + 1).toString().padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState(now.getFullYear().toString());
  
  // Load existing budgets for the selected month/year
  const existing = getAllExpenseBudgets();
  const [budgets, setBudgets] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    CATEGORIES.forEach(cat => {
      const b = existing.find(x => x.category === cat && x.month === selectedMonth && x.year === selectedYear);
      map[cat] = b ? b.amount.toString() : '';
    });
    return map;
  });

  const [submitted, setSubmitted] = useState(false);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    const map: Record<string, string> = {};
    CATEGORIES.forEach(cat => {
      const b = existing.find(x => x.category === cat && x.month === month && x.year === selectedYear);
      map[cat] = b ? b.amount.toString() : '';
    });
    setBudgets(map);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    CATEGORIES.forEach(cat => {
      const amt = parseFloat(budgets[cat]);
      if (!isNaN(amt)) {
        saveExpenseBudget({
          month: selectedMonth,
          year: selectedYear,
          category: cat,
          amount: amt
        });
      }
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
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Budget enregistré !</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
          Vos prévisions budgétaires pour {selectedMonth}/{selectedYear} ont été mises à jour.
        </p>
        <Button onClick={onClose} style={{ width: '100%' }}>Fermer</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="grid-2" style={{ gap: 12 }}>
        <div>
          <Label>Mois</Label>
          <select 
            className="input" 
            style={{ width: '100%', height: 42 }}
            value={selectedMonth}
            onChange={e => handleMonthChange(e.target.value)}
          >
            {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Année</Label>
          <select 
            className="input" 
            style={{ width: '100%', height: 42 }}
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            {['2024', '2025', '2026'].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CATEGORIES.map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{getCategoryLabel(cat)}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Objectif mensuel</p>
              </div>
              <div style={{ width: 120 }}>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={budgets[cat]} 
                  onChange={e => setBudgets({...budgets, [cat]: e.target.value})} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <Button variant="outline" type="button" onClick={onClose} style={{ flex: 1 }}>Annuler</Button>
        <Button type="submit" style={{ flex: 1, gap: 8 }}>
          <Target size={16} />
          Mettre à jour le budget
        </Button>
      </div>
    </form>
  );
}
