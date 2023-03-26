import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {
	businessBarChart,
	employeeBarChart,
} from "../../services/auth-service";
import moment from "moment/moment";

// import { barGraph } from "../Path/Path";

// const CustomTooltip  = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{border:"1px solid black",background:"white",color:"black",padding:"10px"}} className="custom-tooltip">
//           <p className="label">{`${label}`}</p>

//           <p  className="desc">Users: {payload[0].value}</p>
//         </div>
//       );
//     }

//     return null;
//   };
// import CustomTooltipContent from "./CustomTooltipContent";

// const data1 = [
// 	{
// 		name: "01",
// 		pv: 800,
// 	},
// 	{
// 		name: "02",
// 		pv: 600,
// 	},
// 	{
// 		name: "03",
// 		pv: 400,
// 	},
// 	{
// 		name: "04",
// 		pv: 900,
// 	},
// 	{
// 		name: "05",
// 		pv: 700,
// 	},
// 	{
// 		name: "06",
// 		pv: 850,
// 	},
// 	{
// 		name: "07",
// 		pv: 500,
// 	},
// 	{
// 		name: "08",
// 		pv: 400,
// 	},
// 	{
// 		name: "09",
// 		pv: 650,
// 	},
// ];

const BarGraph = ({ getSpinner }) => {
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div
					style={{
						border: "1px solid black",
						background: "white",
						color: "black",
						padding: "10px",
					}}
					className="custom-tooltip"
				>
					<p className="label">{`${label}`}</p>

					<p className="desc">
						{userType === "business" ? "Applicant Users" : "Available Jobs"}:{" "}
						{payload[0].value}
					</p>
				</div>
			);
		}

		return null;
	};
	// useEffect(() => {
	//     getDataByWeek()
	// }, [])

	// const WEEK_FORMAT = "ddd";
	// const [data, setData] = useState([]);

	// const getDataByWeek = async () => {
	//     try {

	//         const barData = await barGraph();
	//         const barPercentage = barData.difference;
	//         const percentageToString = barPercentage.toString();
	//         const realPercentage = percentageToString.split(".")[0]
	//         console.log("realPercentage",realPercentage);
	//         getPercentageBar(realPercentage)

	//         const newData = Array(7).fill(moment()).reduce((acc, item, i) => {
	//             const name = moment().subtract(i, "days").format(WEEK_FORMAT);
	//             console.log('name: ', name);
	//             acc.push({
	//                 name: name,
	//                 users: barData.currentWeek.filter(i => moment(i.createdAt).format(WEEK_FORMAT) === name).length
	//             })
	//             return acc;
	//         }, [])
	//         setData(newData.reverse())
	//         console.log("data", barData);
	//     } catch (error) {
	//         alert(error.message)
	//     }
	// }
	const [data, setData] = useState([]);
	const [percent, setPercent] = useState("");
	const [userType, setUserType] = useState("");
	const WEEK_FORMAT = "ddd";
	const fetchLocalStorage = () => {
		// getSpinner(true)
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const type = userData?.type;
		// console.log(type,"userType")
		setUserType(type);
		const id = userData?._id;
		fetchBarChartData(id);
	};
	const fetchBarChartData = (id) => {
		if (userType === "business") {
			businessBarChart(id)
				.then((res) => {
					console.log(res);
					setPercent(res?.data?.difference);
					const newData = Array(7)
						.fill(moment())
						.reduce((acc, item, i) => {
							const name = moment().subtract(i, "days").format(WEEK_FORMAT);
							// console.log("name: ", name);
							acc.push({
								name: name,
								applicantUsers: res?.data.currentWeek.filter(
									(i) => moment(i.createdAt).format(WEEK_FORMAT) === name
								).length,
							});
							return acc;
						}, []);

					setData(newData.reverse());
					// getSpinner(false)
				})
				.catch((err) => {
					// getSpinner(false)
					// console.log(err, "err");
				});
		} else if (userType === "user") {
			employeeBarChart(id)
				.then((res) => {
					setPercent(res?.data?.difference);
					const newData = Array(7)
						.fill(moment())
						.reduce((acc, item, i) => {
							const name = moment().subtract(i, "days").format(WEEK_FORMAT);
							// console.log("name: ", name);
							acc.push({
								name: name,
								applicantUsers: res?.data.currentWeek.filter(
									(i) => moment(i.createdAt).format(WEEK_FORMAT) === name
								).length,
							});
							return acc;
						}, []);

					setData(newData.reverse());
					// getSpinner(false)
				})
				.catch((err) => {
					// getSpinner(false)
					// console.log(err, "err");
				});
		}

		// getSpinner(false)
	};
	useEffect(() => {
		fetchLocalStorage();
	}, [userType]);
	return (
		<div
			className="border-2 border-solid shadow-xl py-6 lg:w-[50%] w-full"
		>
			<div className="pl-10">
				<h2 className="text-lg font-semibold pb-2">
					{/* New Available Jobs */}
					{userType === "business" ? "New Applicants" : "New Available Jobs"}
				</h2>
				<div className="flex items-center gap-2 pb-6">
					<p className="text-green-300">{"+" + Math.ceil(percent) + "%"}</p>
					<p className="text-sm font-semibold text-[#67748E]">than last week</p>
				</div>
			</div>
			<div className=" lg:w-[100%] lg:h-[75%] h-[80%] lg:px-4 px-6">
				<ResponsiveContainer width="100%" height="100%">
					{/* <BarChart
						className="!bg-[#803434] rounded-xl"
						data={data}
						margin={{
							top: 30,
							right: 30,
							bottom: 20,
						}}
					>
						<CartesianGrid
							strokeDasharray="7 3"
							vertical={false}
							color="#803434"
						/>
						<XAxis
							dy={5}
							dataKey="name"
							tickLine={false}
							stroke="#fff"
							// tick={{fontSize :12}}
							axisLine={{ stroke: "" }}
							interval={0}
						/>
						<YAxis
							dy={5}
							tickLine={false}
							stroke="#fff"
							// tick={{fontSize :12}}
							axisLine={{ stroke: "" }}
							// tick={{fontSize :12}}
						/>
						<Tooltip
						// content={<CustomTooltip/>}
						// cursor={{ fill: "transparent" }}
						/>

						<Bar
							dataKey="pv"
							fill="#fff"
							barSize={10}
							radius={[10, 10, 0, 0]}
						/>
					</BarChart> */}
					<BarChart
						data={data}
						className="!bg-[#803434] rounded-xl"
						margin={{
							top: 30,
							right:30,
							left:30,
							bottom: 20,
						}}
					>
						<CartesianGrid
							strokeDasharray="7 3"
							vertical={false}
							color="#803434"
						/>
						<XAxis
							dy={5}
							dataKey="name"
							tickLine={false}
							stroke="#fff"
							// tick={{fontSize :12}}
							axisLine={{ stroke: "#D8D8D8" }}
							interval={0}
						/>
						<YAxis
							hide
							// tick={{fontSize :12}}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ fill: "transparent" }}
						/>

						<Bar
							dataKey="applicantUsers"
							fill="#fff"
							barSize={10}
							radius={[10, 10, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default BarGraph;
