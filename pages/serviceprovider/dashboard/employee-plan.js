import PlanCard from "../../../components/dashboard/startup-planCard";
import PremPlanCard from "../../../components/dashboard/premium-plan-card";
import CorpPlanCard from "../../../components/dashboard/corp-plan-card";
import React, { useEffect, useState } from "react";
import PaymentCard from "../../../components/dashboard/paymentCard";
import Header from "../../../layout/DashboardHeader";
import { getPlans } from "../../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
const Plan = () => {
	const [spinner, setSpinner] = useState(true);
	const [plansData, setPlansData] = useState([]);
	const [open, setOpen] = useState(false);
	const fetchPlans = () => {
		getPlans()
			.then((res) => {
				setPlansData(res?.data);
				setSpinner(false);
			})
			.catch((err) => {
				setSpinner(false);
				toast.error("Something went wrong");
			});
	};
	useEffect(() => {
		fetchPlans();
	}, []);
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl my-auto h-screen sm:right-60 items-center   relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<Header
				headerTitle={"Plans"}
				profileLink={"/employee/dashboard/profile"}
				headerDiscription={"Get details about our subscription plans."}
			/>
			<div>
				<div className=" pb-6 mx-4 shadow-2xl rounded-xl">
					<div className="fixed w-full">
						{open ? (
							<>
								<div
									className="h-full w-[200%] z-40 right-0 bottom-0 bg-[#1112174b] fixed"
									onClick={() => setOpen(false)}
								></div>
								<PaymentCard onclick={() => setOpen(false)}></PaymentCard>
							</>
						) : null}
					</div>
					<div className="pl-4 py-4 w-full">
						<h2 className="text-lg font-semibold">Plans</h2>
					</div>
					<div className="flex lg:flex-nowrap flex-wrap gap-6 justify-center lg:justify-between mx-7">
						<PlanCard plans={plansData} />
						<PremPlanCard plans={plansData} />
						<CorpPlanCard plans={plansData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Plan;
