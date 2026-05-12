import { Mail, Phone, MapPin, ShieldCheck, FileText, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Footer = () => {
  return (
    <footer id="contact" className="hero-gradient text-primary-foreground">
      <div className="container py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/img_logo.jpeg" 
                alt="WAIRB DRC Logo" 
                className="h-10 w-auto object-contain bg-white rounded"
              />
            </div>
            <p className="text-primary-foreground/60 text-xs leading-relaxed">
              Société de courtage en assurance agréée, au service des particuliers et entreprises en RDC.
            </p>
            <div className="space-y-1 pt-2">
              <p className="text-[10px] text-primary-foreground/40 font-medium uppercase tracking-wider">Identification</p>
              <p className="text-[11px] text-primary-foreground/70 flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                RCCM : A2424184P
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Contact
            </h4>
            <div className="space-y-3 text-xs text-primary-foreground/60">
              <div>
                <p className="font-semibold text-white mb-1">Kinshasa</p>
                <p className="leading-relaxed">Avenue des Aviateurs n°3, Quartier de la Gare, Commune de la Gombe, Kinshasa – RDC</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Phone className="h-3 w-3 shrink-0" />
                  <span>+243 822 135 376</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="font-semibold text-white mb-1">Abidjan</p>
                <p className="leading-relaxed">Cocody Riviera Palmeraie, 3e étage, face à la Sodéc</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Phone className="h-3 w-3 shrink-0" />
                  <span>+225 27 22 40 03 / 07 09 09 79 61</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span>contact@wairb.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span>fleury.ngoma@wairb.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Agrément ARCA</h4>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold">Société agréée</span>
              </div>
              <p className="text-[11px] text-primary-foreground/60 leading-relaxed">
                Numéro : <span className="text-white font-medium">060/2025</span><br />
                DU 20 MAI 2025
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Politique</h4>
            <ul className="space-y-3 text-xs text-primary-foreground/60">
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-white transition-colors flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5" />
                    Politique de confidentialité
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white text-slate-900 border-none rounded-3xl overflow-hidden p-0">
                    <div className="hero-gradient p-8 text-white">
                      <DialogHeader>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                        <DialogTitle className="text-2xl font-bold">Politique de Confidentialité</DialogTitle>
                      </DialogHeader>
                    </div>
                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                      <p className="text-slate-600">
                        WAIRB garantit la confidentialité des informations de ses clients. Les données collectées sont utilisées uniquement pour :
                      </p>
                      <ul className="space-y-3">
                        {["La gestion des contrats", "Le suivi des sinistres", "L’amélioration des services"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                        <p className="font-bold text-slate-900">WAIRB s’engage à :</p>
                        <ul className="grid gap-3">
                          {[
                            "Protéger les données personnelles",
                            "Ne pas les divulguer sans autorisation",
                            "Respecter les réglementations en vigueur"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li className="opacity-50">Conditions Générales (Bientôt)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-primary-foreground/40 font-medium">
          <p>© {new Date().getFullYear()} WAIRB DRC SAS. Tous droits réservés.</p>
          <p>République Démocratique du Congo | Immatriculation : A2424184P</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
