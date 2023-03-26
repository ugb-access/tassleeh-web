import react, { useState, useEffect } from "react";
import { getAllJobs } from "../../services/auth-service";
import moment from "moment";
import { toast } from "react-toastify";
const EmployeeTable = ({ getSpinner }) => {
	const [jobNotifications, setJobNotifications] = useState([]);
	const [userType, SetUserType] = useState("");
	const fetchLocalStorage = () => {
		// getSpinner(true);
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const type = userData.type;
		SetUserType(type);
		const id = userData?._id;
		fetchSalesData(id);
	};
	const fetchSalesData = (id) => {
		getAllJobs(id)
			.then((res) => {
				console.log(res, "all jobs");
				// console.log(res, "job notifications");
				let revData = res?.data?.reverse();
				setJobNotifications(revData);
			})
			.catch((err) => {
				toast.warn(err?.message ? err?.message : "Something went wrong");
			});
	};
	useEffect(() => {
		fetchLocalStorage();
	}, []);
	return (
		<div className="media sm:px-5 px-0">
			<h1 className="flex items-center font-semibold text-xl py-5 ">
				{userType === "business"
					? "Applicants Notifications"
					: "Jobs Notifications"}
			</h1>
			<table className="table">
				<thead>
					<tr className="whitespace-nowrap text-center">
						<th style={{ color: "#AEAEAE" }}> Business name</th>
						<th style={{ color: "#AEAEAE" }}>Job Title</th>
						<th style={{ color: "#AEAEAE" }}>City</th>
						<th style={{ color: "#AEAEAE" }}>Created at</th>
					</tr>
				</thead>
				<tbody className="">
					{jobNotifications?.length > 0 &&
						jobNotifications?.map((item, index) => {
							// console.log(item, "table map data");
							return (
								<tr className="!gap-2 text-lg">
									<td className="!text-center whitespace-nowrap">
										{item?.createdBy?.businessName}
									</td>
									<td className="!text-center whitespace-nowrap">
										{item?.jobTitle}
									</td>
									<td className="!text-center whitespace-nowrap">
										{item?.city}
									</td>
									<td className="!text-center whitespace-nowrap">
										{moment(item?.createdAt).format("DD/MM/YYYY")}
									</td>
									{/* <td>
							<p className="select0">03441558767</p>
						</td> */}
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

export default EmployeeTable;
