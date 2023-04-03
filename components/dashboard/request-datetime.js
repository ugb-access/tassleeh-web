import Button from "../Button";

const DateTime = ({ address }) => {
	return (
		<>
			<div className="header0 flex flex-col gap-y-3 bg-[#ffffff]">
				<h1 className="text-[#2F2C4A] font-semibold">Date and Time</h1>
				<Button
					// onClick={currentClick}
					text="Wednesday 2 Feb, 2023"
					customClass=" border border-primary hover:bg-primary hover:text-white rounded-2xl p-2 text-sm font-semibold text-primary w-20 sm:!w-48 h-8 sm:!h-10 whitespace-nowrap"
				/>
				<h1 className="text-[#2F2C4A] font-semibold">
					Address: <span className="text-[#656464] text-sm">{address}</span>
				</h1>
			</div>
		</>
	);
};

export default DateTime;
