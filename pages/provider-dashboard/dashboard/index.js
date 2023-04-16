// import DashboardI from "../../../components/dashboard/business-index";
import React from "react";
// import Header from "../../../layout/DashboardHeader";
// import DashboardBusiness from "../../../components/dashboard/business-index";
// import { useState, useEffect } from "react";
// import { businessDashboardCards } from "../../../services/auth-service";
// import { ImSpinner9 } from "react-icons/im";
import CategoriesCard from "../../../components/dashboard/categoriescard";
import MiniHeader from "../../../components/dashboard/mini-header";
const Dashboard = () => {
	// const [spinner, setSpinner] = useState(true);
	// const [businessCardsData, setBusinessCardData] = useState([]);
	// const [userType, setUserType] = useState("");
	// const [data, setData] = useState({});
	// const fetchStaticsData = (id) => {
	// 	businessDashboardCards(id)
	// 		.then((res) => {
	// 			setBusinessCardData(res?.data);
	// 			setSpinner(false);
	// 		})
	// 		.catch((err) => {
	// 			setSpinner(false);
	// 			// console.log(err, "err");
	// 		});
	// 	setSpinner(false);
	// };
	// const fetchLocalStorage = () => {
	// 	setSpinner(true);
	// 	const users = localStorage.getItem("user");
	// 	const userData = JSON.parse(users);
	// 	const type = userData?.type;
	// 	setUserType(type);
	// 	// console.log(type, "user type");
	// 	const id = userData?._id;
	// 	setData(id);
	// 	fetchStaticsData(id);
	// };
	// useEffect(() => {
	// 	fetchLocalStorage();
	// }, [spinner]);
	// // console.log(data);

	const categoriesData = [
		{
			icon: "/images/card1.png",
			title: "Cars - Mechanic Required",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card2.png",
			title: "Cars - Mechanic Required",
			description:
				"TASSLEEH is well aware that electrical chores can easily pile up on your to-do list, hence we bring to you the best electrician services. We provide you with the best solution and a range of repairing services.",
		},
		{
			icon: "/images/card3.png",
			title: "Cars - Mechanic Required",
			description:
				"We need auto mechanic who is highly skilled with rich experience in the field. We believe in Strong values, Quality of services, and satisfaction of our clients. We need best mechanic who will provide best service.",
		},
		{
			icon: "/images/card4.png",
			title: "Cars - Mechanic Required",
			description:
				"We need auto mechanic who is highly skilled with rich experience in the field. We believe in Strong values, Quality of services, and satisfaction of our clients. We need best mechanic who will provide best service.",
		},
	];
	return (
		<div>
			<MiniHeader headerText={"Home"} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6  pb-3">
				{categoriesData.map((item, index) => {
					return (
						<CategoriesCard
							tryNow={"/provider-dashboard/dashboard/requests-detail"}
							key={index}
							text={"Send Request"}
							item={item}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Dashboard;
