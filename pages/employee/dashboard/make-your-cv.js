import MakeCv from "../../../components/dashboard/makeCv";
import Header from "../../../layout/DashboardHeader";

const MakeYourCv = () => {
	return (
		<div>
			<Header
				profileLink={"/employee/dashboard/profile"}
				headerTitle={"Make Your CV"}
				headerDiscription={"Build your CV and apply on jobs."}
			/>
			<MakeCv></MakeCv>
		</div>
	);
};
export default MakeYourCv;
