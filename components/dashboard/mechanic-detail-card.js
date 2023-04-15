import React from "react";
import Button from "../Button";
import Link from "next/link";

const MechanicDetailCard = ({ item }) => {
	return (
		<div className="header0 md:flex  justify-between mb-7 rounded-lg bg-[#ffffff] py-6 pb-2 md:pb-6 px-4">
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
			<Link href={"/user-dashboard/dashboard/create-request"}>
				<div className="items-start md:my-0 my-5">
					<Button
						text={"Contact Worker"}
						customClass={
							"bg-primary rounded-2xl p-2 mr-2 text-sm font-semibold text-white w-20 sm:!w-full h-8 sm:!h-10"
						}
					/>
				</div>
			</Link>
		</div>
	);
};

export default MechanicDetailCard;
