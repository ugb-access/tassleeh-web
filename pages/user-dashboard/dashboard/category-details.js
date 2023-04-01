import React from "react";
import MiniHeader from "../../../components/dashboard/mini-header";
import SubCategoryCard from "../../../components/dashboard/sub-category-card";
import LoadMap from "./googleMap";
const subCatData = [
	{
		image: "/images/subCatImg (1).png",
		title: "Electricity",
	},
	{
		image: "/images/subCatImg (2).png",
		title: "Mehanics",
	},
	{
		image: "/images/subCatImg (3).png",
		title: "Dyeing / Blacksmith",
	},
	{
		image: "/images/subCatImg (7).png",
		title: "Oil",
	},
	{
		image: "/images/subCatImg (5).png",
		title: "Recorders",
	},
	{
		image: "/images/subCatImg (6).png",
		title: "Tire",
	},
];
const SubCategoryDetails = () => {
	return (
		<div>
			<MiniHeader headerText={"Cars"} showRequestButton />
			<div className="grid grid-cols-4 gap-9 justify-between">
				{subCatData?.map((item, index) => {
					return <SubCategoryCard item={item} key={index} />;
				})}
			</div>

			{/* map */}
			<div className="mt-3">
				<h1 className="font-bold text-2xl py-5">Service providers near you</h1>
			</div>
			<div>
				<LoadMap />
			</div>
		</div>
	);
};

export default SubCategoryDetails;
