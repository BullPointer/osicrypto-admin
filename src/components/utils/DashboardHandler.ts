import { DashboardlistType } from "../Sidebarlist";

export const handleDashboard = async (dashboardData: DashboardlistType[], name: string, data: string, setDashboardData: React.Dispatch<React.SetStateAction<DashboardlistType[]>>) => {
    const index = dashboardData.findIndex(
        (d) => d.name == name
    );
    const selectData = dashboardData.find(
        (d) => d.name == name
    );
    if (selectData) {
        selectData.data = data;
        dashboardData[index] = selectData;
        setDashboardData([...dashboardData])
    }


}
