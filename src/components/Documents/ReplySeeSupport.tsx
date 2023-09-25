/* eslint-disable react/prop-types */

type ReplySeeSupportPropTypes = {
  imgName: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  err: { file: string; response: string };
};

const ReplySeeSupport = ({
  imgName,
  handleChange,
  err,
}: ReplySeeSupportPropTypes) => {
  return (
    <div className="px-10">
      <div className="w-[100%] flex flex-col justify-start items-start py-2">
        <div className="w-full font-bold text-[12px] text-[#302d2d]">
          Response <span className="text-red-500">*</span>
        </div>
        <textarea
          placeholder="Enter your reply message here..."
          onChange={handleChange}
          className="w-full h-28 p-2 text-[12px] text-[#3b3939] font-normal rounded-md outline-none focus:border border-[#515979] bg-[#ececf0]"
          name="response"
          id=""
        />
        {err?.response && (
          <div className="text-red-500 text-[9px]">{err.response}</div>
        )}
      </div>
      <div className="">
        <div className="w-full font-bold text-[12px] text-[#302d2d]">
          Attach file
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <input
            placeholder="JPEG | PNG | Max 5MB"
            className="w-full p-2 text-[8px] sm:text-[12px] text-[#3b3939] font-normal rounded-l-md outline-none focus:border border-[#515979] bg-[#ececf0]"
            type="text"
            value={imgName}
            disabled
          />
          <input
            title="Browse"
            onChange={handleChange}
            className="hidden"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            name="file"
            id="img-file-input"
          />
          <label
            className="w-fit p-2 text-[8px] sm:text-[10px] text-white font-bold cursor-pointer rounded-r-md hover:bg-[#515979] bg-[#2d29ee]"
            htmlFor="img-file-input"
          >
            BROWSE
          </label>
        </div>
        {err?.file && <div className="text-red-500 text-[9px]">{err.file}</div>}
      </div>
    </div>
  );
};

export default ReplySeeSupport;