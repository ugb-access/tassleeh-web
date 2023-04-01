import React from "react";

const SubCategoryCard = ({ item }) => {
	return (
		<div className="cursor-pointer border-[1px] border-solid border-[#E3E3E3] py-1.5 rounded-2xl h- w-64 bg-white">
			<div className="mx- mt-2 flex justify-center">
				<img className="h-[108px] rounded-t-xl" src={item.image} alt="" />
			</div>
			<div className="items-center p-3">
				<h2 className="font-semibold text-center text-md whitespace-nowrap truncate">
					{item.title}
				</h2>
			</div>
		</div>
	);
};

export default SubCategoryCard;
