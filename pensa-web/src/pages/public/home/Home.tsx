import { useEffect, useRef, useState } from "react";
import { ComplaintSection } from "../../../components/home/ComplaintsSection/ComplaintsSection";
import FaqSimple from "../../../components/home/FAQSection/FaqSimple";
import { HealthInfo } from "../../../components/home/HealthInfo/HealthInfo";
import { Hero } from "../../../components/home/Hero/Hero";
import { ImpactSection } from "../../../components/home/ImpactSection/ImpactSection";
import { InfoCards } from "../../../components/home/InfoCards/InfoCards";
import MentalHealth from "../../../components/home/MentalHealth/MentalHealth";
import { NewsSection } from "../../../components/home/NewsSection/NewsSection";
// import { PartnersSection } from "../../../components/home/PartnersSection/PartnersSection";
// import { SdgSection } from "../../../components/home/SdgSection/SdgSection";

// Hook para observar quando elementos entram na viewport
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: "50px",
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
}

// Componente wrapper para adicionar animações
function AnimatedSection({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero sem animação (primeira coisa que o usuário vê) */}
      <Hero />

      {/* Seções com transições suaves */}
      {/* <AnimatedSection delay={0.1}>
        <PartnersSection />
      </AnimatedSection> */}

      <AnimatedSection delay={0}>
        <InfoCards />
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <ImpactSection />
      </AnimatedSection>

      {/* <AnimatedSection delay={0}>
        <SdgSection />
      </AnimatedSection> */}

      <AnimatedSection delay={0}>
        <ComplaintSection />
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <HealthInfo />
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <MentalHealth />
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <NewsSection />
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <FaqSimple />
      </AnimatedSection>
    </div>
  );
}