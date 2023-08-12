import { Link } from "react-router-dom";
import { FaqDetails } from ".";
import { useAppContext } from "../context/AppContext";
import dayjs from "dayjs";
import { getFaqsApi } from "../api/FaqApi";
import { useEffect, useState } from "react";

const Faqs = () => {
  const [faqData, setFaqData] = useState([]);
  const [confirm, setConfirm] = useState<string | null>(null);

  const getBlogs = async () => {
    const response = await getFaqsApi();
    if (response.status == 200) {
      setFaqData(response.data.data.map((faq: { date: string }) => {
        const date = new Date(Number(faq.date));
        return {
          ...faq,
          date: dayjs(date.toUTCString()).format("YYYY-MM-DD h:mm A"),
        };
      }));
    }
  };
  
  useEffect(() => {
    getBlogs();
  }, [confirm]);

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
        confirm={confirm}
        setConfirm={setConfirm}
        category={"FAQs"}
        header={!showSidebar ? faqs : smallFaqs}
        data={faqData}
      />{" "}
    </div>
  );
};

export default Faqs;
