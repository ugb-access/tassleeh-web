import React from "react";
import EmblaCarousel from "./EmblaCarousel";
const OPTIONS = {};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const image1 = "/images/BG.png";
const image2 = "/images/BG.png";
const image3 = "/images/BG.png";
const images = [
	{
		img: image1,
		title: "Find Your",
		description: "Our motive is to provide best services to our customers under one platform.",
		orange: "Dream",
		black: "job",
	},
	{
		img: image2,
		title: "Hire ",
		description: "Our motive is to provide best services to our customers under one platform.",
		orange: "Right",
		black: "Candidate",
	},
	{
		img: image3,
		title: "Hassle Free",
		description: "Our motive is to provide best services to our customers under one platform.",
		orange: "Job",
		black: "Search",
	},
];
const Slider = () => {
	return (
		<>
			<section className="sandbox__carousel">
				<EmblaCarousel slides={images} options={OPTIONS} />
			</section>
		</>
	);
};

export default Slider;