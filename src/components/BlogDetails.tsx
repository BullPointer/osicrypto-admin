import { Icon } from "@iconify/react";
import { useState } from "react";
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

const Details = ({ category, header, data, confirm, setConfirm }: ActionProps) => {
  const navigate = useNavigate();
  const [action, setAction] = useState({} as ActionType);
  const { showSidebar } = useAppContext();
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

  return (
    <div className="text-white mt-8 border bg-black rounded-lg opacity-60 p-5">
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
              <div key={index} className={`${list.width} p-4 font-semibold`}>
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
                  className={`${!showSidebar ? "w-[200px]" : "w-[150px]"} p-3`}
                >
                  {data.category}
                </div>
                <div
                  className={`${!showSidebar ? "w-[500px]" : "w-[400px]"} p-3`}
                >
                  {data.title}
                </div>
                <div
                  className={`${!showSidebar ? "w-[200px]" : "w-[100px]"} p-3`}
                >
                  Active
                </div>
                <div
                  className={`${!showSidebar ? "w-[200px]" : "w-[180px]"} p-3`}
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
                      className="cursor-pointer "
                      icon="clarity:edit-solid"
                      fontSize={23}
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
                        className="cursor-pointer "
                        icon="fluent:delete-16-filled"
                        fontSize={23}
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
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
