import React from "react";
import Button from "../Button";
const MiniHeader = ({
	headerText,
	button,
	showRequestButton,
	showFilterButtons,
}) => {
	return (
		<div className="flex justify-between pb-6 items-center">
			<div className="text-xl font-semibold">{headerText}</div>
			<div>
				{showRequestButton && (
					<Button
						text="+ Create Request"
						customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white w-20 sm:!w-44 h-8 sm:!h-12"
					/>
				)}
				{showFilterButtons && (
					<div className="flex gap-3">
						<Button
							text="Current Requests"
							customClass="bg-primary border border-primary  rounded-2xl p-2 text-sm font-semibold text-white w-20 sm:!w-44 h-8 sm:!h-12"
						/>
						<Button
							text="Completed Requests"
							customClass="!text-primary border border-primary rounded-2xl p-2 text-sm font-semibold text-white w-20 sm:!w-44 h-8 sm:!h-12"
						/>
						<Button
							text="Cancelled Requests"
							customClass="!text-primary border border-primary rounded-2xl p-2 text-sm font-semibold text-white w-20 sm:!w-44 h-8 sm:!h-12"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default MiniHeader;
