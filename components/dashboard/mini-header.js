import React from "react";
import Button from "../Button";
const MiniHeader = ({
	type,
	headerText,
	button,
	showRequestButton,
	showFilterButtons,
	currentClick,
	completedClick,
	cancelledClick,
}) => {
	return (
		<div className="flex justify-between pb-6 items-center">
			<div className="text-xl font-semibold">{headerText}</div>
			<div>
				{showRequestButton && (
					<Button
						text="+ Create Request"
						customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white w-20 sm:!w-40 h-8 sm:!h-10"
					/>
				)}
				{showFilterButtons && (
					<div className="flex gap-3">
						<Button
							onClick={currentClick}
							text="Current Requests"
							customClass={`${
								type === "Pending" && "bg-primary text-white"
							} border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold text-primary w-20 sm:!w-44 h-8 sm:!h-10`}
						/>
						<Button
							onClick={completedClick}
							text="Completed Requests"
							customClass={`${
								type === "Completed" && "bg-primary text-white"
							} border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold text-primary w-20 sm:!w-44 h-8 sm:!h-10`}
						/>
						<Button
							onClick={cancelledClick}
							text="Cancelled Requests"
							customClass={`${
								type === "Cancelled" && "bg-primary text-white"
							} border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold text-primary w-20 sm:!w-44 h-8 sm:!h-10`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default MiniHeader;
