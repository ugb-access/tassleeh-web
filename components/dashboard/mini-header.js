import React from "react";
import Button from "../Button";
const MiniHeader = ({ header, button }) => {
	return (
		<div className="flex justify-between pt-6 ">
			<div className="text-xl font-semibold">{header}</div>
			<div>
				<Button
					text="+ Create Request"
					customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white w-20 sm:!w-44 h-8 sm:!h-12"
				/>
			</div>
		</div>
	);
};

export default MiniHeader;
