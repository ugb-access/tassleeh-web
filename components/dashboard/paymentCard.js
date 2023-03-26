import { HiCreditCard, HiOutlineChevronDown } from "react-icons/hi";
import Button from "../../components/Button";
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import ExpressCheckout from "../checkout/ExpressCheckout";
const PaymentCard = ({ onclick, valueX, name, planId }) => {
	return (
		<div
			className="z-50 h-[530px] w-[600px] rounded-xl m-auto right-0 top-0 bottom-0 left-0 fixed bg-[#FFFFFF]"
			style={{
				boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
			}}
		>
			<div className="flex justify-between px-3 py-2">
				<h2 className="text-[#272B41] font-bold text-lg">Credit Card</h2>
				<img
					onClick={onclick}
					className="cursor-pointer h-6"
					src="/images/cross.png"
					alt=""
				/>
			</div>
			<hr className="pb-3" />
			<div className="ml-3 pb-2">
				<h2 className="text-md font-semibold">Add Credit Card Credentials</h2>
			</div>
			<div className="flex gap-5 mx-4 items-center pt-3">
				<div className="basis-full">
					<label>Name on Card</label>
					<TextInput customClass="!h-8" placeholder="Name Here" />
				</div>
				<div className="relative basis-full">
					<label>Card Number</label>
					<HiCreditCard className="text-primary pointer-events-none w-8 h-6 absolute top-1.1/2 mt-1 transform -translate-y-1/2 left-3" />
					<TextInput customClass="pl-7 h-8" placeholder="0000 0000 0000 0000" />
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
					<TextInput customClass="h-8" placeholder="Address Here" required />
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
						<TextInput customClass="h-8" placeholder="00000" required />
					</div>
				</div>
			</div>
			<div className="flex justify-center px-4 ">
				<ExpressCheckout id={planId} plans={name} price={valueX}></ExpressCheckout>
			</div>
			<div className="flex gap-3 justify-end px-4 ">
				<Button
					onClick={onclick}
					text="cancel"
					customClass="text-[#9299B8] border-2 border-solid border-[#E3E6EF] bg-white rounded-md text-sm font-semibold text-white w-[90px] !h-10"
				/>
				<Button
					text="confirm"
					customClass="bg-primary rounded-md  text-sm font-semibold text-white w-[90px] !h-10"
				/>
			</div>
		</div>
	);
};

export default PaymentCard;
