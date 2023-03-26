import React from "react";
import Header from "../../../layout/DashboardHeader";
import DashboardEmployee from "../../../components/dashboard/employee-index";
import { useState, useEffect } from "react";
import { employeeDashboardCards } from "../../../services/auth-service";

const areaGraphData = [
	{
		heading: "Overview - Total Applied Jobs",
		img: "/images/Path.png",
		para: "Overview - Total Applied Jobs",
	},
];
const Dashboard = () => {
	const [employeeCardsData, setEmployeeCardData] = useState([]);
	const [userType, setUserType] = useState("");
	const [data, setData] = useState({});
	const fetchStaticsData = (id) => {
		employeeDashboardCards(id)
			.then((res) => {
				// console.log(res, "employee card data");
				setEmployeeCardData(res?.data);
				// console.log(employeeCardsData, "hasham is here");
			})
			.catch((err) => {
				// console.log(err, "err");
			});
	};

	const fetchLocalStorage = () => {
		// setSpinner(true);
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const type = userData?.type;
		setUserType(type);
		// console.log(type, "user type");
		const id = userData?._id;
		setData(id);
		fetchStaticsData(id);
	};
	useEffect(() => {
		fetchLocalStorage();
	}, []);
	const overview_data = [
		{
			CardHead: "Total Available Jobs",
			CardNum: employeeCardsData?.totalJobs ? employeeCardsData?.totalJobs : 0,
			CardImg: "/images/bx-briefcase (2).png",
		},
		{
			CardHead: "Total Applied Jobs",
			CardNum: employeeCardsData?.totalAppliedJobs
				? employeeCardsData?.totalAppliedJobs
				: 0,
			CardImg: "/images/bx-briefcase (2).png",
		},
		{
			CardHead: "Current Plan",
			CardNum: employeeCardsData?.currentPlan
				? employeeCardsData?.currentPlan
				: "",
			CardImg: "/images/crcard.png",
		},
		{
			CardHead: "Total Approved Jobs",
			CardNum: employeeCardsData?.totalApprovedJobs
				? employeeCardsData?.totalApprovedJobs
				: 0,
			CardImg: "/images/userr.png",
		},
	];
	return (
		<>
			<Header
				profileLink={"/employee/dashboard/profile"}
				headerTitle={"Dashboard"}
				headerDiscription={
					"Get details about total spent, total jobs, and your subscribed plans."
				}
			/>
			<div className="!w-full overflow-hidden">
				{/* getSpinner={(e) => setSpinner(e)} */}
				<DashboardEmployee cardsData={overview_data} areaData={areaGraphData} />
			</div>
		</>
	);
};

export default Dashboard;
