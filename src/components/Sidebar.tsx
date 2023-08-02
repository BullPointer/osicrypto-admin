import { sidebarlist } from "./Sidebarlist";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type SidebarProps = {
  showSidebar: boolean;
};
const Sidebar = ({ showSidebar }: SidebarProps) => {
  return (
    <div className={`${showSidebar ? "animate-slide-in w-[330px]" : "w-0"}  h-screen bg-[#1d1c1c] overflow-y-scroll static`}>
      <div className="text-blue-500 p-8 text-2xl font-semibold opacity-80">
        Osicrypto
      </div>
      <div>
        {sidebarlist?.map(({ logo, text, link }, index) => (
          <Link key={index} to={link}>
            <div className="flex flex-row justify-start items-center cursor-pointer hover:bg-[#473131] p-4 gap-2">
              <div className="text-[#e6e4e4]">
                <Icon icon={logo} fontSize={20} />
              </div>
              <div className="text-[#b9b7b7] text-[15px]">{text}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
