import { breadBrumbLink, BreadBrumbs } from "@/components/BreadCrumbs";
import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { Separator } from "@/components/ui/separator";
import { faqs } from "@/data/data";
import { ChevronDown } from "lucide-react";

const breadBrumbsLinks: breadBrumbLink[] = [
  { name: "Home", url: "/" },
  { name: "FAQs" },
];

export default function FAQPage() {
  return (
    <PaddingWrapper>
      <div>
        <div className="flex py-2 min-h-16 items-center">
          <BreadBrumbs links={breadBrumbsLinks} />
        </div>
        <div className="mb-4">
          <h1 className="text-4xl font-semibold">Frequently Asked Questions</h1>
          <div className="py-4 flex flex-col">
            {faqs.map((faq, idx) => (
              <div key={`faq-${idx}`}>
                <FAQ
                  question={faq.question}
                  answer={faq.answer}
                />
                {idx !== faqs.length - 1 && <Separator />}
              </div>

            ))}
          </div>
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
