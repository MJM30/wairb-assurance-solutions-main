import React from "react";
import Reveal from "./Reveal";

const AboutStatsSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                <div className="flex flex-col gap-4">
                  <Reveal animation="reveal-left" delay={200}>
                    <div className="relative group overflow-hidden rounded-[2rem] w-64 h-80 sm:w-72 sm:h-96 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                      <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/images/img_05.jpg"
                        alt="Expertise"
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  </Reveal>
                  <Reveal animation="reveal-left" delay={400}>
                    <div className="relative group overflow-hidden rounded-[2rem] w-64 h-80 sm:w-72 sm:h-96 transform rotate-6 translate-x-12 -translate-y-12 hover:rotate-0 hover:translate-x-0 hover:translate-y-0 transition-all duration-500 shadow-2xl">
                      <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/images/img_06.jpg"
                        alt="Protection"
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  </Reveal>
                </div>
              </div>
              {/* Decorative elements similar to img_08 */}
              <div className="absolute -top-10 -left-10 w-32 h-32 border-2 border-primary/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="max-w-xl">
              <Reveal animation="reveal-right">
                <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
                  À PROPOS DE NOUS
                </span>
              </Reveal>
              <Reveal animation="reveal-right" delay={200}>
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                  Nous sommes l'extension de votre <span className="text-primary">sécurité au quotidien</span>
                </h2>
              </Reveal>
              <Reveal animation="reveal-right" delay={400}>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Au-delà du simple courtage, nous devenons votre partenaire stratégique pour anticiper les risques et protéger vos actifs les plus précieux. Notre approche personnalisée garantit une tranquillité d'esprit totale.
                </p>
              </Reveal>
              <div className="flex flex-wrap -mx-4 mb-10">
                <div className="w-1/2 px-4 mb-8 sm:mb-0">
                  <Reveal animation="reveal-scale" delay={600}>
                    <div className="flex items-center">
                      <span className="text-4xl md:text-5xl font-black text-primary mr-4">98%</span>
                      <p className="text-sm font-bold text-foreground max-w-[100px]">
                        Taux de satisfaction clients
                      </p>
                    </div>
                    <div className="h-1 w-full bg-muted mt-4 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[98%] transition-all duration-1000 delay-1000" />
                    </div>
                  </Reveal>
                </div>
                <div className="w-1/2 px-4">
                  <Reveal animation="reveal-scale" delay={800}>
                    <div className="flex items-center">
                      <span className="text-4xl md:text-5xl font-black text-primary mr-4">24h</span>
                      <p className="text-sm font-bold text-foreground max-w-[100px]">
                        Délai de réponse moyen
                      </p>
                    </div>
                    <div className="h-1 w-full bg-muted mt-4 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%] transition-all duration-1000 delay-1000" />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
