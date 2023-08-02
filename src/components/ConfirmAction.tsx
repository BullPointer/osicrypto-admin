type ConfirmActionProps = {
  message: string;
  handleConfirmation: () => void;
  setConfirm: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ConfirmAction = ({
  message,
  handleConfirmation,
  setConfirm,
}: ConfirmActionProps) => {
  return (
    <div className="fixed bg-transparent h-screen w-full top-0 left-0 flex flex-row justify-center items-start">
      <div className="bg-black p-4 border mt-40 rounded-md ">
        <div className="text-white p-5">{message}</div>
        <div className="flex flex-row justify-evenly items-center">
          <div
            onClick={handleConfirmation}
            className="text-white bg-blue-400 hover:bg-blue-500 py-1 px-3 text-lg cursor-pointer rounded-md"
          >
            Confirm
          </div>
          <div
            onClick={() => setConfirm(null)}
            className="text-white bg-red-400 hover:bg-red-500 py-1 px-3 text-lg cursor-pointer rounded-md"
          >
            No
          </div>
        </div>
      </div>
    </div>
  );
};
