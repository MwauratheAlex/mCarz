import { PaddingWrapper } from "@/components/ui/PaddingWrapper";
import { FaSearch } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function ContactPage() {
  return (
    <div className="py-10">
      <PaddingWrapper>
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-5xl font-semibold">Get in Touch</h1>
          <form className="max-w-2xl mx-auto flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <label className="daisy-input w-full daisy-input-bordered flex 
              items-center gap-2 rounded-none">
                <input type="text" className="grow" placeholder="Search" />
                <FaSearch className="text-gray-500" />
              </label>
              <label className="daisy-input daisy-input-bordered flex 
              items-center gap-2 w-full rounded-none">
                <IoMdMail className="text-gray-500" />
                <input type="text" className="grow" placeholder="Email" />
              </label>
            </div>
            <textarea rows={5} className="daisy-textarea daisy-textarea-bordered
            w-full rounded-none"
              placeholder="Your message">
            </textarea>
            <button className="daisy-btn rounded-none bg-gray-800 text-gray-50
            hover:bg-gray-950 hover:text-white">
              Send Message
            </button>

          </form>
        </div>
      </PaddingWrapper >
    </div >
  );
}
