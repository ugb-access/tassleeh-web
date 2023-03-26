import TextInput from "./../TextInput";
import Button from "../Button";
import React, { useEffect, useState } from "react";
import UploadPic from "../common/UploadPic";
import { postJobUser } from "../../services/auth-service";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";
import Head from "next/head";
import { useRouter } from "next/router";
import { ImSpinner9 } from "react-icons/im";
import storage from "../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
const PostJobForm = () => {
	const [data, setData] = useState({
		jobTitle: "",
		skillRequired: [],
		jobDescription: "",
		address: "",
		image: "",
		city: "",
		state: "",
		country: "",
		lat: 0,
		long: 0,
		requiredCareerLevel: "",
		noOfPosition: "",
		minExperience: 0,
		maxExperience: 0,
		minQualification: "",
		maxQualification: "",
		minSalaryRange: 0,
		maxSalaryRange: 0,
		gender: "Anyone",
		hired: false,
		createdBy: "",
	});

	const router = useRouter();
	const [address, setAddress] = useState("");
	const [spinner, setSpinner] = useState(false);
	const [checkImage, setCheckImage] = useState("");
	const [requesting, setRequesting] = useState(false);
	const [percent, setPercent] = useState(0);
	const [image, setImage] = useState("");
	const [skillString, setSkillString] = useState("");
	const [skills, setSkills] = useState([]);

	const handleSelect = async (value, placeId, suggestion) => {
		const results = await geocodeByAddress(value);
		const ll = await getLatLng(results[0]);
		setData({ ...data, lat: ll.lat, long: ll.lng });
		setAddress(value);
		const [place] = await geocodeByPlaceId(placeId);
		const { long_name: localCity = "" } =
			place.address_components.find((c) => c.types.includes("locality")) || {};
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
			state: localState,
			address: address,
		}));
	};

	const handleValidations = () => {
		if (data.jobTitle === "") {
			toast.error("Job Tittle Cannot Be Empty");
			return false;
		}
		if (data.jobDescription === "") {
			toast.error("Job Description Cannot Be Empty");
			return false;
		}
		if (data.address === "") {
			toast.error("Address Cannot Be Empty");
			return false;
		}
		if (data.city === "") {
			toast.error("City Cannot Be Empty");
			return false;
		}
		if (data.state === "") {
			toast.error("State Cannot Be Empty");
			return false;
		}
		if (data.country === "") {
			toast.error("Country Cannot Be Empty");
			return false;
		}
		if (data.requiredCareerLevel === "") {
			toast.error("Required Career Level Cannot Be Empty");
			return false;
		}
		if (data.noOfPosition === "") {
			toast.error("No of position Cannot Be Empty");
			return false;
		}
		if (data.minExperience === 0) {
			toast.error("Min Experience Cannot Be Empty");
			return false;
		}
		if (data.maxExperience === 0) {
			toast.error("Max Experience Cannot Be Empty");
			return false;
		}
		if (data.minQualification === "") {
			toast.error("Min Qualification Cannot Be Empty");
			return false;
		}
		if (data.maxQualification === "") {
			toast.error("Max Qualification Cannot Be Empty");
			return false;
		}
		if (data.minSalaryRange === 0) {
			toast.error("Min Salary Range Cannot Be Empty");
			return false;
		}
		if (data.maxSalaryRange === 0) {
			toast.error("Max Salary Range Cannot Be Empty");
			return false;
		}
		return true;
	};
	const handleSubmit = (url) => {
		let body = data;
		body.image = url;
		body.skillRequired = skills;
		body.address = address;
		// setData({ ...data, image: url });
		setSpinner(true);
		postJobUser(body).then((res) => {
			toast.success(res.data.message);
			// console.log(res);
			if (res.data.success === true) {
				setSpinner(false);
				router.push("my-jobs");
			}
		});
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

	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};

	useEffect(() => {
		// console.log(data, "live");
	}, [data]);
	const handleSkills = () => {
		setSkills([...skills, skillString]);
		setSkillString("");
	};
	const removeSkills = (item) => {
		let res = skills?.filter((i, key) => i !== item);
		setSkills(res);
	};
	useEffect(() => {
		const userId = localStorage?.getItem("user");
		const user = JSON?.parse(userId);
		const users = user?._id;
		setData({ ...data, createdBy: users });
	}, []);
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl my-auto h-screen sm:right-60 bottom-28 items-center   relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="mb-2">
					<TextInput
						onChange={(e) => handleChange(e)}
						placeholder="Job Title"
						id="jobTitle"
					></TextInput>
				</div>
				<textarea
					onChange={(e) => handleChange(e)}
					placeholder="Job Description"
					className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12 h-24  placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 !mb-5 outline-none"
					name=""
					id="jobDescription"
					cols="30"
					rows="10"
				></textarea>
				<div className="">
					<div className="mt-14 my-5">
						<span className="font-bold">Upload Job Image</span>
					</div>
					<div className="border-2 rounded-md ">
						<div className="flex flex-col justify-center items-center py-8">
							<div className="pb-2">
								<img
									className="h-[100px]"
									src={image ? image : "/images/upload-img.png"}
									alt=""
								/>
							</div>
							<p>Drag photos here</p>
							<button className="relative border border-solid rounded-md p-1 px-3 mt-3 border-primary">
								<p className="text-primary text-sm font-semibold ">
									Select from computer
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
				<div className="flex gap-3 flex-wrap">
					{skills.map((item, index) => (
						<div
							key={index}
							className="flex my-2  w-fit gap-2 items-center border border-gray-400 p-1 rounded-md"
						>
							<div className="min-w-[50px] ml-2">{item}</div>
							<div>
								<TiDelete
									onClick={() => removeSkills(item)}
									className="w-6 h-6 text-primary"
								/>
							</div>
						</div>
					))}
				</div>
				<TextInput
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSkills();
						}
					}}
					value={skillString}
					onChange={(e) => {
						setSkillString(e.target.value);
					}}
					// id="skillRequired"
					placeholder="What skills are required for this job"
					className="bg-gray-50 border  border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
				/>
				<div className="flex gap-5 my-2">
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
					<div className="basis-full">
						<TextInput
							onChange={(e) => handleChange(e)}
							value={data.city}
							placeholder="City"
							id="city"
						></TextInput>
					</div>
				</div>
				<div className="flex gap-5 my-2">
					<div className="basis-full">
						<TextInput
							onChange={(e) => handleChange(e)}
							value={data.state}
							placeholder="State"
							id="state"
						></TextInput>
					</div>
					<div className="basis-full">
						<TextInput
							onChange={(e) => handleChange(e)}
							value={data.country}
							placeholder="Country"
							id="country"
						></TextInput>
					</div>
				</div>
				<div className="flex gap-5 my-2">
					<div className="basis-full">
						<select
							onChange={(e) => handleChange(e)}
							id="requiredCareerLevel"
							className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
						>
							<option defaultValue>Required career level for this job?</option>
							<option value="Beginners">Beginners</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Experienced">Experienced</option>
						</select>
					</div>
					<div className="basis-full">
						<TextInput
							onChange={(e) => handleChange(e)}
							placeholder="No. of Positions"
							id="noOfPosition"
						></TextInput>
					</div>
				</div>
				<div className="flex gap-5 my-2">
					<div className="basis-full">
						<TextInput
							type="number"
							min={0}
							onChange={(e) => {
								setData({ ...data, minExperience: +e.target.value });
							}}
							placeholder="Years of experience required Minimum"
							id="minExperience"
						></TextInput>
					</div>
					<div className="basis-full">
						<TextInput
							id="maxExperience"
							min={0}
							type="number"
							onChange={(e) => {
								setData({ ...data, maxExperience: +e.target.value });
							}}
							placeholder="Years of experience required Maximum"
						></TextInput>
					</div>
				</div>
				<div className="flex gap-5 my-2">
					<div className="basis-full">
						<TextInput
							onChange={(e) => handleChange(e)}
							placeholder="What Minimum qualification is required?"
							id="minQualification"
						></TextInput>
					</div>
					<div className="basis-full ">
						<TextInput
							id="maxQualification"
							onChange={(e) => handleChange(e)}
							placeholder="What Maximum qualification is required?"
						></TextInput>
					</div>
				</div>
				<div className="flex gap-5 my-2">
					<div className="basis-full">
						<TextInput
							onChange={(e) => {
								setData({ ...data, minSalaryRange: +e.target.value });
							}}
							type="number"
							min="0"
							placeholder="What is Minimum salary Range?"
							id="minSalaryRange"
						></TextInput>
					</div>
					<div className="basis-full">
						<TextInput
							id="maxSalaryRange"
							onChange={(e) => {
								setData({ ...data, maxSalaryRange: +e.target.value });
							}}
							type="number"
							placeholder="What is Maxium salary Range?"
							min="0"
						></TextInput>
					</div>
				</div>
				<div className="flex gap-5 my-2">
					<div className="basis-full">
						<select
							onChange={(e) => handleChange(e)}
							id="gender"
							className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 outline-none"
						>
							<option selected>Gender Preference for this job?</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div className="basis-full"></div>
				</div>
				<div className="flex justify-center my-8">
					<Button
						onClick={handleFile}
						text="SUBMIT"
						customClass="bg-primary rounded-md  text-sm font-semibold text-white !w-24 !h-10"
					/>
				</div>
			</form>
		</>
	);
};

export default PostJobForm;
