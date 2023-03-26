import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#BDBDBD", "#82D616", "#CA0928"];

const PieDonutChart = ({ jobPercentageData }) => {
	// const [resolved, setResolved] = useState("");
	// const [unResolved, setUnResolved] = useState("");
	// useEffect(() => {
	// PieDonutChart()
	// }, []);
	// const PieDonutChart = async () => {
	//     const data = await getPie();
	//     const resolved = data.filter((i) => i?.resolved).length
	//     console.log('resolved: ', resolved);
	//     const unresolved = data.filter(i => !i?.resolved).length
	//     setResolved(resolved)
	//     setUnResolved(unresolved)
	// }
	const [userType, setUserType] = useState("");
	const fetchJobs = () => {
		const users = localStorage.getItem("user");
		const userData = JSON.parse(users);
		const type = userData?.type;
		setUserType(type);
	};

	const data = [
		{
			name: "pending",
			value:
				!jobPercentageData?.acceptedPercentage &&
				!jobPercentageData?.rejectedPercentage
					? 100
					: 0,
		},
		{ name: "Accepted", value: jobPercentageData?.acceptedPercentage },
		{ name: "Rejected", value: jobPercentageData?.rejectedPercentage },
	];
	// console.log(jobPercentageData,"jkdajdskjdaksd ")
	useEffect(() => {
		fetchJobs();
	}, []);
	return (
		<div className="w-[22rem] h-[20rem] sm:mx-0 mx-auto ">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Tooltip />
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						// label={{ fontSize: "16px", color: "#000" }}
						labelLine={false}
						outerRadius={120}
						innerRadius={110}
						fill="#8884d8"
						paddingAngle={2}
						// dataKey={"value"}
						startAngle={180}
						endAngle={-180}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PieDonutChart;
