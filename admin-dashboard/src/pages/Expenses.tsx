import { useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Wallet, Plus, Target, PieChart, FileText, Search, 
  Pencil, RotateCcw, Download, ExternalLink, User, ArrowRightLeft,
  Calendar, X, Ban
} from 'lucide-react';
import { 
  getAllExpenses, getAllExpenseBudgets, getCategoryLabel, cancelExpense,
  type Expense, type ExpenseCategory 
} from '../lib/storage';
import { Button } from '../components/ui/button';
import ExpenseForm from '../components/forms/ExpenseForm';
import BudgetForm from '../components/forms/BudgetForm';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4, fontWeight: 700 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: ${Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function Expenses() {
  const [refresh, setRefresh] = useState(0);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [search, setSearch] = useState('');

  const triggerRefresh = () => setRefresh(prev => prev + 1);

  const expenses = useMemo(() => getAllExpenses(), [refresh]);
  const budgets = useMemo(() => getAllExpenseBudgets(), [refresh]);

  const now = new Date();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = now.getFullYear().toString();

  // Current month stats
  const currentMonthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return (d.getMonth() + 1).toString().padStart(2, '0') === currentMonth && d.getFullYear().toString() === currentYear;
  });

  const activeExpenses = currentMonthExpenses.filter(e => e.status !== 'annule');

  const totalSpent = activeExpenses.reduce((s, e) => s + e.amount, 0);
  const currentMonthBudgets = budgets.filter(b => b.month === currentMonth && b.year === currentYear);
  const totalBudget = currentMonthBudgets.reduce((s, b) => s + b.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUsage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  // Comparison Data by Category
  const comparisonData = useMemo(() => {
    const categories: ExpenseCategory[] = ['salaire', 'carburant', 'deplacement', 'loyer', 'marketing', 'logistique', 'maintenance', 'divers'];
    return categories.map(cat => {
      const budget = currentMonthBudgets.find(b => b.category === cat)?.amount || 0;
      const actual = activeExpenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
      return {
        name: getCategoryLabel(cat),
        Budget: budget,
        Dépensé: actual
      };
    });
  }, [activeExpenses, currentMonthBudgets]);

  const filteredExpenses = expenses.filter(e => 
    e.recipientName.toLowerCase().includes(search.toLowerCase()) ||
    e.disburserName.toLowerCase().includes(search.toLowerCase()) ||
    e.justification.toLowerCase().includes(search.toLowerCase()) ||
    getCategoryLabel(e.category).toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (expense: Expense) => {
    setExpenseToEdit(expense);
    setShowExpenseModal(true);
  };

  const handleCancel = (id: string) => {
    if (confirm("Voulez-vous vraiment annuler ce décaissement ?")) {
      cancelExpense(id);
      triggerRefresh();
    }
  };

  const getTimeStatus = (createdAt: string) => {
    const diff = Date.now() - new Date(createdAt).getTime();
    return {
      canEdit: diff < 3600000,   // 1 hour
      canCancel: diff < 1800000, // 30 minutes
    };
  };

  const openAttachment = (attachment: any) => {
    const win = window.open();
    if (win) {
      win.document.write(`<iframe src="${attachment.data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Suivi des Dépenses</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Justifiez vos décaissements et surveillez votre budget.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="outline" onClick={() => setShowBudgetModal(true)} style={{ gap: 8 }}>
            <Target size={16} />
            Définir Budget
          </Button>
          <Button onClick={() => { setExpenseToEdit(null); setShowExpenseModal(true); }} style={{ gap: 8 }}>
            <Plus size={16} />
            Nouveau Décaissement
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-3">
        <div className="stat-card" onClick={() => setShowBreakdownModal(true)} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#16c78418', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} color="#16c784" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
               <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>MOIS ACTUEL</span>
               <span style={{ fontSize: 9, color: 'var(--accent)', fontWeight: 600 }}>Voir détails</span>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)' }}>${totalSpent.toLocaleString()}</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Total dépensé</p>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#3b82f618', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={18} color="#3b82f6" />
            </div>
            <div className={`badge ${budgetUsage > 100 ? 'badge-red' : 'badge-green'}`} style={{ fontSize: 10 }}>
              {budgetUsage}% utilisé
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)' }}>${totalBudget.toLocaleString()}</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Budget prévisionnel</p>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f59e0b18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRightLeft size={18} color="#f59e0b" />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: remainingBudget >= 0 ? '#16c784' : '#ef4444' }}>
              ${remainingBudget.toLocaleString()}
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Solde restant</p>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 className="section-title">Comparatif Budget vs Réel</h3>
            <p className="section-subtitle">Visualisation par catégorie pour le mois en cours</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#3b82f6' }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Budget</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#16c784' }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Dépenses</span>
             </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Budget" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Dépensé" fill="#16c784" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expense List */}
      <div className="card">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="section-title">Journal des décaissements</h3>
          <div style={{ position: 'relative', width: 300 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              className="input" 
              placeholder="Rechercher une dépense, un nom..." 
              style={{ paddingLeft: 36, width: '100%', height: 38 }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Catégorie</th>
                <th>Décaisseur / Bénéficiaire</th>
                <th>Justification</th>
                <th style={{ textAlign: 'right' }}>Montant</th>
                <th style={{ textAlign: 'center' }}>Pièce</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                      <FileText size={32} strokeWidth={1} />
                      <p>Aucun décaissement trouvé.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredExpenses.map(expense => {
                  const { canEdit, canCancel } = getTimeStatus(expense.createdAt);
                  const isCancelled = expense.status === 'annule';
                  return (
                    <tr key={expense.id} style={{ opacity: isCancelled ? 0.6 : 1 }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Calendar size={14} color="var(--text-muted)" />
                          <span style={{ fontSize: 13 }}>{new Date(expense.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-blue">{getCategoryLabel(expense.category)}</span>
                      </td>
                      <td>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <User size={12} color="var(--accent)" />
                            <span style={{ fontWeight: 600, textDecoration: isCancelled ? 'line-through' : 'none' }}>{expense.disburserName}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ArrowRightLeft size={8} color="var(--text-muted)" />
                            </div>
                            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{expense.recipientName}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ maxWidth: 300 }}>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {expense.justification}
                        </p>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: isCancelled ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                        ${expense.amount.toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {expense.attachment ? (
                          <button 
                            onClick={() => openAttachment(expense.attachment)}
                            className="btn-circle" 
                            title="Voir le justificatif"
                            style={{ color: 'var(--accent)', background: 'var(--accent-bg)', border: 'none' }}
                          >
                            <Download size={14} />
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>Aucun</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                          {isCancelled ? (
                            <span className="badge badge-red" style={{ gap: 4 }}><Ban size={10} /> Annulé</span>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleEdit(expense)}
                                disabled={!canEdit}
                                className="btn-circle"
                                title={canEdit ? "Modifier" : "Délai de modification dépassé (1h)"}
                                style={{ 
                                  color: canEdit ? 'var(--info)' : 'var(--text-muted)', 
                                  background: canEdit ? 'var(--info-bg)' : 'transparent', 
                                  border: 'none',
                                  cursor: canEdit ? 'pointer' : 'not-allowed',
                                  opacity: canEdit ? 1 : 0.5
                                }}
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                onClick={() => handleCancel(expense.id)}
                                disabled={!canCancel}
                                className="btn-circle"
                                title={canCancel ? "Annuler le décaissement" : "Délai d'annulation dépassé (30min)"}
                                style={{ 
                                  color: canCancel ? 'var(--warning)' : 'var(--text-muted)', 
                                  background: canCancel ? 'var(--warning-bg)' : 'transparent', 
                                  border: 'none',
                                  cursor: canCancel ? 'pointer' : 'not-allowed',
                                  opacity: canCancel ? 1 : 0.5
                                }}
                              >
                                <RotateCcw size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showExpenseModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowExpenseModal(false)}>
          <div className="modal-box" style={{ maxWidth: 600 }}>
             <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Nouveau Décaissement</h2>
                <button onClick={() => setShowExpenseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
             </div>
             <div style={{ padding: 24 }}>
                <ExpenseForm 
                  initialData={expenseToEdit} 
                  onClose={() => { setShowExpenseModal(false); setExpenseToEdit(null); }} 
                  onRefresh={triggerRefresh} 
                />
             </div>
          </div>
        </div>
      )}

      {showBudgetModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowBudgetModal(false)}>
          <div className="modal-box" style={{ maxWidth: 500 }}>
             <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Paramètres du Budget</h2>
                <button onClick={() => setShowBudgetModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
             </div>
             <div style={{ padding: 24 }}>
                <BudgetForm onClose={() => setShowBudgetModal(false)} onRefresh={triggerRefresh} />
             </div>
          </div>
        </div>
      )}
      {showBreakdownModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowBreakdownModal(false)}>
          <div className="modal-box" style={{ maxWidth: 700 }}>
             <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>Justification du Total Dépensé</h2>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Mois de {new Date(currentYear + '-' + currentMonth + '-01').toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                </div>
                <button onClick={() => setShowBreakdownModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
             </div>
             <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: 16, background: 'var(--bg-primary)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>CUMUL DES DÉCAISSEMENTS VALIDE</span>
                    <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--accent)' }}>${totalSpent.toLocaleString()}</span>
                  </div>
                  
                  <div style={{ marginTop: 8 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Détail par opération</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto', paddingRight: 8 }}>
                      {activeExpenses.map(exp => (
                        <div key={exp.id} style={{ padding: '10px 12px', background: 'var(--bg-primary)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600 }}>{exp.recipientName}</p>
                            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{getCategoryLabel(exp.category)} • {new Date(exp.date).toLocaleDateString()}</p>
                          </div>
                          <span style={{ fontWeight: 700 }}>${exp.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 24 }}>
                  <Button onClick={() => setShowBreakdownModal(false)} style={{ width: '100%' }}>Fermer</Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
