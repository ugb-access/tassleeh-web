import EditJobForm from "../../../components/dashboard/edit-job";

const EditMyJobs = () => {
	return (
		<>
			<div className="border w-[97%] m-auto rounded-md shadow-md pb-0  ">
				<div>
					<h5 className="py-5 mx-5 font-semibold text-xl text-[#110229]">
						Edit Jobs
					</h5>
					<div className="mx-8">
						<EditJobForm></EditJobForm>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditMyJobs;
