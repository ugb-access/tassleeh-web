import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import NewsLetter from "../../components/NewsLetter";
import { getJobsByLatLng } from "../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";

const LocateJobs = () => {
	const router = useRouter();
	const [spinner, setSpinner] = useState(false);
	const [cardData, setCardData] = useState();
	const fetchJobs = (body) => {
		setSpinner(true);
		getJobsByLatLng(body)
			.then((res) => {
				// console.log(res);
				setSpinner(false);
				setCardData(res?.data);
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
		let body = {
			lat: position?.coords?.latitude,
			long: position?.coords?.longitude,
		};
		fetchJobs(body);
	}
	return (
		<div>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 bg-transparent fixed"></div>
					<div className="z-50 h-[530px] w-[600px] rounded-xl m-auto  top-[55px] relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<section className="bg-[#FAFAFA] py-10 ">
				<div>
					<h3 className="uppercase line w-max m-auto text-[#110229] text-3xl font-semibold text-center pb-28">
						Jobs in <span className="text-primary">60miles</span>
					</h3>
				</div>
				<div className="flex  flex-wrap justify-center gap-12 px-6 mb-2">
					{cardData?.map((item, index) => {
						// console.log(item, "splice");
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
					})}
				</div>
			</section>
			<NewsLetter></NewsLetter>
		</div>
	);
};

export default LocateJobs;
