type SelectProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  listArr: string[];
  label: string;
  name: string;
};

const Select = ({ handleChange, listArr, label, name }: SelectProps) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <label
        className="text-white pt-5 font-semibold font-mono text-xl"
        htmlFor=""
      >
        {label}
      </label>
      <select
        onChange={handleChange}
        className="outline-none w-[50%] bg-transparent border-b-2 font-bold"
        name={name}
      >
        {listArr.map((list, index) => (
          <option
            key={index}
            className="text-whites font-bold bg-black"
            value={list}
          >
            {list}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
