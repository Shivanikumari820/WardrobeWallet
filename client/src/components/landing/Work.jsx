import payment from "../../assets/payment.png";
import pickup from "../../assets/pickup.png";
import schedule from "../../assets/schedule.png";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import WorkCard from "../ui/WorkCard";

const steps = [
  {
    step: 1,
    image: schedule,
    title: "Schedule a Pickup",
    description: "Book through WhatsApp, Mobile App, Call, or Website for hassle-free scheduling.",
  },
  {
    step: 2,
    image: pickup,
    title: "Free Pickup",
    description: "Pickup request confirmed. Our staff will arrive at your doorstep at your selected time.",
  },
  {
    step: 3,
    image: payment,
    title: "Secure Payment",
    description: "We make payments via Cash or UPI immediately after collection.",
  },
];

const Work = () => {
  return (
    <Section className="text-center" rightBlob={true} leftBlob={false}>
      <SectionHeader 
        subtitle="Work Process"
        title="How it works"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
        {steps.map(({ step, image, title, description }) => (
          <WorkCard
            key={step}
            step={step}
            image={image}
            title={title}
            description={description}
          />
        ))}
      </div>
    </Section>
  );
};

export default Work;
   