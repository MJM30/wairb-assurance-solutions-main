// ============================================================
// WAIRB Admin — Shared Storage Utilities (localStorage bridge)
// ============================================================

export interface WairbClient {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adressePhysique: string;
  adressePostale: string;
  domaineActivite: string;
  ville: string;
  pays: string;
  typeAssurance: string;
  typeAssuranceLabel: string;
  matricule: string;
  dateInscription: string;
  statut: 'en_attente' | 'paye';
  datePaiement?: string;
  montantPaye?: number;
  detailsAssurance?: Record<string, unknown>;
}

export interface VisitorRecord {
  date: string; // YYYY-MM-DD
  count: number;
}

const CLIENTS_KEY = 'wairb_clients';
const VISITORS_KEY = 'wairb_visitors';

// ─── Clients ────────────────────────────────────────────────

export function getAllClients(): WairbClient[] {
  const raw = localStorage.getItem(CLIENTS_KEY);
  if (!raw) return getDefaultClients();
  try {
    const parsed = JSON.parse(raw) as WairbClient[];
    if (parsed.length === 0) return getDefaultClients();
    return parsed;
  } catch { return getDefaultClients(); }
}

export function saveClient(client: WairbClient): void {
  const clients = getAllClients();
  const idx = clients.findIndex(c => c.id === client.id);
  if (idx >= 0) clients[idx] = client;
  else clients.unshift(client);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function updateClientPayment(id: string, paid: boolean): void {
  const clients = getAllClients();
  const client = clients.find(c => c.id === id);
  if (!client) return;
  if (paid) {
    client.statut = 'paye';
    client.datePaiement = new Date().toISOString();
    client.montantPaye = getMontantByType(client.typeAssurance);
  } else {
    client.statut = 'en_attente';
    client.datePaiement = undefined;
    client.montantPaye = undefined;
  }
  const idx = clients.findIndex(c => c.id === id);
  clients[idx] = client;
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function getMontantByType(type: string): number {
  const prices: Record<string, number> = {
    habitation: 450,
    professionnelle: 1200,
    pvt: 2500,
    auto: 380,
  };
  return prices[type] ?? 500;
}

// ─── Visitors ────────────────────────────────────────────────

export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function recordVisit(): void {
  const today = getTodayKey();
  const raw = localStorage.getItem(VISITORS_KEY);
  let records: VisitorRecord[] = [];
  try { records = raw ? JSON.parse(raw) : []; } catch { records = []; }
  const idx = records.findIndex(r => r.date === today);
  if (idx >= 0) records[idx].count += 1;
  else records.push({ date: today, count: 1 });
  if (records.length > 30) records.splice(0, records.length - 30);
  localStorage.setItem(VISITORS_KEY, JSON.stringify(records));
}

export function getVisitorHistory(): VisitorRecord[] {
  const raw = localStorage.getItem(VISITORS_KEY);
  if (!raw) return getDefaultVisitors();
  try {
    const parsed = JSON.parse(raw) as VisitorRecord[];
    if (parsed.length === 0) return getDefaultVisitors();
    return parsed;
  } catch { return getDefaultVisitors(); }
}

export function getTodayVisitors(): number {
  const today = getTodayKey();
  const records = getVisitorHistory();
  return records.find(r => r.date === today)?.count ?? 0;
}

// ─── Insurance type labels ────────────────────────────────────

export function getTypeLabel(id: string): string {
  const map: Record<string, string> = {
    habitation: 'Assurance Habitation',
    professionnelle: 'Multirisque Professionnelle',
    pvt: 'Violence Politique & Terrorisme',
    auto: 'Assurance Automobile',
  };
  return map[id] ?? id;
}

// ─── Mock Data (pre-populated for demo) ──────────────────────

function getDefaultClients(): WairbClient[] {
  const clients: WairbClient[] = [
    {
      id: 'cli_001',
      nom: 'Jean-Pierre Mukendi',
      email: 'jp.mukendi@gmail.com',
      telephone: '+243 823 456 789',
      adressePhysique: 'Avenue Colonel Ebeya, Kinshasa',
      adressePostale: 'BP 12345',
      domaineActivite: 'Commerce',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'auto',
      typeAssuranceLabel: 'Assurance Automobile',
      matricule: 'WAIRB-AU7834K',
      dateInscription: '2024-11-05T08:30:00Z',
      statut: 'paye',
      datePaiement: '2024-11-10T10:00:00Z',
      montantPaye: 380,
    },
    {
      id: 'cli_002',
      nom: 'Marie-Claire Kabila',
      email: 'mkabila@outlook.com',
      telephone: '+243 815 234 567',
      adressePhysique: 'Quartier Matonge, Kalamu',
      adressePostale: 'BP 6789',
      domaineActivite: 'Enseignement',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'habitation',
      typeAssuranceLabel: 'Assurance Habitation',
      matricule: 'WAIRB-HA2291P',
      dateInscription: '2024-11-12T09:15:00Z',
      statut: 'paye',
      datePaiement: '2024-11-15T14:20:00Z',
      montantPaye: 450,
    },
    {
      id: 'cli_003',
      nom: 'Patrick Ilunga',
      email: 'pat.ilunga@yahoo.fr',
      telephone: '+243 991 345 678',
      adressePhysique: 'Avenue Bischoff, Lubumbashi',
      adressePostale: 'BP 2233',
      domaineActivite: 'Mining',
      ville: 'Lubumbashi',
      pays: 'RDC',
      typeAssurance: 'professionnelle',
      typeAssuranceLabel: 'Multirisque Professionnelle',
      matricule: 'WAIRB-PR5512A',
      dateInscription: '2024-11-18T11:00:00Z',
      statut: 'paye',
      datePaiement: '2024-11-20T16:00:00Z',
      montantPaye: 1200,
    },
    {
      id: 'cli_004',
      nom: 'Solange Mbuyi',
      email: 'sol.mbuyi@gmail.com',
      telephone: '+243 775 567 890',
      adressePhysique: 'Boulevard du 30 Juin, Gombe',
      adressePostale: 'BP 4410',
      domaineActivite: 'Santé',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'pvt',
      typeAssuranceLabel: 'Violence Politique & Terrorisme',
      matricule: 'WAIRB-PV0098Z',
      dateInscription: '2024-12-01T08:45:00Z',
      statut: 'en_attente',
    },
    {
      id: 'cli_005',
      nom: 'Emmanuel Tshisekedi',
      email: 'em.tshi@corp.cd',
      telephone: '+243 843 678 901',
      adressePhysique: 'Quartier Golf, Kinshasa',
      adressePostale: 'BP 9900',
      domaineActivite: 'Finance',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'auto',
      typeAssuranceLabel: 'Assurance Automobile',
      matricule: 'WAIRB-AU3341B',
      dateInscription: '2024-12-05T10:30:00Z',
      statut: 'en_attente',
    },
    {
      id: 'cli_006',
      nom: 'Claudine Nzuzi',
      email: 'cl.nzuzi@gmail.com',
      telephone: '+243 851 789 012',
      adressePhysique: 'Commune de Ngaliema, Kinshasa',
      adressePostale: 'BP 7712',
      domaineActivite: 'Agriculture',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'habitation',
      typeAssuranceLabel: 'Assurance Habitation',
      matricule: 'WAIRB-HA8876C',
      dateInscription: '2024-12-10T14:00:00Z',
      statut: 'paye',
      datePaiement: '2024-12-12T10:00:00Z',
      montantPaye: 450,
    },
    {
      id: 'cli_007',
      nom: 'Bienvenu Kasongo',
      email: 'b.kasongo@hotmail.com',
      telephone: '+243 899 890 123',
      adressePhysique: 'Avenue Tabora, Kinshasa',
      adressePostale: 'BP 3390',
      domaineActivite: 'Transport',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'auto',
      typeAssuranceLabel: 'Assurance Automobile',
      matricule: 'WAIRB-AU6647D',
      dateInscription: '2025-01-03T09:00:00Z',
      statut: 'en_attente',
    },
    {
      id: 'cli_008',
      nom: 'Joséphine Mwamba',
      email: 'j.mwamba@gmail.com',
      telephone: '+243 817 901 234',
      adressePhysique: 'Quartier Bilima, Lubumbashi',
      adressePostale: 'BP 5501',
      domaineActivite: 'Commerce de détail',
      ville: 'Lubumbashi',
      pays: 'RDC',
      typeAssurance: 'professionnelle',
      typeAssuranceLabel: 'Multirisque Professionnelle',
      matricule: 'WAIRB-PR1123E',
      dateInscription: '2025-01-08T11:30:00Z',
      statut: 'paye',
      datePaiement: '2025-01-10T09:00:00Z',
      montantPaye: 1200,
    },
    {
      id: 'cli_009',
      nom: 'Roger Banza',
      email: 'r.banza@yahoo.fr',
      telephone: '+243 978 012 345',
      adressePhysique: 'Avenue Plateau, Goma',
      adressePostale: 'BP 8823',
      domaineActivite: 'Tourisme',
      ville: 'Goma',
      pays: 'RDC',
      typeAssurance: 'pvt',
      typeAssuranceLabel: 'Violence Politique & Terrorisme',
      matricule: 'WAIRB-PV4456F',
      dateInscription: '2025-01-15T15:00:00Z',
      statut: 'paye',
      datePaiement: '2025-01-18T11:00:00Z',
      montantPaye: 2500,
    },
    {
      id: 'cli_010',
      nom: 'Nathalie Lokota',
      email: 'n.lokota@gmail.com',
      telephone: '+243 824 123 456',
      adressePhysique: 'Avenue des Aviateurs, Gombe',
      adressePostale: 'BP 6645',
      domaineActivite: 'ONG',
      ville: 'Kinshasa',
      pays: 'RDC',
      typeAssurance: 'habitation',
      typeAssuranceLabel: 'Assurance Habitation',
      matricule: 'WAIRB-HA3318G',
      dateInscription: '2025-02-01T08:00:00Z',
      statut: 'en_attente',
    },
  ];
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  return clients;
}

function getDefaultVisitors(): VisitorRecord[] {
  const records: VisitorRecord[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    records.push({
      date: dateStr,
      count: Math.floor(Math.random() * 80) + 20,
    });
  }
  records[records.length - 1].count = Math.floor(Math.random() * 40) + 10;
  localStorage.setItem(VISITORS_KEY, JSON.stringify(records));
  return records;
}
