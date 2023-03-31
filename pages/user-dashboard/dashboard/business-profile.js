import ProfileSidebar from "../../../components/dashboard/profileSidebar";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useEffect, useState } from "react";
import { editProfile } from "../../../services/auth-service";
import Header from "../../../layout/DashboardHeader";
import { useRouter } from "next/router";
import { ImSpinner9 } from "react-icons/im";
import storage from "../../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";
import Head from "next/head";
const Profile = () => {
	const [checkImage, setCheckImage] = useState("");

	const [spinner, setSpinner] = useState(false);
	const [accountTitle, setAccountTitle] = useState("");
	const [accountImage, setAccountImage] = useState("");
	// const router = useRouter();
	const [requesting, setRequesting] = useState(false);
	const [percent, setPercent] = useState(0);
	const [image, setImage] = useState("");
	const [data, setData] = useState({});
	const fetchLocalSt = () => {
		const userData = localStorage?.getItem("user");
		const Data = JSON.parse(userData);
		// console.log(data);
		setAddress(Data?.address);
		setAccountTitle(Data?.fullName);
		setAccountImage(Data?.businessImage);
		setImage(Data?.businessImage);
		setData(Data);
		setSpinner(false);
	};
	useEffect(() => {
		fetchLocalSt();
	}, []);

	// console.log(data, "userData");
	const [address, setAddress] = useState("");

	const handleSubmit = (url) => {
		let body = data;
		body.businessImage = url ? url : image;
		body.address = address;

		let id = body?._id;
		editProfile(body, id)
			.then((res) => {
				if (res?.data?.success) {
					// console.log(res);
					toast.success(res?.data?.message);
					let newData = JSON.stringify(data);
					localStorage.setItem("user", newData);
					fetchLocalSt();
					setSpinner(false);
				} else {
					setSpinner(false);
					toast.warn(res?.data?.message);
				}
			})
			.catch((err) => {
				// console.log(err, "err");
				toast.error("Something went wrong");
				setSpinner(false);
			});
	};
	const handleSelect = async (value, placeId, suggestion) => {
		const results = await geocodeByAddress(value);
		const ll = await getLatLng(results[0]);
		setData({ ...data, businesslat: ll.lat, businesslong: ll.lng });
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
		setData((data) => ({
			...data,
			country: country,
			city: localCity,
			state: localState,
			// address: address,
		}));
	};
	// console.log(address, "address");
	const handleValidation = () => {
		if (data.businessName === "") {
			toast.warn("Business name cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.businessEmail === "") {
			toast.warn("Business mail cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.businessArea === "") {
			toast.warn("Business area cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.address === "") {
			toast.warn("Business address cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.independentOrFranchise === "") {
			toast.warn("Independent or franchise cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.businessManagerName === "") {
			toast.warn("Manager name cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.businessMobileNumber === "") {
			toast.warn("Business mobile number cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.businessTelephoneNumber === "") {
			toast.warn("Business telephone number cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.businessType === "") {
			toast.warn("Business type cannot be empty");
			setSpinner(false);
			return false;
		}
		if (data.fullName === "") {
			toast.warn("FullName cannot be empty");
			setSpinner(false);
			return false;
		}
		return true;
	};
	const handleFile = (e) => {
		// e.preventDefault();
		setSpinner(true);
		if (image) {
			if (handleValidation()) {
				if (checkImage) {
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
	const handleChange = (e) => {
		const newdata = { ...data };
		newdata[e.target.id] = e.target.value;
		setData(newdata);
	};
	return (
		<>
			<Header
				accountImage={accountImage}
				accountTitle={accountTitle}
				headerTitle="Business profile"
				headerDiscription="Get details about your profile"
				profileLink={"/user/dashboard/business-profile"}
			/>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl my-auto h-screen sm:right-60 items-center   relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<div className="flex lg:flex-nowrap flex-wrap justify-center">
				<div>
					<ProfileSidebar
						image={image}
						getCheckImage={(e) => setCheckImage(e)}
						getImage={(e) => setImage(e)}
						data={data}
					/>
				</div>
				<div className="basis-full mx-5">
					<h5 className="py-5 font-semibold text-xl text-[#110229]">
						Profile{" "}
					</h5>
					<div className="flex  items-end gap-5 pt-3">
						<div className="basis-full">
							<TextInput
								id="businessName"
								value={data?.businessName}
								onChange={handleChange}
								placeholder="Business Name"
							/>
						</div>{" "}
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="businessEmail"
								value={data?.businessEmail}
								placeholder="Business Mail"
							/>
						</div>
					</div>
					<div className="flex lg:flex-nowrap flex-wrap items-end gap-5 pt-3">
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="businessArea"
								value={data?.businessArea}
								placeholder="Business Area"
							/>
						</div>
						<div className="basis-full">
							{/* <TextInput
								onChange={handleChange}
								id="address"
								value={data?.address}
								disabled
								customClass="cursor-not-allowed"
								placeholder="Business Location"
							/> */}
							<PlacesAutocomplete
								value={address}
								// value={localAddress?localAddress:address}
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
												placeholder="Business Location"
												value={data.address}
												{...getInputProps({
													id: "address",
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
					<div className="flex lg:flex-nowrap flex-wrap items-end gap-5  pt-3">
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="independentOrFranchise"
								value={data?.independentOrFranchise}
								placeholder="Independent or Franchise"
							/>
						</div>
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="businessManagerName"
								value={data?.businessManagerName}
								placeholder="Manager Name"
							/>
						</div>{" "}
					</div>
					<div className="flex lg:flex-nowrap flex-wrap items-end gap-5   pt-3">
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="businessMobileNumber"
								value={data?.businessMobileNumber}
								placeholder="Mobile Number"
							/>
						</div>{" "}
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="businessTelephoneNumber"
								value={data?.businessTelephoneNumber}
								placeholder="Telephone Number"
							/>
						</div>{" "}
					</div>
					<div className="flex lg:flex-nowrap flex-wrap items-end gap-5  pt-3">
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="businessType"
								value={data?.businessType}
								placeholder="Business Type"
							/>
						</div>
						<div className="basis-full">
							<TextInput
								onChange={handleChange}
								id="fullName"
								value={data?.fullName}
								placeholder="full Name"
							/>
						</div>
					</div>
					<div className="pt-3"></div>
					<div className="flex justify-center my-8">
						<Button
							onClick={handleFile}
							text="Edit"
							customClass="bg-primary rounded-md  text-sm font-semibold text-white !w-24 !h-10"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
