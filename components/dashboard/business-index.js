import AreaGraph from "./areagraph";
import Card from "./card";
import BarGraph from "./bargraph";
import React from "react";
import PieDonutChart from "./PieDonutChart";
import Table from "./table";
import { useState, useEffect } from "react";
import { businessJobSuccess } from "../../services/auth-service";

const DashboardBusiness = ({ cardsData, areaData, getSpinner }) => {
	const [jobPercentage, setJobPercentage] = useState([]);
	const [userType, setUserType] = useState("");
	const fetchLocalStorage = () => {
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const id = userData?._id;
		const type = userData?.type;
		setUserType(type);
		fetchSalesData(id);
	};
	const fetchSalesData = (id) => {
		businessJobSuccess(id)
			.then((res) => {
				setJobPercentage(res?.data);
			})
			.catch((err) => {});
	};
	useEffect(() => {
		fetchLocalStorage();
	}, []);

	return (
		<div className="!overflow-hidden">
			<div className="flex lg:flex-nowrap flex-wrap md:basis-full sm:gap-10 px-5 justify-between">
				{cardsData.map((item, index) => {
					return (
						<Card
							key={index}
							heading={item.CardHead}
							number={item.CardNum}
							span={item.CardSpan}
							img={item.CardImg}
						/>
					);
				})}
			</div>
			<div className="flex lg:flex-nowrap flex-wrap py-4 gap-5 mx-5 justify-between">
				{areaData.map((item, index) => {
					return (
						<AreaGraph
							getSpinner={(e) => getSpinner(e)}
							key={index}
							heading={item.heading}
							img={item.img}
							para={item.para}
						/>
					);
				})}
				<BarGraph
					// getSpinner={(e) => getSpinner(e)}
					className="mr-10"
				></BarGraph>
			</div>
			<div className="flex lg:flex-nowrap flex-wrap py-4 gap-5 mx-5 justify-between">
				<div className=" table mx-0 lg:w-[49.5%] border-2 border-solid shadow-xl">
					<div className="whitespace-nowrap h-[23rem]  !overflow-scroll">
						<Table
						// getSpinner={(e) => getSpinner(e)}
						></Table>
					</div>
				</div>
				<div className="border-2 border-solid shadow-xl  py-6 sm:flex  lg:w-[49%] !w-full">
					<div className="">
						<div className="pl-10 ">
							<h2 className="text-xl font-semibold whitespace-nowrap">
								Hiring Success Rate
							</h2>
						</div>
						<div className="flex items-center gap-2 py-3 pl-10">
							<img src="/images/Rectangle 115.png" alt="" />
							<p className="text-base">
								Accepted:{jobPercentage.acceptedPercentage}
							</p>
						</div>
						<div className="flex items-center gap-2 pl-10">
							<img src="/images/Rectangle 116.png" alt="" />
							<p className="text-base">
								Rejected:{jobPercentage.rejectedPercentage}
							</p>
						</div>
					</div>
					<div>
						<PieDonutChart jobPercentageData={jobPercentage}></PieDonutChart>
					</div>
				</div>
			</div>
		</div>
	);
};
export default DashboardBusiness;
