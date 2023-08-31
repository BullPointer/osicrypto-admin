import { useEffect, useState } from "react";
import { getWorkersApi } from "../../api/WorkerApi";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type ActionType = {
  index: number | null;
  msg: string | null;
};

const DocumentCard = () => {
  const [action, setAction] = useState({} as ActionType);

  const handleMouseEnter = (index: number, msg: string) => {
    setAction({ ...action, index, msg });
  };
  const handleMouseLeave = () => {
    setAction({ ...action, index: null, msg: null });
  };

  const commonStyling = " py-3";
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-0">
        {["Document Name", "Activity"].map((header, index) => (
          <div
            className={`${commonStyling} pl-2 border-b bg-[#5555] font-semibold text-[#b4b9e6ee]`}
            key={index}
          >
            {header}
          </div>
        ))}
      </div>
      <div className="text-white bg-[#3335] pl-2">
        {[
          { name: "Privacy & Policy", link: "/admin/privacy-policy" },
          { name: "Terms & Conditions", link: "/admin/terms-and-conditions" },
        ].map(({ name, link }, index) => (
          <div
            className={`${commonStyling} grid grid-cols-2 gap-0`}
            key={index}
          >
            <div>{name}</div>
            <div className="flex flex-row justify-start items-center gap-2">
              <Link className="text-xs bg-[#2b3a46] py-1 px-5 rounded-md" to={link}>Write</Link>
              <div className="text-xs bg-[#462b2b] py-1 px-5 rounded-md cursor-pointer">Clear</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentCard;
