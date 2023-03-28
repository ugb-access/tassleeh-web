import React, { useState, useEffect, useCallback } from "react";
// import Autoplay from "embla-carousel-autoplay/components";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import {
	DotButton,
	PrevButton,
	NextButton,
} from "./EmblaCarouselArrowsDotsButtons";

const EmblaCarousel = ({ slides, options }) => {
	// const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);
	const autoplayOptions = {
		delay: 3000,
		rootNode: (emblaRoot) => emblaRoot.parentElement,
	};
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay(autoplayOptions),
	]);

	// const embla = EmblaCarousel(emblaRoot, { loop: false }, [
	// 	Autoplay(autoplayOptions), // Add plugin with options
	// ]);
	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);
	const scrollTo = useCallback(
		(index) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, [emblaApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
	}, [emblaApi, setScrollSnaps, onSelect]);

	return (
		<>
			<div className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((item, index) => (
							<div className="embla__slide" key={index}>
								<div className="absolute top-16 left-32">
									<Link href="/">
										<img src="/images/logo-main.png" alt="" />
									</Link>
								</div>
								<img
									className="embla__slide__img"
									src={item.img}
									alt="Your alt text"
								/>
								<div className="absolute left-32 top-36 justify-center flex flex-col items-center mx-auto">
									<h2 className="text-white py-2 text-4xl font-semibold whitespace-nowrap">
										{/* {item.title}{" "} */}
										{/* <span className="ml-1">{item?.black}</span> */}
									</h2>
									<p className="text-[#0a093d] text-justify text-xl  lg:text-3xl font-bold py-2 w-[600px]">
										{/* {item.description} */}
										<p>Our motive is to provide <span className="text-primary">best services</span> to our customers under one platform.</p>
									</p>
									<div className="flex justify-center items-center">
									<img src="/images/vec.png" alt="" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="embla__dots">
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						selected={index === selectedIndex}
						onClick={() => scrollTo(index)}
					/>
				))}
			</div>
		</>
	);
};

export default EmblaCarousel;
