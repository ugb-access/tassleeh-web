import Link from "next/link";
import Button from "../components/Button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import TextInput from "../components/TextInput";
import { HiMenu } from "react-icons/hi";

const Header = () => {
	const [validToken, setValidtoken] = useState(null);
	const fetchLocalSt = () => {
		const gettingToken = localStorage.getItem("user");
		// console.log(validToken);
		const UserType = JSON.parse(gettingToken);
		setValidtoken(UserType);
	};
	useEffect(() => {
		fetchLocalSt();
	}, []);
	// console.log(validToken,"hahsam")

	const router = useRouter();
	const [open, setOpen] = useState(false);
	return (
		<div className="py-4  bg-white z-[100] sticky top-0 left-0 right-0 ">
			<nav className="wrapper px-5 md:px-16">
				<div className="navbar">
					<div className="">
						<div className="flex justify-between items-center">
							<div className="w-1/2 flex justify-between items-center">
								<a href={"/"}>
									<img
										className="lg:h-12 sm:h-8 h-7"
										src="/images/logo-main.png"
										alt="Logo"
									/>
								</a>
								<div className="lg:flex hidden">
									<Link href={"/"}>
										<p
											className={` ${
												router.asPath == "/" && "!text-primary"
											} text-[#110229] text-lg font-semibold mx-4 hover:text-primary`}
										>
											Home
										</p>
									</Link>

									<Link href={"/services"}>
										<p
											className={`text-[#656464] text-lg font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/services") && "!text-primary"
											}`}
										>
											Services
										</p>
									</Link>
									<Link href={"/contact"}>
										<p
											className={` text-[#656464] text-lg font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/contact") && "!text-primary"
											}`}
										>
											Contact Us
										</p>
									</Link>
									{/* <Link href={"/faq"}>
										<p
											className={`text-[#656464] text-lg font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/faq") && "!text-primary"
											}`}
										>
											Login
										</p>
									</Link> */}
									{/* <Link href={"/blogs"}>
										<p
											className={`text-[#110229] text-sm font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/blogs") && "!text-primary"
											}`}
										>
											BLOGS
										</p>
									</Link> */}
									{!validToken && (
										<Link href={"/signin"}>
											<p
												className={`text-[#656464] text-lg font-semibold mx-6 hover:text-primary  ${
													router.asPath.startsWith("/signin") && "!text-primary"
												}`}
											>
												Login
											</p>
										</Link>
									)}
								</div>
							</div>

							<div className="flex ml-[0px] items-center">
								<div className="hidden gap-8 md:flex items-center">
									<input
										placeholder="Search here..."
										className="h-[2rem] border text-gray-900 text-sm rounded-2xl block placeholder:text-xs pl-2 md:w-40 "
									/>
									<Link href={"/signup"}>
										<div>
											<Button
												text="Get Started"
												customClass="bg-primary rounded-full p-2 text-sm font-semibold text-white !w-28 !h-12"
											/>
										</div>
									</Link>
								</div>
								{/* {!validToken && (
									<Link href={"/signup"}>
										<Button
											text="SIGN UP"
											customClass={`hidden font-bold md:block text-white md:text-sm border-solid bg-primary rounded-md w-[100px] h-[30px] md:h-[30px] md:mr-4`}
										/>
									</Link>
								)} */}
								{/* {validToken && (
                  <Link href={""}>
                    <Button
                      text="LOG OUT"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setValidtoken(null);
                        fetchLocalSt();
                      }}
                      customClass={`hidden md:block text-black font-bold md:text-sm border border-black  rounded-md w-[100px] h-[30px] md:h-[30px] md:mr-4`}
                    />
                  </Link>
                )} */}
								{validToken?.type === "user" && (
									<Link href={"/employee/dashboard"}>
										<Button
											text="Dashboard"
											customClass={`hidden md:block text-white font-bold md:text-sm border-solid bg-primary rounded-md w-[100px] h-[30px] md:h-[30px] md:mr-4`}
										/>
									</Link>
								)}
								{validToken?.type === "business" && (
									<Link href={"/business/dashboard"}>
										<Button
											text="Dashboard"
											customClass={`hidden md:block text-white font-bold md:text-sm border-solid bg-primary rounded-md w-[100px] h-[30px] md:h-[30px] md:mr-4`}
										/>
									</Link>
								)}

								<HiMenu
									onClick={() => setOpen(!open)}
									className="text-2xl mx-1 text-primary mt-[0px] lg:hidden"
								/>
								<p
									onClick={() => setOpen(!open)}
									className="text-primary text-xl font-bold lg:hidden"
								>
									MENU
								</p>
								{open ? (
									<>
										<div className="modal md:mt-6 lg:hidden fade z-40 fixed top-12 left-[0px] w-full bg-white rounded drop-shadow-lg">
											<div className="text-center !leading-10 ">
												<Link onClick={() => setOpen(false)} href={"/"}>
													<p className="text-[#0000004D] text-md font-bold  border-t-2">
														HOME
													</p>
												</Link>
												<Link onClick={() => setOpen(false)} href={"/about"}>
													<p className="text-[#0000004D] text-md font-bold border-t-2">
														ABOUT
													</p>
												</Link>
												<Link onClick={() => setOpen(false)} href={"/contact"}>
													<p className="text-[#0000004D] text-md font-bold border-t-2">
														CONTACT
													</p>
												</Link>
												<Link onClick={() => setOpen(false)} href={"/faq"}>
													<p className="text-[#0000004D] text-md font-bold border-t-2">
														FAQ
													</p>
												</Link>
												<Link onClick={() => setOpen(false)} href={"/blogs/"}>
													<p className="text-[#0000004D] text-md font-bold border-t-2">
														BLOG
													</p>
												</Link>
												{!validToken && (
													<Link onClick={() => setOpen(false)} href={"/signin"}>
														<p className="text-[#0000004D] text-md font-bold border-t-2">
															LOGIN
														</p>
													</Link>
												)}

												{validToken && (
													<Link
														onClick={() => {
															setOpen(false);
														}}
														href={
															validToken?.type === "user"
																? "/employee/dashboard"
																: "/business/dashboard"
														}
													>
														<p className="text-[#0000004D] text-md font-bold border-t-2">
															DASHBOARD
														</p>
													</Link>
												)}
												{validToken && (
													<Link
														onClick={() => {
															localStorage.removeItem("user");
															setOpen(false);
															router.reload();
														}}
														href={""}
													>
														<p className="text-[#0000004D] text-md font-bold border-t-2">
															LOG OUT
														</p>
													</Link>
												)}
											</div>
										</div>
										<div
											onClick={() => setOpen(false)}
											className="fixed w-full h-full top-0 left-0 z-30 "
										></div>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
