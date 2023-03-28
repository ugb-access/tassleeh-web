import React, { useState } from "react";
import Button from "../Button";
import Link from "next/link";
import { loginUser, signupUserCheck } from "../../services/auth-service";
import Slider from "../slider/slider";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { IoIosEye } from "react-icons/io";
import TextInput from "../TextInput";
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
	const [show, setShow] = useState(1);
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
			<div className="">
				<div className="col-2 flex flex-col">
					<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12 border-solid rounded-lg md:rounded-none  mx-3">
						<div className="flex !justify-center  md:!justify-start">
							<div className="flex items-center py-5">
								<input
									id="default-radio-1"
									type="radio"
									onClick={() => setShow(1)}
									defaultChecked
									value="tag1"
									name="data"
									className="w-4 h-4 text-primary bg-gray-100 border-gray-300  "
								/>
								<label
									for="default-radio-1"
									className="ml-2 mr-5  text-sm whitespace-nowrap  font-medium text-gray-900 dark:text-gray-300"
								>
									Normal User
								</label>
							</div>
							<div className="flex items-center">
								<input
									onClick={() => setShow(2)}
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
									Service Provider
								</label>
							</div>
						</div>
						<form onSubmit={(e) => handleSubmit(e)}>
							{show === 1 && (
								<div>
									<div className="">
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
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="fullName"
											customClass="relative py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="password"
											placeholder="Password"
											labelText={"Password"}
											labelStyle={"mt-12 mb-2"}
										/>
									</div>
								</div>
							)}
							{show === 2 && (
								<div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="fullName"
											customClass=" py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="text"
											placeholder="Full Name"
											labelText={"Full Name"}
											labelStyle={"mt-2 mb-2"}
										/>
									</div>
									<div className="mt-8">
										<label className="">
											Country
											<select
												onChange={(e) => handleChange(e)}
												value={data.requiredCareerLevel}
												id="requiredCareerLevel"
												className="!h-12 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											>
												<option selected>Country</option>
												<option value="Beginners">United Kingdom</option>
												<option value="Intermediate">Pakistan</option>
												<option value="Experienced">Australia</option>
											</select>
										</label>
									</div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="fullName"
											customClass=" py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="number"
											placeholder="Mobile"
											labelText={"Mobile"}
											labelStyle={"mt-2 mb-2"}
										/>
									</div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="fullName"
											customClass=" py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="email"
											placeholder="Email"
											labelText={"Email"}
											labelStyle={"mt-8 mb-2"}
										/>
									</div>
									<div className="mt-8">
										<label className="">
											Work Category
											<select
												onChange={(e) => handleChange(e)}
												value={data.requiredCareerLevel}
												id="requiredCareerLevel"
												className="!h-12 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											>
												<option selected>Work Category</option>
												<option value="Beginners">Business</option>
												<option value="Intermediate">Owner</option>
												<option value="Experienced">Emoloyee</option>
											</select>
										</label>
									</div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="fullName"
											customClass=" py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="password"
											placeholder="Password"
											labelText={"Password"}
											labelStyle={"mt-3 mb-2"}
										/>
									</div>
									<div className="relative">
										<TextInput
											// onChange={(e) => handleChange(e)}
											id="password"
											customClass=" mt-2 py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type={showPass ? "text" : "password"}
											placeholder="Confirm Password"
											labelText={"Confirm Password"}
											labelStyle={"mt-10"}
										/>
										{showPass ? (
											<AiOutlineEye
												onClick={() => setShowPass(false)}
												className="absolute right-0 "
											/>
										) : (
											<AiOutlineEyeInvisible
												onClick={() => setShowPass(true)}
												className="absolute top-12 right-3"
											/>
										)}
									</div>
									<div className="">
										<div className="mt-14 my-5">
											<span className="font-bold text-[#0a093d]">
												Upload Experience Letter
											</span>
										</div>
										<div className="border-2 rounded-md ">
											<div className="flex flex-col justify-center items-center py-8">
												<div className="py-4">
													<img
														className=""
														src={image ? image : "/images/upload.png"}
														alt=""
													/>
												</div>
												{/* <p>Drag photos here</p> */}
												<button className="relative border border-solid rounded-2xl py-3 px-6 mt-3 border-primary">
													<p className="text-primary text-sm font-semibold ">
														Upload
													</p>
													<input
														accept="/image/*"
														onChange={imageHandler}
														className="absolute opacity-0 right-0 left-0 top-0 bottom-0"
														type="file"
													/>
												</button>
											</div>
										</div>
									</div>
									<div className="">
										<div className="mt-8 my-5">
											<span className="font-bold text-[#0a093d]">
												Upload Id
											</span>
										</div>
										<div className="border-2 rounded-md ">
											<div className="flex flex-col justify-center items-center py-8">
												<div className="py-4">
													<img
														className=""
														src={image ? image : "/images/upload.png"}
														alt=""
													/>
												</div>
												{/* <p>Drag photos here</p> */}
												<button className="relative border border-solid rounded-2xl py-3 px-6 mt-3 border-primary">
													<p className="text-primary text-sm font-semibold ">
														Upload
													</p>
													<input
														accept="/image/*"
														onChange={imageHandler}
														className="absolute opacity-0 right-0 left-0 top-0 bottom-0"
														type="file"
													/>
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
							{/* <div className="flex items-center mb-2 mt-9">
								<input
									onChange={(e) => isSetCheck(e.target.checked)}
									id="isActive"
									type="checkbox"
									className="w-4 !mr-2 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label className="pt-0.5 text-xs lg:text-sm font-medium whitespace-nowrap !overflow-hidden text-gray-500">
									I agree to TASSLEEH {""}
									<Link target={"_blank"} href={"/terms-&-conditions"}>
										<span className="text-primary">terms</span> and{" "}
									</Link>
									<Link target={"_blank"} href={"/privacy-policy"}>
										<span className="text-primary">conditions.</span>
									</Link>
								</label>
							</div> */}
							{/* <Link href="/compelete-profile"> */}
							<div className="pt-20 flex justify-center">
								<Button
									id="disabled"
									type="submit"
									text="Login"
									customClass=" bg-primary rounded-xl p-2 text-sm font-semibold text-white !w-32 !h-12"
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
					</div>
					<Link href={"/signin"}>
						<div className="flex lg:mt-0 mt-11 md:mt-8 mb-2 justify-center rounded-lg md:rounded-none w-[96.5%] h-11 mx-auto items-center cursor-pointer">
							<p className=" text-sm font-medium text-[#636363]">
								Already have an account?
								<span className="text-primary ml-1">Sign in</span>
							</p>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};
export default SignIn;
