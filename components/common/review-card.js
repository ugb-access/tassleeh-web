import React from "react";

const ReviewCard = ({ item }) => {
	return (
		<div className="">
			<div className="lg:flex my-3 gap-5">
				<div>
					<img className="rounded-full " src={item?.icon} alt="" />
				</div>
				<div className="">
					<h3 className="mt-2">{item?.name}</h3>
					<img className="h-3 my-2" src="/images/star.png" alt="" />
					<p className="mb-2 text-[#000000 10%]">{item?.rev}</p>
				</div>
			</div>
			<hr className="pb-2" />
		</div>
	);
};

export default ReviewCard;
