import react, { useState, useEffect } from "react";
import { useStyleRegistry } from "styled-jsx";
import {
	businessJobApplications,
	getAllBlogs,
	getAllJobs,
} from "../../services/auth-service";
import moment from "moment";
const Table = ({ getSpinner }) => {
	const [jobNotifications, setJobNotifications] = useState([]);
	const [userType, SetUserType] = useState("");
	const fetchLocalStorage = () => {
		// getSpinner(true);
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const type = userData?.type;
		SetUserType(type);
		const id = userData?._id;
		fetchSalesData(id);
	};
	const fetchSalesData = (id) => {
		businessJobApplications(id)
			.then((res) => {
				let revData = res?.data?.reverse();
				setJobNotifications(revData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchLocalStorage();
	}, []);
	return (
		<div className="media sm:px-5 px-0">
			<h1 className="flex items-center font-semibold text-xl p-5 ">
				{userType === "business"
					? "Applicants Notifications"
					: "Jobs Notifications"}
			</h1>
			<table className="table">
				<thead>
					<tr className="whitespace-nowrap text-center">
						<th style={{ color: "#AEAEAE" }}> Name</th>
						<th style={{ color: "#AEAEAE" }}>Applied On</th>
						<th style={{ color: "#AEAEAE" }}>Date</th>
						<th style={{ color: "#AEAEAE" }}>Status</th>
					</tr>
				</thead>
				<tbody className="">
					{jobNotifications?.length > 0 &&
						jobNotifications?.map((item, index) => {
							// console.log(item, "table map data");
							return (
								<tr className="!gap-2 text-lg">
									<td className="!text-center whitespace-nowrap">
										{item?.applicantUser?.firstName}
									</td>
									<td className="!text-center whitespace-nowrap">
										{item?.jobId?.jobTitle}
									</td>
									<td className="!text-center whitespace-nowrap">
										{moment(item?.createdAt).format("DD/MM/YYYY")}
									</td>

									<td>
										<p
											className={`capitalize text-center ${
												item?.status === "accepted"
													? "bg-[#82D616] bg-opacity-[10%] text-[#6F963D]"
													: "" || item?.status === "pending"
													? "bg-[#FFEC42] bg-opacity-[20%] text-[#FBC919]"
													: "" || item?.status === "rejected"
													? "bg-[#EA0606] bg-opacity-[10%] text-[#EA0606]"
													: ""
											}`}
										>
											{item.status}
										</p>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			{jobNotifications?.length === 0 && (
				<div className="text-red-500  flex items-center  justify-center  w-full h-[160px]">
					<p className="">No Records Found</p>
				</div>
			)}
		</div>
	);
};

export default Table;
