import React from "react";
import MiniHeader from "../../../components/dashboard/mini-header";
import MechanicDetailCard from "../../../components/dashboard/mechanic-detail-card";
import RequestDescription from "../../../components/common/RequestDescription";
import UserReviews from "./user-reviews";
const data = [
	{
		icon: "/images/booking.png",
		name: "Andrew Smith",
		amount: "-",
		rating: "0",
	},
];
const data2 = [
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
const reviewData = [
	{
		icon: "/images/revicon (1).png",
		name: "Tom Davis",
		rev: "I received support from him in ways that are beyond words. One of the key drivers of our hyper growth was his very competent nature. He truly embody the phrase worth for money.",
	},
	{
		icon: "/images/revicon (2).png",
		name: "Paul Adam",
		rev: "I received support from him in ways that are beyond words.  Our hyper growth was his very competent nature. He truly embody the phrase worth for money.",
	},
	{
		icon: "/images/revicon (3).png",
		name: "Alex Hales",
		rev: "I received support from him in ways that are beyond words. One of the key  of our hyper growth was his very competent nature. He truly embody the phrase worth for money.",
	},
];
const MechanicProfile = () => {
	return (
		<div>
			<div className="flex ">
				<MiniHeader headerText={"Mechanic Profile"} showIcon={true} />
			</div>
			<div>
				{data?.map((item, index) => {
					return <MechanicDetailCard key={index} item={item} />;
				})}
			</div>
			<RequestDescription
				data={data2}
				descriptionText={`As an Auto Mechanic, or Service Technician, I fix vehicles and replace their parts for customers. My duties 
include inspecting the vehicle's mechanical components and its engine, diagnosing problems with vehicles and performing maintenance and repair work on cars, trucks and other vehicles.`}
			/>
			<UserReviews data={reviewData} />
		</div>
	);
};

export default MechanicProfile;
