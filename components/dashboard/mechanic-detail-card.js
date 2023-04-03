import React from "react";
import Button from "../Button";

const MechanicDetailCard = ({ item }) => {
	return (
		<div className="header0 flex justify-between mb-7 rounded-lg bg-[#ffffff] py-6 px-4">
			<div className="flex gap-5 items-center">
				<div>
					<img src={item?.icon} className="h-24 w-24" alt="" />
				</div>
				<div className="font-semibold">
					<h1 className="">
						Name:{" "}
						<span className="text-[#656464] font-normal">{item?.name}</span>
					</h1>
					<h1>
						Amount:{" "}
						<span className="text-[#656464] font-normal">{item?.amount}</span>
					</h1>
					<h1 className="flex items-center gap-3">
						Rating:{" "}
						<span className="">
							<img className="h-3 w-" src="/images/star.png" alt="" />
						</span>
					</h1>
				</div>
			</div>
			<div className="items-start">
				<Button
					text={"Contact Worker"}
					customClass={
						"bg-primary rounded-2xl p-2 mr-2 text-sm font-semibold text-white w-20 sm:!w-40 h-8 sm:!h-10"
					}
				/>
			</div>
		</div>
	);
};

export default MechanicDetailCard;
