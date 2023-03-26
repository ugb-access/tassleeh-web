import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "../Button";
import {
	DotButton,
	PrevButton,
	NextButton,
} from "./EmblaCarouselArrowsDotsButtons";

const EmblaCarousel = ({ slides, options, firstHead }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);
	//  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

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
			<div className="embl" ref={emblaRef}>
				<div className="embl__container">
					{slides?.map((item, index) => (
						<div className="embl__slide" key={index}>
							<div>
								<div className="p-5 flex flex-col items-center border-2 border-solid rounded-2xl border-[#DCDCEB] w-[220px] h-56">
									<div>
										<img className="h-24" src={item?.businessImage} alt="" />
									</div>
									<div className="pt-4 text-base font-semibold capitalize">
										{item?.fullName}
									</div>
									<div className="flex pt-3">
										<img src="/images/icon6.png" alt="" />
										<p className="mx-2 text-xs font-semibold capitalize">
											{item?.businessArea}
										</p>
									</div>
									{/* <div className="pt-4">	
										<Button
											text="VIEW PROFILE"
											customClass="bg-primary rounded p-3 text-xs font-semibold text-white w-28 !h-12"
										/>
									</div> */}
								</div>
							</div>
						</div>
					))}
				</div>
				<PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
				<NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
			</div>

			{/* <div className="embla__dots">
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						selected={index === selectedIndex}
						onClick={() => scrollTo(index)}
					/>
				))}
			</div> */}
		</>
	);
};

export default EmblaCarousel;
