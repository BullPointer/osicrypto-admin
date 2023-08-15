import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dashboardType } from "./types";

type ActionType = {
  index: number | null;
  msg: string | null;
};

type ActionProps = {
  category: string;
  header: { text: string; width: string }[];
  data: dashboardType[];
};

const Details = ({ category, header, data }: ActionProps) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [action, setAction] = useState({} as ActionType);
  const { showSidebar } = useAppContext();

  const handleMouseEnter = (index: number, msg: string) => {
    setAction({ ...action, index, msg });
  };
  const handleMouseLeave = () => {
    setAction({ ...action, index: null, msg: null });
  };

  useEffect(() => {
    const handleScreen = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleScreen);
    return () => window.removeEventListener("resize", handleScreen);
  }, []);

  return (
    <div className="text-white mt-8 border bg-black rounded-lg opacity-60 px-1 py-3 sm:p-5">
      <div className="font-semibold text-2xl text-white">{category}</div>
      <div className="flex flex-row justify-start items-center gap-1 sm:gap-2 py-5">
        <div className="text-[12px] sm:text-[15px]">search entries:</div>
        <input
          className="rounded p-0 sm:p-1 outline-none text-white bg-black border focus:border-none"
          type="search"
          name=""
          id=""
        />
      </div>
      <div>
        <div className="flex flex-col justify-center items-start w-full rounded bg-[#1a1717]">
          <div className="flex flex-row justify-start items-center w-full">
            {header.map(({ text, width }, index) => (
              <div
                key={index}
                className={`${width} p-4 font-semibold text-[14px] sm:text-[16px] ${
                  screenWidth <= 1024 && text.toLowerCase() === "address"
                    ? "hidden"
                    : "block"
                } ${
                  screenWidth <= 768 && text.toLowerCase() === "sender"
                    ? "hidden"
                    : "block"
                } 
                `}
              >
                {text}
              </div>
            ))}
          </div>
          {data.map((data, index) => (
            <>
              <div
                key={index}
                className="flex flex-row justify-start items-center w-full"
              >
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[150px]"
                  } p-3 flex flex-row justify-start items-center gap-1`}
                >
                  {showDetail === index ? (
                    <Icon
                      onClick={() => setShowDetail(null)}
                      className="text-red-600 cursor-pointer"
                      icon="dashicons:remove"
                      fontSize={20}
                    />
                  ) : (
                    <Icon
                      onClick={() => setShowDetail(index)}
                      className="text-blue-600 cursor-pointer"
                      icon="zondicons:add-outline"
                      fontSize={20}
                    />
                  )}
                  <div className="text-[14px] sm:text-[16px]">External</div>
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[150px]" : "w-[130px]"
                  }  p-3 hidden md:block text-[14px] sm:text-[16px]`}
                >
                  {data.sender}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[450px]" : "w-[400px]"
                  } p-3 hidden lg:block text-[14px] sm:text-[16px]`}
                >
                  {data.address}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[150px]"
                  } p-3 text-[14px] sm:text-[16px]`}
                >
                  {data.currency}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[150px]"
                  } flex flex-row justify-start items-center gap-2 p-4 text-[14px] sm:text-[16px]`}
                >
                  <div
                    onMouseEnter={() => handleMouseEnter(index, "Accept")}
                    onMouseLeave={() => handleMouseLeave()}
                    className="relative flex flex-row justify-center items-center"
                  >
                    <Icon
                      className="cursor-pointer text-[24px] sm:text-[30px]"
                      icon="healthicons:i-documents-accepted"
                    />
                    {action.index === index && action.msg === "Accept" && (
                      <div className="z-10 absolute -bottom-6 -right-12 bg-[#000] p-1 text-sm">
                        Accept
                      </div>
                    )}
                  </div>
                  <div className=" rounded p-1 cursor-pointer relative">
                    <div
                      onMouseEnter={() => handleMouseEnter(index, "Decline")}
                      onMouseLeave={() => handleMouseLeave()}
                      className="relative flex flex-row justify-start items-start"
                    >
                      <Icon
                        className="cursor-pointer text-[20px] sm:text-[23px]"
                        icon="fluent-mdl2:entry-decline"
                      />
                      {action.index === index && action.msg === "Decline" && (
                        <div className="z-10 absolute -bottom-6 -right-14 bg-[#000] p-1 text-sm">
                          Decline
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showDetail === index && (
                <div className="w-full">
                  <div className="px-2 py-1 block md:hidden text-sm sm:text-[16px]">
                    Sender: {data.sender}
                  </div>
                  <div className="wrap-word px-2 py-1 block lg:hidden text-sm sm:text-[16px]">
                    Address: {data.address}
                  </div>
                  <div className="px-2 py-1 text-sm sm:text-[16px]">
                    Receiver: {data.receiver}
                  </div>
                  <div className="px-2 py-1 text-sm sm:text-[16px]">
                    Amount: {data.amount}
                  </div>
                  <div className="px-2 py-1 text-sm sm:text-[16px]">
                    Fees: {data.fees}
                  </div>
                  <div className="wrap-word px-2 py-1 text-sm sm:text-[16px]">
                    Transaction Id: {data.transactionId}
                  </div>
                  <div className="px-2 py-1 text-sm sm:text-[16px]">
                    Update Date: {data.date}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
