import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiStepForm from "@/components/MultiStepForm";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const NosSolutions = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openForm = useCallback(() => {
    setPreselectedType("");
    setFormOpen(true);
  }, []);

  const openFormWithType = useCallback((type: string) => {
    setPreselectedType(type);
    setFormOpen(true);
  }, []);

  const solutions = [
    {
      id: "auto",
      title: "Assurance Automobile",
      description: "Protégez votre véhicule et vous-même avec une couverture complète adaptée aux routes de la RDC. De la responsabilité civile aux dommages tous accidents.",
      image: "/images/img_12.jpg",
      features: ["Responsabilité Civile", "Vol et Incendie", "Bris de Glace", "Assistance 24/7"]
    },
    {
      id: "professionnelle",
      title: "Multirisque Professionnelle",
      description: "Sécurisez l'avenir de votre entreprise. Une protection intégrale pour vos locaux, vos équipements et votre responsabilité civile exploitation.",
      image: "/images/img_13.jpg",
      features: ["Dommages aux biens", "Pertes d'exploitation", "RC Professionnelle", "Protection juridique"]
    },
    {
      id: "pvt",
      title: "Violence Politique & Terrorisme",
      description: "Une expertise unique en RDC pour couvrir les risques spéciaux liés à l'instabilité politique, aux émeutes et aux actes de terrorisme.",
      image: "/images/img_14.png",
      features: ["Émeutes et mouvements populaires", "Insurrection", "Actes de terrorisme", "Dommages matériels"]
    },
    {
      id: "habitation",
      title: "Assurance Habitation",
      description: "Votre foyer est votre sanctuaire. Assurez-le contre l'incendie, les dégâts des eaux, le vol et protégez votre famille.",
      image: "/images/img_15.jpg",
      features: ["Incendie et risques annexes", "Dégâts des eaux", "Vol et vandalisme", "RC Chef de famille"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRequestClick={openForm} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-64px)] min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/img_06.jpg" 
              alt="Nos Solutions" 
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
          </div>
          
          <div className="container relative z-10 text-primary-foreground">
            <Reveal animation="reveal-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight max-w-2xl">
                Nos Solutions d'Assurance sur Mesure
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/90 max-w-xl mb-8 leading-relaxed">
                Découvrez notre gamme complète de produits conçus pour répondre aux défis uniques du marché congolais.
              </p>
              <Button size="lg" onClick={openForm} className="rounded-full px-8 font-bold hover:scale-105 transition-transform">
                Obtenir un devis gratuit
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Detailed Solutions */}
        {solutions.map((solution, index) => (
          <section 
            key={solution.id} 
            className={`py-20 ${index % 2 === 1 ? 'bg-secondary/30' : 'bg-background'}`}
          >
            <div className="container">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : 'md:order-1'}>
                  <Reveal animation={index % 2 === 0 ? "reveal-left" : "reveal-right"}>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-foreground tracking-tight">
                      {solution.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                      {solution.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {solution.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => openFormWithType(solution.id)}
                      variant="outline"
                      className="group border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6"
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Reveal>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <Reveal animation="reveal-scale" delay={200}>
                    <div className="relative rounded-2xl overflow-hidden card-shadow-lg aspect-[4/3]">
                      <img 
                        src={solution.image} 
                        alt={solution.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    {/* Decorative element */}
                    <div className={`absolute -z-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 ${index % 2 === 0 ? '-top-10 -right-10' : '-bottom-10 -left-10'}`}></div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <section className="py-20 hero-gradient text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="container relative z-10">
            <Reveal animation="reveal">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">
                Besoin d'un conseil personnalisé ?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Nos experts sont à votre disposition pour analyser vos besoins et vous proposer la meilleure couverture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={openForm} className="bg-white text-primary hover:bg-gray-100 rounded-full font-bold px-10 h-14 text-lg">
                  Contactez un expert
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full font-bold px-10 h-14 text-lg">
                  Voir nos bureaux
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      
      <MultiStepForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        preselectedType={preselectedType}
      />
    </div>
  );
};

export default NosSolutions;
