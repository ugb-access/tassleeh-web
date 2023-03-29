import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import DashboardHeader from "./DashboardHeader";
import DashboardFooterSecond from "./DashboardFooterSecond";
import Sidebar from "./DashboradSidebar";
import { AiFillHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
// import { AiFillHome } from "react-icons/ai";
import {
	HiCreditCard,
	HiDocumentAdd,
	HiOutlineChevronDoubleLeft,
} from "react-icons/hi";
import { GoBriefcase } from "react-icons/go";
import AuthWrapper from "../hoc/authWrapper";
import WithAuthWrapper from "../hoc/withAuthWrapper";
const employeedata = [
	{
		barIink: "/employee/dashboard",
		barIcon: <AiFillHome />,
		barText: "Dashboard",
	},
	{
		barIink: "/employee/dashboard/applied-jobs",
		barIcon: <GoBriefcase />,
		barText: "Applied Jobs",
	},
	{
		barIink: "/employee/dashboard/employee-plan",
		barIcon: <HiCreditCard />,
		barText: "Plans",
	},
	{
		barIink: "/employee/dashboard/payment-history",
		barIcon: <FaHistory />,
		barText: "Payment History",
	},
	{
		barIink: "/employee/dashboard/make-your-cv",
		barIcon: <HiDocumentAdd />,
		barText: "Build CV",
	},
	{
		barIink: "/",
		barIcon: <HiOutlineChevronDoubleLeft />,
		barText: "Back To Site",
	},
];
const businessdata = [
	{
		barIink: "/business/dashboard",
		barIcon: <AiFillHome />,
		barText: "Home",
	},
	{
		barIink: "/business/dashboard/post-jobs",
		barIcon: <GoBriefcase />,
		barText: "Bookings",
	},
	{
		barIink: "/business/dashboard/my-jobs",
		barIcon: <HiCreditCard />,
		barText: "My Jobs",
	},
	{
		barIink: "/business/dashboard/job-applicants",
		barIcon: <HiCreditCard />,
		barText: "Jobs Applicants",
	},
	{
		barIink: "/business/dashboard/business-plan",
		barIcon: <FaHistory />,
		barText: "Plans",
	},
	{
		barIink: "/business/dashboard/payment-history",
		barIcon: <HiDocumentAdd />,
		barText: "Payment History",
	},
	{
		barIink: "/",
		barIcon: <HiOutlineChevronDoubleLeft />,
		barText: "Back To Site",
	},
];
const StoreLayout = ({ children }) => {
	const router = useRouter();
	// console.log(router)
	return (
		<div>
			{router.pathname.startsWith("/business/dashboard") ? (
				//<AuthWrapper>//
					<div className="sm:flex">
						<div>
							<Sidebar dashSideData={businessdata} />
						</div>
						<div className="basis-full sm:flex sm:flex-col min-h-screen sm:pr-4 lg:pr-0">
							{/* <DashboardHeader /> */}
							<div className="pt-2 sm:pt-0">{children}</div>
							<div id="containerfooter" className=" mt-auto">
								<DashboardFooterSecond />
							</div>
						</div>
					</div>
				//</AuthWrapper>
			) : (
				<>
					{router.pathname.startsWith("/employee/dashboard") ? (
						// <AuthWrapper>
							<div className="sm:flex">
								<div>
									<Sidebar dashSideData={employeedata} />
								</div>
								<div className="sm:pr-4 sm:flex sm:flex-col min-h-screen lg:pr-0 basis-full">
									{/* <DashboardHeader /> */}
									<div className="pt-2 sm:pt-0">{children}</div>
									<div id="containerfooter" className="mt-auto">
										<DashboardFooterSecond />
									</div>
								</div>
							</div>
						// {/* </AuthWrapper> */}
					) : (
						<WithAuthWrapper>
							{!(
								router.pathname.startsWith("/signin") ||
								router.pathname.startsWith("/signup") ||
								router.pathname.startsWith("/forgotpassword") ||
								router.pathname.startsWith("/verifyemail") ||
								router.pathname.startsWith("/reset-password") ||
								router.pathname.startsWith("/newpassword") 
							) ? (
								<Header />
							) : null}
							{children}
							{!(
								router.pathname.startsWith("/signin") ||
								router.pathname.startsWith("/signup") ||
								router.pathname.startsWith("/forgotpassword") ||
								router.pathname.startsWith("/verifyemail") ||
								router.pathname.startsWith("/reset-password") ||
								router.pathname.startsWith("/newpassword") 
							) ? (
								<Footer />
							) : null}
						</WithAuthWrapper>
					)}
				</>
			)}
		</div>
	);
};
export default StoreLayout;
