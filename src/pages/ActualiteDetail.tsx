import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiStepForm from "@/components/MultiStepForm";
import { actualites } from "@/data/actualites";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActualiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  
  const article = actualites.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <Button onClick={() => navigate("/actualites")}>Retour aux actualités</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRequestClick={() => setFormOpen(true)} />

      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          <Link to="/actualites" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-semibold mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux actualités
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="badge-primary flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> {article.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4" /> {article.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
              {article.title}
            </h1>

            <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl mb-12">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          <article className="prose prose-lg md:prose-xl max-w-none text-muted-foreground mb-16">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          <div className="border-t pt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold">Partager cet article :</span>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <MultiStepForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default ActualiteDetail;
