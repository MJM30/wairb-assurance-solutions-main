import { ShieldAlert, FileSearch, Lightbulb } from "lucide-react";
import Reveal from "./Reveal";

const articles = [
  {
    icon: ShieldAlert,
    title: "Check-up des risques en entreprise",
    description: "Identifier, analyser et cartographier les risques permet d’éviter des pertes majeures."
  },
  {
    icon: FileSearch,
    title: "Audit du portefeuille assurance",
    description: "Permet d’optimiser les contrats, éviter la sous/sur-assurance et réduire les coûts."
  },
  {
    icon: Lightbulb,
    title: "Sensibilisation et formation",
    description: "Former les équipes permet une meilleure culture du risque et une meilleure prévention."
  }
];

const ArticlesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <Reveal animation="reveal" className="text-center mb-16">
          <span className="badge-primary mb-3 inline-block">Conseils Pratiques</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Articles / Conseils en Assurance
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Reveal key={index} animation="reveal-scale" delay={index * 150}>
              <div className="bg-surface-sunken border border-primary/5 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <article.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {article.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
