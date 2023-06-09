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
import messages from "../pages/user-dashboard/messages";
const serviceLinks = [
	{
		barIink: "/provider-dashboard/dashboard",
		barIcon: <AiFillHome />,
		barText: "Home",
	},
	{
		barIink: "/provider-dashboard/bookings",
		barIcon: <SlCalender />,
		barText: "Bookings",
	},
	{
		barIink: "/provider-dashboard/messages",
		barIcon: <BiMessageAltDetail />,
		barText: "Messages",
	},
	{
		barIink: "/provider-dashboard/account-setting",
		barIcon: <AiOutlineSetting />,
		barText: "Settings",
	},
	{
		barIink: "/",
		barIcon: <BiLogOut />,
		barText: "Logout",
	},
];
const userLinks = [
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
		barIink: "/user-dashboard/account-setting",
		barIcon: <AiOutlineSetting />,
		barText: "Settings",
	},
	{
		barIink: "/",
		barIcon: <BiLogOut />,
		barText: "Logout",
	},
];
const StoreLayout = ({ children }) => {
	const router = useRouter();
	return (
		<div className="">
			{router.pathname.startsWith("/user-dashboard") ? (
				<div className="h-screen">
					<div className="">
						<DashboardHeader />
					</div>
					<div className="sm:flex flex heightCalc h-screen">
						<div className="">
							<Sidebar dashSideData={userLinks} />
						</div>
						<div className="basis-full bg-[#F5F5F5] flex sm:flex sm:flex-col max-h-[88vh] overflow-x-hidden sm:pr-0 lg:pr-0 heightCalc">
							<div
								className={`pt-2 px-5 sm:pt-5 ${
									router.asPath.includes("/messages") && "!px-5"
								}`}
							>
								{children}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{router.pathname.startsWith("/provider-dashboard") ? (
						<div className="h-screen">
							<div className="">
								<DashboardHeader />
							</div>
							<div className="sm:flex flex heightCalc h-screen">
								<div className="">
									<Sidebar dashSideData={serviceLinks} />
								</div>
								<div className="basis-full bg-[#F5F5F5] flex sm:flex sm:flex-col max-h-[88vh] overflow-x-hidden sm:pr-0 lg:pr-0 heightCalc">
									<div
										className={`pt-2 px-5 sm:pt-5 ${
											router.asPath.includes("/messages") && "!px-5"
										}`}
									>
										{children}
									</div>
								</div>
							</div>
						</div>
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
