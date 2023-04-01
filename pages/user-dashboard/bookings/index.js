import React, { useEffect, useState } from "react";
import MiniHeader from "../../../components/dashboard/mini-header";
import BookingDetail from "../../../components/common/BookingDetail";
import Link from "next/link";
const BookingDetailData = [
	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Pending",
	},
	{
		icon: "/images/booking.png",
		heading: "Robert Smith",
		status: "Pending",
	},
	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Completed",
	},
	{
		icon: "/images/booking.png",
		heading: "Adam Smith",
		status: "Cancelled",
	},
	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Pending",
	},
	{
		icon: "/images/booking.png",
		heading: "Robert Smith",
		status: "Pending",
	},
	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Completed",
	},
	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Completed",
	},
	{
		icon: "/images/booking.png",
		heading: "Adam Smith",
		status: "Cancelled",
	},
	{
		icon: "/images/booking.png",
		heading: "Adam Smith",
		status: "Cancelled",
	},

	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Completed",
	},
	{
		icon: "/images/booking.png",
		heading: "Adam Smith",
		status: "Cancelled",
	},
];
const BookingDashBoard = () => {
	const [type, setType] = useState("Pending");
	const [filterData, setFilterData] = useState([]);
	console.log(type);
	const dataType = (type) => {
		let res = BookingDetailData?.filter((item, index) => item?.status === type);
		setFilterData(res);
		setType(type);
	};
	useEffect(() => {
		dataType(type);
	}, [type]);
	return (
		<div>
			<MiniHeader
				type={type}
				headerText={"Bookings"}
				currentClick={() => setType("Pending")}
				completedClick={() => setType("Completed")}
				cancelledClick={() => setType("Cancelled")}
				showFilterButtons
			/>
			<Link href={"/user-dashboard/dashboard/category-details"}>
				<div className="">
					{filterData?.map((item, index) => {
						return <BookingDetail key={index} item={item} />;
					})}
				</div>
			</Link>
		</div>
	);
};

export default BookingDashBoard;
