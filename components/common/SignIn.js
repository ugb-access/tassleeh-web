import React, { useState } from "react";
import Button from "../Button";
import Link from "next/link";
import { loginUser, signupUserCheck } from "../../services/auth-service";
import Slider from "../slider/slider";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { IoIosEye } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import dynamic from "next/dynamic";

const LoginSocialFacebook = dynamic(
	() =>
		import("reactjs-social-login").then((module) => module.LoginSocialFacebook),
	{
		ssr: false,
	}
);

const SignIn = ({ placeholdert1, placeholdert2 }) => {
	const router = useRouter();
	const [showPass, setShowPass] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [isError, setIsError] = useState("");
	const [data, setData] = useState({
		email: "",
		password: "",
		type: "user",
	});
	const handleValidation = (e) => {
		if (data.email === "") {
			toast.warn("Email cannot be empty");
			return false;
		}
		if (data.password === "") {
			toast.warn("Password cannot be empty");
			return false;
		}
		// if (!(data.password.length >= 8)) {
		// 	toast.warn("Password should be greater than 7 characters");
		// 	return false;
		// }
		return true;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (handleValidation()) {
			setSpinner(true);
			loginUser(data)
				.then((res) => {
					// console.log(res);
					if (res.data.success === true) {
						toast.success(res.data.message);
						document.getElementById("loadingmail").style.display = "block";
						document.getElementById("disabled").style = "disabled";
						document.getElementById("disabled").style.cursor = "not-allowed";
						let info = jwt_decode(res?.data?.token);
						localStorage.setItem("user", JSON.stringify(info?.payload));
						setSpinner(false);
						if (info?.payload?.type === "user") {
							router.push("/");
							setSpinner(false);
						} else {
							router.push("/");
							setSpinner(false);
						}
						setSpinner(false);
					} else {
						setSpinner(false);
						toast.warn(res?.data?.message);
					}
				})
				.catch((err) => {
					toast.error(err);
					setSpinner(false);
				});
		}
	};
	const dataChange = (e) => {
		if (e.target.value == "tag1" && e.target.checked === true) {
			setData({ ...data, type: "user" });
		}
		if (e.target.value == "tag2" && e.target.checked === true) {
			setData({ ...data, type: "business" });
		}
	};
	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
		setIsError("");
	};
	// google sign in
	let googleProvider = new GoogleAuthProvider();
	const signWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((resp) => {
				// console.log(resp?.user, "usre");
				if (resp?.user) {
					let employeeData = {
						email: resp?.user.email,
						fullName: resp?.user.displayName,
						phone: resp?.user?.phoneNumber,
						image: resp?.user?.photoURL,
						type: data?.type,
						isFeatured: false,
						userName: resp?.user?.displayName,
						password: resp?.user?.uid,
					};
					let businessData = {
						email: resp?.user.email,
						fullName: resp?.user.displayName,
						phone: resp?.user?.phoneNumber,
						businessImage: resp?.user?.photoURL,
						type: data?.type,
						isFeatured: false,
						userName: resp?.user?.displayName,
						password: resp?.user?.uid,
					};

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
								// toast.error(res?.data?.message);
								// sign in google
								let dataSign = {
									email: resp?.user?.email,
									// password : resp?.user?.email,
									password: resp?.user?.uid,
									type: data?.type,
								};
								loginUser(dataSign)
									.then((response) => {
										// console.log(response);
										if (response?.data?.success) {
											let info = jwt_decode(response?.data?.token);
											localStorage.setItem(
												"user",
												JSON.stringify(info?.payload)
											);
											setSpinner(false);
											if (info?.payload?.type === "user") {
												router.push("/");
												setSpinner(false);
											} else {
												router.push("/");
												setSpinner(false);
											}
											setSpinner(false);
										} else {
											toast.warn(response?.data?.message);
										}
									})
									.catch((err) => {
										setSpinner(false);
									});
								// sign in google
							}
						})
						.catch((err) => {
							toast.error(err?.message);
						});
				}
			})
			.catch((err) => {
				toast.error(err?.message);
			});
	};
	// google sign in
	//facebook sign in
	const REDIRECT_URI = "http://localhost:3000/";
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
						// toast.error(res?.data?.message);
						// sign in facebook
						let dataSign = {
							email: resp?.data?.email,
							// password : resp?.user?.email,
							password: resp?.data?.userID,
							type: data?.type,
						};
						loginUser(dataSign)
							.then((response) => {
								// console.log(response);
								if (response?.data?.success) {
									let info = jwt_decode(response?.data?.token);
									localStorage.setItem("user", JSON.stringify(info?.payload));
									setSpinner(false);
									if (info?.payload?.type === "user") {
										router.push("/");
										setSpinner(false);
									} else {
										router.push("/");
										setSpinner(false);
									}
									setSpinner(false);
								} else {
									toast.warn(response?.data?.message);
								}
							})
							.catch((err) => {
								setSpinner(false);
							});
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
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto  top-[55px] relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<div className="flex justify-between ">
				<div className="basis-2/4 hidden md:block h-fit sticky top-0">
					<Slider />
				</div>
				<div className="col-2 flex flex-col justify-between max-h-screen basis-full md:basis-[50%]">
					<div className="lg:py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12  border-2 border-solid rounded-lg md:rounded-none mt-4  mx-3">
						<div className="lg:pb-8">
							<img
								className="mx-auto h-10 sm:h-12 md:h-14"
								src="/images/logo.png"
								alt=""
							/>
						</div>
						<form onSubmit={(e) => handleSubmit(e)}>
							<div className="my-6 py-3 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
								<input
									onChange={(e) => handleChange(e)}
									id="email"
									className="outline-none placeholder:text-xs lg:placeholder:text-sm  px-2 w-full bg-[#F1F1F1]"
									type="text"
									placeholder={placeholdert1}
								/>
							</div>
							<div className="relative flex items-center my-6 py-2.5 w-full rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#F1F1F1]">
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
							<div className="flex !justify-center  md:justify-start">
								<div className="flex items-center py-5">
									<input
										id="default-radio-1"
										type="radio"
										onClick={dataChange}
										defaultChecked
										value="tag1"
										name="data"
										className="w-4 h-4 text-primary bg-gray-100 border-gray-300  "
									/>
									<label
										for="default-radio-1"
										className="ml-2 mr-5  text-sm whitespace-nowrap  font-medium text-gray-900 dark:text-gray-300"
									>
										Employee Account
									</label>
								</div>
								<div className="flex items-center">
									<input
										onClick={dataChange}
										id="default-radio-2"
										type="radio"
										value="tag2"
										name="data"
										className="w-4 h-4 text-primary bg-gray-100 border-gray-300"
									/>
									<label
										for="default-radio-2"
										className="ml-2 text-sm whitespace-nowrap font-medium text-gray-900 dark:text-gray-300"
									>
										Business Account
									</label>
								</div>
							</div>
							{/* <div className="text-center">
								<h1 className="text-red-600 text-sm">{isError}</h1>
							</div> */}
							<div className="lg:py-4">
								<Button
									id="disabled"
									type="submit"
									text="Log in"
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
						</form>
						<div className="flex justify-center items-center py-3">
							<hr className="w-[50px]" />
							<p className="mx-2">or</p>
							<hr className="w-[50px]" />
						</div>
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
						<div className="pt-3  md:pt-6 mb-3 lg:pt-9">
							<p
								onClick={() => router.push("/forgotpassword")}
								className="text-primary text-center text-lg font-medium cursor-pointer"
							>
								Forgotten your password?
							</p>
						</div>
					</div>
					<div className="flex lg:mt-10 md:mt-8 mt-10 justify-center border-2 rounded-lg md:rounded-none border-solid h-12 w-[96.5%] my-4 mx-auto items-center ">
						<Link href={"/signup"}>
							<p className=" text-sm font-medium text-[#636363]">
								Don't have an account?
								<span className="text-primary ml-1 cursor-pointer">
									Sign up
								</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
export default SignIn;
