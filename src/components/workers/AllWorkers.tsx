import { useEffect, useState } from "react";
import { getWorkersApi } from "../../api/WorkerApi";
import { Icon } from "@iconify/react";

type ActionType = {
  index: number | null;
  msg: string | null;
};

const AllWorkers = () => {
  const [workerData, setWorkerData] = useState([]);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [action, setAction] = useState({} as ActionType);

  const handleMouseEnter = (index: number, msg: string) => {
    setAction({ ...action, index, msg });
  };
  const handleMouseLeave = () => {
    setAction({ ...action, index: null, msg: null });
  };

  const getWorkers = async () => {
    const response = await getWorkersApi();
    if (response.status == 200) {
      setWorkerData(response.data.users);
    }
  };
  // console.log(workerData);

  useEffect(() => {
    getWorkers();
  }, []);
  const commonStyling = " sm:[&:nth-child(3)]:col-span-2 last:col-span-3 sm:last:col-span-2 py-3";
  return (
    // minmax(900px,_1fr)
    <div className="">
      <div className="grid grid-cols-[50px_repeat(4,1fr)] sm:grid-cols-[40px_repeat(5,1fr)] md:grid-cols-[30px_repeat(7,1fr)] gap-0">
        <div
          className={`${commonStyling} border-b bg-[#5555] font-semibold text-[#b4b9e6ee]`}
        ></div>
        {["User Name", "Email ID", "Role", "Status", "Activity"].map(
          (header, index) => (
            <div
              className={`${commonStyling} ${
                header === "Role" || header === "Status"
                  ? "hidden md:block"
                  : ""
              } border-b bg-[#5555] font-semibold text-[#b4b9e6ee]
                ${header === "Email ID" ? "hidden sm:block" : ""}
                `}
              key={index}
            >
              {header}
            </div>
          )
        )}
      </div>
      <div className="first:bg-red-500">
        {workerData?.map(({ username, email, isAdmin, status }, index) => (
          <div key={index}>
            <div
              className={`grid grid-cols-[50px_repeat(4,1fr)] sm:grid-cols-[40px_repeat(5,1fr)] md:grid-cols-[30px_repeat(7,1fr)] `}
            >
              <div className="w-full flex flex-row justify-center items-center">
                {showDetail === index ? (
                  <Icon
                    onClick={() => setShowDetail(null)}
                    className="text-red-600 cursor-pointer text-[20px]"
                    icon="dashicons:remove"
                  />
                ) : (
                  <Icon
                    onClick={() => setShowDetail(index)}
                    className="text-blue-600 cursor-pointer text-[20px]"
                    icon="zondicons:add-outline"
                  />
                )}
              </div>
              <div className={`${commonStyling}`}>{username}</div>
              <div className={`${commonStyling} hidden sm:block`}>{email}</div>
              <div className={`${commonStyling} hidden md:block`}>
                {isAdmin ? "Admin" : "Worker"}
              </div>
              <div className={`${commonStyling} hidden md:block`}>
                {status ? "Active" : "Non Active"}
              </div>
              <div
                className={`${commonStyling} flex flex-row justify-start items-center`}
              >
                <div
                  onMouseEnter={() => handleMouseEnter(index, "View")}
                  onMouseLeave={() => handleMouseLeave()}
                  className="relative flex flex-row sm:flex-col xl:flex-row justify-center items-center gap-1 text-xs cursor-pointer py-1 px-1 bg-blue-400 rounded-md mr-2"
                >
                  <Icon icon="carbon:view-filled" />
                  <div>View</div>
                  {action.index === index && action.msg === "View" && (
                    <div className="z-10 absolute -bottom-6 -right-5 bg-[#000] p-1 text-xs">
                      View
                    </div>
                  )}
                </div>
                <div
                  onMouseEnter={() => handleMouseEnter(index, "Suspend")}
                  onMouseLeave={() => handleMouseLeave()}
                  className="relative flex flex-row sm:flex-col xl:flex-row justify-center items-center gap-1 text-xs cursor-pointer py-1 px-1 bg-yellow-500 rounded-md mr-2"
                >
                  <Icon icon="mdi:book-cancel-outline" />
                  <div>Suspend</div>
                  {action.index === index && action.msg === "Suspend" && (
                    <div className="z-10 absolute -bottom-6 -right-5 bg-[#000] p-1 text-xs">
                      Suspend
                    </div>
                  )}
                </div>
                <div
                  onMouseEnter={() => handleMouseEnter(index, "Edit")}
                  onMouseLeave={() => handleMouseLeave()}
                  className="relative flex flex-row sm:flex-col xl:flex-row justify-center items-center gap-1 text-xs cursor-pointer py-1 px-1 bg-blue-500 rounded-md mr-2"
                >
                  <Icon icon="tabler:edit" />
                  <div>Edit</div>
                  {action.index === index && action.msg === "Edit" && (
                    <div className="z-10 absolute -bottom-6 -right-5 bg-[#000] p-1 text-xs">
                      Edit
                    </div>
                  )}
                </div>
                <div
                  onMouseEnter={() => handleMouseEnter(index, "Delete")}
                  onMouseLeave={() => handleMouseLeave()}
                  className="relative flex flex-row sm:flex-col xl:flex-row justify-center items-center gap-1 text-xs cursor-pointer py-1 px-1 bg-red-500 rounded-md mr-2"
                >
                  <Icon icon="fluent:delete-12-filled" />
                  <div>Delete</div>
                  {action.index === index && action.msg === "Delete" && (
                    <div className="z-10 absolute -bottom-6 -right-5 bg-[#000] p-1 text-xs">
                      Delete
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showDetail === index && (
              <div className=" border-b">
                <div className="md:hidden flex flex-row justify-start items-center gap-5">
                  <p className="text-[#888] font-semibold">Role:</p>
                  <p>{isAdmin ? "Admin" : "Worker"}</p>
                </div>
                <div className="md:hidden flex flex-row justify-start items-center gap-5">
                  <p className="text-[#888] font-semibold">Status:</p>
                  <p>{status ? "Active" : "Non Active"}</p>
                </div>
                <div className="sm:hidden flex flex-row justify-start items-center gap-5">
                  <p className="text-[#888] font-semibold">Email:</p>
                  <p>{email}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWorkers;
