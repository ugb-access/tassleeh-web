import { useEffect, useState } from "react";
import BookingDetail from "../../../components/common/BookingDetail";
import MiniHeader from "../../../components/dashboard/mini-header";
import { IoIosArrowRoundBack } from "react-icons/io";
import RequestDescription from "../../../components/common/RequestDescription";
import DateTime from "../../../components/dashboard/request-datetime";
import Button from "../../../components/Button";
import Link from "next/link";
import TextInput from "./../../../components/TextInput";
// import AmountPopup from "./amount-popup";
import swal from "sweetalert";
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
	useEffect(() => {
		dataType(type);
	}, [type]);

	const dataType = (type) => {
		let res = BookingDetailData?.filter((item, index) => item?.status === type);
		setFilterData(res);
		setType(type);
	};
	const handleSubmit = () => {
		sweetAlert({
			title: "Request Sent",
			text: "You will get notified when the user will accept your request.",
			icon: "success",
			buttons: "Okay",
			content: "center",
		});
	};
	return (
		<>
			<div className="flex ">
				<MiniHeader headerText={"Request Details"} showIcon />
			</div>
			<div>
				<div className="">
					{filterData?.map((item, index) => {
						return <BookingDetail showAmount key={index} item={item} />;
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
			<div className="header0 py-4 bg-[#ffffff] mt-6">
				<div className="bg-white  p-6 rounded-lg md:flex justify-between">
					<div className="h-fit md:order-2 mb-2 flex w-full justify-end">
						<Link href={"/provider-dashboard/messages"}>
							<Button
								customClass={
									" rounded-2xl px-5  text-sm font-semibold text-primary border border-primary !w-fit !h-10 md:!h-12"
								}
								text={"Message"}
							/>
						</Link>
					</div>
					<div className="md:w-[60%] md:order-1 basis-full">
						<div>
							<TextInput
								customClass={"border-1 !bg-white rounded-lg !h-10"}
								placeholder={"Amount"}
								labelText={"Amount"}
								labelStyle={"text-base font-semibold"}
							/>
						</div>
						{/* upload-cloud */}
						<div>
							<div className="text-base font-semibold mb-1">Description</div>
							<textarea
								className={"border p-1 px-2 w-full rounded-lg !h-28"}
								placeholder={"Work Category"}
							/>
						</div>
						<div className="img-featured ">
							<h2 className=" mt-4 mb-1 text-base font-semibold">
								Upload Images
							</h2>
							<div className="border-dashed border rounded-lg ">
								<div className="flex flex-col justify-center items-center py-8">
									<div className="pb-2">
										<img
											className="h-[50px]"
											src={"/images/upload-cloud.png"}
											alt=""
										/>
									</div>
									<button className="relative border border-solid rounded-2xl cursor-pointer p-1 px-7 h-12 mt-3 border-primary ">
										<p className="text-primary cursor-pointer text-sm font-semibold  ">
											Upload
										</p>
										<input
											accept="/image/*"
											className="absolute  opacity-0 right-0 left-0 top-0 bottom-0 cursor-pointer"
											type="file"
										/>
									</button>
								</div>
							</div>
						</div>
						<div className="mt-5">
							<TextInput
								type={"date"}
								customClass={"border-1 rounded-lg !bg-white !h-10"}
								placeholder={"Choose Date and Time"}
								labelText={"Choose Date and Time"}
								labelStyle={"text-base font-semibold"}
							/>
						</div>

						<div className="flex justify-center mt-5">
							<Button
								onClick={handleSubmit}
								text={"Submit"}
								customClass={
									"bg-primary rounded-2xl px-5  text-sm font-semibold text-white !w-fit !h-12"
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RequestsDetail;
