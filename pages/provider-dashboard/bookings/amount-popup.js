import { useState } from "react";
import Button from "../../../components/Button";
// import CreditPopup from "./credit-card-popup";
import TextInput from "../../../components/TextInput";
import { HiCreditCard } from "react-icons/hi";

const AmountPopup = ({ setShowPopup, showPopup }) => {
	const [showCreditPopup, setShowCreditPopup] = useState(1);
	return (
		<>
			<div>
				<div
					onClick={() => setShowPopup(false)}
					className="fixed h-[100vh] top-0 left-0 right-0 bottom-0 w-screen bg-[#111217] opacity-[0.5] cursor-pointer"
				></div>
				<div className="fixed !top-0 !left-0 !right-0  !bottom-0 pt-0.5 pb-2 px-3 m-auto w-[100%] md:w-[35%]  h-fit  bg-white z-50 rounded-lg">
					<div className="header0 ">
						{showCreditPopup === 1 ? (
							<div>
								<div className="flex justify-between items-center">
									<h1 className="text-[#272B41] font-bold text-base">
										Pay to your mechanic
									</h1>
									<img
										src="/images/cross3.png"
										alt=""
										onClick={() => setShowPopup(false)}
									/>
								</div>
								<div className="py-4">
									<Button
										text="You have to pay $300"
										customClass="bg-primary text-white text-sm w-full !h-12 rounded-2xl"
									/>
								</div>
								<div className="pt-2 pb-4">
									<h1>Amount</h1>
									<div className="border flex justify-between px-3 py-2 items-center rounded-xl">
										<input
											className="w-4/5"
											type="text"
											placeholder="Enter Amount"
										/>
										<p className="text-primary">USD</p>
									</div>
								</div>
								<div className="py-4 flex justify-center">
									<Button
										onClick={() => setShowCreditPopup(2)}
										text="Pay Amount"
										customClass="bg-[#34A853] text-white text-sm !w-32 !h-10 rounded-2xl"
									/>
								</div>
							</div>
						) : "" || showCreditPopup === 2 ? (
							<div>
								<div className="flex justify-between px-3 py-2">
									<h2 className="text-[#272B41] font-bold text-lg">
										Add Credit Card
									</h2>
									<img
										onClick={() => setShowPopup(false)}
										className="cursor-pointer h-6"
										src="/images/cross.png"
										alt=""
									/>
								</div>
								<hr className="pb-3" />
								<div className="ml-3 pb-2">
									<h2 className="text-md font-semibold">
										Add Credit Card Credentials
									</h2>
								</div>
								<div className="flex gap-5 mx-4 items-center pt-3">
									<div className="basis-full">
										<label>Name on Card</label>
										<TextInput customClass="!h-8" placeholder="Name Here" />
									</div>
									<div className="relative basis-full">
										<label>Card Number</label>
										<HiCreditCard className="text-primary pointer-events-none w-8 h-6 absolute top-1.1/2 mt-1 transform -translate-y-1/2 left-3" />
										<TextInput
											customClass="pl-7 h-8"
											placeholder="0000 0000 0000 0000"
										/>
									</div>
								</div>
								<div className="flex gap-5 mx-4 items-center ">
									<div className="basis-full">
										<label className="text-[#757575]">Expiration Date</label>

										<TextInput customClass="!h-8" placeholder="MM/YYY" />
									</div>
									<div className="basis-full">
										<label>CVC</label>
										<TextInput customClass="!h-8" placeholder="000" />
									</div>
								</div>
								<div className="ml-3 pt-1 pb-1">
									<h2 className="text-md font-semibold">Address</h2>
								</div>
								<div className="flex gap-5 mx-4 items-center pt-3">
									<div className="basis-full">
										<label>Address</label>
										<TextInput customClass="h-8" placeholder="Address" />
									</div>
									<div className="basis-full">
										<label>Address Line 2</label>
										<TextInput
											customClass="h-8"
											placeholder="Address Here"
											required
										/>
									</div>
								</div>
								<div className="flex gap-5 mx-4 items-center pt-3">
									<div className="basis-full ">
										<label>City</label>
										<TextInput customClass="h-8" placeholder="City" required />
									</div>
									<div className="flex basis-full gap-5">
										<div className="basis-full">
											<label>State</label>
											<select
												id="countries"
												className="bg-gray-50 border my-0 border-gray-100 text-gray-900 text-sm h-8   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-0  outline-none"
											>
												<option>State</option>
												<option>Punjab</option>
												<option>Sindh</option>
												<option>Balochistan</option>
											</select>
										</div>
										<div className="basis-full">
											<label>Zip Code</label>
											<TextInput
												customClass="h-8"
												placeholder="00000"
												required
											/>
										</div>
									</div>
								</div>
								<div className="flex justify-center">
									{/* <Button
                    onClick={onclick}
                    text="cancel"
                    customClass="text-[#9299B8] border-2 border-solid border-[#E3E6EF] bg-white rounded-md text-sm font-semibold text-white w-[90px] !h-10"
                    /> */}
									<Button
										onClick={() => setShowCreditPopup(3)}
										text="Pay Amount"
										customClass="rounded-md bg-[#34A853] text-sm font-semibold text-white !w-[90px] !h-10"
									/>
								</div>
							</div>
						) : (
							<div>
								<div className="flex justify-between px-3 py-2">
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
								<div className="px-3">
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
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AmountPopup;
