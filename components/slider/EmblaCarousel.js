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
								<div className="absolute top-2 right-2">
									<Link href="/">
										<div className="cursor-pointer z-50 flex items-center">
											<img
												className="h-5"
												src="/images/bx-arrow-back.png"
												alt=""
											/>
											<span className="text-white whitespace-nowrap text-sm">
												Go Back
											</span>
										</div>
									</Link>
								</div>
								<img
									className="embla__slide__img"
									src={item.img}
									alt="Your alt text"
								/>
								<div className="absolute left-[50%] right-[50%] bottom-28 justify-center flex flex-col items-center mx-auto">
									<h2 className="text-white py-2 text-4xl font-semibold whitespace-nowrap">
										{item.title}{" "}
										<span className="text-[#FC6045]">{item?.orange}</span>
										<span className="ml-1">{item?.black}</span>
									</h2>
									<p className="text-white text-center text-xl  lg:text-lg font-medium py-2 w-[400px]">
										{item.description}
									</p>
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
