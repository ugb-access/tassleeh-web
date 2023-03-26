import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { blogGetByID } from "../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";

const BlogDetail = () => {
	const router = useRouter();
	const [blogData, setBlogData] = useState([]);
	const BlogDescription = blogData[0];
	const [spinner, setSpinner] = useState(false);
	const [blogID, setBlogId] = useState("");
	const fetchLocalSt = () => {
		let stData = localStorage.getItem("blogid");
		let idData = JSON.parse(stData);
		setBlogId(idData);
	};
	const getBlog = () => {
		// let id = router.query?.id
		setSpinner(true);
		blogGetByID(blogID)
			.then((res) => {
				setBlogData(res?.data);
				if (res?.data?.success) {
					setSpinner(false);
				} else {
					setSpinner(false);
				}
				// console.log(res, "resBlog");
			})
			.catch((err) => {
				// console.log(err);
				setSpinner(false);
			});
	};
	useEffect(() => {
		fetchLocalSt();
		getBlog();
	}, [blogID]);
	return (
		<>
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
			{blogData.map((item) => {
				return (
					<div>
						<div className="blog-detail-img relative flex justify-center py-5 px-5 md:px-9">
							{/* <div className="absolute hidden  text-center md:flex flex-col justify-center items-center h-[410px]">
					<h1 className="text-4xl font-semibold text-[#FFFFFF] py-3">Blogs</h1>
					<p className="text-xl font-medium text-[#FFFFFF] w-[650px] leading-9">
						We open you up to a whole new world of job openings within your
						vicinity.
					</p>
				</div> */}
							<div className="absolute text-center !overflow-hidden top-[25%] md:top-[35%] ">
								<h1 className="text-4xl font-semibold text-[#FFFFFF] py-3 ">
									Blog
								</h1>
								<p className="text-md md:text-xl  font-medium text-[#FFFFFF] w-fit  md:leading-9">
									{item?.title}
								</p>
							</div>
							<img
								className="w-full max-h-[75vh] sm:h-full"
								src={`${
									item?.featuredImage
										? item?.featuredImage
										: "/images/blogdetail.png"
								}`}
								alt="back-img"
							/>
						</div>
						<div className="py-6 md:px-5">
							<h1 className="uppercase md:text-3xl  text-xs font-semibold text-center line w-max m-auto">
								Best Strategies to Find the{" "}
								<span className="text-primary"> {item?.title}!</span>
							</h1>
							<div
								className="p-5 pb-3 lists"
							>
								{/* {ReactHtmlParser(BlogDescription?.blogDetail)} */}
								<p
									className="mr-5"
									dangerouslySetInnerHTML={{
										__html: BlogDescription?.blogDetail,
									}}
								></p>
								{/* {item?.blogDetail} */}
								<h3 className="text-base font-bold text-[#000000] text-opacity-70">
									{item?.author}
								</h3>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default BlogDetail;
