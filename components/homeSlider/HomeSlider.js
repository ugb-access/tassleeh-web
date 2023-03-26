import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/auth-service";
import EmblaCarousel from "./EmblaCarousel";
const OPTIONS = { slidesToScroll: "auto", containScroll: "trimSnaps" };

const HomeSlider = () => {
	const [sliderData, setSilderData] = useState([]);
	const fetchUser = () => {
		getUsers()
			.then((res) => {
				let data = res?.data;
				let filData = data.filter((item) => item?.type === "business");
				setSilderData(filData);
			})
			.catch((err) => {
				// console.log(err, "err");
			});
	};
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<>
			<section className="sandbox__carousel">
				{sliderData?.length > 0 ? (
					<EmblaCarousel slides={sliderData} options={OPTIONS} />
				) : (
					<div className="text-red-500 flex items-center  justify-center  w-full h-[160px]">
						<p className="">No Companies Found</p>
					</div>
				)}
			</section>
		</>
	);
};

export default HomeSlider;
