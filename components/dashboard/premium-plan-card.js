import Button from "../Button";
import react, { useState } from "react";
import PaymentCard from "./paymentCard";
import ExpressCheckout from "../checkout/ExpressCheckout";
const PremPlanCard = ({ onClickButton, plans }) => {
	const [open, setOpen] = useState(false);
	let priceX = plans[1]?.price;
	let planName = plans[1]?.packageName;
	let premiumID = plans[1]?._id;
	// console.log(startupID, "startup id");
	return (
		<div className="border-2 border-solid rounded-xl">
			<div className="pt-4">
				<div className="flex justify-center my-3">
					<button className="px-3 py-1 bg-[#eeebeb] border-2 rounded-full text-primary text-sm font-semibold">
						{planName}
					</button>
				</div>
				<div className="flex justify-center items-center">
					<span>£</span>
					<h3 className="text-3xl font-medium">{priceX}</h3>
					<span>/month</span>
				</div>
				<div className="mt-6 ml-4 whitespace-nowrap pr-14">
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Path_888.png" alt="" />
						<p className="text-[#4B5664] text-sm">Customer Support 24/7</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Path_888.png" alt="" />
						<p className="text-[#4B5664] text-sm">Job Description</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Path_888.png" alt="" />
						<p className="text-[#4B5664] text-sm">Advertising Copy Written</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Path_888.png" alt="" />
						<p className="text-[#4B5664] text-sm">Posted on 4 job boards</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Path_888.png" alt="" />
						<p className="text-[#4B5664] text-sm">Review and shortlisting</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Path_888.png" alt="" />
						<p className="text-[#4B5664] text-sm">
							Agency Sets up Initial Interviews
						</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Vector (7).png" alt="" />
						<p className="text-[#4B5664] text-sm">
							In-depth screening & Interviewing
						</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Vector (7).png" alt="" />
						<p className="text-[#4B5664] text-sm">Review and shortlisting</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Vector (7).png" alt="" />
						<p className="text-[#4B5664] text-sm">
							Full Management of Interview Process
						</p>
					</div>
					<div className="flex items-center gap-2 py-2">
						<img src="/images/Vector (7).png" alt="" />
						<p className="text-[#4B5664] text-sm">Full guarantees</p>
					</div>
				</div>
			</div>
			<div className="flex justify-center my-4">
				<Button
					// onClick={() => setOpen(!open)}
					text="Subscribe"
					customClass="absolute bg-primary rounded-md  text-sm font-semibold text-white w-[150px] !h-7"
				/>
				<div className="opacity-0">
					<ExpressCheckout
						id={premiumID}
						plans={planName}
						price={priceX}
					></ExpressCheckout>
				</div>
			</div>
		</div>
	);
};

export default PremPlanCard;
