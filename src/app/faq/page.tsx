import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Separator } from "@/components/ui/separator";
import { faqs } from "@/data/data";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  return (
    <PaddingWrapper>
      <div className="py-4">
        <h1 className="text-4xl font-semibold">Frequently Asked Questions</h1>
        <div className="py-4 flex flex-col">
          <Separator />
          {faqs.map((faq, idx) => (
            <div key={`faq-${idx}`}>
              <FAQ
                question={faq.question}
                answer={faq.answer}
              />
              <Separator />
            </div>

          ))}
        </div>
      </div>

    </PaddingWrapper>
  );
}

function FAQ(props: { question: string, answer: string }) {
  return (
    <div tabIndex={0} className="daisy-collapse bg-none rounded-none">
      <div className="daisy-collapse-title text-lg font-medium 
      flex justify-between items-center">
        <p>{props.question}</p>
        <ChevronDown />
      </div>
      <div className="daisy-collapse-content">
        <p>{props.answer}</p>
      </div>
    </div>
  );
}
