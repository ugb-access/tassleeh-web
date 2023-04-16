import React from "react";
import Button from "../Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
const MiniHeader = ({
	type,
	headerText,
	button,
	showIcon,
	showRequestButton,
	showFilterButtons,
	currentClick,
	completedClick,
	cancelledClick,
}) => {
	const router = useRouter();
	return (
		<div
			className={`${
				router.asPath.includes("/user-dashboard/bookings") ||
				router.asPath.includes("/provider-dashboard/bookings")
					? "md:flex"
					: "flex"
			} justify-between gap-2 pb-4 items-center sm:mt-0 mt-2`}
		>
			<div className="flex gap-2 items-center">
				{showIcon && (
					<img
						onClick={() => router.back()}
						className="h-3 cursor-pointer"
						src="/images/back-icon.png"
						alt="back"
					/>
				)}

				<div className="sm:text-lg md:text-xl font-semibold">{headerText}</div>
			</div>
			<div>
				{showRequestButton && (
					<Button
						text="+ Create Request"
						customClass="bg-primary rounded-2xl md:p-2.5 p-2 text-sm font-semibold sm:text-base text-xs text-white"
					/>
				)}
				{showFilterButtons && (
					<div className="flex flex-wrap sm:flex-nowrap gap-3">
						<Button
							onClick={currentClick}
							text="Current Requests"
							customClass={`${
								type === "Pending" && "bg-primary text-white"
							} border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold whitespace-nowrap text-primary h-8 sm:!h-10`}
						/>
						<Button
							onClick={completedClick}
							text="Completed Requests"
							customClass={`${
								type === "Completed" && "bg-primary text-white"
							} border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold whitespace-nowrap text-primary h-8 sm:!h-10`}
						/>
						<Button
							onClick={cancelledClick}
							text="Cancelled Requests"
							customClass={`${
								type === "Cancelled" && "bg-primary text-white"
							} border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold text-primary whitespace-nowrap h-8 sm:!h-10`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default MiniHeader;
