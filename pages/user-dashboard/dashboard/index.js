import React from "react";
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
			title: "Cars",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card2.png",
			title: "Electronics",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card3.png",
			title: "Home",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
		{
			icon: "/images/card4.png",
			title: "Accessories",
			description:
				"Our auto mechanics are highly skilled with rich experience in the field. They are available to serve your needs in almost all areas. We believe in Strong values, Quality of services, and satisfaction of our clients.",
		},
	];
	return (
		<div>
			<MiniHeader headerText={"Cars"} showRequestButton />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-3 pb-3">
				{categoriesData.map((item, index) => {
					return (
						<CategoriesCard
							tryNow={"/user-dashboard/dashboard/category-details"}
							text={"Try Now"}
							key={index}
							item={item}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Dashboard;
