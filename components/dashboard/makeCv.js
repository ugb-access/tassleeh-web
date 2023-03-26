import { useEffect, useState } from "react";
import Button from "../Button";
import ProfileDetails from "../common/ProfileDetails";
import TextInput from "../TextInput";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";
import { userMakeCv } from "../../services/auth-service";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";
import storage from "../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Router, { useRouter } from "next/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { BsFillPhoneFill } from "react-icons/bs";
import { FaCity, FaBirthdayCake } from "react-icons/fa";
import { RxDot } from "react-icons/rx";
import { ImLocation2, ImPhone } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
const MakeCv = () => {
	const show = false;
	const router = useRouter();
	const [address, setAddress] = useState("");
	const [spinner, setSpinner] = useState(false);
	const [checkImage, setCheckImage] = useState("");
	const [image, setImage] = useState("");
	const [requesting, setRequesting] = useState(false);
	const [percent, setPercent] = useState(0);
	const [data, setData] = useState({
		image: "",
		firstName: "",
		lastName: "",
		jobTitle: "",
		country: "",
		city: "",
		state: "",
		zipCode: "",
		mobileNumber: "",
		telephoneNumber: "",
		DOB: "",
		address: "",
		summary: "",
		education: [],
		professionalExperience: [],
		skills: [],
	});
	const [educationCv, setEducationCv] = useState([
		{
			schoolName: "",
			schoolLocation: "",
			startMonth: "",
			endMonth: "",
			startYear: "",
			endYear: "",
			degree: "",
			fieldsOfStudy: "",
			educationDescription: "",
		},
	]);
	const [professionalCv, setProfessionalCv] = useState([
		{
			schoolName: "",
			schoolLocation: "",
			startMonth: "",
			endMonth: "",
			startYear: "",
			endYear: "",
		},
	]);
	const [keySkills, setKeySkills] = useState([
		{
			keySkill: "",
		},
	]);
	const handleSelect = async (value, placeId, suggestion) => {
		const results = await geocodeByAddress(value);
		const ll = await getLatLng(results[0]);
		setData({ ...data, lat: ll.lat, long: ll.lng });
		// setData({ ...data,  });
		// console.log(ll);
		setAddress(value);
		const [place] = await geocodeByPlaceId(placeId);
		// console.log(place, "HASHAM");
		const { long_name: localCity = "" } =
			place.address_components.find((c) => c.types.includes("locality")) || {};
		const { long_name: postalCode = "" } =
			place.address_components.find((c) => c.types.includes("postal_code")) ||
			{};
		const { long_name: localState = "" } =
			place.address_components.find((c) =>
				c.types.includes("administrative_area_level_1")
			) || {};
		const { long_name: country = "" } =
			place.address_components.find((c) => c.types.includes("country")) || {};

		setData((prev) => ({
			...prev,
			country: country,
			city: localCity,
			zipCode: postalCode,
			state: localState,
			address: address,
		}));
	};
	const handleEducation = (e, index) => {
		const educationData = [...educationCv];
		const obj = educationData[index];
		obj[e.target.id] = e.target.value;
		educationData[index] = obj;
		setEducationCv(educationData);
		setData({ ...data, education: educationData });
	};
	const handlePro = (e, index) => {
		const proData = [...professionalCv];
		const objPro = proData[index];
		objPro[e.target.id] = e.target.value;
		proData[index] = objPro;
		setProfessionalCv(proData);
		setData({ ...data, professionalExperience: proData });
	};
	const handleSkills = (e, index) => {
		const skillsData = [...keySkills];
		const objKey = skillsData[index];
		objKey[e.target.id] = e.target.value;
		skillsData[index] = objKey;
		setKeySkills(skillsData);
		setData({ ...data, skills: skillsData });
	};
	// console.log(data);
	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};
	const handleValidation = () => {
		if (data.firstName === "") {
			toast.error("First Name cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.lastName === "") {
			toast.error("Last Name cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.jobTitle === "") {
			toast.error("Job title cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.address === "") {
			toast.error("Address cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.city === "") {
			toast.error("City cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.state === "") {
			toast.error("State cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.zipCode === "") {
			toast.error("ZipCode cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.country === "") {
			toast.error("Country cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.telephoneNumber === "") {
			toast.error("Telephone number cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.DOB === "") {
			toast.error("Date of birth cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.mobileNumber === "") {
			toast.error("Mobile number cannot be empty");
			setSpinner(false);
			return false;
		}
		if (educationCv.schoolName === "") {
			toast.error("Mobile number cannot be empty");
			setSpinner(false);
			return false;
		}

		if (
			educationCv.find((obj) => {
				return (
					obj.schoolName === "" ||
					obj.schoolLocation === "" ||
					obj.startMonth === "" ||
					obj.startYear === "" ||
					obj.endMonth === "" ||
					obj.endYear === "" ||
					obj.degree === "" ||
					obj.fieldsOfStudy === ""
				);
			})
		) {
			toast.error("Education fields cannot be empty");
			setSpinner(false);
			return false;
		}
		if (
			professionalCv.find((obj) => {
				return (
					obj.schoolName === "" ||
					obj.schoolLocation === "" ||
					obj.startMonth === "" ||
					obj.startYear === "" ||
					obj.endMonth === "" ||
					obj.endYear === ""
				);
			})
		) {
			toast.error("Professional Experience fields cannot be empty");
			setSpinner(false);
			return false;
		}
		if (
			keySkills.find((obj) => {
				return obj.keySkill === "";
			})
		) {
			toast.error("KeySkills Experience fields cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.summary === "") {
			toast.error("CV summary cannot be empty");
			setSpinner(false);
			return false;
		}
		return true;
	};
	const handleSubmit = (url) => {
		let body = data;
		body.image = url;
		userMakeCv(body)
			.then((res) => {
				if (res?.data?.success) {
					toast.success("CV created successfully");
					setSpinner(false);
					// router.push("/employee/dashboard");
				} else {
					toast.warn(res?.data?.message);
					setSpinner(false);
				}
			})
			.catch((err) => {
				toast.error(err?.message ? err?.message : "Something went wrong");
			});
	};
	const handleAddSection = (type) => {
		if (type == "education") {
			let eduArr = [...educationCv];
			eduArr.push({
				schoolName: "",
				schoolLocation: "",
				startMonth: "",
				endMonth: "",
				startYear: "",
				endYear: "",
				degree: "",
				fieldsOfStudy: "",
			});
			setEducationCv(eduArr);
		}
		if (type == "professional") {
			let proArr = [...professionalCv];
			proArr.push({
				schoolName: "",
				schoolLocation: "",
				startMonth: "",
				endMonth: "",
				startYear: "",
				endYear: "",
			});
			setProfessionalCv(proArr);
		}
		if (type == "keySkills") {
			let keyArr = [...keySkills];
			keyArr.push({
				keySkills: "",
			});
			setKeySkills(keyArr);
		}
	};
	const handleFile = () => {
		setSpinner(true);
		if (image) {
			if (handleValidation()) {
				if (checkImage) {
					handleImport();
					const file = checkImage;
					if (file) {
						const preview = URL.createObjectURL(file);
						// setFile({ obj: file, preview });
						// e.target.value = "";
						const storageRef = ref(
							storage,
							`/client/cvProfileImage/${file.name}`
						);
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
	const handleImport = () => {
		if (screen.width < 1024) {
			document
				.querySelector("meta[name=viewport]")
				.setAttribute("content", "width=1200");
		}
		const prints = document.getElementById("downloadPDF");
		// convert convas into string url
		html2canvas(prints, {
			allowTaint: false,
			removeContainer: true,
			backgroundColor: "#ffffff",
			scale: window.devicePixelRatio,
			useCORS: false,
		}).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");

			let imgWidth = 210;
			let pageHeight = 297;
			let imgHeight = (canvas.height * imgWidth) / canvas.width;
			let heightLeft = imgHeight;

			let pdfConverter = new jsPDF("p", "mm");
			let position = 0;
			pdfConverter.addImage(
				imgData,
				"PNG",
				0,
				5 + position,
				imgWidth,
				imgHeight
			);
			heightLeft -= pageHeight;

			while (heightLeft >= 0) {
				position = heightLeft - imgHeight;
				console.log(position);
				pdfConverter.addPage();
				pdfConverter.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
			}

			pdfConverter.save(`${data.firstName}'s Resume.pdf`);
			if (screen.width < 1024) {
				document
					.querySelector("meta[name=viewport]")
					.setAttribute("content", "width=device-width, initial-scale=1");
			}
		});
	};
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100%] w-[200%] z-50 right-0 bottom-0 bg-white fixed"></div>
					<div className="z-50  rounded-xl my-auto h-screen sm:right-60 bottom-28 items-center   relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<div
				className=" w-[97%] m-auto rounded-md pb-10 "
				style={{
					boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
				}}
			>
				<div className="ml-5">
					<h5 className="py-5 font-semibold text-xl text-[#110229]">
						Contact Information
					</h5>
					<div className="md:flex md:items-center">
						{/* Upload Image code start */}
						<div className="w-fit mx-auto md:mx-0">
							<div className="relative top-48 right-[-11.5rem] z-10  w-fit overflow-hidden">
								<input
									type={"file"}
									name="profilePic"
									className=" absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
									accept="/image/*"
									onChange={imageHandler}
								/>

								<img src="/images/profileicon.png" className="" alt="" />
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
						<div className="md:mx-10 ">
							<div className="md:flex gap-5  mt-7 md:mt-16 mb-4">
								<div className="basis-full pb-6 pr-4 sm:pr-0 md:pb-0">
									<div className="basis-full">
										<TextInput
											placeholder="First Name"
											onChange={handleChange}
											id="firstName"
										/>
									</div>
								</div>
								<div className="basis-full pr-4 sm:pr-0">
									<div className="basis-full">
										<TextInput
											placeholder="Last Name"
											onChange={handleChange}
											id="lastName"
										/>
									</div>
								</div>
							</div>
						</div>
						{/* Upload Image code end */}
					</div>
					{/* profile details  */}
					<ProfileDetails ProfileDetImg="/images/profilepic.png" />
					<div className="mr-5">
						<div className="flex items-end gap-5 pb-7 md:pt-7 ">
							<div className="basis-full">
								<input
									onChange={(e) => handleChange(e)}
									id="jobTitle"
									className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full  p-2.5 outline-none"
									placeholder="Job Title"
									required
								/>
							</div>
							<div className="basis-full">
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
										return (
											<div className="relative">
												<TextInput
													// onChange={handleAddress}
													placeholder="Job Location"
													id="address"
													customClass="!mt-2"
													{...getInputProps({
														placeholder: "Job Location",
														className: "location-search-input",
													})}
												/>
												<div className="autocomplete-dropdown-container absolute">
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
						<div className="flex items-end gap-5 pb-7 ">
							<input
								type=""
								onChange={(e) => handleChange(e)}
								id="city"
								value={data.city}
								className="bg-gray-50 border  border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm !w-full p-2.5 outline-none"
								placeholder="City"
								required
							/>
							<input
								onChange={(e) => handleChange(e)}
								type=""
								value={data.state}
								id="state"
								className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
								placeholder="State"
								required
							/>
						</div>
						<div className="flex items-end gap-5 pb-7 ">
							<input
								type=""
								value={data.zipCode}
								id="zipCode"
								className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
								onChange={(e) => handleChange(e)}
								placeholder="Zip Code"
								required
							/>
							<input
								type=""
								id="country"
								value={data.country}
								className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
								onChange={(e) => handleChange(e)}
								placeholder="Country"
								required
							/>
						</div>
						<div className="flex items-end gap-5 pb-7 ">
							<input
								type=""
								id="telephoneNumber"
								className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
								onChange={(e) => handleChange(e)}
								placeholder="Telephone Number"
								required
							/>
							<input
								type="date"
								onChange={(e) => handleChange(e)}
								id="DOB"
								className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
								placeholder="Date of Birth"
								required
							/>
						</div>
						<input
							type=""
							id="mobileNumber"
							className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
							onChange={(e) => handleChange(e)}
							placeholder="Mobile Number"
							required
						/>
					</div>
					{/* EDUCATION */}
					<div className="flex pt-10 justify-between mr-5">
						<div className="text-xl font-semibold">Education</div>
						<div>
							<Button
								text="+ ADD SECTION"
								customClass="text-red-700 text-md font-semibold"
								onClick={() => handleAddSection("education")}
							/>
						</div>
					</div>
					{educationCv.map((item, index) => {
						return (
							<div className="mr-5">
								<div className="flex justify-between">
									<span className="!font-bold !my-5">{index + 1}-</span>
									<span
										onClick={() => {
											// console.log(educationCv);
											educationCv.splice(index, 1);
											setKeySkills([...educationCv]);
										}}
										className="!font-bold !my-5 text-red-700 text-3xl cursor-pointer"
									>
										-
									</span>
								</div>
								<div className="flex items-end gap-5 pb-7  pt-3">
									<input
										onChange={(e) => handleEducation(e, index)}
										type=""
										id="schoolName"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Institute Name"
										required
									/>
									<input
										onChange={(e) => handleEducation(e, index)}
										type=""
										id="schoolLocation"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Institute Location"
										required
									/>
								</div>
								<div className="flex items-end gap-5 pb-7 ">
									<input
										onChange={(e) => handleEducation(e, index)}
										id="startMonth"
										min="1"
										max="12"
										placeholder="Start Month"
										type="number"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>

									<input
										onChange={(e) => handleEducation(e, index)}
										id="startYear"
										type="number"
										min="1"
										placeholder="Start Year"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>
								</div>
								<div className="flex items-end gap-5 pb-7 ">
									<input
										onChange={(e) => handleEducation(e, index)}
										type="number"
										id="endMonth"
										min="1"
										max="12"
										placeholder="End Month"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>
									<input
										onChange={(e) => handleEducation(e, index)}
										placeholder="End Year"
										type="number"
										id="endYear"
										min="1"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>
								</div>
								<div className="flex items-end gap-5 pb-7 ">
									<input
										onChange={(e) => handleEducation(e, index)}
										type=""
										id="degree"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Degree"
										required
									/>
									<input
										onChange={(e) => handleEducation(e, index)}
										type=""
										id="fieldsOfStudy"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Field of Study"
										required
									/>
								</div>
								{/* <div>
									{" "}
									<textarea
										onChange={(e) => handleEducation(e, index)}
										type=""
										id="educationDescription"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-28   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Description"
										required
									/>
								</div> */}
							</div>
						);
					})}

					{/* Proffessional Experience */}
					<div className="flex pt-10 justify-between mr-5">
						<div className="text-xl font-semibold">
							Proffessional Experience
						</div>
						<div>
							<Button
								text="+ ADD SECTION"
								customClass="text-red-700 text-md font-semibold"
								onClick={() => handleAddSection("professional")}
							/>
						</div>
					</div>
					{professionalCv.map((item, index) => {
						return (
							<div className="mr-5">
								<div className="flex justify-between">
									<span className="!font-bold !my-5">{index + 1}-</span>
									<span
										onClick={() => {
											// console.log(professionalCv);
											professionalCv.splice(index, 1);
											setKeySkills([...professionalCv]);
										}}
										className="!font-bold !my-5 text-red-700 text-3xl cursor-pointer"
									>
										-
									</span>
								</div>
								<div className="flex items-end gap-5 pb-7  pt-3">
									<input
										type=""
										onChange={(e) => handlePro(e, index)}
										id="schoolName"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Position"
										required
									/>
									<input
										type=""
										onChange={(e) => handlePro(e, index)}
										id="schoolLocation"
										className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
										placeholder="Company Name"
										required
									/>
								</div>
								<div className="flex items-end gap-5 pb-7 ">
									<input
										onChange={(e) => handlePro(e, index)}
										id="startMonth"
										placeholder="Start Month"
										min="1"
										max="12"
										type="number"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>

									<input
										onChange={(e) => handlePro(e, index)}
										min="1"
										id="startYear"
										type="number"
										placeholder="Start Year"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>
								</div>
								<div className="flex items-end gap-5 pb-7 ">
									<input
										onChange={(e) => handlePro(e, index)}
										type="number"
										id="endMonth"
										min="1"
										max="12"
										placeholder="End Month"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>
									<input
										onChange={(e) => handlePro(e, index)}
										min="1"
										placeholder="End Year"
										type="number"
										id="endYear"
										className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
									/>
								</div>
							</div>
						);
					})}
					{/* Key Skills */}
					<div className="flex pt-10 justify-between mr-5">
						<div className="text-xl font-semibold">Key Skills</div>
						<div>
							<Button
								text="+ ADD SECTION"
								customClass="text-red-700 text-md font-semibold"
								onClick={() => handleAddSection("keySkills")}
							/>
						</div>
					</div>
					{keySkills.map((item, index) => {
						return (
							<div className="mr-5 pt-3">
								<div className="flex justify-between">
									<span className="!font-bold !my-5">{index + 1}-</span>
									<span
										onClick={() => {
											// console.log(keySkills);
											keySkills.splice(index, 1);
											setKeySkills([...keySkills]);
										}}
										className="!font-bold !my-5 text-red-700 text-3xl cursor-pointer"
									>
										-
									</span>
								</div>
								<input
									onChange={(e) => handleSkills(e, index)}
									id="keySkill"
									placeholder="Enter Key Skills"
									className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
								/>
							</div>
						);
					})}

					{/* Key Skills */}
					<div className="flex pt-10 justify-between mr-5">
						<div className="text-xl font-semibold">Summary </div>
					</div>
					<div className="mr-5 pt-3">
						<textarea
							type=""
							onChange={(e) => handleChange(e)}
							id="summary"
							className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-28   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
							placeholder="Professional summary introduces you to hiring managers."
							required
						/>
					</div>
					<div className="flex justify-center my-8">
						<Button
							onClick={handleFile}
							text="Confirm"
							customClass="bg-primary rounded-md  text-sm font-semibold text-white !w-24 !h-10"
						/>
					</div>
				</div>
			</div>
			{/* cv design */}
			<div className="fixed w-full">
				<div id="downloadPDF" className=" w-[97%] m-auto rounded-md pb-10 ">
					<div>
						<div className="h-[100px] p-6">
							<h1 className="text-primary capitalize text-4xl font-bold">
								{data?.firstName + " " + data?.lastName}
							</h1>
							<p className="text-primary py-4 text-xl font-semibold">
								{data?.jobTitle}
							</p>
						</div>
						<div className="bg-primary mt-5 p-6 relative h-full">
							<div className="absolute right-20 top-[-90px] ">
								<img
									className="max-h-[300px] rounded-md"
									src={image}
									alt="dummy"
								/>
							</div>
							<h1 className="text-white font-bold text-2xl mb-2">Summary</h1>
							<p className="text-white text-sm w-1/2 ">{data?.summary}</p>
							<div className="mt-16 ">
								<div className="flex justify-between pr-6 flex-wrap">
									<div className="w-1/3 flex items-center">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<BsFillPhoneFill />
										</div>
										<p className="text-white pl-2 mb-5">{data?.mobileNumber}</p>
									</div>
									<div className="w-1/3 flex items-center">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<ImPhone />
										</div>
										<p className="text-white pl-2 mb-5">
											{data?.telephoneNumber}
										</p>
									</div>
									<div className="w-1/3 flex items-center">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<FaBirthdayCake />
										</div>
										<p className="text-white pl-2 mb-5">{data?.DOB}</p>
									</div>
									<div className="w-1/3 flex items-center pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<AiFillHome />
										</div>
										<p className="text-white pl-2 mb-4">{data?.city}</p>
									</div>
									<div className="w-1/3 flex items-center pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<FaCity />
										</div>
										<p className="text-white pl-2 mb-4">{data?.country}</p>
									</div>
									<div className=" flex items-center w-1/3 pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<ImLocation2 />
										</div>
										<div>
											<p className="text-white pl-2 mb-4">{data?.zipCode}</p>
										</div>
									</div>
									<div className=" flex items-center pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<ImLocation2 />
										</div>
										<div>
											<p className="text-white pl-2 mb-4">{data?.address}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="flex justify-between flex-wrap mt-6">
							<div className="w-1/2 p-4">
								<h1 className="text-xl font-bold text-primary border-b-2 border-b-primary leading-[2.5]">
									Education
								</h1>
								{educationCv.map((item, index) => {
									return (
										<>
											<div>
												<div className="flex justify-between items-center">
													<div className="text-xl text-primary flex items-center font-semibold my-1">
														<div className="!font-semibold  !pb-0.5">
															{index + 1}-
														</div>
														<div className="mt-0.5">{item?.schoolName}</div>
													</div>
													<p className="text-base font-bold text-primary">
														<span>{item?.startYear}</span>
														{" - "}
														<span>{item?.endYear}</span>
													</p>
												</div>
												<p className="text-sm mb-1">{item?.schoolLocation}</p>
												<p className="font-semibold mb-2">{item?.degree}</p>
												<p className="font-semibold text-sm">
													{item?.fieldsOfStudy}
												</p>
											</div>
										</>
									);
								})}
							</div>
							<div className="w-1/2 p-4">
								<h1 className="text-xl font-bold text-primary border-b-2 border-b-primary leading-[2.5]">
									Professional Experience
								</h1>
								{professionalCv.map((item, index) => {
									return (
										<>
											<div>
												<div className="flex justify-between items-center">
													<h5 className="text-xl flex !items-center  text-primary font-semibold">
														<div className="!font-semiB pb-0.5">
															{index + 1}-
														</div>{" "}
														<span className="mt-0.5">
															{item?.schoolLocation}
														</span>
													</h5>
													<p className="text-base font-bold py-2 text-primary">
														<span>{item?.startYear}</span>
														{" - "}
														<span>{item?.endYear}</span>
													</p>
												</div>
												<h5>{item?.schoolName}</h5>
											</div>
										</>
									);
								})}
							</div>
							<div className="w-1/2 p-4">
								<h1 className="text-xl font-bold text-primary border-b-2 border-b-primary leading-[2.5]">
									Skills
								</h1>
								{keySkills?.map((item, index) => {
									return (
										<>
											<div>
												<p className="flex items-center pt-2">
													<span className="!font-bold !my-2 ">
														<RxDot />
													</span>{" "}
													<span className="pb-5">{item?.keySkill}</span>
												</p>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-center my-8">
					<Button
						onClick={handleImport}
						// onClick={handleFile}
						text="Print"
						customClass="bg-primary rounded-md  text-sm font-semibold text-white !w-24 !h-10"
					/>
				</div>
			</div>
		</>
	);
};

export default MakeCv;
