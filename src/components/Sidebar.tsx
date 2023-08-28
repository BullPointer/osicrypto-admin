import { Scrollbars } from "react-custom-scrollbars-2";
import { sidebarlist } from "./Sidebarlist";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const [showList, setShowList] = useState(false);

  return (
    <div
      className={`my-scroll z-10 ${
        showSidebar ? "animate-slide-in w-full sm:w-[330px]" : "w-0"
      } h-screen bg-[#1d1c1c]   absolute top-0 left-0 lg:static`}
    >
      <Scrollbars
        style={{ width: "100%", height: "100%" }}
        renderThumbVertical={(props) => (
          <div
            {...props}
            style={{ backgroundColor: "#d9534f", cursor: "pointer" }}
          />
        )}
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
          {sidebarlist?.map(({ logo, text, link, sub }, index) => (
            <div key={index} className="">
              {link ? (
                <Link
                  className="flex flex-row justify-start items-center cursor-pointer hover:bg-[#473131] p-4 gap-2"
                  onClick={() =>
                    window.innerWidth <= 640 && setShowSidebar(!showSidebar)
                  }
                  to={link}
                >
                  <div className="text-[#e6e4e4]">
                    <Icon icon={logo} fontSize={20} />
                  </div>
                  <div className="text-[#b9b7b7] text-[15px]">{text}</div>
                </Link>
              ) : (
                <div
                  className=""
                  onClick={() =>
                    window.innerWidth <= 640 && setShowSidebar(!showSidebar)
                  }
                >
                  <div
                    onClick={() => setShowList(!showList)}
                    className="w-full flex flex-row justify-between items-center pr-5"
                  >
                    <div className="w-full flex flex-row justify-start items-center cursor-pointer hover:bg-[#473131] p-4 gap-2">
                      <div className="text-[#e6e4e4]">
                        <Icon icon={logo} fontSize={20} />
                      </div>
                      <div className="text-[#b9b7b7] text-[15px]">{text}</div>
                    </div>
                    <div className="text-[#e6e4e4]">
                      {showList ? (
                        <Icon icon="ep:arrow-up-bold" fontSize={20} />
                      ) : (
                        <Icon icon="ep:arrow-down-bold" fontSize={20} />
                      )}
                    </div>
                  </div>
                  {sub && showList  &&
                    sub.map(({ logo, text, link }, index) => (
                      <Link
                        className="flex flex-row justify-start items-center cursor-pointer hover:bg-[#473131] pl-8 py-4 gap-2"
                        onClick={() =>
                          window.innerWidth <= 640 &&
                          setShowSidebar(!showSidebar)
                        }
                        to={link}
                      >
                        {" "}
                        <div className="text-[#e6e4e4]">
                          <Icon icon={logo} fontSize={20} />
                        </div>
                        <div className="text-[#b9b7b7] text-[15px]">{text}</div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Sidebar;
