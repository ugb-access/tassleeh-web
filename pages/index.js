import NewsLetter from "../components/NewsLetter";
import Button from "../components/Button";
import Card from "../components/common/Card";
import CardTwo from "../components/common/Card Two";
import Head from "next/head";
import Link from "next/link";
import { ImSpinner9 } from "react-icons/im";
import { HiSearch } from "react-icons/hi";
import CardThree from "../components/common/Card Three";
import TextInput from "../components/TextInput";

import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	InfoWindow,
	// Autocomplete,
	// DirectionsRenderer,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";
import HomeSlider from "../components/homeSlider/HomeSlider";
import { useState, useEffect } from "react";
import {
	getAllJobs,
	getJobsByLatLng,
	getWebStat,
} from "../services/auth-service";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRef } from "react";
import HomeServiceCard from "../components/common/HomeServiceCard";

const Home = () => {
	const [spinner, setSpinner] = useState(false);
	const [toggleMarkerSize, setToggleMarkerSize] = useState("");
	const [toggleInfoWindow, setToggleInfoWindow] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [address, setAddress] = useState("");
	// console.log(address,"search address")
	const [searchLatLong, setSearchLatLong] = useState("");
	const router = useRouter();
	const [mapCenter, setMapCenter] = useState({
		lat: "",
		long: "",
	});
	const [webStatics, setWebStatics] = useState(null);
	// const [cardData, SetCardData] = useState();
	const [cardData, setCardData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDZpy-p-5laOeZQcRD_FZSTc0MITID2zKo",
		id: "google-map-script",
	});
	const [geoLocation, setGeoLocation] = useState({
		lat: 0,
		long: 0,
	});
	const handleSelect = async (value, placeId, suggestion) => {
		const results = await geocodeByAddress(value);
		const ll = await getLatLng(results[0]);
		console.log(ll, "check");
		setMapCenter(ll);
		setSearchLatLong(ll);
		setAddress(value);
		const [place] = await geocodeByPlaceId(placeId);
		// console.log(place, "HASHAM");	8
		// const { long_name: localCity = "" } =
		//   place.address_components.find((c) => c.types.includes("locality")) || {};
		// const { long_name: postalCode = "" } =
		// 	place.address_components.find((c) => c.types.includes("postal_code")) ||
		// 	{};
		// const { long_name: localState = "" } =
		//   place.address_components.find((c) =>
		//     c.types.includes("administrative_area_level_1")
		//   ) || {};
		// const { long_name: country = "" } =
		//   place.address_components.find((c) => c.types.includes("country")) || {};

		// setData((prev) => ({
		//   ...prev,
		//   country: country,
		//   city: localCity,
		//   // zip: postalCode,
		//   state: localState,
		//   address: address,
		// }));
	};
	const searchByCordinates = (body) => {
		console.log(body, "body");
		setSpinner(false);
		getJobsByLatLng(body)
			.then((res) => {
				setCardData(res?.data);
				setFilterData(res?.data);
				setSpinner(false);
			})
			.catch((err) => {
				setSpinner(false);
				toast.error(err?.message);
			});
	};
	const getWebsiteStas = () => {
		setSpinner(true);
		getWebStat()
			.then((res) => {
				console.log(res, "webstats");
				setWebStatics(res?.data);
				setSpinner(false);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.message);
				setSpinner(false);
			});
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(showPosition);
		getWebsiteStas();
	}, []);
	function showPosition(position) {
		console.log(position, "position");
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
	const handleSearch = () => {
		// e.preventDefault();
		if (searchValue === "") {
			let body = {
				lat: searchLatLong.lat,
				long: searchLatLong.lng,
			};
			setSpinner(true);
			getJobsByLatLng(body)
				.then((res) => {
					setFilterData(res?.data);
					setSpinner(false);
				})
				.catch((err) => {
					console.log(err, "err");
					toast.error(err?.message);
					setSpinner(false);
				});
		} else if (searchValue && searchLatLong) {
			let body = {
				lat: searchLatLong.lat,
				long: searchLatLong.lng,
			};
			setSpinner(true);
			getJobsByLatLng(body)
				.then((res) => {
					let resp = res?.data;
					setSpinner(false);
					let filterResp = resp.filter((item) =>
						item?.jobTitle?.toLowerCase().includes(searchValue?.toLowerCase())
					);
					console.log(filterResp, "filter");
					setFilterData(filterResp);
				})
				.catch((err) => {
					console.log(err, "err");
					setSpinner(false);
					toast.error(err?.message);
				});
		} else {
			let res = cardData?.filter((item, index) =>
				item?.jobTitle?.toLowerCase().includes(searchValue?.toLowerCase())
			);
			setFilterData(res);
		}
	};
	//
	const center = {
		lat: mapCenter?.lat,
		lng: mapCenter?.long || mapCenter?.lng,
	};
	console.log("mapCenter: ", mapCenter);
	console.log(center, "mapCenter");
	const divStyle = {
		width: "330px",
		height: "320px",
	};
	const handleMarkerSize = (id) => {
		setToggleMarkerSize(id);
	};
	const openInfoWindow = (id) => {
		setToggleInfoWindow(id);
	};

	const mapRef = useRef();
	const HomeServicesData = [
		{
			title: "Cars",
			description: "Get best mechanic services for your cars right away.",
			icon: "/images/Group.png",
			services: [
				"Electricity",
				"Mechanics",
				"Dyeing/Black Smith",
				"Oil",
				"Recorders",
				"Tire",
			],
		},
		{
			title: "Electronics",
			description:
				"Stress no further because TASSLEEH in-house expert electrician here to serve.",
			icon: "/images/Group (1).png",
			services: [
				"Laptop",
				"Computer",
				"Smart Watches",
				"Tablet",
				"Satellite",
				"CCTV Cameras",
			],
		},
		{
			title: "Home",
			description: "Get best mechanic services for your cars right away.",
			icon: "/images/Group (2).png",
			services: [
				"Electricity/Home Appliance",
				"Plumbing",
				"Door/Window",
				"Carpenter/Paint",
				"AC",
				"Furniture/Ceramic/Marble",
			],
		},
		{
			title: "Accessories",
			description: "Get best mechanic services for your cars right away.",
			icon: "/images/Group3.png",
			services: ["Bags", "Shoes", "Jewelry", "Watches", "Clothes", "Suit Case"],
		},
	];
	return (
		<div>
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
			<Head>
				<title> Home - Tassleeh </title>
			</Head>
			<div className="back">
				<section className="">
					<div className="flex flex-col justify-center items-center gap-y-5 ">
						<div className="mt-24">
							<h1 className="text-6xl text-[#0A093D] font-bold">
								We Provide <span className="text-[#03A0CB]">Best</span> Services
							</h1>
							<p className="text-[#656464] text-lg text-center pt-4">
								TASSLEEH provides best services for your cars, electronics,
								home, and accessories.
							</p>
						</div>
						<div className="flex border px-4 py-1.5 rounded-lg items-center">
							<div className="flex gap-4">
								<img src="/images/search.png" alt="" />
								<input
									type="text"
									className="w-[350px]"
									placeholder="search here"
								/>
							</div>
							<div>
								<Button
									text="Search"
									customClass="bg-primary rounded-full p-2 text-xs font-semibold text-white !w-28 !h-12"
								/>
							</div>
						</div>
					</div>
				</section>
				{/* ---------------------Services------------------------- */}
				<section className="flex flex-wrap justify-center gap-12 mt-20  px-48 ">
					{HomeServicesData.map((item, index) => {
						return (
							<div className="mb-16">
								<HomeServiceCard key={index} item={item} />
							</div>
						);
					})}
				</section>
			</div>
			{/* -------------------Availaible-jobs----------------------- */}
			<section className="flex justify-center mt-24">
				<div className=" pt-2 px-5 w-2/5">
					<p className=" text-primary font-medium text-base my-4">
						Whats TASSLEEH?
					</p>
					<h1 className="text-2xl font-bold text-[#0a093d] my-4">
						Why Choose TASSLEEH Platform?
					</h1>
					<p className="mt-2 mb-2 text-base font-normal leading-8 text-[#656464] w-[460px]">
						We are a value addition which covers all 360 services under one
						platform. Our motive is to provide best services to our corporate,
						commercial, and residential customers.
					</p>
					<div className="my-4">
						<div className="flex items-center mb-4">
							<div className="">
								<img className="mx-auto py-1" src="/images/dot-1.png" alt="" />
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Vetted and background-checked in house staff
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img className="mx-auto py-1" src="/images/dot-1.png" alt="" />
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								High-Tech and Most Advanced Equipment
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img className="mx-auto py-1" src="/images/dot-1.png" alt="" />
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Quality Control and Safety
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img className="mx-auto py-1" src="/images/dot-1.png" alt="" />
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Affordable and Upfront Pricing
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img className="mx-auto py-1" src="/images/dot-1.png" alt="" />
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Timely and Convenient Services
							</p>
						</div>
						<div className="flex items-center mb-2">
							<div className="">
								<img className="mx-auto py-1" src="/images/dot-1.png" alt="" />
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Experienced, Trained and Certified
							</p>
						</div>
					</div>
					<div>
						<Button
							text="Get Started"
							customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-32 !h-14"
						/>
					</div>
				</div>
				<div>
					<div>
						<img src="/images/group-0.png" alt="" />
					</div>
				</div>
			</section>
			{/* ---------------------------Jobs-in 60 miles------------------------ */}
			<section id="jobSection" className="bg-[#FAFAFA] py-10">
				<div>
					<h3 className="uppercase line w-max m-auto text-[#110229] text-3xl font-semibold text-center pb-28">
						Jobs in <span className="text-primary">6O MILES</span>
					</h3>
				</div>
				<div className="container sm:mx-auto ">
					<div className="flex  flex-wrap justify-center gap-7">
						{filterData?.length > 0 ? (
							filterData?.slice(0, 4).map((item, index) => {
								// console.log(item);
								const cardPic = "/images/card.png";
								return (
									<Card
										key={index}
										item={item}
										onclick={() => {
											let stData = localStorage.getItem("user");
											let userData = JSON.parse(stData);
											if (userData) {
												let cBy = item?.createdBy?._id;
												let jobId = item?._id;
												localStorage.setItem("cby", JSON.stringify(cBy));
												localStorage.setItem("jobId", JSON.stringify(jobId));
												setTimeout(() => {
													router.push("/employee/apply-form");
												}, [500]);
											} else {
												router.push("/signin");
											}
										}}
									/>
								);
							})
						) : (
							<div className="text-red-500 flex justify-center  w-full h-[100px]">
								<p className="">No Jobs Found</p>
							</div>
						)}
						{/* {filterData?.length === 0 && (
							
						)} */}
					</div>
				</div>
				{filterData?.length > 0 && (
					<Link href={"/employee/locate-job"}>
						<div className="flex justify-center mt-16">
							<Button
								text="VIEW ALL"
								customClass="bg-primary rounded-md p-2 text-base font-semibold text-white w-32 !h-12"
							/>
						</div>
					</Link>
				)}
			</section>
			{/* ----------------------------Popular------------------------------- */}
			<section className="py-24">
				<div className="px-16 wrapper flex flex-wrap lg:flex-nowrap justify-center">
					<div className="col-1">
						<div className="w-[90%]">
							<img src="/images/section-5img.png" alt="" />
						</div>
					</div>
					<div className="col-2 items-center mt-8 lg:mt-0  lg:w-[40%]">
						<div className="head">
							<h3 className="pb-5 uppercase line w-max m-auto lg:m-0 lg:!text-left text-center text-[#110229] text-3xl font-semibold">
								WHY WE ARE MOST <span className="text-primary">POPULAR?</span>
							</h3>
							<p className="text-[#3A3A3A] text-base text-center leading-7 lg:text-justify">
								At Job locator, we pride ourselves on being the most popular
								choice for job seekers and employers alike. We believe that our
								success is driven by making it easy for job seekers to find and
								apply for jobs that match their skills and experience. Our
								application process is quick, easy, and efficient, so that job
								seekers can apply for jobs in just a few minutes. We are
								committed to providing the best experience possible for job
								seekers and employers and are dedicated to helping people find
								their dream job.
							</p>
						</div>
						<div className=" flex items-center justify-center sm:gap-32 gap-10 lg:justify-between lg:gap-4 sm:flex-nowrap flex-wrap w-full py-8">
							<div className="col-1">
								<div className="flex gap-2 items-center py-2">
									<Button
										img={
											<img
												className="h-10"
												src="/images/bx-check-shield.png"
											></img>
										}
										customClass="bg-primary flex justify-center items-center rounded-xl text-sm font-semibold text-white !w-16 !h-16"
									/>
									<p className="text-base font-semibold whitespace-nowrap">
										Trusted & Quality Job
									</p>
								</div>
								<div className="flex gap-2 items-center py-6">
									<Button
										img={
											<img className="h-5" src="/images/Vector (4).png"></img>
										}
										customClass="bg-primary flex justify-center items-center  rounded-xl text-sm font-semibold text-white !w-16 !h-16"
									/>
									<p className=" text-base font-semibold">No Extra Charge</p>
								</div>
								<div className="flex gap-2 items-center pt-4">
									<Button
										img={
											<img className="h-7" src="/images/Vector (5).png"></img>
										}
										customClass="bg-primary flex justify-center items-center  rounded-xl text-sm font-semibold text-white !w-16 !h-16"
									/>
									<p className="text-base font-semibold whitespace-nowrap">
										Right Candidates
									</p>
								</div>
							</div>
							<div className="pop-1 col-2">
								<div className="flex gap-2 items-center py-1">
									<Button
										img={
											<img
												className="h-9"
												src="/images/bx-buildings (1).png"
											></img>
										}
										customClass="bg-primary flex justify-center items-center  rounded-xl text-sm font-semibold text-white !w-16 !h-16"
									/>
									<p className=" text-base font-semibold whitespace-nowrap">
										Top Companies
									</p>
								</div>
								<div className="flex gap-2 items-center py-6">
									<Button
										img={<img className="h-9" src="/images/bx-globe.png"></img>}
										customClass="bg-primary flex justify-center items-center rounded-xl text-sm font-semibold text-white !w-16 !h-16"
									/>
									<p className="text-base font-semibold whitespace-nowrap">
										International Job
									</p>
								</div>
								<div className="flex gap-2 items-center pt-4">
									<Button
										img={
											<img
												className="h-9"
												src="/images/bx-check-circle.png"
											></img>
										}
										customClass="bg-primary flex justify-center items-center rounded-xl text-sm font-semibold text-white !w-16 !h-16"
									/>
									<p className=" text-base font-semibold whitespace-nowrap">
										Handy Process
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* -----------------------------Get started today------------------- */}
			<section className="py-24 bg-[#FAFAFA]">
				<div className="text-center">
					<h1 className="text-[#110229] text-3xl font-semibold line w-max m-auto">
						Get <span className="text-primary">Started</span> today?
					</h1>
				</div>
				<div className=" pt-16 flex flex-wrap lg:flex-nowrap justify-center gap-12 xl:gap-32 lg:gap-16">
					<CardTwo
						cardtwopic={
							<img className="h-14" src="/images/bx-briefcase (1).png" alt="" />
						}
						cardtwoH={
							webStatics?.totalJobs + "+" ? webStatics?.totalJobs + "+" : "0"
						}
						cardtwopara="Jobs Available"
					/>
					<CardTwo
						cardtwopic={
							<img className="h-14" src="/images/bx-file.png" alt="" />
						}
						cardtwoH={
							webStatics?.totalResumes + "+"
								? webStatics?.totalResumes + "+"
								: "0"
						}
						cardtwopara="Resumes"
					/>
					<CardTwo
						cardtwopic={
							<img className="h-14" src="/images/bx-buildings.png" alt="" />
						}
						cardtwoH={
							webStatics?.totalCompanies + "+"
								? webStatics?.totalCompanies + "+"
								: "0"
						}
						cardtwopara="Companies"
					/>
					<CardTwo
						cardtwopic={
							<img className="h-14" src="/images/bx-user.png" alt="" />
						}
						cardtwoH={
							webStatics?.totalEmployees + "+"
								? webStatics?.totalEmployees + "+"
								: "0"
						}
						cardtwopara="Employees"
					/>
				</div>
			</section>
			{/* --------------------------Popular-companies----------------------------- */}
			<section className="p-28">
				<div className="text-center">
					<h1 className="text-[#110229] md:text-3xl text-xl font-semibold line w-max m-auto">
						POPULAR <span className="text-primary">COMPANIES</span>
					</h1>
				</div>
				<div className="pt-14">
					<HomeSlider />
				</div>
			</section>
			{/* ---------------------------Dowload-APP--------------------------- */}
			<section className="bg-[#FAFAFA] py-16">
				<div className="flex flex-wrap justify-center md:flex-nowrap lg:justify-around items-center lg:gap-10 lg:px-32">
					<div className="lg:relative md:w-[800px] z-[1]">
						<img className="h-96 md:h-full" src="/images/mobile.png" alt="" />
						<div className="lg:block hidden absolute z-[-1] top-0 right-16">
							<img src="/images/Badge.png" alt="" />
						</div>
					</div>
					<div className="lg:mx-0 mx-20">
						<h1 className=" text-primary md:text-4xl text-xl font-semibold">
							Download The Job Locator App
						</h1>
						<p className=" text-[#3A3A3A] md:text-lg py-6">
							Why wait for your dream career opportunity? Download the Job
							Locator app and bring yourself to a world flooded with huge career
							possibilities.
						</p>
						<div className="relative flex gap-5">
							<Link
								target="_blank"
								href="https://apps.apple.com/us/app/job-locator/id6444742645"
							>
								<div className="lg:w-32 w-28">
									<img src="/images/Group 477.png" alt="" />
								</div>
							</Link>
							<Link
								href="https://play.google.com/store/apps/details?id=com.job_locator"
								target="_blank"
							>
								<div className="lg:w-32 w-28">
									<img src="/images/image 2.png" alt="" />
								</div>
							</Link>
							<div className="lg:block hidden absolute right-[-110px] bottom-[-226px]">
								<img src="/images/Badge (1).png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* -------------------------------------Newsletter--------------------------- */}
			<div>
				<NewsLetter />
			</div>
		</div>
	);
};

export default Home;
