import React, { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MultiStepForm from "@/components/MultiStepForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, Award, Target, Heart, Eye, Gem, CheckCircle2, TrendingUp } from "lucide-react";

const About = () => {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback(() => {
    setFormOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRequestClick={openForm} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/img_31.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl">
            <Reveal animation="reveal-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                WAIRB DRC SAS : Votre Partenaire en <span className="text-primary">Indépendance & Expertise</span>
              </h1>
            </Reveal>
            <Reveal animation="reveal-left" delay={200}>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl leading-relaxed">
                Forts d'une présence solide en République Démocratique du Congo, nous redéfinissons le courtage en assurance par une approche transparente et centrée sur vos besoins.
              </p>
            </Reveal>
            <Reveal animation="reveal-left" delay={400}>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 font-bold"
                  onClick={() => document.getElementById('valeurs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Nos Valeurs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 font-bold text-white border-white hover:bg-white/10"
                  onClick={() => document.getElementById('gouvernance')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Découvrir l'équipe
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* History & Timeline */}
      <section className="py-24 bg-surface-sunken relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal animation="reveal-scale">
              <span className="badge-primary mb-4">Notre Histoire</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Évolution & Croissance</h2>
              <p className="text-muted-foreground">Découvrez le parcours de WAIRB, de sa fondation en Côte d'Ivoire à son expansion en RDC.</p>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto relative cursor-default">
            {/* Vertical Line */}
            <div className="absolute left-[15%] md:left-[50%] top-4 bottom-4 w-px bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10 md:-translate-x-1/2"></div>
            
            <div className="space-y-24 relative">
              {/* Event 1 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="w-full md:w-1/2 pl-24 md:pl-0 md:pr-16 md:text-right relative">
                  <Reveal animation="reveal-left">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Fondation d'Origine</h3>
                    <p className="text-muted-foreground leading-relaxed">Création de WAIRB à <strong className="text-primary">Abidjan, Côte d'Ivoire</strong>. Le début de notre engagement à fournir des solutions d'assurance indépendantes, innovantes et transparentes en Afrique.</p>
                  </Reveal>
                </div>
                
                <div className="absolute left-[15%] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary z-10 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:scale-125 group-hover:bg-primary"></div>
                
                <div className="hidden md:block w-1/2 pl-16 text-left relative z-0">
                  <span className="text-7xl md:text-8xl font-black text-primary/40 tracking-tighter select-none">2020</span>
                </div>
                {/* Mobile Furtive Date */}
                <div className="block md:hidden absolute -left-2 top-10 opacity-40 text-6xl font-black -rotate-90 origin-left select-none pointer-events-none text-primary">
                  2020
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="hidden md:block w-1/2 pr-16 text-right relative z-0">
                  <span className="text-7xl md:text-8xl font-black text-primary/40 tracking-tighter select-none">2025</span>
                </div>
                
                <div className="absolute left-[15%] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary z-10 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:scale-125 group-hover:bg-primary"></div>
                
                <div className="w-full md:w-1/2 pl-24 md:pl-16 text-left relative">
                  <Reveal animation="reveal-right">
                    <div className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-xs mb-3">Nouveau</div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Expansion en RDC</h3>
                    <p className="text-muted-foreground leading-relaxed">Création de la sous-branche à <strong className="text-primary">Kinshasa (République Démocratique du Congo)</strong>. Une étape décisive pour nous rapprocher des marchés dynamiques d'Afrique centrale et renforcer notre présence continentale.</p>
                  </Reveal>
                </div>
                {/* Mobile Furtive Date */}
                <div className="block md:hidden absolute -left-10 top-20 opacity-40 text-6xl font-black -rotate-90 origin-left select-none pointer-events-none text-primary">
                  2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Valeurs Section */}
      <section id="valeurs" className="py-24 bg-white relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Mission */}
            <Reveal animation="reveal" delay={100}>
              <div className="h-full p-8 rounded-3xl bg-surface-sunken border border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-xl group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Mission</h3>
                <p className="text-muted-foreground mb-6 font-medium">Accompagner les entreprises dans :</p>
                <ul className="space-y-4">
                  {[
                    "L’identification et l’analyse des risques",
                    "L’évaluation et la mise en place de couvertures adaptées",
                    "L’optimisation des contrats d’assurance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal animation="reveal" delay={300}>
              <div className="h-full p-8 rounded-3xl hero-gradient text-white shadow-2xl hover:shadow-primary/20 transition-all duration-300 group border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Vision</h3>
                <p className="text-white/90 leading-relaxed text-lg italic">
                  "Créer une marque africaine de référence en courtage, capable d’apporter des solutions innovantes et sur mesure en assurance Vie et Non-Vie."
                </p>
              </div>
            </Reveal>

            {/* Valeurs */}
            <Reveal animation="reveal" delay={500}>
              <div className="h-full p-8 rounded-3xl bg-surface-sunken border border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-xl group">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Gem className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Valeurs</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Professionnalisme",
                    "Réactivité",
                    "Engagement client",
                    "Excellence",
                    "Innovation"
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-2 bg-white rounded-full border border-primary/10 text-sm font-bold shadow-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Culture de performance */}
            <Reveal animation="reveal" delay={700}>
              <div className="h-full p-8 rounded-3xl hero-gradient text-white shadow-2xl hover:shadow-primary/20 transition-all duration-300 group border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Culture de performance</h3>
                <p className="text-white/80 mb-6 font-medium">WAIRB privilégie :</p>
                <ul className="space-y-4">
                  {[
                    "Une approche orientée résultats",
                    "Une gestion proactive des risques",
                    "Une amélioration continue des services"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white/60 shrink-0 mt-0.5" />
                      <span className="text-white/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Corporate Strategy & Governance */}
      <section id="gouvernance" className="py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal animation="reveal-scale">
              <span className="badge-primary mb-4">Gouvernance</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Conseil d'Administration</h2>
              <p className="text-muted-foreground">Une équipe de visionnaires guidant WAIRB DRC SAS vers l'excellence et l'intégrité.</p>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-20">
            {/* President of the Board */}
            <div className="lg:col-span-1">
              <Reveal animation="reveal-left">
                <div className="relative group">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img src="/images/img_27.jpg" alt="Président du Conseil" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-[240px]">
                    <h4 className="font-bold text-lg">Président du Conseil</h4>
                    <p className="text-primary text-sm font-semibold">Vision Stratégique</p>
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* Other Members */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { img: "/images/img_18.jpg", name: "Administrateur" },
                { img: "/images/img_19.jpg", name: "Administrateur" },
                { img: "/images/img_20.jpg", name: "Administrateur" },
                { img: "/images/img_28.jpg", name: "Administrateur" },
                { img: "/images/img_29.jpg", name: "Administrateur" },
              ].map((member, i) => (
                <Reveal key={i} animation="reveal-scale" delay={i * 100}>
                  <div className="group text-center">
                    <div className="aspect-square rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg mx-auto max-w-[160px]">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <p className="font-bold text-sm">{member.name}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Management */}
      <section className="py-24 bg-surface-sunken">
        <div className="container">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
               <div className="grid grid-cols-2 gap-6">
                  <Reveal animation="reveal-left">
                    <div className="space-y-4">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                        <img src="/images/img_16.jpg" alt="DG" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">Directeur Général</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">Engagement envers l'excellence opérationnelle.</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal animation="reveal-left" delay={200}>
                    <div className="space-y-4 mt-12">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                        <img src="/images/img_17.jpg" alt="DGA" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">DG Adjoint</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">Coordination et développement stratégique.</p>
                      </div>
                    </div>
                  </Reveal>
               </div>
            </div>
            <div className="w-full lg:w-1/2 px-8 lg:px-16">
              <Reveal animation="reveal-right">
                <span className="badge-primary mb-4">Direction Générale</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
                  Un Leadership de <span className="text-primary">Proximité</span> et d'Expertise
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  La direction de WAIRB DRC SAS s'appuie sur des décennies d'expérience combinée dans le secteur des assurances en Afrique. Notre mission est simple : transformer la gestion des risques de nos clients en un avantage compétitif.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Accompagnement personnalisé",
                    "Expertise technique pointue",
                    "Réactivité et transparence totale",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-semibold text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Teams & Mission */}
      <section className="py-24 bg-surface-sunken">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal animation="reveal-scale">
              <span className="badge-primary mb-4">Nos Équipes</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Le Cœur de notre Société</h2>
              <p className="text-muted-foreground">WAIRB est composé d’une équipe jeune, dynamique et hautement qualifiée, disposant d’une solide expérience dans les métiers de l’assurance et de la réassurance.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              "/images/img_21.jpg",
              "/images/img_22.jpg",
              "/images/img_23.jpg",
              "/images/img_25.jpg"
            ].map((img, i) => (
              <Reveal key={i} animation="reveal-scale" delay={i * 150}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                  <img src={img} alt="Team Member" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal animation="reveal-left">
              <div className="space-y-8">
                <div className="p-8 bg-white rounded-2xl shadow-xl border border-primary/5">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Notre Travail</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Chaque jour, nos équipes analysent, négocient et optimisent les portefeuilles d'assurance de nos clients. Nous nous engageons à trouver le meilleur rapport couverture-prix sur le marché congolais.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 rounded-xl overflow-hidden aspect-video relative group">
                    <img src="/images/img_24.jpg" alt="Travail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="reveal-right">
              <div className="space-y-8 mt-12 lg:mt-24">
                <div className="p-8 bg-white rounded-2xl shadow-xl border border-primary/5">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Heart className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Notre Accompagnement</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        L'assurance ne s'arrête pas à la signature du contrat. Nous vous accompagnons dans la gestion des sinistres et l'évolution de vos risques pour une protection pérenne.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 rounded-xl overflow-hidden aspect-video relative group">
                    <img src="/images/img_26.jpg" alt="Accompagnement" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="container relative z-10 text-center text-white">
          <Reveal animation="reveal-scale">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">Prêt à sécuriser votre avenir avec nous ?</h2>
            <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">Rejoignez les centaines d'entreprises et de particuliers qui nous font confiance pour leur protection.</p>
            <Button onClick={openForm} size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 font-bold py-7 text-lg">
              Contactez-nous aujourd'hui
            </Button>
          </Reveal>
        </div>
      </section>

      <MultiStepForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default About;
