import { useState } from "react";
import Button from "../../../components/Button";
// import CreditPopup from "./credit-card-popup";
// import TextInput from "../../../components/TextInput";
// import { HiCreditCard } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";

const AmountPopup = ({ setShowPopup, showPopup }) => {
	const [showCreditPopup, setShowCreditPopup] = useState(1);
	return (
		<>
			<div>
				<div
					onClick={() => setShowPopup(false)}
					className="fixed h-[100vh] top-0 left-0 right-0 bottom-0 w-screen bg-[#111217] opacity-[0.5] cursor-pointer"
				></div>
				<div className="fixed !top-0 !left-0 !right-0  !bottom-0 pt-0.5 pb-2 px-3 m-auto w-[95%] md:w-[35%]  h-fit  bg-white z-50 rounded-lg">
					<div className="header">
						{showCreditPopup === 1 ? (
							<div>
								<div className="flex justify-center my-2 mt-4">
									<AiFillCheckCircle className="text-[#34A853] text-7xl " />
								</div>
								<div className="text-center py-4 font-bold text-2xl">
									Congratulations Job <br /> Completed Successfully
								</div>
								<div className="py-4 px-5">
									<Button
										text="You have to pay $300"
										customClass="bg-primary text-white text-sm w-full !h-12 rounded-2xl"
									/>
								</div>
								<div className="py-4 flex justify-center">
									<Button
										onClick={() => setShowCreditPopup(2)}
										text="Okay"
										customClass="bg-[#34A853] text-white text-sm !w-32 !h-10 rounded-2xl"
									/>
								</div>
							</div>
						) : "" || showCreditPopup === 2 ? (
							<div>
								<div className="flex justify-between py-2">
									<h2 className="text-[#272B41] font-bold text-lg">
										Please Rate Your Experience
									</h2>
									<img
										onClick={() => setShowPopup(false)}
										className="cursor-pointer h-6"
										src="/images/cross.png"
										alt=""
									/>
								</div>
								<hr className="pb-3" />
								<div className="flex justify-center flex-col items-center gap-y-3">
									<div>
										<img src="/images/icon.png" alt="" />
									</div>
									<div>
										<h1>Andrew Smith</h1>
									</div>
									<div>
										<img className="h-4" src="/images/rating.png" alt="" />
									</div>
								</div>
								<div className="px-">
									<h1 className="text-black ">Review</h1>
									<textarea
										placeholder="Review Details Here..."
										className="w-full border p-1"
										rows="4"
									></textarea>
								</div>
								<div className="flex justify-center py-3">
									<Button
										// onClick={() => setShowCreditPopup(3)}
										text="Submit"
										customClass=" rounded-lg bg-primary text-sm font-semibold text-white !w-[90px] !h-10"
									/>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default AmountPopup;
