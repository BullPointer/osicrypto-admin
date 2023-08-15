import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { deleteByIdApi } from "../api/BlogApi";
import { useAppContext } from "../context/AppContext";
import { ConfirmAction } from "./ConfirmAction";
import { ErrorDisplayPage } from "./ErrorDisplayPage";
import { blogType } from "./types";

type ActionType = {
  index: number | null;
  msg: string | null;
};

type ActionProps = {
  category: string;
  header: { text: string; width: string }[];
  data: blogType[];
  confirm: string | null;
  setConfirm: React.Dispatch<React.SetStateAction<string | null>>;

};

const Details = ({
  category,
  header,
  data,
  confirm,
  setConfirm,
}: ActionProps) => {
  const navigate = useNavigate();
  const [action, setAction] = useState({} as ActionType);
  const { showSidebar } = useAppContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [blogMessage, setBlogMessage] = useState<string | null>(null);

  const handleMouseEnter = (index: number, msg: string) => {
    setAction({ ...action, index, msg });
  };
  const handleMouseLeave = () => {
    setAction({ ...action, index: null, msg: null });
  };

  const handleEdit = (paramsId: string) => {
    if (paramsId) {
      navigate({
        pathname: "edit",
        search: createSearchParams({ id: paramsId }).toString(),
      });
    }
  };

  const handleConfirmation = async () => {
    if (confirm) {
      try {
        await deleteByIdApi(confirm);

        setConfirm(null);
        setBlogMessage("Blog deleted successfully!");
        setTimeout(() => {
          setBlogMessage(null);
        }, 3000);
      } catch (error: any) {
        console.log(error);

        setBlogMessage(String(error.response.data.message));
        setTimeout(() => {
          setBlogMessage(null);
          window.location.reload();
        }, 3000);
      }
    }
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
      {blogMessage && (
        <ErrorDisplayPage color={"text-white"} message={blogMessage} />
      )}
      {confirm && (
        <ConfirmAction
          message="Are you sure you want to delete this Blog data?"
          handleConfirmation={handleConfirmation}
          setConfirm={setConfirm}
        />
      )}
      <div className="font-semibold text-[15px] md:text-2xl text-white">
        {category}
      </div>
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
            <div className="block md:hidden ml-1">*</div>
            {header.map(({ width, text }, index) => (
              <div
                key={index}
                className={`${width} p-4 font-semibold text-[14px] sm:text-[16px] ${
                  screenWidth <= 768 &&
                  (text.toLowerCase() === "status" ||
                    text.toLowerCase() === "updated at")
                    ? "hidden"
                    : "block"
                }`}
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
                <div className="block md:hidden">
                  {showDetail === index ? (
                    <Icon
                      onClick={() => setShowDetail(null)}
                      className="text-red-600 cursor-pointer text-[15px] ml-1"
                      icon="dashicons:remove"
                    />
                  ) : (
                    <Icon
                      onClick={() => setShowDetail(index)}
                      className="text-blue-600 cursor-pointer text-[15px] ml-1"
                      icon="zondicons:add-outline"
                    />
                  )}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[150px]"
                  } p-3 text-[12px] sm:text-[16px]`}
                >
                  {data.category}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[500px]" : "w-[400px]"
                  } p-3 text-[12px] sm:text-[16px]`}
                >
                  {data.title}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[100px]"
                  } p-3 hidden md:block text-[12px] sm:text-[16px]`}
                >
                  Active
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[180px]"
                  } p-3 hidden md:block text-[12px] sm:text-[16px]`}
                >
                  {data.date}
                </div>
                <div
                  className={`${
                    !showSidebar ? "w-[200px]" : "w-[150px]"
                  } flex flex-row justify-start items-center gap-2 p-4`}
                >
                  <div
                    onClick={() => handleEdit(String(data._id))}
                    onMouseEnter={() => handleMouseEnter(index, "Edit")}
                    onMouseLeave={() => handleMouseLeave()}
                    className="relative flex flex-row justify-center items-center"
                  >
                    <Icon
                      className="cursor-pointer text-[18px] sm:text-[30px]"
                      icon="clarity:edit-solid"

                    />
                    {action.index === index && action.msg === "Edit" && (
                      <div className="z-10 absolute -bottom-6 -right-8 bg-[#000] p-1 text-sm">
                        Edit
                      </div>
                    )}
                  </div>
                  <div className=" rounded p-1 cursor-pointer relative">
                    <div
                      onClick={() => setConfirm(String(data._id))}
                      onMouseEnter={() => handleMouseEnter(index, "Delete")}
                      onMouseLeave={() => handleMouseLeave()}
                      className="relative flex flex-row justify-start items-start"
                    >
                      <Icon
                        className="cursor-pointer text-[20px] sm:text-[23px]"
                        icon="fluent:delete-16-filled"
                        
                      />
                      {action.index === index && action.msg === "Delete" && (
                        <div className="z-10 absolute -bottom-6 -right-14 bg-[#000] p-1 text-sm">
                          Delete
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showDetail === index && (
                <div className="w-full">
                  <div className="px-2 py-1 block md:hidden text-sm sm:text-[16px]">
                    Status: {"active"}
                  </div>
                  <div className="wrap-word px-2 py-1 block lg:hidden text-sm sm:text-[16px]">
                    Updated At: {data.date}
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
