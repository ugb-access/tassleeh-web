import React from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const EditCard = ({ onClickButton }) => {
	return (
		<> 
			<div 
				className="z-50 pb-3 w-[400px] sm:w-[600px] rounded-xl  m-auto sm:right-60 relative bg-[#FFFFFF] "
				style={{
					boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
				}}
			>
				<div className="flex justify-between px-3 py-2">
					<h2 className="text-[#272B41] font-bold text-lg">Edit Details</h2>
					<img
						onClick={onClickButton}
						className="cursor-pointer h-6"
						src="/images/cross.png"
						alt="delete"
					/>
				</div>
				<hr className="pb-3" />
				<div className="ml-3 pb-2 pt-5">
					<h2 className="text-md font-semibold">Job Applicants</h2>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center pt-3">
					<div className="basis-full">
						<label>Applied At</label>
						<TextInput customClass="!h-8" placeholder="09:43 pm, 25/04/2022"/>
					</div>
					<div className="basis-full">
						<label>Id</label>
						<TextInput
							customClass="h-8"
							placeholder="00001"
						/>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center ">
					<div className="basis-full">
						<label className="">Job Title</label>

						<TextInput customClass="!h-8" placeholder="John Doe"/>
					</div>
					<div className="basis-full">
						<label>Name</label>
						<TextInput customClass="!h-8 placeholder:text-primary" placeholder="Candidate Name" />
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center pt-3">

				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-5 mx-4 items-center pt-3">
					<div className="basis-full ">
						<label>Status</label>
						<TextInput customClass="h-8" placeholder="Pending" required />
					</div>
					<div className="flex basis-full gap-5">
						<div className="basis-full">
							<label>Action</label>
							<TextInput customClass="h-8" placeholder="Not Performed Yet" required />
						</div>
					</div>
				</div>
				<div className="flex sm:flex-nowrap flex-wrap gap-3 justify-end px-4 pt-3">
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

export default EditCard;
