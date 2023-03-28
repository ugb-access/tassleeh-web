import Button from "../Button";
import Link from "next/link";
import React, { useState } from "react";
// import { signupUser } from "../../services/auth-service";
import Slider from "../slider/slider";
import {
	signupUserCheck,
	verificationEmail,
} from "../../services/auth-service";
import { useRouter } from "next/router";
import { ImSpinner9 } from "react-icons/im";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import dynamic from "next/dynamic";
import AuthHeader from "./AuthHeader";

const LoginSocialFacebook = dynamic(
	() =>
		import("reactjs-social-login").then((module) => module.LoginSocialFacebook),
	{
		ssr: false,
	}
);

const SignUp = ({
	placeholdert1,
	placeholdert2,
	placeholdert3,
	placeholdert4,
}) => {
	const [setCheck, isSetCheck] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [data, setData] = useState({
		email: "",
		phone: "",
		fullName: "",
		userName: "",
		type: "user",
		password: "",
		isFeatured: false,
	});
	const router = useRouter();
	const handleValidation = () => {
		if (data.email === "") {
			toast.warn("Email Address Cannot Be Empty");
			setSpinner(false);
			return false;
		}
		if (!data.email.includes("@")) {
			toast.warn("Please Enter Correct Email");
			toast.warn;
			setSpinner(false);
			return false;
		}
		if (data.phone === "") {
			toast.warn("Phone Number Cannot Be Empty");
			setSpinner(false);
			return false;
		}
		if (data.fullName === "") {
			toast.warn("Full Name Cannot Be Empty");
			setSpinner(false);
			return false;
		}
		if (data.userName === "") {
			toast.warn("UserName Cannot Be Empty");
			setSpinner(false);
			return false;
		}
		if (data.password === "") {
			toast.warn("Password Cannot Be Empty");
			setSpinner(false);
			return false;
		}
		if (!(data.password.length >= 8)) {
			toast.warn("Password Should Be Greater than 7 Characters");
			setSpinner(false);
			return false;
		}
		if (setCheck === false) {
			toast.warn("Agree to our terms and privacy policies.");
			setSpinner(false);
			return false;
		}

		return true;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setSpinner(true);
		localStorage.setItem("userData", JSON.stringify(data));
		if (handleValidation()) {
			signupUserCheck(data)
				.then((res) => {
					// console.log(res);
					document.getElementById("loadingmail").style.display = "block";
					document.getElementById("disabled").style = "disabled";
					document.getElementById("disabled").style.cursor = "not-allowed";

					// console.log(res.data);
					if (res.data.userExist === true) {
						document.getElementById("loadingmail").style.display = "none";
						document.getElementById("disabled").disabled = false;
						document.getElementById("disabled").style.cursor = "pointer";
						setSpinner(false);
						toast.error(res?.data?.message);
					} else {
						document.getElementById("loadingmail").style.display = "none";
						document.getElementById("disabled").disabled = false;
						document.getElementById("disabled").style.cursor = "pointer";
						setSpinner(false);
						// router.push("/compelete-profile");
						// verificationEmail(data?.email).then((resp) => {
						// 	if (resp) {
						// 		console.log(resp)
						// toast.success(
						// 	"Please verify your email code has been sent to your Email"
						// );
						// console.log(resp);
						// console.log(resp?.data?.code, "coderesp");
						// const codeOTP = resp?.data?.code;
						// localStorage.setItem("codeOtp", codeOTP);
						router.push("/compelete-profile");
						// 	}
						// });
						setSpinner(false);
					}
				})
				.catch((err) => {
					setSpinner(false);
					toast.error(err?.message ? err?.message : "Something went wrong");
				});
		}
	};
	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};
	// google signup
	let googleProvider = new GoogleAuthProvider();
	const signWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((resp) => {
				// console.log(resp, "google");
				let userData = {
					email: resp?.user.email,
					fullName: resp?.user.displayName,
					phone: resp?.user?.phoneNumber,
					image: resp?.user?.photoURL,
					isFeatured: false,
					userName: resp?.user?.displayName,
					password: resp?.user?.uid,
				};
				signupUserCheck(userData)
					.then((res) => {
						// console.log(res, "userchekc");
						if (res?.data?.userExist) {
							toast.error(res?.data?.message);
							router.push("/signin");
						} else {
							localStorage.setItem("userData", JSON.stringify(userData));
							router.push("/compelete-profile");
						}
					})
					.catch((error) => {
						toast.error(error?.message);
					});
			})
			.catch((err) => {
				// console.log(err);
			});
	};
	// google signup
	//facebook sign in
	const REDIRECT_URI = "http://localhost:3000/signin";
	const handleFBLogin = (resp) => {
		console.log(resp, "facebookRes");
		if (resp?.data) {
			let employeeData = {
				email: resp?.data?.email,
				fullName: resp?.data?.name,
				// phone: resp?.data?.phoneNumber,
				image: resp?.data?.picture?.data?.url,
				type: data?.type,
				isFeatured: false,
				userName: resp?.data?.name,
				password: resp?.data?.userID,
			};
			let businessData = {
				email: resp?.data?.email,
				fullName: resp?.data?.name,
				// phone: resp?.data?.phoneNumber,
				businessImage: resp?.data?.picture?.data?.url,
				type: data?.type,
				isFeatured: false,
				userName: resp?.data?.name,
				password: resp?.data?.userID,
			};
			console.log(employeeData, businessData, "createdData");
			signupUserCheck(data?.type === "user" ? employeeData : businessData)
				.then((res) => {
					// console.log(res, "checkUser");
					if (!res?.data?.userExist) {
						localStorage.setItem(
							"userData",
							JSON.stringify(
								data?.type === "user" ? employeeData : businessData
							)
						);
						router.push("/compelete-profile");
					} else {
						toast.warn("User already exist");
						router.push("/signin");
						// let dataSign = {
						// 	email: resp?.data?.email,
						// 	password: resp?.data?.userID,
						// 	type: data?.type,
						// };
						// loginUser(dataSign)
						// 	.then((response) => {
						// 		// console.log(response);
						// 		if (response?.data?.success) {
						// 			let info = jwt_decode(response?.data?.token);
						// 			localStorage.setItem("user", JSON.stringify(info?.payload));
						// 			setSpinner(false);
						// 			if (info?.payload?.type === "user") {
						// 				router.push("/");
						// 				setSpinner(false);
						// 			} else {
						// 				router.push("/");
						// 				setSpinner(false);
						// 			}
						// 			setSpinner(false);
						// 		} else {
						// 			toast.warn(response?.data?.message);
						// 		}
						// 	})
						// 	.catch((err) => {
						// 		setSpinner(false);
						// 	});
					}
				})
				.catch((err) => {
					toast.error(err?.message);
				});
		}
	};
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 bg-transparent fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto sm:right-0 right-[93px]  top-[55px] relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<div className="">
				<div className="col-2 flex flex-col">
					<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12  border-2 border-solid rounded-lg md:rounded-none mt-4  mx-3">
						
						<div className="pb-7">
							<img
								className="mx-auto h-10 sm:h-12 md:h-14"
								src="/images/logo.png"
								alt=""
							/>
						</div>
						<form onSubmit={(e) => handleSubmit(e)}>
							<div className="py-2 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
								<input
									onChange={(e) => handleChange(e)}
									id="email"
									className="outline-none px-2 w-full bg-[#F1F1F1] placeholder:text-xs lg:placeholder:text-sm"
									type="text"
									placeholder={placeholdert3}
								/>
							</div>
							<div className="my-6 py-2 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
								<input
									onChange={(e) => handleChange(e)}
									id="phone"
									className="placeholder:text-xs lg:placeholder:text-sm outline-none px-2 w-full bg-[#F1F1F1]"
									type="text"
									placeholder="Enter Your Phone Number"
								/>
							</div>
							<div className="my-6 py-2 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
								<input
									onChange={(e) => handleChange(e)}
									id="fullName"
									className="placeholder:text-xs lg:placeholder:text-sm outline-none px-2 w-full bg-[#F1F1F1]"
									type="text"
									placeholder={placeholdert4}
								/>
							</div>
							<div className="my-6 py-2 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
								<input
									onChange={(e) => handleChange(e)}
									id="userName"
									className="placeholder:text-xs lg:placeholder:text-sm outline-none px-2 w-full bg-[#F1F1F1]"
									type="text"
									placeholder={placeholdert1}
								/>
							</div>
							<div className="relative my-6 py-2 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
								<input
									onChange={(e) => handleChange(e)}
									id="password"
									className="bg-[#F1F1F1] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
									type={showPass ? "text" : "password"}
									placeholder={placeholdert2}
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
							<div className="flex items-center mb-4">
								<input
									onChange={(e) => isSetCheck(e.target.checked)}
									id="isActive"
									type="checkbox"
									className="w-4 !mr-2 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label className=" text-xs lg:text-sm font-medium whitespace-nowrap !overflow-hidden text-gray-500">
									By creating an account you agree to our{" "}
									<Link target={"_blank"} href={"/terms-&-conditions"}>
										<span className="text-primary">terms</span> and{" "}
									</Link>
									<Link target={"_blank"} href={"/privacy-policy"}>
										<span className="text-primary">privacy policy.</span>
									</Link>
								</label>
							</div>
							{/* <Link href="/compelete-profile"> */}
							<div className="py-4">
								<Button
									id="disabled"
									type="submit"
									text="Sign up"
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
								/>
							</div>
							{/* </Link> */}
						</form>
						<div className="flex justify-center items-center">
							<hr className="w-[50px]" />
							<p className="mx-2">or</p>
							<hr className="w-[50px]" />
						</div>
						{/* <button className="flex items-center mx-auto my-4 bg-[#1877F2] py-1  gap-2 rounded-sm">
							<img src="/images/facebook (2).png" alt="" />
							<p className="text-xs text-white mr-2">Continue with Facebook</p>
						</button> */}
						<div className="max-w-fit p-0 lg:my-6 m-auto">
							{typeof window !== "undefined" ? (
								<LoginSocialFacebook
									appId="1337714373684794"
									// appId = ""
									fieldsProfile={
										"id,first_name,last_name,name,name_format,picture,email"
									}
									redirect_uri={REDIRECT_URI}
									onResolve={handleFBLogin}
									onReject={(err) => {
										console.log(err, "facebookReject");
									}}
								>
									<button className="flex items-center mx-auto  bg-[#1877F2] py-1.5 px-3.5 gap-2 rounded-sm">
										<img src="/images/facebook (2).png" alt="" />
										<p className="text-xs text-white mr-2">
											Continue with Facebook
										</p>
									</button>
								</LoginSocialFacebook>
							) : null}
						</div>
						<button
							onClick={() => {
								signWithGoogle();
							}}
							className="flex mx-auto justify-between items-center bg-[#F44336] py-1 px-3 gap-3 rounded-sm"
						>
							<img className="ml-1" src="/images/google-plus.png" alt="" />
							<p className="text-xs text-white mr-4">Continue with Google</p>
						</button>
					</div>
					<Link href={"/signin"}>
						<div className="flex lg:mt-6 mt-11 md:mt-8 mb-2 justify-center border-2 border-solid rounded-lg md:rounded-none w-[96.5%] h-11 mx-auto items-center cursor-pointer">
							<p className=" text-sm font-medium text-[#636363]">
								Already have an account?
								<span className="text-primary ml-1">Log in</span>
							</p>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default SignUp;
