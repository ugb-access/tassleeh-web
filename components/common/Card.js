import Button from "../Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment/moment";

const Card = ({ onclick, item }) => {
	const [userData, setUserData] = useState(null);
	const fetchLocalSt = () => {
		let stData = localStorage.getItem("user");
		let user = JSON.parse(stData);
		setUserData(user);
	};
	useEffect(() => {
		fetchLocalSt();
	}, []);
	return (
		<div>
			<div
				className=" sm:w-[600px] py-7"
				style={{
					boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.1)",
				}}
			>
				<div className="flex px-7 py-4 ">
					<div className="px-4">
						<div className="w-8">
							<img className="w-32 mt-[2px]" src={item?.image} alt="asd" />
						</div>
					</div>

					<div className="">
						<div className="flex justify-between">
							<h3 className="text-[#3A3A3A] text-lg font-semibold mb-4">
								{item?.jobTitle}
							</h3>
						</div>
						<p className="text-[#3A3A3A] text-sm font-normal blog-para leading-6 ">
							{item?.jobDescription}
						</p>
						<p className="text-[#A5A7AC] text-base font-normal py-3">
							Salary Range:
							<span className="mx-2 text-primary">
								{"£" +
									item?.minSalaryRange +
									" - " +
									"£" +
									item?.maxSalaryRange}
							</span>
						</p>
						<span className="text-[#A5A7AC]">
							Posted Date: {moment(item?.createdAt).format("DD/MM/YYYY")}
						</span>
					</div>
					{item?.isFeatured ? (
						<div className="mt-1 flex gap-3  mx-2 ml-auto">
							<div>
								<img src="/images/Group (8).png" alt="" />
							</div>
							<p className="text-sm">Featured</p>
						</div>
					) : null}
				</div>
				{/* <Link href={"/employee/apply-form"}> */}
				{userData?.type === "business" ? null : (
					<div className="flex justify-center mb-10">
						<Button
							onClick={onclick}
							text="Apply for Job"
							customClass="mt-[12px] bg-primary rounded-md py-2 text-sm md:text-lg font-semibold whitespace-nowrap  text-white w-[130px] !h-[40px]"
						/>
					</div>
				)}
				{/* </Link> */}
			</div>
		</div>
	);
};

export default Card;
