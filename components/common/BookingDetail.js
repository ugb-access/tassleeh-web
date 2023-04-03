import Button from "../Button";

const BookingDetail = ({ item }) => {
	return (
		<div className="header0 flex justify-between items-center mb-7 bg-[#ffffff] py-6 px-4">
			<div className="flex gap-3 items-center">
				<img src={item?.icon} alt="" />
				<h1>
					Name: <span className="text-[#656464]">{item?.heading}</span>
				</h1>
			</div>
			<div>
				<div
					className={`flex justify-center items-center border ${
						item?.status === "Pending"
							? "border-[#FBC02D]"
							: "" || item?.status === "Completed"
							? "border-[#34A853]"
							: "" || item?.status === "Cancelled"
							? "border-[#F33C3C]"
							: ""
					} rounded-2xl p-2 text-sm font-semibold text-white sm:!w-24 sm:!h-10`}
				>
					<p
						className={`${
							item?.status === "Pending"
								? "text-[#FBC02D]"
								: "" || item?.status === "Completed"
								? "text-[#34A853]"
								: "" || item?.status === "Cancelled"
								? "text-[#F33C3C]"
								: ""
						}`}
					>
						{item?.status}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BookingDetail;
