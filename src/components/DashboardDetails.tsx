import { Icon } from "@iconify/react";
import { useState } from "react";
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
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [action, setAction] = useState({} as ActionType);
  const { showSidebar } = useAppContext();

  const handleMouseEnter = (index: number, msg: string) => {
    setAction({ ...action, index, msg });
  };
  const handleMouseLeave = () => {
    setAction({ ...action, index: null, msg: null });
  };

  return (
    <div className="text-white mt-8 border bg-black rounded-lg opacity-60 p-5">
      <div className="font-semibold text-2xl text-white">{category}</div>
      <div className="flex flex-row justify-start items-center gap-2 py-5">
        <div>search entries:</div>
        <input
          className="rounded p-1 outline-none text-white bg-black border focus:border-none"
          type="search"
          name=""
          id=""
        />
      </div>
      <div>
        <div className="flex flex-col justify-center items-start w-full rounded bg-[#1a1717]">
          <div className="flex flex-row justify-start items-center w-full">
            {header.map((list, index) => (
              <div key={index + list.width} className={`${list.width} p-4 font-semibold`}>
                {list.text}
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
                  <div>External</div>
                </div>
                <div
                  className={`${!showSidebar ? "w-[150px]" : "w-[130px]"}  p-3`}
                >
                  {data.sender}
                </div>
                <div
                  className={`${!showSidebar ? "w-[450px]" : "w-[400px]"} p-3`}
                >
                  {data.address}
                </div>
                <div
                  className={`${!showSidebar ? "w-[200px]" : "w-[150px]"} p-3`}
                >
                  {data.currency}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[150px]"
                  } flex flex-row justify-start items-center gap-2 p-4`}
                >
                  <div
                    onMouseEnter={() => handleMouseEnter(index, "Accept")}
                    onMouseLeave={() => handleMouseLeave()}
                    className="relative flex flex-row justify-center items-center"
                  >
                    <Icon
                      className="cursor-pointer "
                      icon="healthicons:i-documents-accepted"
                      fontSize={30}
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
                        className="cursor-pointer "
                        icon="fluent-mdl2:entry-decline"
                        fontSize={23}
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
                  <div className="px-2 py-1">Receiver: {data.receiver}</div>
                  <div className="px-2 py-1">Amount: {data.amount}</div>
                  <div className="px-2 py-1">Fees: {data.fees}</div>
                  <div className="px-2 py-1">
                    Transaction Id: {data.transactionId}
                  </div>
                  <div className="px-2 py-1">Update Date: {data.date}</div>
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
