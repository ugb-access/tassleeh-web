import React, { useEffect, useState } from "react";
import moment from "moment";
import {
	businessProfitChart,
	employeeProfitChart,
} from "../../services/auth-service";
import { RiArrowUpFill, RiArrowDownFill } from "react-icons/ri";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
// import { areaGraph } from "../../Path/Path";

// const data1 = [
// 	{
// 		name: "Apr",
// 		uv: 10,
// 		pv: 0,
// 	},
// 	{
// 		name: "May",
// 		uv: 200,
// 		pv: 100,
// 	},
// 	{
// 		name: "Jun",
// 		uv: 80,
// 		pv: 300,
// 	},
// 	{
// 		name: "Jul",
// 		uv: 278,
// 		pv: 390,
// 	},
// 	{
// 		name: "Aug",
// 		uv: 180,
// 		pv: 480,
// 	},
// 	{
// 		name: "Sep",
// 		uv: 230,
// 		pv: 300,
// 	},
// 	{
// 		name: "Oct",
// 		uv: 500,
// 		pv: 430,
// 	},
// 	{
// 		name: "Nov",
// 		uv: 390,
// 		pv: 476,
// 	},
// 	{
// 		name: "Dec",
// 		uv: 200,
// 		pv: 100,
// 	},
// ];

const AreaGraph = ({ heading, img, para, getSpinner }) => {
	useEffect(() => {
		// getDataByMonth()
	}, []);
	const time = "month";
	const MONTH_FORMAT = "MMM";
	const [data, setData] = useState("");
	const [diff, setDiff] = useState("");
	const fetchLocalStorage = () => {
		// getSpinner(true);
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const id = userData?._id;
		fetchSalesData(id);
	};
	const fetchSalesData = (id) => {
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const type = userData?.type;
		if (type === "business") {
			// busines type
			businessProfitChart(id)
				.then((res) => {
					let difference = res?.data?.difference;
					let diffToString = difference.toString();
					let finalDiff = diffToString.split(".")[0];
					setDiff(finalDiff);
					// console.log(res, "profit");
					const newData = Array(12)
						.fill(moment())
						.reduce((acc, item, i) => {
							const name = moment().subtract(i, "month").format(MONTH_FORMAT);
							// console.log("name: ", name);
							acc.push({
								name: name,
								Jobs: res?.data?.currentYear?.filter(
									(i) => moment(i?.createdAt).format(MONTH_FORMAT) === name
								).length,
							});
							return acc;
						}, []);
					setData(newData.reverse());
					// getSpinner(false);
				})
				.catch((err) => {
					// getSpinner(false);
					// console.log(err);
				});
		} else {
			// employee type
			employeeProfitChart(id)
				.then((res) => {
					let difference = res?.data?.difference;
					let diffToString = difference.toString();
					let finalDiff = diffToString.split(".")[0];
					setDiff(finalDiff);
					// console.log(res, "profit");
					const newData = Array(12)
						.fill(moment())
						.reduce((acc, item, i) => {
							const name = moment().subtract(i, "month").format(MONTH_FORMAT);
							// console.log("name: ", name);
							acc.push({
								name: name,
								Jobs: res?.data?.currentYear?.filter(
									(i) => moment(i?.createdAt).format(MONTH_FORMAT) === name
								).length,
							});
							return acc;
						}, []);
					setData(newData.reverse());
					// getSpinner(false);
				})
				.catch((err) => {
					// getSpinner(false);
					// console.log(err);
				});
		}

		// getSpinner(false);
	};
	useEffect(() => {
		fetchLocalStorage();
	}, []);
	return (
		<div className="border-2 border-solid shadow-xl py-6 lg:w-[50%] w-full">
			<div className="pl-10">
				<h2 className="text-lg font-semibold pb-2">{heading}</h2>
				<div className="flex items-center gap-2 pb-6">
					{/* <img src={img} alt="" /> */}
					<p className="text-sm font-semibold flex items-center text-[#67748E]">
						{diff?.includes("-") ? (
							<RiArrowDownFill style={{ color: "#004264" }} />
						) : (
							<RiArrowUpFill />
						)}
						{diff + "% " + para}
					</p>
				</div>
			</div>
			<div className="w-[100%] h-[20rem] lg:px-4 px-2">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={data}
						margin={{
							top: 10,
							right: 20,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="7 3" vertical={false} />
						<XAxis
							dataKey={"name"}
							tickLine={false}
							dy={6}
							// tick={{fontSize :12}}
							interval={0}
						/>
						<YAxis hide />
						<Tooltip />
						{/* <Area
              type="monotone"
              dataKey="uv"
              stroke="#004264"
              fill="#EAF7FC"
            /> */}
						<Area
							type="monotone"
							dataKey="Jobs"
							stroke="#D46359"
							fill="#E5EDF1"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default AreaGraph;
