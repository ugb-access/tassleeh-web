import NewsLetter from "../components/NewsLetter";
import Head from "next/head";
import Button from "../components/Button";
import HowWorksBtn from "../components/HowWorksBtn";
import CardTwo from "../components/common/Card Two";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getWebStat } from "../services/auth-service";
import { toast } from "react-toastify";

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
	return (
		<div>
			<Head>
				<title> About - Job-Locator </title>
			</Head>
			{/* ------------------------aBOUT JOB LOCATOR-------------- */}
			<section>
				<div className="px-5 md:px-10 md:py-50 md:text-center lg:text-left md:flex  md:flex-wrap lg:flex-nowrap md:items-center lg:pt-10 gap-36 md:gap-20 lg:gap-36">
					<div className="lg:basis-[50%]">
						<h1 className="font-semibold text-center text-2xl py-4 sm:text-3xl md:text-5xl md:font-bold lg:font-semibold lg:text-[66px] lg:pt-10 lg:text-left text-[#110229] md:!leading-[75px]">
							ABOUT
							<span className="text-primary ml-2">JOB LOCATOR</span>
						</h1>
						<p className="font-base text-center text-opacity-70 text-base lg:font-normal lg:text-lg lg:text-left  md:text-base sm:text-lg lg:leading-10 text-[#110229]">
							The first step into your next career. We are the link to helping
							you find a job with our unique geolocation software we open you up
							to a whole new world of job openings within your vicinity. A
							simple and efficient method for registering and becoming a part of
							Job Locator for finding the best jobs around you
						</p>
						<div className="mt-8 flex justify-center md:justify-center lg:justify-start items-center">
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
								customClass="bg-primary rounded-md p-2 text-xs font-semibold text-white !w-28 !h-12"
							/>

							<HowWorksBtn />
						</div>
					</div>
					<div className="relative z-[1] basis-[50%] flex justify-center mt-12">
						<img
							className="h-56 sm:h-80 md:h-96 lg:h-[360px] "
							src="/images/image one.png"
							alt=""
						/>
						<img
							className="h-56 sm:h-80 lg:h-[360px] md:h-96 pt-16 px-3 md:px-0 md:pt-0 md:mt-16 md:mx-3"
							src="/images/image two.png"
							alt=""
						/>
						<div className="absolute hidden lg:block top-[-14px] right-[39px] z-[-1]">
							<img src="/images/Dot (5).png" alt="Dot" />
						</div>
						<img
							className="h-56 md:h-96 sm:h-80 lg:h-[360px]"
							src="/images/image three.png"
							alt=""
						/>
						<div className="absolute bottom-[23px] hidden lg:block left-[-62px] z-[-1]">
							<img src="/images/Dot (5).png" alt="" />
						</div>
					</div>
				</div>
			</section>
			{/* -----------------------------Trusted Job Portal----------------------- */}
			<section className="pt-28 ">
				<div className="md:w-full md:flex m-auto md:flex-wrap md:mx-auto lg:flex-nowrap lg:gap-2 lg:justify-center items-start md:px-24 sm:px-14 px-4 py-10">
					<div className="lg:w-[50%] md:mr-10">
						<img className="w-[100%] " src="/images/trustedimg.png" alt="" />
					</div>
					<div className="col-2 mb-auto lg:w-[50%]">
						<div className="pl-">
							<h1 className="line w-max text-secondary font-semibold text-2xl sm:text-[34px]">
								Trusted & popular job portal
							</h1>
							<p className="mt-4 font-base text-justify text-opacity-70 text-base lg:font-normal lg:text-lg lg:text-justify  md:text-base sm:text-lg lg:leading-10 text-[#110229]">
								The most trusted platform, Job Locator is where you can find the
								right person or the right job We are the link to helping you
								find a job without looking too hard, with the unique geolocation
								feature we open you up to a whole new world of job openings
								within your vicinity. With the use of this platform and app, we
								combine convenience with precision to ease the stress of job
								searching. All your dreams are achievable with Job Locator as
								your partner in enhancing your careers.
							</p>
						</div>
						<div>
							<div className="flex items-center mb-3 mt-6">
								<div className="border-solid bg-primary rounded-full w-5 h-5">
									<img className="mx-auto py-1" src="/images/tick.png" alt="" />
								</div>
								<p className="px-3 md:text-lg font-normal text-opacity-70 text-[#110229] leading-8">
									Location-Based Searching..
								</p>
							</div>
							<div className="flex items-center mb-3">
								<div className="border-solid bg-primary rounded-full w-5 h-5">
									<img className="mx-auto py-1" src="/images/tick.png" alt="" />
								</div>
								<p className="px-3 md:text-lg font-normal text-opacity-70 text-[#110229] leading-8">
									Online Interviews.
								</p>
							</div>
							<div className="flex items-center mb-3">
								<div className="border-solid bg-primary rounded-full w-5 h-5">
									<img className="mx-auto py-1" src="/images/tick.png" alt="" />
								</div>
								<p className="px-3 md:text-lg font-normal text-opacity-70 text-[#110229] leading-8">
									CV Builder.
								</p>
							</div>
							<div className="flex items-center mb-3">
								<div className=" border-solid bg-primary rounded-full w-5 h-5">
									<img className="mx-auto py-1" src="/images/tick.png" alt="" />
								</div>
								<p className="px-3 md:text-lg font-normal text-opacity-70 text-[#110229] leading-8">
									Guide for Interviews.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* ------------------------About Us------------------------------ */}
			<section className="lg:pt-20">
				<div className="lg:pl-24 !items-start lg:px-0 px-4 md:w-full md:px-20 py-6 md:flex md:flex-wrap lg:flex-nowrap lg:justify-between  justify-center">
					<div className="lg:w-[50%] mb-auto">
						<h1 className="md:text-3xl text-xl font-bold text-secondary pb-4">
							ABOUT US
						</h1>
						<div className="border-solid bg-primary mt-2 h-[2.4px] w-16 mb-3"></div>
						<p className="mt-4 md:mr-10 font-base text-justify text-opacity-70 text-base lg:font-normal lg:text-lg lg:text-justify  md:text-base sm:text-lg lg:leading-10 text-[#110229]">
							The first step into your next career. At the Job Locator, we
							understand that the hardest part of finding a new job is finding
							the time to fill in application forms and send them off. We are
							the link to helping you find a job without looking too hard, with
							our unique geo location software we open you up to a whole new
							world of job openings within your vicinity. In this current time,
							convenience drives the world, and this is true for both
							prospective employees and employer. It can be a laborious task to
							examine hundreds of applications, which just do not fit the
							criteria. Each job seeker will only have to complete their profile
							once and from there be able to apply for jobs, and employees will
							be able to quickly scan skills and qualities to ensure that the
							applicants match up to the job before being able to invite them to
							the next stage. Start your career journey with Job Locator today.
						</p>
					</div>
					<div className="col-2 items-start lg:mt-0 mt-7">
						<img className="w-[100%]   " src="/images/aboutus.png" alt="" />
					</div>
				</div>
			</section>
			{/* ------------------------------Get started--------------------------- */}
			<section className="py-24 bg-[#FAFAFA]">
				<div className="flex flex-col items-center">
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
			{/* ----------------------Newsletter----------------------------- */}
			<div>
				<NewsLetter />
			</div>
		</div>
	);
};

export default About;
