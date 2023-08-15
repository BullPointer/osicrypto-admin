import { sidebarlist } from "./Sidebarlist";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  return (
    <div
      className={`z-10 ${
        showSidebar ? "animate-slide-in w-[330px]" : "w-0"
      } h-screen bg-[#1d1c1c] overflow-y-scroll absolute top-0 left-0 lg:static`}
    >
      <div className="relative flex flex-row justify-between items-center">
        <div className="text-blue-500 p-8 text-2xl font-semibold opacity-80">
          Osicrypto
        </div>
        <Icon
          onClick={() => setShowSidebar(!showSidebar)}
          className="pr-2 text-white cursor-pointer block lg:hidden"
          icon="bi:bar-chart-fill"
          fontSize={35}
        />
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
