import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "../components/slider/slider";
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
				<title> Verify Email - Job Locator </title>
			</Head>
			<div className="flex justify-between">
				<div className="basis-2/4 hidden md:block h-fit sticky top-0">
					<Slider />
				</div>
				<div className="col-2 flex flex-col basis-full md:basis-[50%]">
					<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12  border-2 border-solid rounded-lg md:rounded-none mt-4  mx-3">
						<div className="pb-8">
							<img
								className="mx-auto h-10 sm:h-12 md:h-14"
								src="/images/logo.png"
								alt=""
							/>
						</div>
						<div className="flex justify-center py-4">
							<img className="h-52" src="/images/verify.png" alt="" />
						</div>
						<div className="flex flex-col items-center ">
							<h2 className="py-2 text-base font-medium">
								Verify Your Email Address : {user?.email}
							</h2>
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
										className="flex flex-row h-12 items-center justify-center text-center w-full border rounded-xl outline-none p-2 bg-primary border-none text-white text-sm shadow-sm"
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
										Verify Email
									</button>
								</div>
							</div>
							<p className="text-sm leading-6 w-[320px] text-[#A8A8A8] text-center lg:py-20">
								Before proceeding, please check your email for a verification
								link. If you did not receive the email,
								<span
									onClick={handleResendOTP}
									className="cursor-pointer text-primary"
								>
									click here to request another.
								</span>
							</p>
						</div>
					</div>
					<Link href={"/signin"}>
						<div className="mt-5 flex justify-center border-2 border-solid rounded-lg md:rounded-none w-[94.5%] lg:w-[96.5%] h-11 mx-auto items-center">
							<p className=" text-sm font-medium text-[#636363]">
								Already have an account?
								<span className="text-primary font-medium ml-1">Login</span>
							</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default ForgotPassword;
