import Link from "next/link";
import Button from "../Button";

const CategoriesCard = ({ item }) => {
	return (
		<>
			<div className="service-card flex justify-center gap-2 rounded-md sm:py-6 md:w-[43%] md:h-[300px] bg-white">
				<div className="w-[35%]">
					<div>
						<img src={item?.icon} alt="" />
					</div>
				</div>
				<div className="w-[60%]">
					<div className="">
						<h1 className="text-xl font-bold text-[#2F2C4A]">{item?.title}</h1>
						<p className="mt-2 leading-8 text-[#656464]">{item?.description}</p>
					</div>
					<Link href={"/user-dashboard/dashboard/category-details"}>
						<Button
							customClass={
								"mt-7 border border-primary text-secondary !w-[100px] !h-[35px] rounded-lg"
							}
							text={"Try Now"}
						/>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CategoriesCard;
