import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "./Reveal";

const faqs = [
  {
    question: "Quel est le rôle d’un courtier ?",
    answer: "Un courtier agit comme intermédiaire indépendant et conseille le client pour obtenir la meilleure couverture."
  },
  {
    question: "Pourquoi passer par WAIRB ?",
    answer: "Pour bénéficier d’une expertise, d’un accompagnement personnalisé et de solutions optimisées."
  },
  {
    question: "Intervenez-vous en cas de sinistre ?",
    answer: "Oui, WAIRB assure le suivi et l’assistance jusqu’au règlement."
  }
];

const FaqSection = () => {
  return (
    <section className="py-20 bg-surface-sunken">
      <div className="container max-w-4xl">
        <Reveal animation="reveal">
          <div className="text-center mb-12">
            <span className="badge-primary mb-3 inline-block">Questions Fréquentes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              FAQ
            </h2>
          </div>
        </Reveal>

        <Reveal animation="reveal-scale" delay={200}>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-primary/5">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/10 last:border-0">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FaqSection;
