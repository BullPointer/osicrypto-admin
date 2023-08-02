type ErrorDisplayPageProps = {
  message: string;
  color: string;
};

export const ErrorDisplayPage = ({ message, color }: ErrorDisplayPageProps) => {
  return (
    <div className={`z-10 fixed w-auto top-0 font-bold text-lg bg-black border-r border-b p-4 ${color}`}>
      <div>{message}</div>
    </div>
  );
};
