import { Icon } from "@iconify/react";

type NavViewProps = {
  setShowView: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavView = ({ setShowView }: NavViewProps) => {
  const handleNavView = () => {
    setShowView(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" absolute right-0 top-12 w-[17rem] h-auto z-10 rounded-b-md "
    >
      <div className="flex flex-col items-center  random-color blue-glassmorphism p-4 text-[#f3f3f3] cursor-pointer">
        <Icon icon="pajamas:profile" fontSize={50} />
        <div className="pt-2">Administrator</div>
      </div>
      <div
        onClick={handleNavView}
        className="flex flex-row justify-start items-center blue-glassmorphism  text-white p-3 cursor-pointer hover:bg-[#201644] text-[13px] font-semibold font-sans"
      >
        Profile
      </div>
      <div
        onClick={handleNavView}
        className="flex flex-row justify-start items-center blue-glassmorphism  text-white p-3 cursor-pointer hover:bg-[#201644] text-[13px] font-semibold font-sans"
      >
        WALLET LIST
      </div>
      <div
        onClick={handleNavView}
        className="flex flex-row justify-start items-center blue-glassmorphism  text-white p-3 rounded-b-md cursor-pointer hover:bg-[#201644] text-[13px] font-semibold font-sans"
      >
        LOGOUT
      </div>
    </div>
  );
};

export default NavView;
