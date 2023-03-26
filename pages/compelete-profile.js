import NewsLetter from "../components/NewsLetter";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { signupUser } from "../services/auth-service";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";
import Head from "next/head";
import { useRouter } from "next/router";
import storage from "../config/firebaseConfig";
import { ImSpinner9 } from "react-icons/im";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { Calendar } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import moment from "moment";

const CompeleteProfile = () => {
	const router = useRouter();
	const [address, setAddress] = useState("");
	const [checkImage, setCheckImage] = useState("");
	const [image, setImage] = useState("");
	const [requesting, setRequesting] = useState(false);
	const [percent, setPercent] = useState(0);
	const [spinner, setSpinner] = useState(false);
	const [jobSector, setJobSector] = useState([]);
	const [data, setData] = useState({});
	const [date, setDate] = useState(null);
	const [showCalender, setShowCalender] = useState(false);
	
	console.log(data,"data is here")
	useEffect(() => {
		const gettingData = localStorage.getItem("userData");
		const signData = JSON.parse(gettingData);
		if (signData?.type === "user") {
			setImage(signData?.image);
		} else {
			setImage(signData?.businessImage);
		}
		setData(signData);
		// console.log(data);
	}, []);
	const dataChange = (e) => {
		const employee = document.getElementById("employee");
		const business = document.getElementById("business");
		if (e.target.value == "tag1" && e.target.checked === true) {
			setData({ ...data, type: "user" });
			employee.style.display = "block";
			business.style.display = "none";
		}
		if (e.target.value == "tag2" && e.target.checked === true) {
			business.style.display = "block";
			employee.style.display = "none";
			setData({ ...data, type: "business" });
		}
	};
	const handleSelectEmployee = async (value, placeId, suggestion) => {
		const results = await geocodeByAddress(value);
		const ll = await getLatLng(results[0]);
		setAddress(value);
		const [place] = await geocodeByPlaceId(placeId);
		setData({
			...data,
			address: value,
			lat: ll.lat,
			long: ll.lng,
		});
	};
	const handleSelect = async (value, placeId, suggestion) => {
		const results = await geocodeByAddress(value);
		const ll = await getLatLng(results[0]);
		setAddress(value);
		const [place] = await geocodeByPlaceId(placeId);
		setData({
			...data,
			address: value,
			businesslat: ll.lat,
			businesslong: ll.lng,
		});
	};
	const handleSubmit = (url) => {
		// if (validate()) {
		let payload = data;
		if (payload.type === "user") {
			payload.image = url;
			if (data.type === "user") {
				payload.jobSectors = jobSector;
			}
		} else {
			payload.businessImage = url || image;
		}
		signupUser(payload)
			.then((res) => {
				if (res?.data?.success === false) {
					toast.success(res?.data?.message);
					setSpinner(false);
				}
				if (res?.data?.success === true) {
					toast.success(res?.data?.message);
					setSpinner(false);
					localStorage.removeItem("userData");
					router.push("signin");
				}
			})
			.catch((err) => {
				toast.error(err);
				setSpinner(false);
			});
	};
	const handleCheckBox = (e) => {
		if (e.target.checked) {
			setJobSector([...jobSector, e.target.name]);
		}
		if (!e.target.checked) {
			let res = jobSector?.filter((item, index) => item !== e.target.name);
			setJobSector(res);
		}
	};
	// console.log(data);
	const handleData = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};
	const validate = () => {
		if (data.type === "user") {
			const firstName = document.getElementById("firstName");
			const lastName = document.getElementById("lastName");
			const email = document.getElementById("email");
			const DOB = document.getElementById("DOB");
			const postCode = document.getElementById("postCode");
			const employStatus = document.getElementById("employStatus");
			const address = document.getElementById("address");
			if (firstName.value === "") {
				toast.warn("First name cannot be empty");
				setSpinner(false);
				return false;
			}
			if (lastName.value === "") {
				toast.warn("Last name cannot be empty");
				setSpinner(false);
				return false;
			}
			if (email.value === "") {
				toast.warn("Email cannot be empty");
				setSpinner(false);
				return false;
			}
			if (DOB.value === "") {
				toast.warn("Date of birth cannot be empty");
				setSpinner(false);
				return false;
			}
			if (postCode.value === "") {
				toast.warn("Postal code cannot be empty");
				setSpinner(false);
				return false;
			}
			if (employStatus.value === "") {
				toast.warn("Employee status cannot be empty");
				setSpinner(false);
				return false;
			}
			if (address.value === "") {
				toast.warn("Address cannot be empty");
				setSpinner(false);
				return false;
			}
			if (address.value === "") {
				toast.warn("Address cannot be empty");
				setSpinner(false);
				return false;
			}
			if (jobSector.length === 0) {
				toast.warn("Job sectors cannot be empty");
				setSpinner(false);
				return false;
			}
			return true;
		}
		if (data.type === "business") {
			const businessName = document.getElementById("businessName");
			const businessEmail = document.getElementById("businessEmail");
			const businessArea = document.getElementById("businessArea");
			const address = document.getElementById("address");
			const independentOrFranchise = document.getElementById(
				"independentOrFranchise"
			);
			const businessMobileNumber = document.getElementById(
				"businessMobileNumber"
			);
			const businessTelephoneNumber = document.getElementById(
				"businessTelephoneNumber"
			);
			const businessManagerName = document.getElementById(
				"businessManagerName"
			);
			const businessType = document.getElementById("businessType");
			if (businessName.value === "") {
				toast.warn("Business name cannot be empty");
				setSpinner(false);
				return false;
			}
			if (businessEmail.value === "") {
				toast.warn("Business email cannot be empty");
				setSpinner(false);
				return false;
			}
			if (businessArea.value === "") {
				toast.warn("Business area cannot be empty");
				setSpinner(false);
				return false;
			}
			if (address.value === "") {
				toast.warn("Business address cannot be empty");
				setSpinner(false);
				return false;
			}
			if (independentOrFranchise.value === "") {
				toast.warn("Business independent Or franchise cannot be empty");
				setSpinner(false);
				return false;
			}
			if (businessMobileNumber.value === "") {
				toast.warn("Business mobile number cannot be empty");
				setSpinner(false);
				return false;
			}
			if (businessTelephoneNumber.value === "") {
				toast.warn("Business telephone number cannot be empty");
				setSpinner(false);
				return false;
			}
			if (businessManagerName.value === "") {
				toast.warn("Business manager name cannot be empty");
				setSpinner(false);
				return false;
			}
			if (businessType.value === "") {
				toast.warn("Business type cannot be empty");
				setSpinner(false);
				return false;
			}
			return true;
		}
	};
	const handleFile = (e) => {
		e.preventDefault();
		setSpinner(true);
		if (image) {
			if (validate()) {
				if (checkImage) {
					const file = checkImage;
					if (file) {
						const preview = URL.createObjectURL(file);
						// setFile({ obj: file, preview });
						// e.target.value = "";
						const storageRef = ref(storage, `/client/profile/${file.name}`);
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
				} else {
					handleSubmit(data?.image);
				}
			}
		} else if (data?.image) {
			handleSubmit(data?.image);
		} else {
			toast.warn("Please upload profile image");
			setSpinner(false);
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
	return (
		<div>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 bg-transparent fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto  top-[55px] relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<div className="border w-[95%] m-auto rounded-2xl shadow-xl md:my-10 ">
				<h1 className="uppercase text-[#110229] text-2xl text-center font-bold line w-max	 m-auto whitespace-nowrap py-10 ">
					Complete your <span className="text-primary">profile</span>
				</h1>
				<div className="md:mx-14 px-5">
					<h5 className="font-semibold text-2xl text-center md:text-left text-[#110229]">
						Your Account Type:
					</h5>
					<div className="flex justify-center md:justify-start">
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
								forHtml="default-radio-1"
								className="ml-2 mr-5  text-sm whitespace-nowrap  font-medium text-gray-900 "
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
								forHtml="default-radio-2"
								className="ml-2 text-sm whitespace-nowrap font-medium text-gray-900 "
							>
								Business Account
							</label>
						</div>
					</div>
					<form id="employee">
						<div>
							<div className="md:flex">
								{/* Upload Image code start */}
								<div className="w-fit mx-auto md:mx-0">
									<div className="relative top-48 right-[-11.5rem] z-10   w-fit overflow-hidden">
										<input
											type={"file"}
											name="profilePic"
											className="absolute top-0 left-0 !w-20 h-full opacity-0 cursor-pointer"
											accept="/image/*"
											onChange={imageHandler}
										/>
										<img
											src="/images/profileicon.png"
											className="block "
											alt=""
										/>
									</div>

									<div className="w-[200px] h-[200px] rounded-full bg-gray-300 overflow-hidden  relative">
										<img
											className={` object-contain w-full h-full relative  ${
												requesting ? "blur-sm" : ""
											} `}
											src={image ? image : "/images/proDummy.png"}
										/>
										{percent > 0 && percent < 100 ? (
											<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-1 bg-white font-bold text-xl bg-opacity-80">
												{percent}%
											</div>
										) : null}
									</div>
								</div>
								<div className="md:m-10 ">
									<div className="md:flex  gap-5 my-20">
										<div className="  basis-full pb-6 md:pb-0">
											<div className="basis-full">
												<TextInput
													placeholder="First Name"
													onChange={handleData}
													id="firstName"
												/>
											</div>
										</div>
										<div className="basis-full ">
											<div className="basis-full">
												<TextInput
													placeholder="Last Name"
													onChange={handleData}
													id="lastName"
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Upload Image code end */}
							</div>
						</div>
						<div>
							<div className="md:py-14">
								<h5 className="font-semibold text-2xl text-[rgb(17,2,41)]">
									Basic Information
								</h5>
								<div className="md:flex basis-full gap-5 my-6">
									<div className="basis-full pb-6 md:pb-0">
										<TextInput
											value={data?.email}
											readOnly
											placeholder="Your Email"
											onChange={handleData}
											id="email"
										/>
									</div>
									<div className="basis-full">
										<input
											// type="calenderdate"
											onClick={()=> setShowCalender(!showCalender)}
											onChange={handleData}
											className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
											placeholder="Date of Birth"
											id="DOB"
											value={date ? moment(date).format("DD/MM/YYYY") : "Date of Birth" }
											// value={data.DOB}
											// value={date ? "invalid date" : "asdsd"}
											required
										/>
										{showCalender && (
											<div>
												<div className="fixed bg-black !min-h-screen min-w-screen z-50"></div>
												<div className="absolute bg-white z-50">
													<Calendar
														onChange={(item) => {
															let dates = moment(item).format("DD/MM/YYYY");
															setDate(item);
															setData({ ...data, DOB: dates });
															setShowCalender(!showCalender);
														}}
														date={date}
													/>
												</div>
											</div>
										)}
									</div>
								</div>
								<div className="md:flex basis-full gap-5 my-6">
									<div className="basis-full pb-6 md:pb-0">
										<TextInput
											placeholder="Your Post Code"
											onChange={handleData}
											id="postCode"
										/>
									</div>
									<div className="basis-full">
										<TextInput
											placeholder="Your Employment Status"
											onChange={handleData}
											id="employStatus"
										/>
									</div>
								</div>
								<div className="basis-full pb-3 sm:pb-0">
									{/* <TextInput
										onChange={handleData}
										placeholder="Your Business Location"
										id="address"
									/> */}
									<PlacesAutocomplete
										value={address}
										onChange={setAddress}
										onSelect={handleSelectEmployee}
									>
										{({
											getInputProps,
											suggestions,
											getSuggestionItemProps,
											loading,
										}) => {
											// console.log(address, suggestions, loading, "loading");
											// console.log(address, "full address");
											return (
												<div className="relative">
													<TextInput
														// onChange={handleAddress}
														id="address"
														{...getInputProps({
															placeholder: "Employee Address",
															className: "location-search-input",
														})}
													/>
													<div className="autocomplete-dropdown-container">
														{loading && <div>Loading...</div>}
														{suggestions.map((suggestion) => {
															const className = suggestion.active
																? "suggestion-item--active"
																: "suggestion-item";
															// inline style for demonstration purpose
															const style = suggestion.active
																? {
																		backgroundColor: "#fafafa",
																		cursor: "pointer",
																		padding: "10px 0px",
																  }
																: {
																		backgroundColor: "#ffffff",
																		cursor: "pointer",
																		padding: "10px 0px",
																  };
															return (
																<div
																	{...getSuggestionItemProps(suggestion, {
																		className,
																		style,
																	})}
																>
																	<span>{suggestion.description}</span>
																</div>
															);
														})}
													</div>
												</div>
											);
										}}
									</PlacesAutocomplete>
								</div>
							</div>
						</div>
						<div>
							<div className=" ">
								<h5 className="font-semibold text-2xl text-[#110229]">
									Job Sectors interested in
								</h5>
								<div className="md:flex py-5 sm:whitespace-nowrap">
									<div>
										<div className="flex items-center">
											<div className="flex items-center gap-6">
												<div>
													<input
														id="checked-checkbox"
														type="checkbox"
														onChange={handleCheckBox}
														value=""
														name="Accountancy, Banking and Finance"
														className="w-5 h-4"
													/>
												</div>
												<div className="mb-0.5">
													<label className=" text-lg font-medium text-gray-600 ">
														Accountancy, Banking and Finance
													</label>
												</div>
											</div>
										</div>
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Energy and Utilities"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Energy and Utilities{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center gap-6 py-2">
											<div>
												<input
													onChange={handleCheckBox}
													id="checked-checkbox"
													type="checkbox"
													name="Environment and Agriculture"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Environment and Agriculture{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center gap-6 py-2">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Hospitality and Events Management"
													value=""
													className="w-5 h-4"
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Hospitality and Events Management{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													id="checked-checkbox"
													type="checkbox"
													onChange={handleCheckBox}
													name="Law"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600">
													Law{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Leisure, Sport and Tourism"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Leisure, Sport and Tourism{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Media and Internet"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Media and Internet{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Public Services and Administration"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Public Services and Administration{" "}
												</label>
											</div>
										</div>
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Retail and Sales"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Retail and Sales{" "}
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													onChange={handleCheckBox}
													id="checked-checkbox"
													type="checkbox"
													name="Social Care"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Social Care
												</label>
											</div>
										</div>
									</div>
									{/* col 2 */}
									<div className="md:pl-40">
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													name="Healthcare"
													type="checkbox"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Healthcare
												</label>
											</div>
										</div>
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Information Technology"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Information Technology
												</label>
											</div>
										</div>
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													name="Law Enforcement and Security"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Law Enforcement and Security{" "}
												</label>
											</div>
										</div>

										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													onChange={handleCheckBox}
													id="checked-checkbox"
													type="checkbox"
													name="Marketing, Advertising and PR"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Marketing, Advertising and PR
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													id="checked-checkbox"
													type="checkbox"
													onChange={handleCheckBox}
													name="Property and Construction"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Property and Construction
												</label>
											</div>
										</div>
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													onChange={handleCheckBox}
													id="checked-checkbox"
													type="checkbox"
													name="Recruitment and HR"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Recruitment and HR
												</label>
											</div>
										</div>
										<div className="flex items-center gap-7 py-2">
											<div>
												<input
													id="checked-checkbox"
													type="checkbox"
													onChange={handleCheckBox}
													name="Science and Pharmaceuticals Teacher Training and
												Education"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Science and Pharmaceuticals Teacher Training and
													Education
												</label>
											</div>
										</div>
										<div className="flex gap-6 items-center py-2">
											<div>
												<input
													onChange={handleCheckBox}
													id="checked-checkbox"
													type="checkbox"
													name="Teacher Training and Education"
													value=""
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
												/>
											</div>

											<div className="mb-0.5">
												<label className=" text-lg font-medium text-gray-600 ">
													Teacher Training and Education
												</label>
											</div>
										</div>
										<div className="flex items-center py-2 gap-6">
											<div>
												<input
													id="checked-checkbox"
													onChange={handleCheckBox}
													type="checkbox"
													value=""
													name="Transport and Logistics"
													className="w-5 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
												/>
											</div>
											<div className="mb-0.5">
												<label className="text-lg font-medium text-gray-600 ">
													Transport and Logistics
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className="flex justify-center mb-9">
									<Button
										onClick={handleFile}
										text="Save"
										customClass="bg-primary rounded-md  text-lg font-semibold text-white !w-24 !h-10"
									/>
								</div>
							</div>
						</div>
					</form>
					{/* compeleted to upsides */}

					{/* business profile */}

					<form id="business" className="hidden">
						<div>
							<div className="md:flex">
								<div className="">
									<div className="relative top-48 right-[-11.5rem] z-10  w-fit overflow-hidden">
										<input
											type={"file"}
											name="profilePic"
											className=" absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer  "
											accept="/image/*"
											onChange={imageHandler}
										/>

										<img
											src="/images/profileicon.png"
											className="hidden md:block "
											alt=""
										/>
									</div>

									<div className="w-[200px] h-[200px] rounded-full bg-gray-300 overflow-hidden  relative">
										<img
											className={` object-contain w-full h-full relative  ${
												requesting ? "blur-sm" : ""
											} `}
											src={image ? image : "/images/proDummy.png"}
										/>
										{percent > 0 && percent < 100 ? (
											<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-1 bg-white font-bold text-xl bg-opacity-80">
												{percent}%
											</div>
										) : null}
									</div>
								</div>
								<div className="md:m-10">
									<div className="my-20  ">
										<TextInput
											placeholder="Your Business Name"
											id="businessName"
											onChange={handleData}
											required
										/>
									</div>
									{/* <div className="pb-7 flex justify-center md:justify-start">
										<Button
											text="Choose File"
											customClass="bg-primary rounded-md p-2 text-sm font-semibold text-white !w-36 !h-12"
										/>
										<Button
											text="No file chosen"
											customClass="bg- rounded-md p-2 text-sm !w-36 !h-12"
										/>
									</div> */}
								</div>
							</div>
						</div>
						<div className="md:py-14 py-8">
							<h5 className="font-semibold text-2xl text-[#110229]">
								Basic Information
							</h5>
							<div className="sm:flex items-center gap-6  pt-10">
								<div className=" basis-full pb-3 sm:pb-0">
									<TextInput
										id="businessEmail"
										onChange={handleData}
										placeholder="Your Business Email"
									/>
								</div>
								<div className=" basis-full">
									<TextInput
										onChange={handleData}
										placeholder="Your Business Area"
										id="businessArea"
									/>
								</div>
							</div>
							<div className="sm:flex items-center gap-6 my-3 sm:my-5">
								<div className="basis-full pb-3 sm:pb-0">
									{/* <TextInput
										onChange={handleData}
										placeholder="Your Business Location"
										id="address"
									/> */}
									<PlacesAutocomplete
										value={address}
										onChange={setAddress}
										onSelect={handleSelect}
									>
										{({
											getInputProps,
											suggestions,
											getSuggestionItemProps,
											loading,
										}) => {
											// console.log(address, suggestions, loading, "loading");
											// console.log(address, "full address");
											return (
												<div className="relative">
													<TextInput
														// onChange={handleAddress}
														placeholder="Job Location"
														id="address"
														{...getInputProps({
															placeholder: "Address",
															className: "location-search-input",
														})}
													/>
													<div className="autocomplete-dropdown-container">
														{loading && <div>Loading...</div>}
														{suggestions.map((suggestion) => {
															const className = suggestion.active
																? "suggestion-item--active"
																: "suggestion-item";
															// inline style for demonstration purpose
															const style = suggestion.active
																? {
																		backgroundColor: "#fafafa",
																		cursor: "pointer",
																		padding: "10px 0px",
																  }
																: {
																		backgroundColor: "#ffffff",
																		cursor: "pointer",
																		padding: "10px 0px",
																  };
															return (
																<div
																	{...getSuggestionItemProps(suggestion, {
																		className,
																		style,
																	})}
																>
																	<span>{suggestion.description}</span>
																</div>
															);
														})}
													</div>
												</div>
											);
										}}
									</PlacesAutocomplete>
								</div>
								<div className="basis-full">
									<TextInput
										placeholder="Your Independent or Franchise"
										onChange={handleData}
										id="independentOrFranchise"
									/>
								</div>
							</div>
							<div className="sm:flex items-center gap-6 my-3 sm:my-5">
								<div className="basis-full pb-3 sm:pb-0">
									<TextInput
										onChange={handleData}
										placeholder="Your Mobile Number"
										id="businessMobileNumber"
									/>
								</div>
								<div className="basis-full">
									<TextInput
										onChange={handleData}
										placeholder="Your Telephone Number"
										id="businessTelephoneNumber"
									/>
								</div>
							</div>
							<div className="sm:flex items-center gap-6 my-3 sm:my-5">
								<div className="basis-full pb-3 sm:pb-0">
									<TextInput
										onChange={handleData}
										placeholder="Your Manager Name"
										id="businessManagerName"
									/>
								</div>
								<div className="basis-full">
									<div className="basis-full pb-3 sm:pb-0">
										<TextInput
											onChange={handleData}
											placeholder="Your Business Type"
											id="businessType"
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-center mt-10">
								<Button
									type="submit"
									onClick={handleFile}
									text="Save"
									customClass="bg-primary rounded-md  text-sm font-semibold text-white !w-24 !h-10"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>

			{/* NewsLetter */}
			<div className="mt-5">
				<NewsLetter />
			</div>
		</div>
	);
};

export default CompeleteProfile;
