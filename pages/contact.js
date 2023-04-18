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
import { MAP_PROPS } from "../services/constants";
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

	const { isLoaded } = useJsApiLoader(MAP_PROPS);
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
					// toast.error("Something went wrong");
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
				// toast.error(err?.message);
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
			{/* {spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-lg m-auto relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)} */}
			<Head>
				<title> Contact Us - Tassleeh </title>
			</Head>
			{/* -------------------------Page Starter------------------------------ */}

			<section>
				<div className="py-5 md:py-28">
					<div className=" md:flex md:justify-between md:w-[70%] m-auto md:gap-12">
						<div className="w-32 h-14  relative md:pt-14 hidden md:block">
							<div className="md:h-12 md:w-12 relative bottom-[-108px] bg-[#0A093D]"></div>
							<div className="absolute bottom-[-196px] left-12 md:h-10 w-10 bg-primary"></div>
						</div>
						<div className=" md:w-[80%] ...">
							<h2 className="font-semibold text-5xl text-[#0A093D] m-auto w-full h-[72px] text-center  border-[#016367] pt-5 ">
								<span className=" ">Contact</span> Us
							</h2>
							<p className="font-[400] text-center pt-7 p-5">
								Just send us your questions or concerns and our staff member
								will give you the help you need. Please use this form to contact
								us and we will get back to you.
							</p>
						</div>
						<div className="w-32 h-14 relative  hidden md:block">
							<div className="h-12 w-12 relative top-[-50px] bg-primary"></div>
							<div className="absolute bottom-[18px] left-12 h-10 w-10   bg-[#0A093D]"></div>
						</div>
					</div>

					<div className="md:flex md:w-[72%] md:m-auto md:border-2  rounded-3xl md:mt-44 ">
						<div className="w-8/12 md:w-6/12 m-auto ">
							<img
								className="md:mt-0 md:px-8 md:ml-4 rounded-xl md:rounded-none "
								src="/images/ezgif 1.png"
								alt=""
							/>
						</div>
						<div className="md:w-[85%] p-5 md:p-10">
							<h2 className="text-primary font-[600] text-[20px] text-center p-7">
								Get in Touch
							</h2>

							<div className="mb-6 P-7 ">
								<input
									type=""
									id=""
									className="bg-gray-50 border border-gray-100  text-gray-500 text-sm  h-12 placeholder:text-gray-500 placeholder:font-normal placeholder:text-sm w-full p-2.5 outline-none"
									placeholder="Your Name"
									required
								/>
							</div>
							<div className="mb-6 P-7 ">
								<input
									type=""
									id=""
									className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12 placeholder:text-gray-500 placeholder:font-normal placeholder:text-sm w-full p-2.5 outline-none"
									placeholder="Your Email"
									required
								/>
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
										setCustomerCare({
											...customerCare,
											message: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className="flex justify-center ">
								<Button
									customClass="bg-primary  text-white font-bold text-xs !w-28 h-10 py-2  rounded"
									text="SEND"
								/>
							</div>
						</div>
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
