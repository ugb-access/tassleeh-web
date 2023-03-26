import moment from "moment";
import React from "react";
import Button from "../Button";
import TextInput from "../TextInput";

const EmployeeEyeCard = ({ onClickButton, curUser }) => {
	return (
		<>
			<div
				className="z-50 pb-3 w-[400px] sm:w-[600px]  h-[450px] overflow-scroll rounded-xl  m-auto sm:right-60 bottom-5 relative bg-[#FFFFFF]"
				style={{
					boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
				}}
			>
				<div className="flex justify-between px-3 py-1">
					<h2 className="text-[#272B41] font-bold text-lg">Applied Details</h2>
					<img
						onClick={onClickButton}
						className="cursor-pointer h-6"
						src="/images/cross.png"
						alt="delete"
					/>
				</div>
				{/* jobowner details */}

				<hr className="pb-" />

				<div className="ml-3 py-2">
					<h2 className="text-md font-semibold">Job Owner</h2>
				</div>

				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center">
					<div className="basis-full">
						<label>Created At</label>
						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={
								moment(curUser?.jobOwner?.createdAt).format("HH:mm A") +
								", " +
								moment(curUser?.jobOwner?.createdAt).format("DD/MM/YYYY")
							}
							// placeholder="09:43 pm, 25/04/2022"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Updated At</label>
						<TextInput
							value={
								moment(curUser?.jobOwner?.updatedAt).format("HH:mm A") +
								", " +
								moment(curUser?.jobOwner?.updatedAt).format("DD/MM/YYYY")
							}
							customClass="h-8 cursor-not-allowed"
							// placeholder="00001"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center">
					<div className="basis-full">
						<label>Job Tittle</label>
						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.jobId?.jobTitle}
							// placeholder="09:43 pm, 25/04/2022"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Salary Range</label>
						<TextInput
							value={
								"£" +
								curUser?.jobId?.minSalaryRange +
								"-" +
								"£" +
								curUser?.jobId?.minSalaryRange
							}
							customClass="h-8 cursor-not-allowed"
							// placeholder="00001"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center">
					<div className="basis-full">
						<label>Job Description</label>
						<textarea
							className="bg-gray-50 border h-[100px] border-gray-100 text-gray-900 text-sm placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 !mb-5 outline-none"
							value={curUser?.jobId?.jobDescription}
							// placeholder="09:43 pm, 25/04/2022"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label>Business Manager Name</label>
						<TextInput
							value={curUser?.jobOwner?.businessManagerName}
							customClass="!h-8  "
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label className="">Business Email</label>

						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.jobOwner?.businessEmail}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label>Address</label>
						<TextInput
							value={curUser?.jobOwner?.address}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label className="">Business Type</label>

						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.jobOwner?.businessType}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label className="">independentOrFranchise</label>

						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.jobOwner?.independentOrFranchise}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Business Mobile Number</label>
						<TextInput
							value={curUser?.jobOwner?.businessMobileNumber}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label className="">Business Telephone Number</label>
						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.jobOwner?.businessTelephoneNumber}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Business Area</label>
						<TextInput
							value={curUser?.jobOwner?.businessArea}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex gap-3 justify-end md:px-3 ">
					<Button
						onClick={onClickButton}
						text="cancel"
						customClass="!text-primary border-2 border-solid border-primary bg-white rounded-md text-sm font-semibold text-white w-[90px] mx-auto md:mx-0 !h-10"
					/>
				</div>
			</div>
		</>
	);
};

export default EmployeeEyeCard;
