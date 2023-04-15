import React from "react";
import MiniHeader from "../../../components/dashboard/mini-header";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import swal from "sweetalert";

const CreateRequest = () => {
	const handleSubmit = () => {
		sweetAlert({
			title: "Request Submitted",
			text: "You will get notify when any mechanic accept your request",
			icon: "success",
			buttons: "Okay",
			content: "center",
		});
	};
	return (
		<div>
			<div className="flex">
				<MiniHeader headerText={"Create Request"} showIcon />
			</div>
			<div className="bg-white p-3 md:p-6 rounded-lg">
				<div className="lg:w-[60%]">
					<div className="">
						<TextInput
							customClass={"border-1 rounded-lg !h-10"}
							placeholder={"Work Category"}
							labelText={"Work Category"}
							labelStyle={"text-base font-semibold"}
						/>
					</div>
					<div>
						<TextInput
							customClass={"border-1 rounded-lg !h-10"}
							placeholder={"Amount"}
							labelText={"Amount"}
							labelStyle={"text-base font-semibold"}
						/>
					</div>
					{/* upload-cloud */}
					<div>
						<div className="text-base font-semibold mb-1">Description</div>
						<textarea
							className={"border p-1 px-2 w-full rounded-lg !h-28"}
							placeholder={"Work Category"}
						/>
					</div>
					<div className="img-featured ">
						<h2 className=" mt-4 mb-1 text-base font-semibold">
							Upload Images
						</h2>
						<div className="border-dashed border rounded-lg ">
							<div className="flex flex-col justify-center items-center py-8">
								<div className="pb-2">
									<img
										className="h-[50px]"
										src={"/images/upload-cloud.png"}
										alt=""
									/>
								</div>
								<button className="relative border border-solid rounded-2xl cursor-pointer p-1 px-7 h-12 mt-3 border-primary ">
									<p className="text-primary cursor-pointer text-sm font-semibold  ">
										Upload
									</p>
									<input
										accept="/image/*"
										className="absolute  opacity-0 right-0 left-0 top-0 bottom-0 cursor-pointer"
										type="file"
									/>
								</button>
							</div>
						</div>
					</div>
					<div className="mt-5">
						<TextInput
							type={"date"}
							customClass={"border-1 rounded-lg !h-10"}
							placeholder={"Choose Date and Time"}
							labelText={"Choose Date and Time"}
							labelStyle={"text-base font-semibold"}
						/>
					</div>
					<div>
						<div className="text-base font-semibold mb-1">Address</div>
						<textarea
							className={"border p-1 px-2 w-full rounded-lg !h-28"}
							placeholder={"Address"}
						/>
					</div>
					<div className="flex justify-center mt-5">
						<Button
							onClick={handleSubmit}
							text={"Submit"}
							customClass={
								"bg-primary rounded-2xl px-5  text-sm font-semibold text-white !w-fit !h-12"
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateRequest;
