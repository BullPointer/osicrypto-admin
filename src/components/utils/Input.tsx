export type userInputType = { email: string; password: string };

export type blogInputType = {
  blogImage: any;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  notes?: string;
};

export type faqInputType = {
  question: string;
  type: string;
  status: string;
  answer?: string;
};

type InputProps = {
  label: string;
  name: string;
  type: string;
  objectValue: userInputType | blogInputType | faqInputType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, name, type, onChange, objectValue }: InputProps) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <label
        className="text-white pt-5 font-semibold font-mono text-[15px] sm:text-[18px] md:text-xl"
        htmlFor=""
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        value={objectValue[name as keyof typeof objectValue]}
        className="outline-none w-[100%] lg:w-[50%] bg-transparent border-b-2"
      />
    </div>
  );
};

export default Input;
