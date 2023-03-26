import DashboardI from "../../../components/dashboard/business-index";
import React from "react";
import Header from "../../../layout/DashboardHeader";
import DashboardBusiness from "../../../components/dashboard/business-index";
import { useState, useEffect } from "react";
import { businessDashboardCards } from "../../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";
const Dashboard = () => {
	const [spinner, setSpinner] = useState(true);
	const [businessCardsData, setBusinessCardData] = useState([]);
	const [userType, setUserType] = useState("");
	const [data, setData] = useState({});
	const fetchStaticsData = (id) => {
		businessDashboardCards(id)
			.then((res) => {
				setBusinessCardData(res?.data);
				setSpinner(false);
			})
			.catch((err) => {
				setSpinner(false);
				// console.log(err, "err");
			});
		setSpinner(false);
	};
	const fetchLocalStorage = () => {
		setSpinner(true);
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
	}, [spinner]);
	// console.log(data);

	const businessData = [
		{
			CardHead: "Total Spent",
			CardNum: businessCardsData?.totalSpend
				? businessCardsData?.totalSpend
				: 0,
			// CardSpan: "+100%",
			CardImg: "/images/pound_symbol.png",
		},
		{
			CardHead: "Total Jobs",
			CardNum: businessCardsData?.totalJobs ? businessCardsData?.totalJobs : 0,
			// CardSpan: "+20%",
			CardImg: "/images/bx-briefcase (2).png",
		},
		{
			CardHead: "Current Plan",
			CardNum: businessCardsData?.currentPlan
				? businessCardsData?.currentPlan
				: "",
			// CardSpan: "",
			CardImg: "/images/crcard.png",
		},
		{
			CardHead: "Total Applicants",
			CardNum: businessCardsData?.totalApplicants
				? businessCardsData?.totalApplicants
				: 0,
			// CardSpan: "+2%",
			CardImg: "/images/userr.png",
		},
	];

	const areaGraphData = [
		{
			heading: "Overview - Total Jobs",
			img: "/images/Path.png",
			para: "Overview - Total Jobs",
		},
	];
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[200%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl  sm:right-60 bottom-20 items-center flex text-center justify-center  relative">
						<div className="flex justify-center h-full items-center items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<Header
				searchPlaceHolder="Search By UserName"
				headerTitle="Dashboard"
				headerDiscription="Get details about total spent, total jobs, and your subscribed plans."
				profileLink={"/employee/dashboard/profile"}
			/>
			<DashboardBusiness
				getSpinner={(e) => setSpinner(e)}
				cardsData={businessData}
				areaData={areaGraphData}
			/>
		</>
	);
};

export default Dashboard;
