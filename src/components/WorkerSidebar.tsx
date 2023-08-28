import { Link } from "react-router-dom";
import { workersidelist } from "./UsersManagementList";
import { Icon } from "@iconify/react";

const WorkerSidebar = () => {
  return (
    <div className="px-3 col-span-4 lg:col-span-1">
      {workersidelist?.map(({ logo, link, text }, index) => (
        <Link className="flex first:rounded-t-md last:rounded-b-md flex-row justify-start items-center gap-2 cursor-pointer bg-[#1a1717] hover:bg-[#5555]" to={link} key={index}>
            <div className="p-2">
              {" "}
              <Icon className="text-red-600 text-[22px] w-7 h-7" icon={logo} />
            </div>
            <div className="w-full py-2 pr-2">{text}</div>
        </Link>
      ))}
    </div>
  );
};

export default WorkerSidebar;
