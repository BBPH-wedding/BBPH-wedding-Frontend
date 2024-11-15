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
    question: "What is the cost of a wedding in another country?",
    answer:
      "The cost of a wedding in another country is usually higher than in your home country. This is because of the logistics involved, such as flights, accommodation, and transportation. However, we can help you find affordable options that fit your budget.",
  },
  {
    question: "What are the safety measures that I should take?",
    answer:
      "We recommend that you take the following safety measures to ensure a smooth and enjoyable wedding experience. These measures include: choosing a reputable wedding planner, booking flights and accommodation in advance, and having a backup plan in case of emergency.",
  },
  {
    question:
      "What are the logistics involved in planning a wedding?",
    answer:
      "The logistics involved in planning a wedding in another country can be overwhelming. However, with the help of a reputable wedding planner, you can ensure that everything is taken care of. This includes booking flights and accommodation, arranging transportation, and coordinating with vendors and suppliers.",
  },
  {
    question: "What are the benefits of having a wedding in another country?",
    answer:
      "Having a wedding in another country can offer several benefits. It can be a great opportunity to broaden your horizons and experience different cultures. It can also be a way to save money on travel and accommodation costs. Additionally, it can provide a unique and unforgettable experience that you may not find in your home country.",
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
                  <AccordionTrigger className="text-sm uppercase md:text-lg">{faq.question}</AccordionTrigger>
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
