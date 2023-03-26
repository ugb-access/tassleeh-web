import NewsLetter from "../../components/NewsLetter";
import Head from "next/head";
import Button from "../../components/Button";
import HowWorksBtn from "../../components/HowWorksBtn";
import BlogCard from "../../components/common/BlogCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllBlogs } from "../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";

const blogs = [
	{
		title: "Best Strategies to Find the Right Candidates!",
		img: "/images/blogcard.png",
		link: "",
	},
	{
		title: "Tips and Tricks While Responding ",
		img: "/images/blogcard2.png",
		link: "",
	},
	{
		title: "10 Interview Questions for The Full Stack Developer",
		img: "/images/blogcard3.png",
		link: "",
	},
	{
		title: "Tips and Tricks For Finding Best Jobs",
		img: "/images/blogcard4.png",
		link: "",
	},
	{
		title: "Best Strategies to Find the Right Candidates!",
		img: "/images/blogcard5.png",
		link: "",
	},
	{
		title: "Tips and Tricks While Responding ",
		img: "/images/blogcard6.png",
		link: "",
	},
	{
		title: "10 Interview Questions for The Full Stack Developer",
		img: "/images/blogcard7.png",
		link: "",
	},
	{
		title: "Tips and Tricks For Finding Best Jobs",
		img: "/images/blogcard8.png",
		link: "",
	},
];

const Blogs = () => {
	const router = useRouter();
	const [data, setData] = useState(null);
	const [blogsData, setBlogsData] = useState([]);
	const [spinner, setSpinner] = useState(false);
	useEffect(() => {
		const gettingData = localStorage.getItem("user");
		const userData = JSON.parse(gettingData);
		setData(userData);
		fetchBlogs();
	}, []);
	const fetchBlogs = () => {
		setSpinner(true);
		getAllBlogs()
			.then((res) => {
				// console.log(res, "res");
				setBlogsData(res?.data);
				if (res?.data) {
					setSpinner(false);
				} else {
					setSpinner(false);
				}
			})
			.catch((err) => {
				// console.log(err);
				setSpinner(false);
			});
	};
	return (
		<div>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 bg-transparent fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<Head>
				<title> FAQ - Job-Locator </title>
			</Head>
			{/* -------------------Job-locator-blogs---------------- */}
			<section>
				<div className="px-5 md:px-10 md:py-50 md:text-center lg:text-left md:flex md:flex-wrap lg:flex-nowrap md:justify-center lg:py-8 lg:justify-between lg:items-center gap-36 md:gap-20 lg:gap-36">
					<div className="lg:w-[50%] w-full">
						<h1 className="font-semibold text-2xl lg:text-left text-center py-4 sm:text-3xl md:font-semibold md:text-5xl lg:font-semibold lg:text-5xl lg:pt-10 text-[#110229] md:!leading-[80px]">
							JOB LOCATOR <span className="text-primary">BLOGS</span>
						</h1>
						<h3 className="font-base text-base lg:font-normal lg:text-lg  md:text-base sm:text-lg lg:leading-10 text-[#000000] text-opacity-70">
							The first step into your next career. We are the link to helping
							you find a job with our unique geolocation software we open you up
							to a whole new world of job openings within your vicinity. We open
							you up to a whole new world of job openings within your vicinity.
						</h3>
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
								customClass="bg-primary rounded-md p-2 text-sm font-semibold text-white w-36 !h-12"
							/>

							{/* <HowWorksBtn /> */}
						</div>
					</div>
					<div className="flex justify-center mt-12">
						<img
							className="h-56 sm:h-80 md:h-96 lg:h-[350px] "
							src="/images/Rectangle 34624926.png"
							alt=""
						/>
						<img
							className="h-56 sm:h-80 lg:h-[350px] md:h-96 pt-16 md:pt-0 md:mt-16 md:mx-3"
							src="/images/Rectangle 34624927.png"
							alt=""
						/>
						<img
							className="h-56 md:h-96 sm:h-80 lg:h-[350px]"
							src="/images/Rectangle 34624928.png"
							alt=""
						/>
					</div>
				</div>
			</section>
			{/* ---------------------our-blogs------------------------- */}
			<section className="px-5 md:px-10">
				<div>
					<h2 className="md:pt-28 pt-8 text-secondary text-2xl font-semibold text-center uppercase line w-max m-auto">
						our blogs
					</h2>
				</div>
				<div className="blogs-list-container flex gap-4 gap-y-12 pt-8 md:p-8 !flex-wrap">
					{blogsData?.length > 0 &&
						blogsData?.map((item) => (
							<BlogCard
								id={item?._id}
								title={item?.title}
								img={item?.featuredImage}
								url={item?._id}
							/>
						))}
				</div>
				{blogsData?.length === 0 && (
					<div className="text-red-500 flex items-center justify-center w-full h-[160px]">
						<p className="">No Blogs Found</p>
					</div>
				)}
			</section>
			{/* --------------------newsletter------------------ */}
			<div className="mt-5 lg:mt-5">
				<NewsLetter />
			</div>
		</div>
	);
};
export default Blogs;
