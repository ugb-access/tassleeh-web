import { IoIosEye } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi2";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillDelete, AiOutlineCaretDown } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { jobEdit } from "../../services/auth-service";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Tbody = ({
	appliedAt,
	idNumb,
	userName,
	jobTitle,
	candidate,
	statusS,
	click,
	edit,
	index,
	_id,
	onLoading,
	getApplicant,
}) => {
	const router = useRouter();
	const [dropDown, setDropdown] = useState(null);
	// const [statusU, setStatusU] = useState("");
	// useEffect(() => {
	// 	if (statusS === "Accepted") {
	// 		setStatusU("Accepted");
	// 	} else if (statusS === "Pending") {
	// 		setStatusU("Pending");
	// 	} else {
	// 		setStatusU("Rejected");
	// 	}
	// 	// console.log(statusS, "status");
	// }, [statusU]);

	const handleDropDown = (id, status) => {
		setDropdown(id);
	};
	const updateUser = (status) => {
		setDropdown(null);
		onLoading(true);
		const data = {
			_id,
			status: status,
			onlyStatus: true,
		};

		jobEdit(data)
			.then((res) => {
				// console.log(res, "res");
				// toast.success(res.data.message)
				if (res?.data?.success) {
					toast.success(`Application ${status}`);
					getApplicant();
					onLoading(false);
				}
			})
			.catch((err) => {
				onLoading(false);
				// toast.success(err?.response?.data?.message)
			})
			.finally((res) => {
				onLoading(false);
			});
	};
	return (
		<>
			<tbody className="">
				<tr className="!gap-2 !text-center items-center">
					<td className="">{appliedAt}</td>

					<td className="">{jobTitle}</td>
					<td className="">{userName}</td>
					<td className=" !text-primary">
						<div className="flex items-center justify-start !text-center gap-2">
							<span>
								<img className="h-2.5" src="/images/diamond.png" alt="" />
							</span>
							{candidate}
						</div>
					</td>
					<td>
						{/* <p className="select0 w-[6rem]">{statusU}</p> */}
						<p
							className={`${
								statusS === "accepted"
									? "bg-[#82D616] bg-opacity-[10%] text-[#6F963D]"
									: "" || statusS === "pending"
									? "bg-[#FFEC42] bg-opacity-[20%] text-[#FBC919]"
									: "" || statusS === "rejected"
									? "bg-[#EA0606] bg-opacity-[10%] text-[#EA0606]"
									: ""
							}  py-0.5 flex items-center justify-center gap-2 text-sm rounded-lg  cursor-pointer capitalize`}
							onClick={() => handleDropDown(index)}
						>
							{statusS}
							<AiOutlineCaretDown className="text-gray-600 text-xs" />
						</p>
						{dropDown === index ? (
							<div className="relative">
								<div
									className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400 bg-opacity-10"
									onClick={() => setDropdown(null)}
								></div>
								<div className=" rounded bg-white !text-center fixed  right-24 md:w-20  lg:w-32 md:right-28  lg:right-40   border border-black border-opacity-60">
									{["Pending", "Accepted", "Rejected"]
										.filter((item) => item !== statusS)
										.map((item) => (
											<div
												className={`${
													item === "Accepted"
														? "bg-[#82D616] bg-opacity-[10%] text-[#6F963D]"
														: "" || item === "Pending"
														? "bg-[#FFEC42] bg-opacity-[20%] text-[#FBC919]"
														: "" || item === "Rejected"
														? "bg-[#EA0606] bg-opacity-[10%] text-[#EA0606]"
														: ""
												} hover:bg-slate-200 p-2 !z-50 items-center justify-center cursor-pointer`}
												onClick={() => updateUser(item)}
											>
												{item}
											</div>
										))}
								</div>
							</div>
						) : null}
					</td>
					<td>
						<div className="flex items-center justify-center">
							<IoIosEye
								onClick={() => click()}
								className="text-xl cursor-pointer"
							/>
							{/* <HiOutlinePencilAlt
								onClick={() => edit()}
								className="text-lg text-[#FFB21A]"
							/> */}
						</div>
					</td>
					<td className="!text-center">
						{" "}
						<a href={idNumb} target="_blank">
							{" "}
							<div className="flex items-center gap-2.5 justify-center">
								<HiDocumentText className="text-xl text-primary cursor-pointer" />
								{/* <HiOutlinePencilAlt
								onClick={() => edit()}
								className="text-lg text-[#FFB21A]"
							/> */}
							</div>
						</a>{" "}
					</td>
				</tr>
			</tbody>
		</>
	);
};

export default Tbody;
