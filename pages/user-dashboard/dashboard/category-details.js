import React from "react";
import MiniHeader from "../../../components/dashboard/mini-header";
import SubCategoryCard from "../../../components/dashboard/sub-category-card";
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
			<div className="flex flex-wrap justify- gap-10 ">
				{subCatData?.map((item, index) => {
					return <SubCategoryCard item={item} key={index} />;
				})}
			</div>
		</div>
	);
};

export default SubCategoryDetails;
