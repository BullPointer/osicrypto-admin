import { Icon, IconProps } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import NavView from "./NavView";

type NavbarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const Navbar = ({ showSidebar, setShowSidebar }: NavbarProps) => {
  const refView = useRef<HTMLDivElement>(null);
  const [showView, setShowView] = useState(false);

  const handleView = () => {
    setShowView(!showView);
  };
  const removeView = ({ target }: MouseEvent | IconProps) => {
    if (refView.current) {
      !refView.current.contains(target as Node) && setShowView(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", removeView);
    return () => document.removeEventListener("click", removeView);
  }, []);

  return (
    <div className="w-full flex flex-row justify-between items-center p-4 bg-[#1d1c1c]">
      <div
        onClick={() => setShowSidebar(!showSidebar)}
        className="flex flex-row justify-center items-center gap-2 text-[#f3f3f3] cursor-pointer"
      >
        {!showSidebar && (
          <div className="font-bold text-blue-500 text-2xl">Osicrypto</div>
        )}
        <Icon icon="bi:bar-chart-fill" fontSize={40} />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="relative mr-2 text-[#f3f3f3] cursor-pointer">
          <div className="flex flex-row justify-center items-center absolute bg-yellow-500 text-white rounded-full w-[20px] h-[20px] text-xs -top-2 -right-2">
            0
          </div>
          <Icon icon="iconamoon:notification-bold" fontSize={20} />
        </div>
        <div
          className="flex flex-row justify-center items-center gap-2"
          onClick={handleView}
          ref={refView}
        >
          <div className="mr-2 text-[#f3f3f3] cursor-pointer">
            <Icon
              onClick={(e) => {
                e.stopPropagation();
                setShowView(!showView);
              }}
              icon="pajamas:profile"
              fontSize={40}
            />
          </div>
          <div className="relative flex flex-row justify-center items-center gap-1 ">
            <div className="mr-2 text-[#f3f3f3] cursor-pointer">Admin</div>
            <div className="mr-2 text-[#f3f3f3] cursor-pointer">
              <Icon
                onClick={(e) => {
                  e.stopPropagation();
                  setShowView(!showView);
                }}
                icon="bxs:down-arrow"
                fontSize={20}
              />
            </div>
            {showView && <NavView setShowView={setShowView} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
