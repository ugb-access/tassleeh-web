import moment from "moment";
import React from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const EyeCard = ({ onClickButton, curUser }) => {
	return (
		<>
			<div
				className="z-50 pb-3 w-[400px] sm:w-[600px]  h-[500px] overflow-scroll rounded-xl  m-auto sm:right-60 bottom-5 relative bg-[#FFFFFF]"
				style={{
					boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
				}}
			>
				<div className="flex justify-between px-3 py-1">
					<h2 className="text-[#272B41] font-bold text-lg">Applicants Details</h2>
					<img
						onClick={onClickButton}
						className="cursor-pointer h-6"
						src="/images/cross.png"
						alt="delete"
					/>
				</div>
				<hr className="pb-" />
				<div className="ml-3 py-2">
					<h2 className="text-md font-semibold">Applicants User</h2>
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
							value={"£"+curUser?.jobId?.minSalaryRange+"-"+"£"+curUser?.jobId?.minSalaryRange}
							customClass="h-8 cursor-not-allowed"
							// placeholder="00001"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center">
					<div className="basis-full">
						<label>Job Description</label>
						<TextInput
							customClass="!h-8 cursor-not-allowed truncate"
							value={curUser?.jobId?.jobDescription}
							// placeholder="09:43 pm, 25/04/2022"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center">
					<div className="basis-full">
						<label>Applied At</label>
						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={
								moment(curUser?.createdAt).format("HH:mm A") +
								", " +
								moment(curUser?.createdAt).format("DD/MM/YYYY")
							}
							// placeholder="09:43 pm, 25/04/2022"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Updated At</label>
						<TextInput
							value={
								moment(curUser?.updatedAt).format("HH:mm A") +
								", " +
								moment(curUser?.updatedAt).format("DD/MM/YYYY")
							}
							customClass="h-8 cursor-not-allowed"
							// placeholder="00001"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label className="">Email</label>

						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.applicantUser?.email}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Name</label>
						<TextInput
							value={curUser?.applicantUser?.userName}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label className="">Lat</label>

						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.applicantUser?.lat}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Lng</label>
						<TextInput
							value={curUser?.applicantUser?.long}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label className="">Phone Number</label>

						<TextInput
							customClass="!h-8 cursor-not-allowed"
							value={curUser?.applicantUser?.phone}
							// placeholder="John Doe"
							readOnly="readonly"
						/>
					</div>
					<div className="basis-full">
						<label>Id</label>
						<TextInput
							value={curUser?.applicantUser?._id}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
							// placeholder="Candidate Name"
							readOnly="readonly"
						/>
					</div>
				</div>
				{/* jobowner details */}
				<hr className="pb-" />
				<div className="ml-3 py-2">
					<h2 className="text-md font-semibold">Job Owner</h2>
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
							value={"£"+curUser?.jobId?.minSalaryRange+"-"+"£"+curUser?.jobId?.minSalaryRange}
							customClass="h-8 cursor-not-allowed"
							// placeholder="00001"
							readOnly="readonly"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center">
					<div className="basis-full">
						<label>Job Description</label>
						<TextInput
							customClass="!h-8 cursor-not-allowed truncate"
							value={curUser?.jobId?.jobDescription}
							// placeholder="09:43 pm, 25/04/2022"
							readOnly="readonly"
						/>
					</div>
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
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label>Business Manager Name</label>
						<TextInput
							value={curUser?.jobOwner?.businessManagerName}
							customClass="!h-8 placeholder:text-primary cursor-not-allowed"
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
				<div className="flex gap-3 justify-end px-4 ">
					<Button
						onClick={onClickButton}
						text="cancel"
						customClass="!text-primary border-2 border-solid border-primary bg-white rounded-md text-sm font-semibold text-white w-[90px] !h-10"
					/>
				</div>
			</div>
		</>
	);
};

export default EyeCard;
