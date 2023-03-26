import React, { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Slider from "../components/slider/slider";
import { forgotPassUser } from "../services/auth-service";
import { useRouter } from "next/router";
import { resetPassword } from "../services/auth-service";
import next from "next";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import OtpInput from "react18-input-otp";

const ForgotPassword = () => {
	const router = useRouter();
	const [spinner, setSpinner] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [otp, setOtp] = useState("");
	const [code, setCode] = useState("");
	const [step, setStep] = useState(1);
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleValidation = () => {
		if (data.email === "") {
			toast.error("Enter a valid email");
			return false;
		}

		if (step === 3) {
			if (data.password === "") {
				toast.warn("Enter new password");
				return false;
			} else if (!(data.password.length >= 8)) {
				toast.warn("Password should be greater than 7 characters");

				return false;
			}
		}

		return true;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (handleValidation()) {
			if (step === 1) {
				document.getElementById("loadingmail").style.display = "block";
				document.getElementById("disabled").style = "disabled";
				document.getElementById("disabled").style.cursor = "not-allowed";
				setSpinner(true);
				forgotPassUser(data?.email)
					.then((res) => {
						if (res?.data?.success === true && !code) {
							toast.success(res?.data?.message);
							document.getElementById("otp").style.display = "block";
							document.getElementById("otpInput").style.display = "none";
							setCode(res.data.code);
							setSpinner(false);
							setStep(3);
						} else {
							setSpinner(false);
							toast.warn(res?.data?.message);
							document.getElementById("loadingmail").style.display = "none";
							document.getElementById("disabled").style.cursor = "pointer";
							document.getElementById("disabled").style = "";
						}
					})
					.catch((err) => {
						setSpinner(false);
						toast.error(err?.message ? err?.message : "Something went wrong");
					});
			}
			if (step === 3) {
				let body = {
					password: data?.password,
				};
				setSpinner(true);
				resetPassword(data?.email, body)
					.then((res) => {
						// console.log(res, "reset");

						document.getElementById("changepass").style.display = "block";
						document.getElementById("disablebtn").style = "disabled";
						document.getElementById("disablebtn").style.cursor = "not-allowed";
						if (res?.data?.success === true) {
							setSpinner(false);
							toast.success(res?.data?.message);
							// if(res.data.success === false ){
							// 	document.getElementById("changepass").style.display = "none";
							// 	document.getElementById("disablebtn").disabled = false;
							// 	document.getElementById("disablebtn").style.cursor = "pointer";

							// }
							document.getElementById("changepass").style.display = "block";
							document.getElementById("disablebtn").style = "disabled";
							document.getElementById("disablebtn").style.cursor =
								"not-allowed";

							router.push("/signin");
						} else {
							setSpinner(false);
							document.getElementById("changepass").style.display = "none";
							document.getElementById("disablebtn").disabled = false;
							document.getElementById("disablebtn").style.cursor = "pointer";
							toast.warn(res?.data?.message);
						}
					})
					.catch((err) => {
						setSpinner(false);
						toast.error(err?.message ? err?.message : "Something went wrong");
					});
			}
		}
	};

	const handleChange = (e) => {
		if (e.target.id === "email") {
			setData({ ...data, email: e.target.value });
			// console.log(data);
		} else if (e.target.id === "password") {
			setData({ ...data, password: e.target.value });
			// console.log(data);
		}
	};
	const fetcchOtp = () => {
		// e.preventDefault();
		let otpPassword = otp;
		if (otpPassword === "") {
			toast.error("Enter Otp code");
		} else if (!(otpPassword === code)) {
			toast.error("Please enter correct otp");
		} else if (otpPassword === code) {
			document.getElementById("otpverify").style.display = "block";
			document.getElementById("btndis").style = "disabled";
			document.getElementById("btndis").style.cursor = "not-allowed";
			setTimeout(() => {
				document.getElementById("otp").style.display = "none";
				document.getElementById("otpInput").style.display = "none";
				document.getElementById("resetPassword").style.display = "block";
			}, 1000);
		}
	};
	const handleResendOtp = () => {
		setSpinner(true);
		forgotPassUser(data?.email)
			.then((res) => {
				if (res?.data?.success) {
					setSpinner(false);
					toast.success("Otp has been resend");
					setCode(res?.data?.code);
				} else {
					setSpinner(false);
					toast.error(res?.data?.message);
				}
			})
			.catch((err) => {
				toast.error(err?.message);
				setSpinner(false);
			});
	};
	const handleOtpChange = (enteredOtp) => {
		setOtp(enteredOtp);
	};
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto  top-[55px] relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}

			<div className="">
				<Head>
					<title> SignUp - Job Locator </title>
				</Head>

				{/* forgotpassword */}
				<div className="flex justify-between ">
					<div className="basis-2/4 hidden md:block h-fit sticky top-0">
						<Slider />
					</div>
					<div className="col-2 flex flex-col basis-full md:basis-[50%]">
						<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12  border-2 border-solid rounded-lg md:rounded-none mt-4 mx-3 lg:mx-8">
							<div className="pb-8">
								<img
									className="mx-auto h-10 sm:h-12 md:h-14"
									src="/images/logo.png"
									alt=""
								/>
							</div>
							<form onSubmit={(e) => handleSubmit(e)}>
								<div>
									{/* reset password */}
									<div id="resetPassword" className="hidden">
										<div className=" my-6 py-3 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
											<input
												onChange={(e) => handleChange(e)}
												id="email"
												className="outline-none placeholder:text-xs lg:placeholder:text-sm  px-2 w-full bg-[#F1F1F1]"
												type="email"
												readOnly
												value={data.email}
												placeholder=""
											/>
										</div>
										<div className="relative my-6 py-2.5 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
											<input
												onChange={(e) => handleChange(e)}
												id="password"
												className="bg-[#F1F1F1] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
												type={showPass ? "text" : "password"}
												placeholder="Enter New Password"
											/>
											{showPass ? (
												<AiOutlineEye
													onClick={() => setShowPass(false)}
													className="absolute right-2 top-4"
												/>
											) : (
												<AiOutlineEyeInvisible
													onClick={() => setShowPass(true)}
													className="absolute right-2 top-4"
												/>
											)}
										</div>

										<div className="lg:py-4">
											<Button
												id="disablebtn"
												type="submit"
												text="Change Password"
												customClass=" bg-primary  flex items-center justify-center rounded-md p-2 text-sm font-semibold text-white w-full !h-12"
												img={
													<svg
														id="changepass"
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
									</div>
									{/* otp */}
									<div
										id="otp"
										className="hidden relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl"
									>
										<div className="mx-auto flex w-full max-w-md flex-col space-y-16 items-center">
											<div className="flex flex-col items-center justify-center text-center space-y-2">
												<div className="font-semibold text-3xl">
													<p>Email Verification</p>
												</div>
												<div className="flex flex-row text-sm font-medium text-gray-400">
													<p>We have sent a code to your email {data.email}</p>
												</div>
											</div>

											<div>
												{/* <form action="" method="get"> */}
												{/* <div className="flex flex-col space-y-5"> */}
												<div className="flex justify-center pb-8">
													<OtpInput
														inputStyle={{
															height: "50px",
															border: "1px solid #F1F1F1",
															width: "50px",
															margin: "auto",
															justifyContent: "center",
															borderRadius: "0.75rem",
														}}
														value={otp}
														onChange={handleOtpChange}
														numInputs={5}
														separator={<span>&nbsp; &nbsp; &nbsp;</span>}
														separateAfter={1}
														onSubmit={fetcchOtp}
													/>
												</div>
												<div className="flex flex-col space-y-5">
													<div>
														<button
															onClick={fetcchOtp}
															id="btndis"
															className="flex flex-row h-12 items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-primary border-none text-white text-sm shadow-sm"
														>
															<svg
																id="otpverify"
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
															Verify Password
														</button>
													</div>

													<div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
														<p>Didn't recieve code?</p>{" "}
														<a
															onClick={handleResendOtp}
															className="flex flex-row items-center text-primary cursor-pointer"
															// href="http://"
															// target="_blank"
															rel="noopener noreferrer"
														>
															Resend
														</a>
													</div>
												</div>
												{/* </div> */}
												{/* </form> */}
											</div>
										</div>
									</div>
									<div id="otpInput">
										<div className="flex flex-col items-center justify-center">
											<img
												className="h-20 mb-4"
												src="/images/Lock Icon.png"
												alt=""
											/>
										</div>
										<div className="text-center">
											<h2 className="text-lg font-medium my-2">
												Trouble Logging In?
											</h2>
											<p className="text-xs  mx-auto w-[300px] text-[#A8A8A8] leading-5">
												Enter your email, phone, or username and we'll send you
												a link to get back into your account.
											</p>
										</div>
										<div className="my-6 py-2 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
											<input
												onChange={(e) => handleChange(e)}
												className="bg-[#F1F1F1] px-2 outline-none placeholder:text-xs lg:placeholder:text-sm w-full"
												type="text"
												placeholder="Email, Phone, or Username"
												id="email"
											/>
										</div>
										<div className="py-4">
											<Button
												id="disabled"
												text="Send Login Link"
												customClass=" bg-primary flex items-center justify-center rounded-md p-2 text-sm font-semibold text-white w-full !h-12"
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
											></Button>
										</div>
									</div>
								</div>
							</form>
							<div className="flex justify-center items-center pt-5">
								<hr className="w-[50px]" />
								<p className="mx-2">or</p>
								<hr className="w-[50px]" />
							</div>
							<Link href={"/forgotpassword"}>
								<div className="pt-7">
									<Link href={"/signup"}>
										<p className="text-primary text-center text-sm font-semibold">
											Create New Account
										</p>
									</Link>
								</div>
							</Link>
						</div>
						<Link href="/signin">
							<div className="flex justify-center border-2 border-solid lg:w-[91.5%] md:w-[93.5%] w-[94%]  rounded-lg md:rounded-none h-12 mx-auto mt-5 items-center">
								<p className=" text-sm font-medium text-[#636363]">
									<span className="text-[#636363] ml-1">Back to Login</span>
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
