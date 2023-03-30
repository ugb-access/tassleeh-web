import Button from "../Button";
import Link from "next/link";
import TextInput from "../TextInput";
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
	const [image, setImage] = useState("");
	const [checkImage, setCheckImage] = useState("");
	const [show, setShow] = useState(1);
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
	const handleFile = (e) => {
		e.preventDefault();
		if (handleValidations()) {
			setSpinner(true);
			if (image) {
				if (checkImage) {
					const file = checkImage;
					if (file) {
						const preview = URL.createObjectURL(file);
						// setFile({ obj: file, preview });
						// e.target.value = "";
						const storageRef = ref(storage, `/business/${file.name}`);
						//firebase upload and progress
						const uploadTask = uploadBytesResumable(storageRef, file);
						setRequesting(true);
						uploadTask.on(
							"state_changed",
							(snapshot) => {
								const percent = Math.round(
									(snapshot.bytesTransferred / snapshot.totalBytes) * 100
								); // update progress

								setPercent(percent);
							},
							(err) => console.log(err),
							() => {
								// download url
								getDownloadURL(uploadTask.snapshot.ref)
									.then((url) => {
										handleSubmit(url);
									})
									.catch((err) => setCheckImage(""))
									.finally((res) => setRequesting(false));
							}
						);
					}
				}
			} else {
				toast.error("post job image cannot be empty");
				setSpinner(false);
			}
		}
	};
	const imageHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
				setCheckImage(e.target.files[0]);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
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
					<div className="py-5 pt-5 md:px-6 px-4 sm:px-6 lg:px-12 border-solid rounded-lg md:rounded-none  mx-3">
						<div className="flex gap-6">
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
						<div>
							{show === 1 && (
								<div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="email"
											customClass="relative mt-2 py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="text"
											placeholder="Name"
											labelText={"Name"}
										/>
									</div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="phone"
											customClass="relative mt-2 py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="text"
											placeholder="Mobile Number"
											labelText={"Mobile Number"}
											labelStyle={"mt-8 mb-2"}
										/>
									</div>
									<div className="">
										<TextInput
											onChange={(e) => handleChange(e)}
											id="fullName"
											customClass="relative mt-2 py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="text"
											placeholder="Email"
											labelText={"Email"}
											labelStyle={"mt-8 mb-2"}
										/>
									</div>
									<div className="">
										<TextInput
											// onChange={(e) => handleChange(e)}
											id="userName"
											customClass="relative mt-2 py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type="password"
											placeholder="Password"
											labelText={"Password"}
											labelStyle={"mt-8 mb-2"}
										/>
									</div>
									<div className="relative">
										<TextInput
											// onChange={(e) => handleChange(e)}
											id="password"
											customClass=" mt-2 mb-6 py-2 rounded-sm border-2 border-solid border-[#F1F1F1] bg-[#ffffff] px-2 outline-none w-full placeholder:text-xs lg:placeholder:text-sm"
											type={showPass ? "text" : "password"}
											placeholder="Confirm Password"
											labelText={"Confirm Password"}
											labelStyle={"mt-8"}
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

							<div
								className={`flex items-center ${show === 2 ? "mt-3" : "mt-9"}`}
							>
								<input
									onChange={(e) => isSetCheck(e.target.checked)}
									id="isActive"
									type="checkbox"
									className="w-4 !mr-2 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
								/>
								<label className=" text-xs lg:text-sm font-medium whitespace-nowrap !overflow-hidden text-gray-500">
									I agree to TASSLEEH {""}
									<Link target={"_blank"} href={"/terms-&-conditions"}>
										<span className="text-primary">terms</span> and{" "}
									</Link>
									<Link target={"_blank"} href={"/privacy-policy"}>
										<span className="text-primary">conditions.</span>
									</Link>
								</label>
							</div>
							{/* <Link href="/compelete-profile"> */}
							<div className="pt-4 flex justify-center">
								<Button
									id="disabled"
									// type="submit"
									text="Create Account"
									customClass=" bg-primary rounded-xl p-2 text-sm font-semibold text-white !w-44 !h-12"
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
						</div>
						{show === 1 ? (
							<div>
								<div className="flex justify-center items-center mt-4">
									<hr className="w-[50px]" />
									<p className="mx-2">or Sign Up With</p>
									<hr className="w-[50px]" />
								</div>
								<div className="flex justify-center items-center gap-8 mt-6">
									<Link href={"https://accounts.google.com/signin"}>
										<button className="">
											<img className="h-10" src="/images/Google.png" alt="" />
										</button>
									</Link>

									<div>
										<Link href={"https://www.facebook.com/"}>
											<button
												// onClick={() => {
												// 	signWithGoogle();
												// }}
												className=""
											>
												<img className="h-10" src="/images/fb.png" alt="" />
											</button>
										</Link>
									</div>
								</div>
							</div>
						) : null}
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

export default SignUp;
