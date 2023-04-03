import { useEffect, useState } from "react";
import BookingDetail from "../../../components/common/BookingDetail";
import MiniHeader from "../../../components/dashboard/mini-header";
import { IoIosArrowRoundBack } from "react-icons/io";
import RequestDescription from "../../../components/common/RequestDescription";
import DateTime from "../../../components/dashboard/request-datetime";
const BookingDetailData = [
	{
		icon: "/images/booking.png",
		heading: "Andrew Smith",
		status: "Pending",
	},
];
const Data = [
	{
		image: "/images/gallery1.png",
	},
	{
		image: "/images/gallery1.png",
	},
	{
		image: "/images/gallery1.png",
	},
	{
		image: "/images/gallery1.png",
	},
];

const RequestsDetail = () => {
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
		<>
			<div className="flex ">
				<MiniHeader headerText={"Request Details"} showIcon />
			</div>
			<div>
				<div className="">
					{filterData?.map((item, index) => {
						return <BookingDetail key={index} item={item} />;
					})}
				</div>
				<RequestDescription
					data={Data}
					descriptionText={`As an Auto Mechanic, or Service Technician, I fix vehicles and replace their parts for customers. My duties 
include inspecting the vehicle's mechanical components and its engine, diagnosing problems with vehicles and performing maintenance and repair work on cars, trucks and other vehicles.`}
				/>
			</div>
			<div className="mt-6">
				<DateTime address={"7152 Winding Way Dr.Woodside, NY 11377"} />
			</div>
		</>
	);
};

export default RequestsDetail;
