import ContainerText from "@/components/ContainerText";
import Titles from "@/components/Titles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "Is Medellín safe for tourists?",
    answer:
      "Yes, Medellín has become much safer in recent years. While some areas are best avoided, most tourist-friendly neighborhoods like El Poblado and Laureles are generally safe. As with any city, it’s important to stay aware, avoid risky areas at night, and follow common-sense precautions.",
  },
  {
    question: "What is the best time to visit Medellín?",
    answer:
      "Medellín has a year-round spring-like climate, making it an excellent destination any time of the year. However, the dry season (December to February) is particularly pleasant for outdoor activities and sightseeing. The rainy seasons are in March to May and September to November, but rain usually comes in the afternoon and doesn’t last long.",
  },
  {
    question: "How do I get around Medellín?",
    answer:
      "The city has a well-connected and affordable public transportation system, including the Metro, Metrocable (cable cars), and buses. For convenience, ride-sharing apps like Uber and DiDi are also widely used. Taxis are available but be cautious when hailing them off the street.",
  },
  {
    question: "What are the must-visit attractions in Medellín?",
    answer:
      "Some of the most popular attractions include: Plaza Botero, with sculptures by Fernando Botero, Comuna 13, famous for its street art and social transformation, Parque Arví, a nature reserve just outside the city, Museo de Antioquia, showcasing Botero’s works and regional art, Pueblito Paisa, a replica of a traditional Antioquian village with panoramic views of the city.",
  },
  {
    question: "What’s the nightlife like in Medellín?",
    answer:
      "Medellín has a vibrant nightlife scene, especially in areas like El Poblado, Provenza, and La 70 in Laureles. You’ll find a mix of upscale clubs, casual bars, salsa dancing spots, and lively rooftop lounges. It’s safe to enjoy the nightlife as long as you follow basic safety guidelines, like traveling in groups and keeping an eye on your belongings.",
  },
];

const FAQs = () => {
  return (
    <>
      <section className="h-auto pt-14 sm:pt-32 bg-[#F0EBE0] flex flex-col items-center justify-center text-center px-5 text-sm md:text-lg">
        <div className="mb-20">
          <Titles title="Faq's" color="text-primaryGreen" size="large" />
          <p className="text-sm text-center mt-14 md:text-lg text-primary/70">
            We answer your questions about the safety and logistics of planning
            a wedding in another country.
            <br />
            Find quick answers and plan with peace of mind.
          </p>
        </div>

        <ContainerText
          w="w-auto md:min-w-[50vw] md:text-lg text-sm text-center px-14 py-10"
          h="h-dhv"
        >
          {faqs.map((faq, index) => (
            <div key={index}>
              <Accordion
                type="single"
                collapsible
                className="w-full text-black border-b-[2px] border-primaryGreen/70"
              >
                <AccordionItem value={faq.question}>
                  <AccordionTrigger className="text-sm uppercase md:text-lg text-primaryGreen">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[45rem] text-primary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </ContainerText>
      </section>
    </>
  );
};

export default FAQs;
