import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import DashboardHeader from "./DashboardHeader";
import DashboardFooterSecond from "./DashboardFooterSecond";
import Sidebar from "./DashboradSidebar";
import { AiFillHome, AiOutlineSetting } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { BiMessageAltDetail, BiLogOut } from "react-icons/bi";
// import { AiFillHome } from "react-icons/ai";
import {
	HiCreditCard,
	HiDocumentAdd,
	HiOutlineChevronDoubleLeft,
} from "react-icons/hi";
import { GoBriefcase } from "react-icons/go";
import AuthWrapper from "../hoc/authWrapper";
import WithAuthWrapper from "../hoc/withAuthWrapper";
const serviceLinks = [
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
const userLink = [
	{
		barIink: "/user-dashboard/dashboard",
		barIcon: <AiFillHome />,
		barText: "Home",
	},
	{
		barIink: "/user-dashboard/bookings",
		barIcon: <SlCalender />,
		barText: "Bookings",
	},
	{
		barIink: "/user-dashboard/messages",
		barIcon: <BiMessageAltDetail />,
		barText: "Messages",
	},
	{
		barIink: "/user/dashboard/job-applicants",
		barIcon: <AiOutlineSetting />,
		barText: "Settings",
	},
	{
		barIink: "/user/dashboard/business-plan",
		barIcon: <BiLogOut />,
		barText: "Logout",
	},
];
const StoreLayout = ({ children }) => {
	const router = useRouter();
	// console.log(router)
	return (
		<div>
			{router.pathname.startsWith("/user-dashboard") ? (
				//<AuthWrapper>//<AuthWrapper>
				<div className="">
					<div className="">
						<DashboardHeader />
					</div>
					<div className="sm:flex">
						<div className="">
							<Sidebar dashSideData={userLink} />
						</div>
						<div className="basis-full bg-[#F5F5F5] sm:flex sm:flex-col min-h-screen sm:pr-4 lg:pr-0">
							<div className="pt-2 px-10 sm:py-10">{children}</div>
							{/* <div id="containerfooter" className=" mt-auto">
								<DashboardFooterSecond />
							</div> */}
						</div>
					</div>
				</div>
			) : (
				//</AuthWrapper>
				<>
					{router.pathname.startsWith("/employee/dashboard") ? (
						// <AuthWrapper>
						<div className="sm:flex">
							<div>
								<Sidebar dashSideData={serviceLinks} />
							</div>
							<div className="sm:pr-4 sm:flex sm:flex-col min-h-screen lg:pr-0 basis-full">
								{/* <DashboardHeader /> */}
								<div className="pt-2 sm:pt-0">{children}</div>
								<div id="containerfooter" className="mt-auto">
									{/* <DashboardFooterSecond /> */}
								</div>
							</div>
						</div>
					) : (
						// {/* </AuthWrapper> */}
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
