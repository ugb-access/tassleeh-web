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
import ReviewCard from "../components/common/ReviewCard";

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
		setSpinner(false);
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
			setSpinner(false);
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
			setSpinner(false);
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
	const ReviewCardData = [
		{
			icon: "/images/Ellipse 17.png",
			title: "Tom Davis",
			description:
				'I received support from TASSLEEH in ways that are beyond words. One of the key drivers of our hyper growth was their very competent workforce. These people truly embody the phrase "worth for money."',
		},
		{
			icon: "/images/Ellipse 17 (1).png",
			title: "Paul Adam",
			description:
				'I received support from TASSLEEH in ways that are beyond words. One of the key drivers of our hyper growth was their very competent workforce. These people truly embody the phrase "worth for money."',
		},
		{
			icon: "/images/Ellipse 18.png",
			title: "Alex Hales",
			description:
				'I received support from TASSLEEH in ways that are beyond words. One of the key drivers of our hyper growth was their very competent workforce. These people truly embody the phrase "worth for money."',
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
					<div className="relative flex flex-col justify-center items-center gap-y-5 ">
						<div className="hidden lg:block absolute right-64 bottom-6">
							<img src="/images/Arr.png" alt="" />
						</div>
						<div className="mt-24">
							<h1 className="md:text-6xl sm:text-4xl text-2xl  text-[#0A093D] text-center font-bold">
								We Provide <span className="text-[#03A0CB]">Best</span> Services
							</h1>
							<p className="text-[#656464] md:text-lg sm:text-base text-sm text-center sm:px-0 px-2 pt-4">
								TASSLEEH provides best services for your cars, electronics,
								home, and accessories.
							</p>
						</div>
						<div className="flex border px-4 py-1.5 rounded-lg items-center">
							<div className="flex items-center gap-4">
								<div>
									<img
										className="sm:h-full h-5"
										src="/images/search.png"
										alt=""
									/>
								</div>
								<div>
									<input
										type="text"
										className="bg-transparent md:w-[350px] w-52 "
										placeholder="search here"
									/>
								</div>
							</div>
							<div>
								<Button
									text="Search"
									customClass="bg-primary rounded-full p-2 text-xs font-semibold text-white w-20 sm:!w-28 h-8 sm:!h-12"
								/>
							</div>
						</div>
					</div>
				</section>
				{/* ---------------------Services------------------------- */}
				<section className="flex flex-wrap justify-center sm:gap-12 mt-20 mx-auto sm:px-48 ">
					{HomeServicesData.map((item, index) => {
						return (
							<div key={index} className="mb-16">
								<HomeServiceCard item={item} />
							</div>
						);
					})}
				</section>
			</div>
			{/* -------------------Availaible-jobs----------------------- */}
			<section className="flex justify-center flex-wrap mt-24">
				<div className=" pt-2 px-5 lg:w-2/5 ">
					<p className=" text-primary font-medium text-sm sm:text-lg my-4">
						Whats TASSLEEH?
					</p>
					<h1 className="text-xl sm:text-4xl font-bold text-[#0a093d] my-4 lg:w-[400px]">
						Why Choose TASSLEEH Platform?
					</h1>
					<p className="mt-2 mb-2 text-sm sm:text-base font-normal leading-8 text-[#656464] md:w-[550px] lg:w-[490px] sm:w-[490px]">
						We are a value addition which covers all 360 services under one
						platform. Our motive is to provide best services to our corporate,
						commercial, and residential customers.
					</p>
					<div className="my-4">
						<div className="flex items-center mb-4">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-sm sm:text-lg font-normal leading-8 opacity-70">
								Vetted and background-checked in house staff
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-sm sm:text-lg font-normal leading-8 opacity-70">
								High-Tech and Most Advanced Equipment
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-sm sm:text-lg font-normal leading-8 opacity-70">
								Quality Control and Safety
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-sm sm:text-lg font-normal leading-8 opacity-70">
								Affordable and Upfront Pricing
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-sm sm:text-lg font-normal leading-8 opacity-70">
								Timely and Convenient Services
							</p>
						</div>
						<div className="flex items-center mb-2">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-sm sm:text-lg font-normal leading-8 w opacity-70">
								Experienced, Trained and Certified
							</p>
						</div>
					</div>
					<Link href={"/signin"}>
						<div className="flex justify-center sm:justify-start">
							<Button
								text="Get Started"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-24 sm:!w-32 !h-10 sm:!h-14"
							/>
						</div>
					</Link>
				</div>
				<div>
					<div className="mt-9 sm:mt-0 md:mt-10 lg:mt-0">
						<img className="sm:h-full h-80" src="/images/group-0.png" alt="" />
					</div>
				</div>
			</section>
			{/* ---------------------------Our Achievement------------------------ */}
			<section className="mt-28">
				<div className="relative poster flex flex-col justify-center items-center">
					<p className="text-primary text-lg mb-4">Our Achievement</p>
					<h1 className="text-white text-xl md:text-center lg:text-left sm:text-5xl font-bold">
						We are Connecting You The Digital Life.
					</h1>
					<p className="text-white  sm:text-xl sm:w-3/5 md:leading-9 text-center py-4">
						The aim and priority of Kam Kaj are to add value to our consumers
						lives by providing smart solutions to all their problems. Our pride
						is providing the most extensive range of services. From home
						maintenance to personal assistance. We make sure that your safety is
						never compromised. This is why we hire all the staff under the roof
						of Kam Kaj, just for your satisfaction.
					</p>
					<Link href={"/signin"}>
						<div className="mt-3">
							<Button
								text="Get Started"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-28 sm:!w-40 !h-12 sm:!h-16"
							/>
						</div>
					</Link>
				</div>
			</section>

			{/* ----------------------------Popular------------------------------- */}
			<section className="flex justify-center flex-wrap sm:mt-24">
				<div className=" pt-2 px-5 lg:w-2/5 mt-12">
					<p className=" text-primary font-medium sm:text-lg my-2">About Us</p>
					<h1 className="text-xl sm:text-4xl font-bold text-[#0a093d] my-5 sm:w-80 md:w-full lg:w-80">
						About TASSLEEH Platform?
					</h1>
					<p className="mt-2 mb-2 text-base font-normal leading-8 text-[#656464] lg:w-[460px] md:[750px] sm:w-[460px]">
						TASSLEEH is a leading multiple service provider platform catering to
						your 360 needs with quality guaranteed. Our aim and priority is to
						add value to our consumers lives by providing smart solutions to all
						their problems.
					</p>

					<div className="flex justify-center sm:justify-start md:justify-center lg:justify-start gap-4 mt-10">
						<Link href={"/signin"}>
							<Button
								text="Get Started"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-28 sm:!w-32 !h-12 sm:!h-14"
							/>
						</Link>
						<Link href={"/signin"}>
							<Button
								text="Invite Friend"
								customClass="text-primary rounded-2xl p-2 text-sm font-semibold border border-primary !w-28 sm:!w-32 !h-12 sm:!h-14"
							/>
						</Link>
					</div>
				</div>
				<div>
					<img src="/images/about.png" alt="" />
				</div>
			</section>
			{/* --------------------------Popular-companies----------------------------- */}

			{/* ---------------------------Dowload-APP--------------------------- */}
			<section className="flex justify-around items-center flex-wrap bg-[#f4f9ff] mt-20 sm:pt-0 pt-10">
				<div className="pl-8">
					<div className="">
						<p className="text-lg text-primary font-semibold ">
							Download Our Mobile Application
						</p>
						<h2 className="text-[#0a093d] sm:text-4xl text-lg font-bold sm:w-96 my-3">
							You Can Easily Find Our Mobile App…!
						</h2>
						<p className="sm:w-96 w-80 text-[#656464] text-sm sm:text-base ">
							Make your life easier by downloading TASSLEEH Mobile Application.
							We provide best services. Start your with us now...
						</p>
					</div>
					<div className="flex items-center sm:justify-start justify-center gap-6 mt-4">
						<Link
							href={"https://www.apple.com/app-store/"}
							target="_blank"
						>
							<div className="flex justify-center gap-2 rounded-md bg-white items-center border-white shadow-md border py-2 px-1.5">
								<img className="h-10" src="/images/apple-logo.png" alt="" />
								<div>
									<p className="text-xs">Dowload on the</p>
									<p className="text-sm text-black font-semibold">App Store</p>
								</div>
							</div>
						</Link>
						<Link href={"https://play.google.com/store/games?hl=en&gl=US/"} target="_blank">
						<div className="flex justify-center gap-2 rounded-md bg-[#29284e] text-white items-center border-white shadow-md border py-2.5 px-2">
								<img className="h-9" src="/images/play-store.png.png" alt="" />
								<div>
									<p className="text-xs">Dowload on the</p>
									<p className="text-sm font-semibold">Play Store</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div>
					<div>
						<img
							className="sm:h-[500px]"
							src="/images/mobile muckup.png"
							alt=""
						/>
					</div>
				</div>
			</section>
			{/* -----------------------------Customer reviews------------------- */}
			<section>
				<div className="flex flex-col justify-center items-center mt-24">
					<p className="text-primary text-lg mb-2">Customer Reviews</p>
					<h1 className="text-xl sm:text-left text-center sm:text-2xl md:text-4xl font-bold text-[#0a093d]">
						Valuable Customers Sharing Their Reviews{" "}
					</h1>
				</div>
				<div className="flex justify-center mt-16 flex-wrap">
					{ReviewCardData.map((item, index) => {
						return (
							<div key={index} className="mb-16 sm:px-16 relative">
								<div className="absolute sm:top-[-17px] left-0 top-[-15px] sm:left-9">
									<img
										className="sm:h-12 h-8"
										src="/images/semicolon.png"
										alt=""
									/>
								</div>
								<div>
									<ReviewCard key={index} item={item} />
								</div>
							</div>
						);
					})}
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
