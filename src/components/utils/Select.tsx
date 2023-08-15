type SelectProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  name: string;
  value?: string;
  listArr: {
    value: string;
    option: string;
  }[];
};

const Select = ({ handleChange, listArr, label, name, value }: SelectProps) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <label
        className="text-white pt-5 font-semibold font-mono text-[15px] sm:text-[18px] md:text-xl"
        htmlFor=""
      >
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="outline-none w-[100%] lg:w-[50%] bg-transparent border-b-2 font-bold"
        name={name}
      >
        {listArr?.map((list, index) => (
          <option
            key={index}
            className="text-whites font-bold bg-black"
            value={list.value}
          >
            {list.option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
