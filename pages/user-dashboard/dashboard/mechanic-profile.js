import React from "react";
import MiniHeader from "../../../components/dashboard/mini-header";
import MechanicDetailCard from "../../../components/dashboard/mechanic-detail-card";
import RequestDescription from "../../../components/common/RequestDescription";
const data = [
	{
		icon: "/images/booking.png",
		name: "Andrew Smith",
		amount: "-",
		rating: "0",
	},
];
const Data = [
	{
		image: "/images/profilePictures (1).png",
	},
	{
		image: "/images/profilePictures (2).png",
	},
	{
		image: "/images/profilePictures (3).png",
	},
	{
		image: "/images/profilePictures (4).png",
	},
];
const MechanicProfile = () => {
	return (
		<div>
			<div className="flex ">
				<MiniHeader headerText={"Mechanic Profile"} showIcon />
			</div>
			<div>
				{data?.map((item, index) => {
					return <MechanicDetailCard item={item} />;
				})}
			</div>
			<RequestDescription
				data={Data}
				descriptionText={`As an Auto Mechanic, or Service Technician, I fix vehicles and replace their parts for customers. My duties 
include inspecting the vehicle's mechanical components and its engine, diagnosing problems with vehicles and performing maintenance and repair work on cars, trucks and other vehicles.`}
			/>
		</div>
	);
};

export default MechanicProfile;
