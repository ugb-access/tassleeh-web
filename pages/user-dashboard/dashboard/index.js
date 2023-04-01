import DashboardI from "../../../components/dashboard/business-index";
import React from "react";
import Header from "../../../layout/DashboardHeader";
import DashboardBusiness from "../../../components/dashboard/business-index";
import { useState, useEffect } from "react";
import { businessDashboardCards } from "../../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";
import CategoriesCard from "../../../components/dashboard/categoriescard";
import MiniHeader from "../../../components/dashboard/mini-header";
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

	const categoriesData = [
		{
			icon: "/images/card1.png",
			title: "Cars",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card2.png",
			title: "Cars",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card3.png",
			title: "Cars",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card4.png",
			title: "Cars",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
	];

	// const areaGraphData = [
	// 	{
	// 		heading: "Overview - Total Jobs",
	// 		img: "/images/Path.png",
	// 		para: "Overview - Total Jobs",
	// 	},
	// ];
	return (
		<>
			{/* {spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[200%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl  sm:right-60 bottom-20 items-center flex text-center justify-center  relative">
						<div className="flex justify-center h-full items-center items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)} */}
			<MiniHeader headerText={"Cars"} showRequestButton />
			<div className="flex flex-wrap pt-5 pb-3 justify-between gap-14 gap-y-12">
				{categoriesData.map((item, index) => {
					return <CategoriesCard key={index} item={item} />;
				})}
			</div>
		</>
	);
};

export default Dashboard;
