import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
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
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-9 justify-between">
				{subCatData?.map((item, index) => {
					return <SubCategoryCard item={item} key={index} />;
				})}
			</div>

			{/* map */}
			<div className="mt-3 py-5  md:flex justify-between">
				<h1 className="font-bold text-xl lg:text-xl mr-5 whitespace-nowrap ">
					Service providers near you
				</h1>
				<div className=" hidden md:flex bg-white items-center border  rounded-2xl hover:border hover:border-primary  justify-between">
					<input
						type="text"
						placeholder="Search Here"
						className="rounded-full pl-5"
					/>
					<AiOutlineSearch className="h-8 w-5 mx-2 cursor-pointer hover:text-primary" />
				</div>
			</div>
			<div>
				<LoadMap />
			</div>
		</div>
	);
};

export default SubCategoryDetails;
