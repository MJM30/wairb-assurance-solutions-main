import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MultiStepForm from "@/components/MultiStepForm";
import { actualites } from "@/data/actualites";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const Actualites = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-sunken">
      <Navbar onRequestClick={() => setFormOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/img_21.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container relative z-10 text-white mt-16">
          <div className="max-w-3xl">
            <Reveal animation="reveal-scale">
              <span className="badge-primary text-white border-white/20 bg-white/10 mb-4 backdrop-blur-sm">Mises à jour</span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Actualités & <span className="text-primary">Insights</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Restez informés des dernières tendances en matière d'assurance, de la gestion des risques et de la vie de notre entreprise en RDC.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((article, index) => (
              <Reveal key={article.id} animation="reveal-scale" delay={index * 150}>
                <Link to={`/actualites/${article.id}`} className="group block h-full">
                  <article className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video overflow-hidden relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {article.category}
                        </span>
                      </div>
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all mt-auto">
                        Lire l'article <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
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

export default Actualites;
