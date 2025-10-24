import { ComplaintSection } from "../../../components/home/ComplaintsSection/ComplaintsSection";
import { FaqSimple } from "../../../components/home/FAQSection/FaqSimple";
import { HealthInfo } from "../../../components/home/HealthInfo/HealthInfo";
import { Hero } from "../../../components/home/Hero/Hero";
import { ImpactSection } from "../../../components/home/ImpactSection/ImpactSection";
import { InfoCards } from "../../../components/home/InfoCards/InfoCards";
import { MentalHealth } from "../../../components/home/MentalHealth/MentalHealth";
import { NewsSection } from "../../../components/home/NewsSection/NewsSection";
import { PartnersSection } from "../../../components/home/PartnersSection/PartnersSection";
import { SdgSection } from "../../../components/home/SdgSection/SdgSection";

export function Home() {
  return (
    <>
      <Hero />
      <PartnersSection />
      <InfoCards />
      <ImpactSection />
      {/* <SdgSection /> */}
      <ComplaintSection />
      <HealthInfo />
      <MentalHealth />
      <NewsSection />
      <FaqSimple />
    </>
  );
}

