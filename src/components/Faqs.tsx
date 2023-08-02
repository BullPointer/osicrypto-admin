import { Link } from "react-router-dom";
import { FaqDetails } from ".";
import { useAppContext } from "../context/AppContext";
import { faqsData } from "../database/faqsData";

const Faqs = () => {
  const { showSidebar } = useAppContext();
  const smallFaqs = [
    { text: "Question", width: "w-[400px]" },
    { text: "Type", width: "w-[100px]" },
    { text: "Status", width: "w-[100px]" },
    { text: "Updated At", width: "w-[180px]" },
    { text: "Actions", width: "w-[150px]" },
  ];
  const faqs = [
    { text: "Question", width: "w-[400px]" },
    { text: "Type", width: "w-[200px]" },
    { text: "Status", width: "w-[200px]" },
    { text: "Updated At", width: "w-[200px]" },
    { text: "Actions", width: "w-[200px]" },
  ];
  return (
    <div className="bg-black w-full min-h-screen px-4 py-8">
      <div className="flex flex-row justify-between items-center border-b">
        <div className=" font-semibold text-2xl text-white my-2">
          Settings / <span className="opacity-80">FAQs</span>
        </div>
        <Link to={"create-faq"}>
          <div className="bg-[#3e4869] blue-glassmorphism px-2 py-1 cursor-pointer rounded my-2 text-white font-bold">
            Create new faq
          </div>
        </Link>
      </div>
      <FaqDetails
        category={"FAQs"}
        header={!showSidebar ? faqs : smallFaqs}
        data={faqsData}
      />{" "}
    </div>
  );
};

export default Faqs;
