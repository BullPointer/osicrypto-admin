import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "../utils/ConfirmDelete";
import MessagePopup from "../utils/MessagePopup";
import { deleteSupportByIdApi, getSupportsApi } from "../../api/supportApi";

const Support = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [support, setSupport] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [confirm, setConfirm] = useState<{
    id: string | null;
    confirm: boolean;
  }>({ id: null, confirm: false });

  useEffect(() => {
    const getSupports = async () => {
      try {
        const { data } = await getSupportsApi();
        // console.log(data.data);
        setSupport(data.data);
        setIsLoading(false);
      } catch (error: any) {
        console.log("New Error is ", error.response);
      }
    };
    getSupports();
  }, []);

  return (
    <>
      {showPopup && (
        <MessagePopup message={"Support request deleted Successfully"} />
      )}
      {confirm.confirm && (
        <ConfirmDelete
          setShowPopup={setShowPopup}
          confirm={confirm}
          setConfirm={setConfirm}
          id={confirm.id}
          deleteFunc={deleteSupportByIdApi}
          message={"Are you sure you want to delete this support ticket"}
        />
      )}
      <div className="min-h-screen p-10">
        <div className="flex flex-row justify-between items-start py-3 px-2 bg-[#fff] shadow-sm shadow-black">
          <div className="flex flex-row justify-center items-center gap-2">
            <Icon
              className="text-[#9b7e7e] font-bold text-[21px] sm:text-[25px]"
              icon="material-symbols:contact-support-outline"
            />
            <div className="text-[#666363] font-bold text-[12px] sm:text-[18px]">
              Support Requests
            </div>
          </div>
        </div>
        <div className="pt-5 pb-10 my-4 bg-[#fff] rounded-md">
          <div className="w-full py-2 px-4 font-bold text-[11px] sm:text-[15px] bg-[#fff] shadow-md shadow-black">
            List of Support Requests
          </div>
          <div className="w-full py-2 px-4 font-bold text-[15px] bg-[#fff] shadow-md shadow-black">
            <div className="max-w-fit flex flex-row justify-start items-center gap-2 border-[#555] border-b-2">
              <Icon className="text-[#000]" icon="cil:search" />
              <input
                className=" outline-none p-1"
                placeholder="Search"
                type="search"
                name=""
              />
            </div>
          </div>
          <div className="overflow-x-auto bg-[#fff] shadow-md shadow-black">
            <div className="min-w-[1000px] lg:w-full">
              <div className="grid grid-cols-8 w-full py-2 px-4 font-bold text-[15px]">
                {[
                  "Ticket ID",
                  "Status",
                  "Category",
                  "Subject",
                  "Priority",
                  "Created on",
                  "Last Updated on",
                  "Actions",
                ].map((list, index) => (
                  <div
                    className="text-[#444] font-serif text-[14px]"
                    key={index}
                  >
                    {list}
                  </div>
                ))}
              </div>
              {isLoading ? (
                <div className="py-10 w-full flex flex-col justify-center items-center bg-[#fff] shadow-md shadow-black">
                  <Icon
                    className="text-[100px]"
                    icon="eos-icons:bubble-loading"
                  />
                </div>
              ) : support.length > 0 ? (
                <div>
                  {support?.map(
                    (
                      {
                        _id,
                        category,
                        status,
                        subject,
                        priority,
                        createdDate,
                        updatedDate,
                      },
                      index
                    ) => (
                      <div
                        key={index}
                        className="grid grid-cols-8 w-full py-2 px-4 font-bold text-[15px] bg-[#fff] shadow-md shadow-black"
                      >
                        <div className="z-10 break-words text-[10px] md:text-[12px] pr-2">
                          {_id}
                        </div>
                        <div className="word-wrap text-[10px] md:text-[12px]">
                          {status}
                        </div>
                        <div className="word-wrap text-[10px] md:text-[12px]">
                          {category}
                        </div>
                        <div className="word-wrap text-[10px] md:text-[12px]">
                          {subject}
                        </div>
                        <div className="word-wrap text-[10px] md:text-[12px]">
                          {priority}
                        </div>
                        <div className="break-words pr-2 text-[10px] md:text-[12px]">
                          {createdDate}
                        </div>
                        <div className="word-wrap text-[10px] md:text-[12px]">
                          {updatedDate}
                        </div>
                        <div className="flex flex-row justify-start items-center gap-1">
                          <Link to={`${_id}`}>
                            <Icon
                              className="text-[14px] md:text-[18px]"
                              icon="tabler:edit"
                            />
                          </Link>
                          <div
                            onClick={() =>
                              setConfirm({ ...confirm, id: _id, confirm: true })
                            }
                          >
                            <Icon
                              className="text-[14px] md:text-[18px] cursor-pointer"
                              icon="material-symbols:delete-outline"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="py-10 w-full flex flex-col justify-center items-center bg-[#fff] shadow-md shadow-black">
                  <Icon
                    className="text-[100px]"
                    icon="openmoji:office-worker"
                  />
                  <div className="text-[13px]">
                    You have no support request yet
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
