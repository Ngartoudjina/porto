import Section1 from "@/components/Section1";
import ServicesSection from "@/components/ServicesSection";
import AboutMeSection from "@/components/AboutMeSection";
import ToolsShowcase from "@/components/ToolsShowcase";
import ProgrammingLanguages from "@/components/ProgrammingLanguages";
import IDEs from "@/components/IDEs";
import DayInLife from "@/components/DayInLife";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import AcademicProfessionalJourney from "@/components/AcademicProfessionalJourney";
import ContactForm from "@/components/ContactForm";
import ClientTestimonials from "@/components/ClientTestimonials";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Section1 />
      <ServicesSection />
      <AboutMeSection />
      <ToolsShowcase />
      <ProgrammingLanguages />
      <IDEs />
      <DayInLife />
      <PortfolioShowcase />
      <AcademicProfessionalJourney />
      <ContactForm />
      <ClientTestimonials />
      <FAQ />
    </main>
  );
}