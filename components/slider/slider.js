import React from "react";
import EmblaCarousel from "./EmblaCarousel";
const OPTIONS = {};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const image1 = "/images/signin.png";
const image2 = "/images/signup.png";
const image3 = "/images/signin.png";
const images = [
	{
		img: image1,
		title: "Find Your",
		description: "Jobs, Employment & Future Career Opportunities...",
		orange: "Dream",
		black: "job",
	},
	{
		img: image2,
		title: "Hire ",
		description: "Jobs, Employment & Future Career Opportunities...",
		orange: "Right",
		black: "Candidate",
	},
	{
		img: image3,
		title: "Hassle Free",
		description: "Jobs, Employment & Future Career Opportunities...",
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