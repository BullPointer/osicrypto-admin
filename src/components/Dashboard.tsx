import { Icon } from "@iconify/react";
import { DashboardDetails } from ".";
import { DashboardlistType, dashboardlist } from "./Sidebarlist";
import { useEffect, useState } from "react";
import { getExchanges } from "../api/ExchangeApi";
import { usersApi, visitorsApi, workersApi } from "../api/Api";
import { handleDashboard } from "./utils/DashboardHandler";

type VisitorsType = {
  _id: string;
  visitors: number;
  views: number;
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([...dashboardlist] as any);
  const [data, setData] = useState([] as any);
  const [limit, setLimit] = useState<number>(100);
  const [paginateNum, setPaginateNum] = useState<number[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const numOfItemsPerPage = 10;
  const numOfPage = Math.ceil(data.length / numOfItemsPerPage);
  const newData = data.slice(
    pageNum * numOfItemsPerPage,
    numOfItemsPerPage * (pageNum + 1)
  );

  useEffect(() => {
    const link = "https://api.simpleswap.io/get_exchanges";
    const handleGetExchange = async () => {
      try {
        const { data: exchangeData } = await getExchanges(link, String(limit));
        setData(exchangeData);

        const { data: visitorsData } = await visitorsApi();
        const { data: workersData } = await workersApi();
        const { data: usersData } = await usersApi();

        await handleDashboard(
          dashboardData,
          "visitors",
          String(visitorsData.data[0].visitors),
          setDashboardData
        );

        await handleDashboard(
          dashboardData,
          "views",
          String(visitorsData.data[0].views),
          setDashboardData
        );

        await handleDashboard(
          dashboardData,
          "users",
          String(workersData.count),
          setDashboardData
        );

        await handleDashboard(
          dashboardData,
          "workers",
          String(workersData.count),
          setDashboardData
        );

        await handleDashboard(
          dashboardData,
          "transaction",
          String(exchangeData.length),
          setDashboardData
        );

        const filterExpired = exchangeData.filter(
          (data: any) => data.status === "exchanging"
        );

        await handleDashboard(
          dashboardData,
          "pending_exchange",
          String(filterExpired.length),
          setDashboardData
        );
      } catch (error) {
        console.log(error);
      }
    };
    handleGetExchange();
  }, []);

  useEffect(() => {
    let num: number[] = [];
    for (let index = 0; index < numOfPage; index++) {
      num.push(index);
    }
    setPaginateNum(num);
  }, [data]);

  useEffect(() => {}, []);

  return (
    <div className="bg-black w-full min-h-screen px-4 py-8">
      <div className="border-b font-semibold text-2xl text-white">
        Dashboard
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {dashboardData?.map((list: DashboardlistType, index: number) => (
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
        category={"All Exchange"}
        data={newData}
        paginateNum={paginateNum}
        setPageNum={setPageNum}
      />
    </div>
  );
};

export default Dashboard;
