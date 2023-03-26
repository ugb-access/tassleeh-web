import Link from "next/link";
import Button from "../components/Button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
			<nav className="wrapper px-5 md:px-10">
				<div className="navbar">
					<div className="">
						<span className="flex  items-center">
							<a href="">
								<img
									className="lg:h-11 sm:h-8 h-6"
									src="/images/logo.png"
									alt="Logo"
								/>
							</a>
							<span className="flex basis-11/12 justify-end ml-[0px] items-center">
								<div className="lg:flex hidden">
									<Link href={"/"}>
										<p
											className={` ${
												router.asPath == "/" && "!text-primary"
											} text-[#110229] text-sm font-semibold mx-4 hover:text-primary`}
										>
											HOME
										</p>
									</Link>

									<Link href={"/about"}>
										<p
											className={`text-[#110229] text-sm font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/about") && "!text-primary"
											}`}
										>
											ABOUT
										</p>
									</Link>
									<Link href={"/contact"}>
										<p
											className={` text-[#110229] text-sm font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/contact") && "!text-primary"
											}`}
										>
											CONTACT
										</p>
									</Link>
									<Link href={"/faq"}>
										<p
											className={`text-[#110229] text-sm font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/faq") && "!text-primary"
											}`}
										>
											FAQ
										</p>
									</Link>
									<Link href={"/blogs"}>
										<p
											className={`text-[#110229] text-sm font-semibold mx-6 hover:text-primary  ${
												router.asPath.startsWith("/blogs") && "!text-primary"
											}`}
										>
											BLOGS
										</p>
									</Link>
									{!validToken && (
										<Link href={"/signin"}>
											<p
												className={`text-[#110229] text-sm font-semibold mr-16 ml-6 hover:text-primary  ${
													router.asPath.startsWith("/signin") && "!text-primary"
												}`}
											>
												LOGIN
											</p>
										</Link>
									)}
								</div>
								{!validToken && (
									<Link href={"/signup"}>
										<Button
											text="SIGN UP"
											customClass={`hidden font-bold md:block text-white md:text-sm border-solid bg-primary rounded-md w-[100px] h-[30px] md:h-[30px] md:mr-4`}
										/>
									</Link>
								)}
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
														<p
															className="text-[#0000004D] text-md font-bold border-t-2"
														>
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
														<p
															className="text-[#0000004D] text-md font-bold border-t-2"
														>
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
							</span>
						</span>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
