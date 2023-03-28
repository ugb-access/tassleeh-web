import React, { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
// import Slider from "../components/slider/slider";
import TextInput from "../components/TextInput";
import AuthLayout from "../layout/AuthLayout";
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
				<AuthLayout text={"Forgot Password"}>
					<div className="py-12 px-14">
						<p>
							Enter the email address you used when you joined and we'll send
							you instructions to reset your password.
						</p>
						<div>
							<TextInput
								onChange={(e) => handleChange(e)}
								id="fullName"
								customClass="relative py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
								type="text"
								placeholder="Email"
								labelText={"Email"}
								labelStyle={"mt-8 mb-2"}
							/>
						</div>
						<div className="pt-20 flex justify-center">
							<Button
								id="disabled"
								type="submit"
								text="Send Reset Instructions"
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
						<Link href={"/signin"}>
							<div className="flex justify-center text-sm mt-7">
								<p>
									Return to <span className="text-primary">Sign In</span>
								</p>
							</div>
						</Link>
					</div>
				</AuthLayout>
			</div>
		</>
	);
};

export default ForgotPassword;
