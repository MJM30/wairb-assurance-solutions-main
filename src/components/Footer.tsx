import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="hero-gradient text-primary-foreground">
      <div className="container py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="flex items-center">
              <img 
                src="/images/img_logo.jpeg" 
                alt="WAIRB DRC Logo" 
                className="h-10 w-auto object-contain bg-white"
              />
            </div>
            <p className="text-primary-foreground/60 text-xs leading-relaxed max-w-xs">
              Société de courtage en assurance agréée, au service des particuliers et entreprises en RDC.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Contact</h4>
            <div className="space-y-2.5 text-xs text-primary-foreground/60">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Kinshasa, République Démocratique du Congo</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>+243 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>contact@wairbdrc.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Solutions</h4>
            <ul className="space-y-1.5 text-xs text-primary-foreground/60">
              <li>Assurance Habitation</li>
              <li>Multirisque Professionnelle</li>
              <li>Violence Politique & Terrorisme</li>
              <li>Assurance Automobile</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-[11px] text-primary-foreground/40">
          © {new Date().getFullYear()} WAIRB DRC SAS. Tous droits réservés. République Démocratique du Congo.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
