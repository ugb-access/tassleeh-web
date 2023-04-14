import React from "react";
import ProfileListCard from "../../../components/dashboard/profile-list-card";
import MiniHeader from "../../../components/dashboard/mini-header";

const data = [
	{
		icon: "/images/mechanics (1).png",
		title: "John Doe",
	},
	{
		icon: "/images/mechanics (2).png",
		title: "Mark Henry",
	},
	{
		icon: "/images/mechanics (3).png",
		title: "Matt Hardy",
	},
	{
		icon: "/images/mechanics (4).png",
		title: "Shaun Pollock",
	},
];

const ProfileList = () => {
	return (
		<div>
			<MiniHeader headerText={"Mechanics"} />
			<div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2  lg:gap-y-0 md:gap-y-10">
				{data?.map((item, index) => {
					return <ProfileListCard key={index} item={item} />;
				})}
			</div>
		</div>
	);
};

export default ProfileList;
