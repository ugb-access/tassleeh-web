import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
const ProfileListCard = ({ item }) => {
	return (
		<div className="cursor-pointer border-[1px] border-solid border-[#E3E3E3] py-1.5 rounded-2xl px-4 bg-white">
			<div className="mx- mt-2 flex justify-center">
				<img className=" w-full  px- rounded-t-xl" src={item?.icon} alt="" />
			</div>
			<div className=" py-3 flex justify-between">
				<h2 className="font-semibold text-md whitespace-nowrap truncate">
					Name:{" "}
					<span className="text-[#5B697D] font-normal text-sm">
						{item?.title}
					</span>
				</h2>
				<div>
					<AiOutlineHeart className="h-6 w-6 text-[#C7C7C7]" />
				</div>
			</div>

			<div className=" pb-2">
				<h2 className="font-semibold flex items-center text-center text-md whitespace-nowrap truncate">
					{" "}
					Rating: <img className="h-3 ml-2" src="/images/star.png" />
				</h2>
			</div>
		</div>
	);
};

export default ProfileListCard;
