import Link from "next/link";
import Button from "../Button";

const CategoriesCard = ({ item, tryNow, text }) => {
	return (
		<>
			<div className="service-card flex lg:flex-nowrap flex-wrap justify-center lg:gap-6 rounded-md sm:py-6 py-4 px-3 bg-white">
				<div className="">
					<div>
						<img className="" src={item?.icon} alt="" />
					</div>
				</div>
				<div className="lg:w-[60%]">
					<div className=" mt-6 lg:mt-0 !max-h-[190px] !min-h-[190px]">
						<h1 className="text-xl font-bold text-[#2F2C4A] md:text-left text-center">{item?.title}</h1>
						<p className="mt-2 sm:leading-8 text-[#656464] md:text-left	 text-justify leading-[25px] ">
							{item?.description}
						</p>
					</div>
					<div>
						<Link
							href={tryNow}
							className="flex justify-center lg:justify-start "
						>
							<Button
								customClass={
									"md:mt-7 border border-primary text-secondary px-5 !w-fit !h-[35px] rounded-lg"
								}
								text={text}
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoriesCard;
