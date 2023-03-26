import NewsLetter from "../components/NewsLetter";
import Head from "next/head";
import Button from "../components/Button";
import HowWorksBtn from "../components/HowWorksBtn";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import { customerCareAdd, getJobsByLatLng } from "../services/auth-service";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";
const center = { lat: 48.8584, lng: 2.2945 };

const Contact = () => {
	const router = useRouter();
	const [data, setData] = useState(null);
	const [modelShow, setModelShow] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [companyName, setCompanyName] = useState("");
	const [filterData, setFilterData] = useState([]);
	const [mapCenter, setMapCenter] = useState({
		lat: "",
		long: "",
	});
	const [toggleMarkerSize, setToggleMarkerSize] = useState("");
	const [toggleInfoWindow, setToggleInfoWindow] = useState("");
	const [customerCare, setCustomerCare] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		subject: "",
		message: "",
	});
	useEffect(() => {
		const gettingData = localStorage.getItem("user");
		const userData = JSON.parse(gettingData);
		setCustomerCare({
			...customerCare,
			email: userData?.email,
			phoneNumber: userData?.phone,
			name: userData?.fullName,
		});
		setData(userData);
	}, []);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDZpy-p-5laOeZQcRD_FZSTc0MITID2zKo",
		id: "google-map-script",
	});
	const handleValidation = () => {
		if (customerCare?.name === "") {
			setSpinner(false);
			toast.error("Fullname cannot be set empty");
			return false;
		} else if (customerCare?.email === "") {
			setSpinner(false);
			toast.error("Email cannot be set empty");
			return false;
		} else if (!customerCare?.email?.includes("@")) {
			setSpinner(false);
			toast.error("Please enter correct email");
			return false;
		} else if (customerCare?.phoneNumber === "") {
			setSpinner(false);
			toast.error("Phone cannot be set empty");
			return false;
		} else if (customerCare?.subject === "") {
			setSpinner(false);
			toast.error("Subject cannot be set empty");
			return false;
		} else if (customerCare?.message === "") {
			setSpinner(false);
			toast.error("Message cannot be set empty");
			return false;
		}
		return true;
	};
	const handleClick = () => {
		setSpinner(true);
		// if (data) {
		if (handleValidation()) {
			customerCareAdd(customerCare)
				.then((res) => {
					if (res?.data?.success) {
						toast.success(res?.data?.message);
						setCustomerCare({
							name: "",
							email: "",
							phoneNumber: "",
							subject: "",
							message: "",
						});
						setSpinner(false);
						setModelShow(true);
					} else {
						setSpinner(false);
						toast.error(res?.data?.message);
					}
				})
				.catch((err) => {
					setSpinner(false);
					toast.error("Something went wrong");
				});
		}
		// }
	};
	// google maps code

	const center = { lat: mapCenter?.lat, lng: mapCenter?.long };
	const searchByCordinates = (body) => {
		// console.log(body, "body");
		setSpinner(true);
		getJobsByLatLng(body)
			.then((res) => {
				setFilterData(res?.data);
				setSpinner(false);
			})
			.catch((err) => {
				setSpinner(false);
				toast.error(err?.message);
			});
	};
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(showPosition);
	}, []);
	function showPosition(position) {
		// console.log(position, "position");
		let body = {
			lat: position?.coords?.latitude,
			long: position?.coords?.longitude,
		};
		setMapCenter({
			...mapCenter,
			lat: position?.coords?.latitude,
			long: position?.coords?.longitude,
		});
		searchByCordinates(body);
	}
	const handleMarkerSize = (id) => {
		setToggleMarkerSize(id);
	};
	const openInfoWindow = (id) => {
		setToggleInfoWindow(id);
	};
	// google maps code
	return (
		<div>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<Head>
				<title> Contact - Job-Locator </title>
			</Head>
			{/* -------------------------Page Starter------------------------------ */}

			<section>
				<div className="md:px-6">
					<div className="lg:mx-8 lg:flex lg:items-center lg:text-left text-center md:items-center md:gap-24 md:py-8">
						<div className="lg:w-[58%] md:w-full px-5 mb-20 sm:mb-44">
							<h1 className="font-semibold text-5xl  pb-4 sm:text-3xl md:text-4xl lg:font-semibold lg:text-[55px] lg:pt-14 text-[#110229] md:!leading-[80px]">
								CONTACT <span className="text-primary">US</span>
							</h1>
							<p className="text-[#000000] text-opacity-70 font-base text-base lg:font-semibold md:text-lg sm:text-lg lg:leading-10">
								Just send us your questions or concerns and our staff member
								will give you the help you need. We provide simple and efficient
								solution to your problems so that you can find the best jobs
								around you.
							</p>
							<div className="mt-10 flex justify-center md:justify-centre lg:justify-start items-center">
								<Button
									onClick={() => {
										if (data === null) {
											router.push("/signin");
										} else if (data.type === "user") {
											router.push("/employee/dashboard");
										} else if (data.type === "business") {
											router.push("/business/dashboard");
										}
									}}
									text="GET STARTED"
									customClass="bg-primary rounded-md p-2 text-sm font-semibold text-white !w-36 !h-12"
								/>

								{/* <HowWorksBtn /> */}
							</div>
						</div>

						<div className="flex items-center sm:it gap-5 mt-4 sm:mx-0 px-4 md:mt-24 lg:mt-4 justify-center">
							<div className="z-[1]">
								<img
									className="md:h-[300px] h-72 sm:mt-[55px]"
									src="/images/Rectangle.png"
									alt=""
								/>
								<div className="hidden md:relative right-[43px] bottom-[148px] z-[-1]">
									<img src="/images/Dot (5).png" alt="" />
								</div>
							</div>
							<div className="relative z-[1] gap-2">
								<img
									className=" md:w-[361px] w-60 "
									src="/images/Rectangle 2.png"
									alt=""
								/>
								<img
									className="w-[240px] mt-[25px]"
									src="/images/Rectangle 3.png"
									alt=""
								/>
								<div className="hidden md:absolute bottom-[165px] right-[23px] z-[-1]">
									<img src="/images/Dot (5).png" alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* ----------------------------------contact-us------------------------------ */}

			<section
				className="mx-5 sm:mx-12 rounded-3xl mt-12 md:mt-0 relative"
				style={{
					boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
				}}
			>
				{/* -------------------------Model On Success Start------------------------------ */}
				{modelShow && (
					<div
						id="page"
						className="transition-colors duration-500  md:p-10 absolute z-30 left-0 right-0 top-[20%] bottom-0"
					>
						<div id="wrapper" className="">
							<div
								id="modal"
								className="w-full max-w-screen-md rounded-3xl bg-neutral-50 text-center antialiased px-5 md:px-20 py-10 shadow-2xl shadow-zinc-900 relative  left-1/2 -translate-x-1/2"
							>
								<h1 className="text-3xl font-bold text-neutral-900 my-4">
									Thank you for getting in touch!
								</h1>
								<p className="text-xl text-neutral-500">
									We appreciate you contacting us {companyName}. One of our
									colleagues will get back in touch with you soon! Have a great
									day!
								</p>
								<button
									type="button"
									onClick={() => setModelShow(false)}
									id="reset"
									disabled=""
									className="px-8 py-4 mt-8 rounded-2xl text-neutral-50 bg-primary disabled:bg-neutral-900 disabled:cursor-not-allowed transition-colors"
								>
									Done
								</button>
								<svg
									onClick={() => setModelShow(false)}
									viewBox="0 0 16 16"
									xmlns="http://www.w3.org/2000/svg"
									className="w-[16px] h-[16px] absolute right-6 top-6 cursor-pointer"
								>
									<path
										d="m2 2 12 12m0-12-12 12"
										className="stroke-2 stroke-current"
									/>
								</svg>
							</div>
						</div>
					</div>
				)}

				{/* -------------------------Model On Success End------------------------------ */}
				<div className=" p-5 md:p-10">
					<div>
						<h2 className="text-secondary font-semibold text-2xl text-center p-7 line w-max m-auto">
							GET IN <span className="text-primary">TOUCH</span>
						</h2>
					</div>
					<div className="wrapper flex sm:flex-nowrap flex-wrap gap-12 items-center w-full">
						<div className="col-1 pt-4 w-full sm:w-1/2">
							<div className="mb-6 bg-gray-50 border border-gray-100">
								<input
									type=""
									id=""
									className="bg-gray-50 text-sm h-12 w-full placeholder:text-gray-500  placeholder:font-normal p-2.5 outline-none"
									placeholder="Your Full Name"
									tabIndex={1}
									value={customerCare?.name}
									onChange={(e) => {
										setCustomerCare({ ...customerCare, name: e.target.value });
										setCompanyName(e.target.value);
									}}
									required
								/>
							</div>
							<div className="sm:mb-6 bg-gray-50 border border-gray-100">
								<input
									type=""
									id=""
									className="bg-gray-50 text-gray-900 text-sm h-12 w-full placeholder:text-gray-500 placeholder:font-normal  placeholder:text-sm p-2.5 outline-none"
									placeholder="Your Phone"
									tabIndex={3}
									value={customerCare?.phoneNumber}
									onChange={(e) =>
										setCustomerCare({
											...customerCare,
											phoneNumber: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>
						<div className="col-2 w-full sm:w-1/2">
							<div className="mb-6 sm:mt-4 bg-gray-50 border border-gray-100 ">
								<input
									type=""
									id=""
									className="bg-gray-50 text-sm h-12 w-full placeholder:text-gray-500 placeholder:font-normal  placeholder:text-sm  p-2.5 outline-none"
									placeholder="Your Email (Required)"
									tabIndex={2}
									value={customerCare?.email}
									onChange={(e) =>
										setCustomerCare({ ...customerCare, email: e.target.value })
									}
									required
								/>
							</div>
							<div className="mb-6 bg-gray-50 border border-gray-100">
								<input
									type=""
									id=""
									className="bg-gray-50 text-gray-900 text-sm h-12 w-full placeholder:text-gray-500 placeholder:font-normal  placeholder:text-sm p-2.5 outline-none"
									placeholder="Subject"
									value={customerCare?.subject}
									tabIndex={4}
									onChange={(e) =>
										setCustomerCare({
											...customerCare,
											subject: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>
					</div>
					<div className="mb-6 bg-gray-50 border border-gray-100 h-48">
						<textarea
							type=""
							id=""
							rows="6"
							className="bg-gray-50 py-5 text-gray-900 text-sm placeholder:text-gray-500 placeholder:font-normal placeholder:text-sm  w-full p-2.5 outline-none"
							placeholder="Your message"
							value={customerCare?.message}
							tabIndex={5}
							onChange={(e) =>
								setCustomerCare({ ...customerCare, message: e.target.value })
							}
							required
						/>
					</div>
					<div className="flex justify-center ">
						<Button
							onClick={() => handleClick()}
							customClass="bg-primary text-white font-semibold text-xs !w-24 !h-[40px] py-2  rounded"
							text="SUMBIT"
						/>
					</div>
				</div>
			</section>
			{/* ---------------------------Available Jobs------------------------------- */}
			<section>
				<div className="py-24">
					<h1 className="uppercase text-[#110229] text-base sm:text-2xl text-center font-bold line w-max m-auto">
						Available <span className="text-primary">jobs</span> nearby you
					</h1>
					<div className="flex justify-center pt-12 md:mx-20 mx-4">
						{/* <img className="w-full" src="/images/map.png" alt="" /> */}
						{isLoaded && (
							<GoogleMap
								style={{}}
								center={center}
								zoom={11}
								mapContainerStyle={{
									width: "100%",
									height: "60vh",
								}}
								onClick={() => setToggleInfoWindow("")}
							>
								{filterData?.map((item, index) => {
									// console.log(item, "item");
									return (
										<>
											<Marker
												icon={{
													url: "/images/liveicon.png",
												}}
												position={{
													lat: mapCenter?.lat,
													lng: mapCenter?.long,
												}}
											/>
											<Marker
												onMouseOver={() => {
													handleMarkerSize(item?._id);
												}}
												onMouseOut={() => {
													handleMarkerSize("");
												}}
												key={item?._id}
												icon={{
													url: "/images/pointer.png",
													scaledSize: new google.maps.Size(
														toggleMarkerSize === item?._id ? 32 : 30,
														toggleMarkerSize === item?._id ? 32 : 30
													),
												}}
												position={{
													lat: item?.lat,
													lng: item?.long,
												}}
												animation="drop"
												onClick={() => {
													openInfoWindow(item?._id);
												}}
											/>
											{toggleInfoWindow === item?._id && (
												<InfoWindow
													onCloseClick={() => setToggleInfoWindow("")}
													position={{
														lat: item?.lat,
														lng: item?.long,
													}}
												>
													<div
														onClick={() => {
															let lcUser = localStorage.getItem("user");
															if (lcUser) {
																let cBy = item?.createdBy?._id;
																let jobId = item?._id;
																localStorage.setItem(
																	"cby",
																	JSON.stringify(cBy)
																);
																localStorage.setItem(
																	"jobId",
																	JSON.stringify(jobId)
																);
																setTimeout(() => {
																	router.push("/employee/apply-form");
																}, [500]);
															} else {
																router.push("/signin");
															}
														}}
														className="relative"
													>
														{/* <button className="absolute right-0">x</button> */}
														<div className="max-w-[250px]">
															<h1 className="md:text-sm text-xs font-medium text-[#6F748C]">
																{item?.createdBy?.businessName}
															</h1>
															<div className="flex gap-2 items-center pt-2">
																<div>
																	<img src="/images/brief.png" alt="" />
																</div>
																<p className="text-[#6F748C] md:text-sm text-xs">
																	{item?.jobTitle}
																</p>
															</div>
															<div className="flex gap-2 items-center">
																<div className="pl-1">
																	<img src="/images/loc.png" alt="" />
																</div>
																<p className="text-[#6F748C] md:text-sm text-xs">
																	{item?.address}
																</p>
															</div>
															<div className="flex gap-2 items-center">
																<div className="pl-1">
																	<img src="/images/phone.png" alt="" />
																</div>
																<p className="text-[#6F748C] md:text-sm text-xs">
																	{item?.createdBy?.businessName}
																</p>
															</div>
															{/* <div className="flex gap-2 items-center md:text-sm text-xs">
																<div className="pl-1">
																	<img src="/images/web.png" alt="" />
																</div>
																<p className="text-[#6F748C] md:text-sm text-xs">
																	www.farleytech.com
																</p>
															</div> */}
														</div>
													</div>
												</InfoWindow>
											)}
										</>
									);
								})}
							</GoogleMap>
						)}
					</div>
				</div>
			</section>

			{/* ----------------------Newsletter----------------------------- */}
			<div>
				<NewsLetter />
			</div>
		</div>
	);
};

export default Contact;
