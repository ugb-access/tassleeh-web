import PostJobForm from "../../../components/dashboard/post-job-form";
import Header from "../../../layout/DashboardHeader";

const PostJobs = () => {
	return (
		<>
		<Header profileLink={"/employee/dashboard/profile"} headerDiscription={"Post job so that talented individuals all across the globe can apply."} headerTitle={"Post Jobs"} />
			<div className="border w-[97%] m-auto rounded-md shadow-md pb-0  ">
				<div>
					<h5 className="py-5 mx-5 font-semibold text-xl text-[#110229]">
						Post Jobs
					</h5>
					<div className="mx-8">
						<PostJobForm></PostJobForm>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostJobs;
