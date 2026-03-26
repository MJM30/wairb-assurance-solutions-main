import { Shield, Users, Globe, Award } from "lucide-react";
import Reveal from "./Reveal";
import StatNumber from "./StatNumber";

const stats = [
  { icon: Shield, label: "Types d'assurance", value: "4", change: "" },
  { icon: Users, label: "Clients satisfaits", value: "500", change: "+12.5%" },
  { icon: Globe, label: "Partenaires", value: "15", change: "" },
  { icon: Award, label: "Années d'expertise", value: "10", change: "" },
];

const AboutSection = () => {
  return (
    <section id="apropos" className="py-20 surface-sunken overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-5">
            <Reveal animation="reveal-left">
              <span className="badge-primary inline-block">À Propos</span>
            </Reveal>
            <Reveal animation="reveal-left" delay={200}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Votre courtier de confiance en RDC
              </h2>
            </Reveal>
            <Reveal animation="reveal-left" delay={400}>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WAIRB DRC SAS est une société de courtage en assurance basée à Kinshasa, 
                République Démocratique du Congo. Nous accompagnons les particuliers et 
                les entreprises dans la recherche des meilleures solutions d'assurance, 
                en toute indépendance et transparence.
              </p>
            </Reveal>
            <Reveal animation="reveal-left" delay={600}>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Notre équipe d'experts analyse vos besoins spécifiques pour vous proposer 
                des contrats adaptés, négociés auprès des meilleures compagnies d'assurance 
                opérant en RDC et à l'international.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal animation="reveal-right">
              <div className="hero-gradient border border-primary-foreground/10 rounded-xl card-shadow overflow-hidden relative group">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
                
                <div className="relative z-10">
                  <div className="p-5 border-b border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm">
                    <h3 className="text-sm font-bold text-primary-foreground">WAIRB DRC en chiffres</h3>
                    <p className="text-xs text-primary-foreground/60 mt-0.5">Performance et résultats depuis notre création</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10">
                    {stats.map((stat, index) => (
                      <Reveal key={stat.label} animation="reveal-scale" delay={index * 100}>
                        <div className="p-5 text-center space-y-2 group/stat hover:bg-white/[0.02] transition-colors duration-300">
                          <div className="mx-auto w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover/stat:scale-110 transition-transform">
                            <stat.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <StatNumber 
                                value={stat.value} 
                                className="text-2xl font-medium text-primary-foreground tracking-tight"
                            />
                            {stat.change && (
                              <span className="badge-success text-[10px] bg-primary/20 text-primary-foreground border-none px-2 shadow-sm">{stat.change}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-primary-foreground/50 font-medium">{stat.label}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
