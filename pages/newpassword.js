import Head from "next/head";
import AuthLayout from "../layout/AuthLayout";
// import OtpInput from "react18-input-otp";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Link from "next/link";

const SetNewPassword = () => {
	return (
		<>
			<div className="">
				<Head>
					<title> Set New Password - Tassleeh </title>
				</Head>
				<AuthLayout text={"Set New Password"}>
					<div className="flex justify-between">
						<div className="col-2 flex flex-col basis-full">
							<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12 rounded-lg md:rounded-none mt-4  mx-3">
								<div>
									<h2 className="py-2 text-base">
										Please enter a new, strong password to be used for your
										TASSLEEH account.
									</h2>
								</div>
								<div className="">
									<TextInput
										onChange={(e) => handleChange(e)}
										id="fullName"
										customClass="relative py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
										type="password"
										placeholder="New Password"
										labelText={"New Password"}
										labelStyle={"mt-6 mb-2"}
									/>
								</div>
								<div className="">
									<TextInput
										onChange={(e) => handleChange(e)}
										id="fullName"
										customClass="relative py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
										type="password"
										placeholder="Confirm New Password"
										labelText={"Confirm New Password"}
										labelStyle={"mt-12 mb-2"}
									/>
								</div>
								<Link href={"/signin"}>
									<div className="pt-20 flex justify-center">
										<Button
											id="disabled"
											type="submit"
											text="Reset Password"
											customClass=" bg-primary rounded-xl p-2 text-sm font-medium text-white !w-56 !h-10"
											img={
												<svg
													id="loadingmail"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6 animate-spin mx-2 hidden"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
													/>
												</svg>
											}
										/>
									</div>
								</Link>
								<div className="flex flex-col items-center ">
									<p className="text-sm leading-6 w-[320px] text-[#656464] text-center mt-8 lg:">
										Return to{" "}
										<Link href={"/signin"}>
											<span
												// onClick={handleResendOTP}
												className="cursor-pointer text-primary"
											>
												Sign In
											</span>
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</AuthLayout>
			</div>
		</>
	);
};

export default SetNewPassword;
