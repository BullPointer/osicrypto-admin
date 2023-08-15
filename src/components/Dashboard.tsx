import { Icon } from "@iconify/react";
import { DashboardDetails } from ".";
import { dashboardlist } from "./Sidebarlist";
import { pendingwithdrawal } from "../database/pendingWithdrawal";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { showSidebar } = useAppContext();
  const smallHeaderText = [
    { text: "Type", width: "w-[150px]" },
    { text: "Sender", width: "w-[130px]" },
    { text: "Address", width: "w-[400px]" },
    { text: "Coin Type", width: "w-[150px]" },
    { text: "Actions", width: "w-[150px]" },
  ];
  const headerText = [
    { text: "Type", width: "w-[200px]" },
    { text: "Sender", width: "w-[150px]" },
    { text: "Address", width: "w-[450px]" },
    { text: "Coin Type", width: "w-[200px]" },
    { text: "Actions", width: "w-[200px]" },
  ];
  return (
    <div className="bg-black w-full min-h-screen px-4 py-8">
      <div className="border-b font-semibold text-2xl text-white">
        Dashboard
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {dashboardlist?.map((list, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-4 text-white bg-[#222121] rounded-md shadow-sm shadow-white "
          >
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="text-sm text-red-300 font-medium">
                {list.title}
              </div>
              <div className="text-xl font-bold">{list.data}</div>
              <div className="text-xs bg-[#050505] p-1 rounded cursor-pointer hover:bg-blue-600">
                Learn More
              </div>
            </div>
            <div className="">
              <Icon icon={list.logo} fontSize={50} />
            </div>
          </div>
        ))}
      </div>
      <DashboardDetails
        category={"Pending Withdrawal"}
        header={!showSidebar ? headerText : smallHeaderText}
        data={pendingwithdrawal}
      />
    </div>
  );
};

export default Dashboard;
