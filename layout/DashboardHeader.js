import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HiBell, HiMenu } from "react-icons/hi";
import { HiOutlineUser, HiOutlineLogin } from "react-icons/hi";

// import { HiSearch } from "react-icons/hi";
const Header = ({
	profileLink,
	searchPlaceHolder,
	searchValue,
	onChangeSearch,
	headerTitle,
	headerDiscription,
	accountTitle,
	accountImage,
}) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	let path = router.asPath;
	if (path.includes("employee/dashboard")) {
		profileLink = "/employee/dashboard/profile";
	} else if (path.includes("business/dashboard")) {
		profileLink = "/business/dashboard/business-profile";
	}
	// let title = "Dashboard";
	// let description =
	// 	"Get details about total spent, total jobs, and your subscribed plans.";
	// if (path.includes("applied-jobs")) {
	// 	title = "Applied Jobs";
	// 	description = "Get details about the applied jobs.";
	// } else if (path.includes("business-plan")) {
	// 	title = "Plans";
	// 	description = "Get details about our subscription plans.";
	// } else if (path.includes("employee-plan")) {
	// 	title = "Plans";
	// 	description = "Get details about our subscription plans.";
	// } else if (path.includes("profile")) {
	// 	title = "Profile";
	// 	description = "Get details about your profile.";
	// } else if (path.includes("payment-history")) {
	// 	title = "Payment History";
	// 	description = "Get details about your payment history.";
	// } else if (path.includes("make-your-cv")) {
	// 	title = "Make Your CV";
	// 	description = "Build your CV and apply on jobs.";
	// } else if (path.includes("my-jobs")) {
	// 	title = "My Jobs";
	// 	description = "Get details about all posted jobs and applicants.";
	// } else if (path.includes("post-jobs")) {
	// 	title = "Post Jobs";
	// 	description =
	// 		"Post job so that talented individuals all across the globe can apply.";
	// } else if (path.includes("post-jobs")) {
	// 	title = "Post Jobs";
	// 	description =
	// 		"Post job so that talented individuals all across the globe can apply.";
	// } else if (path.includes("edit-my-job")) {
	// 	title = "Edit Job";
	// 	description =
	// 		"Post job so that talented individuals all across the globe can apply.";
	// }
	const userLogOut = () => {
		localStorage.removeItem("user");
		router.push("/");
	};
	const [proImage, setProImage] = useState("");
	const [firstName, setFirstName] = useState("");
	const [typeUser, setTypeUser] = useState();
	useEffect(() => {
		const gettingToken = localStorage.getItem("user");
		const UserType = JSON.parse(gettingToken);
		const type = UserType?.type;
		// console.log(UserType.businessImage, "hasham");
		if (type === "business") {
			setProImage(
				UserType?.businessImage
					? UserType?.businessImage
					: "/images/proDummy.png"
			);
		} else {
			setProImage(UserType?.image ? UserType?.image : "/images/proDummy.png");
		}
		setFirstName(UserType?.fullName);
		setTypeUser(UserType?.type);
	}, []);
	return (
		<div className="">
			<div className="flex justify-between items-center pr-20 pl-10 header0">
				<div>
					<img src="/images/logo-main.png" alt="" />
				</div>
				<div>
					<div className="flex items-center gap-20">
						<div className="flex items-center border px-3 py-1.5 rounded-2xl">
							<input
								className="placeholder:text-sm"
								type=""
								placeholder="Search here"
							/>
							<img className="h-5" src="/images/search.png" alt="" />
						</div>
						<div
							onClick={() => setOpen(!open)}
							style={{ cursor: "pointer" }}
							className="profile relative"
						>
							<div className="">
								<img src={accountImage ? accountImage : proImage} />
							</div>
							{/* <div
						style={{ cursor: "pointer" }}
						className="profile-text hidden md:block"
					>
						<p className="person-name">
							{accountTitle ? accountTitle : firstName}
						</p>
						<p className="person-admin capitalize">
							{typeUser === "user" ? "Employee" : "Business"} Account
						</p>
					</div> */}
							{open ? (
								<div>
									<div className="absolute sm:top-[60px] top-[34px] sm:right-[-70px] left-[30px] w-32 pt-2 pb-4 pl-2 shadow-lg z-50 bg-[#fff]">
										<Link href={profileLink}>
											<div className="flex items-center">
												<div className="side-bar-icon-sel !text-primary">
													<HiOutlineUser />
												</div>
												<p className="font-semibold ml-2 text-sm !text-primary">
													Profile
												</p>
											</div>
										</Link>
										<hr className="mt-3 pb-2 " />
										<div
											onClick={userLogOut}
											className="flex  items-center mt-2"
										>
											<div className="text-primary text-xl sm:pl-1">
												<HiOutlineLogin />
											</div>
											<p className="font-semibold ml-2 text-sm !text-primary">
												Logout
											</p>
										</div>
									</div>
									<div
										onClick={() => setOpen(false)}
										className="fixed w-full h-full top-0 left-0 z-30 "
									></div>
								</div>
							) : null}
							<div className="pl-4">
								<p className="text-[#404040]">Andrew</p>
								<p className="text-sm text-[#aeaeae]">Normal User</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="header-top flex sm:block items-center">
					<HiMenu onClick={setAsideBar} className="sm:hidden block"/>
					<h2 className="heading ">{headerTitle}</h2>
					<p className="header-para sm:block hidden">{headerDiscription}</p>
				</div> */}
			{/* <div className="sm:flex items-center ml-auto mr-2 md:pr-6 hidden ">
					{!(headerTitle === "Dashboard") &&
						!(headerTitle === "Post Jobs") &&
						!(headerTitle === "Make Your CV") &&
						!(headerTitle === "Profile") &&
						!(headerTitle === "Plans") &&
						!(headerTitle === "Business profile") && (
							<div className="flex items-center w-full border rounded-full">
								<div className="md:pl-3 pointer-events-none">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clipRule="evenodd"
										></path>
									</svg>
								</div>
								<input
									value={searchValue}
									onChange={(e) => onChangeSearch(e.target.value)}
									className="h-[2rem] text-gray-900 text-sm rounded-2xl block placeholder:text-xs pl-2 md:w-40 "
									placeholder={searchPlaceHolder}
								/>
							</div>
						)}
				</div> */}

			{/* <div
					onClick={() => setOpen(!open)}
					style={{ cursor: "pointer" }}
					className="profile relative"
				>
					<div className="">
						<img src={accountImage ? accountImage : proImage} />
					</div>
					<div
						style={{ cursor: "pointer" }}
						className="profile-text hidden md:block"
					>
						<p className="person-name">
							{accountTitle ? accountTitle : firstName}
						</p>
						<p className="person-admin capitalize">
							{typeUser === "user" ? "Employee" : "Business"} Account
						</p>
					</div>
					{open ? (
						<div>
							<div className="absolute sm:top-[60px] top-[34px] sm:right-0 right-[-6px] w-32 pt-2 pb-4 pl-2 shadow-lg z-50 bg-[#fff]">
								<Link href={profileLink}>
									<div className="flex items-center">
										<div className="side-bar-icon-sel !text-primary">
											<HiOutlineUser />
										</div>
										<p className="font-semibold ml-2 text-sm !text-primary">
											Profile
										</p>
									</div>
								</Link>
								<hr className="mt-3 pb-2 " />
								<div onClick={userLogOut} className="flex  items-center mt-2">
									<div className="text-primary text-xl sm:pl-1">
										<HiOutlineLogin />
									</div>
									<p className="font-semibold ml-2 text-sm !text-primary">
										Logout
									</p>
								</div>
							</div>
							<div
								onClick={() => setOpen(false)}
								className="fixed w-full h-full top-0 left-0 z-30 "
							></div>
						</div>
					) : null}
				</div> */}
		</div>
	);
};
export default Header;
