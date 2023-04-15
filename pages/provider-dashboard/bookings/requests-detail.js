import { useEffect, useState } from "react";
import BookingDetail from "../../../components/common/BookingDetail";
import MiniHeader from "../../../components/dashboard/mini-header";
import { IoIosArrowRoundBack } from "react-icons/io";
import RequestDescription from "../../../components/common/RequestDescription";
import DateTime from "../../../components/dashboard/request-datetime";
import Button from "../../../components/Button";
import Link from "next/link";
import AmountPopup from "./amount-popup";
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
	const [showPopup, setShowPopup] = useState(false);
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
			<div className="header0 px-6 py-4 bg-[#ffffff] mt-6">
				<div className="flex justify-between">
					<h1 className="text-[#2F2C4A] font-semibold">Mechanic Details</h1>
					<Link href={"/provider-dashboard/messages"}>
						<Button
							// onClick={currentClick}
							text="Message"
							customClass=" border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold text-primary w-20 sm:!w-32 h-8 sm:!h-10 whitespace-nowrap"
						/>
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<div>
						<img className="h-20" src="/images/booking2.png" alt="" />
					</div>
					<div className="flex flex-col gap-y-1">
						<h1 className="text-[#2F2C4A] font-semibold">
							Name:{" "}
							<span className="text-[#656464] text-sm font-normal">
								Andrew Smith
							</span>
						</h1>
						<h1 className="text-[#2F2C4A] font-semibold flex gap-2 items-center">
							Rating:{" "}
							<span>
								<img className="h-3" src="/images/star.png" alt="" />
							</span>
						</h1>
						<h1 className="text-[#2F2C4A] font-semibold">
							Arrival Time:{" "}
							<span className="text-[#656464] font-normal text-sm">
								30 Minutes
							</span>
						</h1>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center gap-3 mt-5">
				<Button
					onClick={() => setShowPopup(true)}
					text="Start Work"
					customClass="border !w-24 !h-9 bg-[#34A853] text-sm text-white rounded-2xl"
				/>
				<Button
					// onClick={currentClick}
					text="Cancel Request"
					customClass="border !w-32 !h-9 bg-[#F33C3C] text-sm text-white rounded-2xl"
				/>
			</div>
			{showPopup && <AmountPopup setShowPopup={setShowPopup} />}
		</>
	);
};

export default RequestsDetail;
