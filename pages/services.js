import NewsLetter from "../components/NewsLetter";
import Head from "next/head";
import Button from "../components/Button";
import ReviewCard from "../components/common/ReviewCard";
import CardTwo from "../components/common/Card Two";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getWebStat } from "../services/auth-service";
import { toast } from "react-toastify";
import Link from "next/link";

const About = () => {
	const router = useRouter();
	const [data, setData] = useState(null);
	const [spinner, setSpinner] = useState(false);
	const [webStatics, setWebStatics] = useState(null);
	useEffect(() => {
		const gettingData = localStorage.getItem("user");
		const userData = JSON.parse(gettingData);
		setData(userData);
		getWebsiteStas();
	}, []);
	const getWebsiteStas = () => {
		setSpinner(true);
		getWebStat()
			.then((res) => {
				// console.log(res, "webstats");
				setWebStatics(res?.data);
				setSpinner(false);
			})
			.catch((err) => {
				// console.log(err);
				toast.error(err?.message);
				setSpinner(false);
			});
	};
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
			<Head>
				<title> About - Job-Locator </title>
			</Head>
			{/* ------------------------aBOUT JOB LOCATOR-------------- */}
			<section>
				<div className="relative poster flex flex-col justify-center items-center">
					<h1 className="text-white text-3xl sm:text-5xl font-bold">
						Services
					</h1>
					<p className="text-white text-justify text-xl sm:w-3/5 sm:text-center py-4">
						Our pride is providing the most extensive range of services. From
						home maintenance to personal assistance. We make sure that your
						safety is never compromised. This is why we hire all the staff under
						the roof of TASSLEEH, just for your satisfaction.
					</p>
					<Link href={"/signin"}>
						<div>
							<Button
								text="Get Started"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-28 sm:!w-32 !h-12 sm:!h-16"
							/>
						</div>
					</Link>
				</div>
			</section>
			{/* ------------------------car-services-------------- */}
			<div className="flex flex-col justify-center items-center mt-20">
				<p className="text-primary sm:text-lg font-semibold">Our Services</p>
				<h1 className="text-2xl sm:text-4xl font-bold text-[#0a093d] mt-2 mb-3 ">
					We Provide Best Services
				</h1>
				<p className="text-[#646565] w-[410px] text-center">
					TASSLEEH provides ultimate installations, repairs, maintenance, and
					grooming services at your doorstep.
				</p>
			</div>
			<div className="flex justify-center flex-wrap mt-24 gap-y-12 sm:gap-16">
				<div className=" px-5 ">
					<h1 className="text-4xl font-bold text-[#0a093d] mb-2">Cars</h1>
					<p className="mt-2 mb-2 text-base font-normal leading-8 text-[#656464] sm:w-[460px]">
						Our auto mechanics are highly skilled with rich experience in the
						field. They are available to serve your needs in almost all areas.
						We believe in Strong values, Quality of services, and satisfaction
						of our clients.
					</p>
					<div className="mb-2">
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Electricity
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Mechanics
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Dyeing/Black Smith
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Oil
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Recorders
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Tire
							</p>
						</div>
					</div>
					<Link href={"/signin"}>
						<div className="mt-6">
							<Button
								text="Try Now"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-32 !h-14"
							/>
						</div>
					</Link>
				</div>
				<div>
					<div>
						<img src="/images/pexels.png" alt="" />
					</div>
				</div>
			</div>
			{/* ------------------------Electronics-services-------------- */}
			<div className="flex flex-wrap sm:flex-row flex-col-reverse justify-center items-center gap-16 mt-32">
				<div>
					<div>
						<img src="/images/electronic.png" alt="" />
					</div>
				</div>
				<div className=" px-5">
					<h1 className="text-4xl font-bold text-[#0a093d] mb-2">
						Electronics
					</h1>
					<p className="mt-2 mb-2 text-base font-normal leading-8 text-[#656464] sm:w-[460px]">
						TASSLEEH is well aware that electrical chores can easily pile up on
						your to-do list, hence we bring to you the best electrician
						services. We provide you with the best solution and a range of
						repairing services.
					</p>
					<div className="mb-2">
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Laptop
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Computer
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Smart Watches
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Tablet
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Satellite
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								CCTV Cameras
							</p>
						</div>
					</div>
					<Link href={"/signin"}>
						<div className="mt-7">
							<Button
								text="Try Now"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-32 !h-14"
							/>
						</div>
					</Link>
				</div>
			</div>
			{/* ------------------------Home-services-------------- */}
			<div className="flex flex-wrap justify-center gap-10 mt-32">
				<div className=" px-5 ">
					<h1 className="text-4xl font-bold text-[#0a093d] mb-2">Home</h1>
					<p className="mt-2 mb-2 text-base font-normal leading-8 text-[#656464] sm:w-[500px]">
						We perform high quality, guaranteed service you can trust at a fair
						price. We provide superior customer service. Our team of highly
						skilled, licensed, certified and trained staff focuses on our
						customers.
					</p>
					<div className="mb-2">
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Electricity
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Plumbing
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Door/Window
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Carpenter
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								AC
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Furniture
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Home Appliance
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Paint
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Ceramic/Marble
							</p>
						</div>
					</div>
					<Link href={"/signin"}>
						<div className="mt-6">
							<Button
								text="Try Now"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-32 !h-14"
							/>
						</div>
					</Link>
				</div>
				<div>
					<div>
						<img src="/images/home.png" alt="" />
					</div>
				</div>
			</div>
			{/* ------------------------Accecerories-services-------------- */}
			<div className="flex flex-wrap sm:flex-row flex-col-reverse justify-center gap-16 mt-32">
				<div>
					<div>
						<img src="/images/accessories.png" alt="" />
					</div>
				</div>
				<div className=" px-5">
					<h1 className="text-4xl font-bold text-[#0a093d] mb-2">
						Accessories
					</h1>
					<p className="mt-2 mb-2 text-base font-normal leading-8 text-[#656464] sm:w-[460px]">
						The aim and priority of TASSLEEH is to to add value to our
						consumers' lives by providing best accessories. This is why we
						provide amazing services just for your satisfaction.
					</p>
					<div className="mb-2 mt-4">
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Bags
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Shoes
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Jewelry
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Watches
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 opacity-70">
								Clothes
							</p>
						</div>
						<div className="flex items-center mb-0.5">
							<div className="">
								<img
									className="mx-auto py-1"
									src="/images/Ellipse 11 (1).png"
									alt=""
								/>
							</div>
							<p className="px-3 text-lg font-normal leading-8 w opacity-70">
								Suit Case
							</p>
						</div>
					</div>
					<Link href={"/signin"}>
						<div className="mt-12">
							<Button
								text="Try Now"
								customClass="bg-primary rounded-2xl p-2 text-sm font-semibold text-white !w-32 !h-14"
							/>
						</div>
					</Link>
				</div>
			</div>
			{/* ----------------------Download----------------------------- */}
			<section className="flex justify-around items-center flex-wrap bg-[#f4f9ff] mt-20 sm:pt-0 pt-10">
				<div className="">
					<div className="pl-6">
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
					<div className="flex items-center sm:justify-start justify-center">
						<img
							className="sm:h-full h-20"
							src="/images/app.png"
							alt="android store"
						/>
						<img
							className="sm:h-full h-10"
							src="/images/android.png"
							alt="app store"
						/>
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
							<div className="mb-16 sm:px-16 relative">
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
			{/* ----------------------Newsletter----------------------------- */}
			<div>
				<NewsLetter />
			</div>
		</div>
	);
};

export default About;
