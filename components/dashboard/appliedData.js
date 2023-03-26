import { IoIosEye } from "react-icons/io";

const Tbody = ({
	dateTime,
	idNumb,
	jobTitle,
	businessName,
	statusU,
	click,
}) => {
	return (
		<>
			<tbody className="">
				<tr className="!gap-2 !text-center">
					<td>{dateTime}</td>
					<td>{idNumb}</td>
					<td>{jobTitle}</td>
					<td>{businessName}</td>
					<td>
						<p
							className={`capitalize text-center ${
								statusU === "accepted"
									? "bg-[#82D616] bg-opacity-[10%] text-[#6F963D]"
									: "" || statusU === "pending"
									? "bg-[#FFEC42] bg-opacity-[20%] text-[#FBC919]"
									: "" || statusU === "rejected"
									? "bg-[#EA0606] bg-opacity-[10%] text-[#EA0606]"
									: ""
							}`}
						>
							{statusU}
						</p>
					</td>
					<td>
						<IoIosEye onClick={() => click()} className="m-auto text-lg " />
						{/* <IoIosEye className="text-xl ml-4"/> */}
					</td>
				</tr>
			</tbody>
		</>
	);
};

export default Tbody;
