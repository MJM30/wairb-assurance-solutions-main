import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    number: "01.",
    title: "Évaluation de vos besoins",
    description: "Nous analysons votre profil et vos risques pour définir la couverture idéale au meilleur prix.",
    image: "/images/img_03.jpg",
    quote: "Une analyse précise pour une protection optimale."
  },
  {
    number: "02.",
    title: "Négociation & Sélection",
    description: "Nous consultons nos partenaires assureurs pour vous proposer les offres les plus compétitives du marché.",
    image: "/images/img_02.jpg",
    quote: "Le meilleur du marché au service de vos intérêts."
  },
  {
    number: "03.",
    title: "Accompagnement & Sinistres",
    description: "Nous gérons vos contrats au quotidien et vous assistons personnellement en cas de sinistre.",
    image: "/images/img_11.jpg",
    quote: "Une réactivité exemplaire quand vous en avez le plus besoin."
  },
];

const ProcessSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      {/* Subtle pattern overlay mapping Hero style */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-xl mb-16">
          <Reveal animation="reveal">
            <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold tracking-widest text-primary uppercase bg-primary-foreground/10 rounded-full border border-primary-foreground/10 backdrop-blur-sm">
              NOTRE PROCESSUS
            </span>
          </Reveal>
          <Reveal animation="reveal" delay={200}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight">
              Un processus simple, efficace en trois étapes
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <Reveal 
                  key={index} 
                  animation="reveal-left" 
                  delay={ index * 100 }
                >
                  <div 
                    onClick={() => setActiveIndex(index)}
                    className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer group/step ${
                      index === activeIndex 
                        ? "bg-primary-foreground/10 backdrop-blur-md shadow-2xl border-primary-foreground/20 translate-x-2" 
                        : "bg-transparent border-transparent hover:bg-primary-foreground/5 hover:border-primary-foreground/10"
                    }`}
                  >
                    <div className="flex flex-wrap items-start">
                      <div className="w-12 mb-4 sm:mb-0 sm:mr-8">
                        <span className={`text-3xl md:text-4xl font-black transition-colors duration-500 ${index === activeIndex ? "text-primary" : "text-primary-foreground/20 group-hover/step:text-primary-foreground/40"}`}>{step.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${index === activeIndex ? "text-primary-foreground" : "text-primary-foreground/60 group-hover/step:text-primary-foreground/80"}`}>{step.title}</h3>
                        <p className={`leading-relaxed transition-colors duration-500 ${index === activeIndex ? "text-primary-foreground/80" : "text-primary-foreground/40 group-hover/step:text-primary-foreground/60"}`}>
                          {step.description}
                        </p>
                        {index === activeIndex && (
                          <div className="mt-4 flex items-center text-sm font-bold text-primary animate-fade-in">
                            Étape active
                            <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 mt-12 lg:mt-0">
            <Reveal animation="reveal-right" className="h-full">
              <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl h-full min-h-[450px] border border-primary-foreground/10 bg-primary-foreground/5">
                {steps.map((step, index) => (
                  <img
                    key={index}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      index === activeIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-1 shadow-inner"
                    }`}
                    src={step.image}
                    alt={step.title}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-primary-foreground font-bold text-lg leading-snug animate-fade-in" key={activeIndex}>
                    "{steps[activeIndex].quote}"
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
