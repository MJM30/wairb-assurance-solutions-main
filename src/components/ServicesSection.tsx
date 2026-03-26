import { Home, Building2, AlertTriangle, Car, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface ServicesSectionProps {
  onSelectInsurance: (type: string) => void;
}

const services = [
  {
    id: "habitation",
    icon: Home,
    title: "Assurance Habitation",
    description: "Protection complète de votre résidence, mobilier et responsabilité civile familiale.",
    badge: "Particulier",
  },
  {
    id: "professionnelle",
    icon: Building2,
    title: "Multirisque Professionnelle",
    description: "Couverture intégrale pour vos locaux, équipements, stocks et responsabilité professionnelle.",
    badge: "Entreprise",
  },
  {
    id: "pvt",
    icon: AlertTriangle,
    title: "Violence Politique & Terrorisme",
    description: "Protection spécialisée contre les risques de violence politique, terrorisme et émeutes.",
    badge: "Spécialisé",
  },
  {
    id: "auto",
    icon: Car,
    title: "Assurance Automobile",
    description: "Couverture adaptée pour vos véhicules : RC, vol, incendie, dommages et assistance.",
    badge: "Véhicule",
  },
];

const ServicesSection = ({ onSelectInsurance }: ServicesSectionProps) => {
  return (
    <section id="solutions" className="py-20 bg-background overflow-hidden">
      <div className="container">
        <div className="max-w-xl mb-12">
          <Reveal animation="reveal">
            <span className="badge-primary mb-3 inline-block">Nos Solutions</span>
          </Reveal>
          <Reveal animation="reveal" delay={200}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 tracking-tight">
              Des assurances adaptées à vos besoins
            </h2>
          </Reveal>
          <Reveal animation="reveal" delay={400}>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sélectionnez le type d'assurance qui vous convient pour recevoir un devis personnalisé de notre équipe d'experts.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Reveal 
              key={service.id} 
              animation="reveal-scale" 
              delay={index * 100}
            >
              <div
                className="group hero-gradient border border-primary-foreground/10 rounded-xl p-6 card-shadow hover:card-shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden h-full"
                onClick={() => onSelectInsurance(service.id)}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="badge-primary px-2 py-0.5 rounded-full text-[10px] bg-primary-foreground/10 text-primary border border-primary-foreground/5">{service.badge}</span>
                  </div>
                  <h3 className="text-sm font-bold text-primary-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-primary-foreground/70 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Faire une demande
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
