import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";

interface HeroSectionProps {
  onRequestClick: () => void;
}

const backgroundImages = [
  "/images/img_15.jpg",
  "/images/img_09.jpg"
];

const HeroSection = ({ onRequestClick }: HeroSectionProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goToNext = () => {
    setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    startTimer();
  };

  const goToPrev = () => {
    setCurrentIdx((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
    startTimer();
  };

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
    startTimer();
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-end pb-16 bg-black overflow-hidden group/hero">
      {/* Background Images with Cross-fade */}
      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIdx ? "opacity-40" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Hero Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[2]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Manual Navigation Arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all opacity-0 group-hover/hero:opacity-100 hidden md:block"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all opacity-0 group-hover/hero:opacity-100 hidden md:block"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              idx === currentIdx ? "bg-primary w-6" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="container relative z-10 py-10" key={currentIdx}>
        <div className="max-w-2xl space-y-6">
          <Reveal animation="reveal-left" delay={200}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight tracking-tight">
              Protégez ce qui
              <br />
              <span className="text-primary">compte le plus</span>
            </h1>
          </Reveal>

          <Reveal animation="reveal-left" delay={400}>
            <p className="text-sm md:text-base text-primary-foreground/70 max-w-xl leading-relaxed">
              WAIRB DRC SAS, votre partenaire de confiance en courtage d'assurance à Kinshasa. 
              Des solutions sur mesure pour particuliers et entreprises.
            </p>
          </Reveal>

          <Reveal animation="reveal-left" delay={600}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="text-xs font-semibold px-6 gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-11"
                onClick={onRequestClick}
              >
                Soumettre une demande
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-xs font-semibold px-6 rounded-lg h-11 border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <a href="#solutions">Découvrir nos solutions</a>
              </Button>
            </div>
          </Reveal>

          <Reveal animation="reveal-left" delay={800}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {["Conseil personnalisé", "Conformité internationale", "Réponse sous 24h"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-primary-foreground/50">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary/70" />
                  <span className="text-[10px] md:text-xs font-medium tracking-wide uppercase">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
