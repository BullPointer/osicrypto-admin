import { Outlet } from "react-router-dom";
import WorkerSidebar from "./WorkerSidebar";

const Workers = () => {


  return (
    <div className="bg-black w-full min-h-screen px-4 py-8">
      <div className="flex flex-row justify-between items-center border-b">
        <div className=" font-semibold text-2xl text-white my-2 text-[12px] sm:text-[16px]">
          Worker management / <span className="opacity-80">Worker</span>
        </div>
      </div>
      <div className="text-white grid grid-cols-4 mt-5">
        <WorkerSidebar />
        <div className="bg-[#1a1717] col-span-4 lg:col-span-3  rounded-md p-2 my-2 lg:m-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Workers;
