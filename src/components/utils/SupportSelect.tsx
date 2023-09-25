/* eslint-disable react/prop-types */

type SelectPropsTypes = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  name: string;
  value?: string;
  list: string[];
};
const SupportSelect = ({
  label,
  value,
  name,
  list,
  handleChange,
}: SelectPropsTypes) => {
  return (
    <div className="w-full flex flex-col justify-start items-start px-10">
      <div className="text-[12px] font-bold text-[#302d2d]">
        {label} <span className="text-red-500">*</span>
      </div>

      <select
        className="outline-none w-full py-2 rounded-md text-[12px] sm:text-[14px] text-[#353232]"
        value={value}
        name={name}
        onChange={handleChange}
      >
        {list?.map((text, index) => (
          <option
            className="text-[14px] sm:text-[17px] text-[#1f1d1d]"
            key={index}
          >
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SupportSelect;
