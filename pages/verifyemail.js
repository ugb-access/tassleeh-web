import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "../components/slider/slider";
import AuthLayout from "../layout/AuthLayout";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { verificationEmail } from "../services/auth-service";

const ForgotPassword = () => {
	const router = useRouter();
	const [otp, setOtp] = useState("");
	const [user, setUser] = useState([]);
	const [code, setCode] = useState("");
	//fetching code from local storage
	useEffect(() => {
		let lcCode = localStorage.getItem("codeOtp");
		let lcUser = localStorage.getItem("userData");
		let userData = JSON.parse(lcUser);
		setUser(userData);
		setCode(lcCode);
	}, []);
	//fetching code from local storage
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
			localStorage.removeItem("codeOtp");
			setTimeout(() => {
				router.push("/compelete-profile");
			}, 1000);
		}
	};
	const handleOtpChange = (enteredOtp) => {
		setOtp(enteredOtp);
	};
	const handleResendOTP = () => {
		verificationEmail(user?.email)
			.then((resp) => {
				if (resp?.data.code) {
					setCode(resp?.data?.code);
					toast.success("Code has been resend");
				} else {
					toast.error(resp?.data?.message);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.data?.error);
			});
	};
	return (
		<div className="">
			<Head>
				<title> Verify Email - Tassleeh </title>
			</Head>
			<AuthLayout text={"OTP Code (Normal User)"}>
				<div className="flex justify-between">
					<div className="col-2 flex flex-col basis-full">
						<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12 rounded-lg md:rounded-none mt-4  mx-3">
							<div>
								<h2 className="py-2 text-base font-medium">
									Please enter the otp code which has been sent to you.
								</h2>
							</div>
							<div className="flex flex-col items-center ">
								<div className="flex justify-center pb-8 pt-16">
									<OtpInput
										inputStyle={{
											height: "50px",
											border: "1px solid #656464",
											width: "90px",
											margin: "auto",
											justifyContent: "center",
											borderRadius: "",
										}}
										value={otp}
										onChange={handleOtpChange}
										numInputs={5}
										separator={<span>&nbsp; &nbsp; &nbsp;</span>}
										separateAfter={1}
										className="!placeholder:text-gray-100"
										inputProps={{ placeholder: "-" }}
										onSubmit={fetcchOtp}
									/>
								</div>
								<Link href={"/newpassword"}>
									<div className="flex flex-col space-y-5">
										<div className="mt-4">
											<button
												// onClick={fetcchOtp}
												id="btndis"
												className="flex flex-row h-10  items-center justify-center text-center w-32 border rounded-xl outline-none p-2 bg-primary border-none text-white text-sm shadow-sm"
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
												Verify
											</button>
										</div>
									</div>
								</Link>
								<p className="text-sm leading-6 w-[320px] text-[#656464] text-center mt-8 lg:">
									Didn’t get a code?
									<span
										onClick={handleResendOTP}
										className="cursor-pointer text-primary"
									>
										Resend
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</AuthLayout>
		</div>
	);
};
export default ForgotPassword;
