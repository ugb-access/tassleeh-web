import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { transactionAdd } from "../../services/auth-service";

const ExpressCheckout = ({ price, plans, id }) => {
	const paypalData = {
		amount: 0,
		planId: "",
		userId: "",
		accountNumber: "",
	};

	return (
		price &&
		id &&
		plans && (
			<>
				<PayPalScriptProvider
					options={{
						"client-id": `${
							process.env.PAYPAL_CLIENT_ID || "test"
						}&currency=GBP`,
					}}
				>
					<PayPalButtons
						fundingSource="paypal"
						style={{ color: "silver" }}
						createOrder={(data, actions) => {
							return actions.order
								.create({
									purchase_units: [
										{
											amount: {
												value: price,
											},
											description:
												"Thanks for using Job Locator",
										},
									],
								})
								.then((orderId) => {
									return orderId;
								});
						}}
						onApprove={function (data, actions) {
							return actions.order.capture().then((details) => {
								console.log(details);
								const userOldData =
									localStorage.getItem("user");
								const localData = JSON.parse(userOldData);

								// setPaypalData({ ...paypalData, accountNumber: details?.id });
								let body = paypalData;
								body.accountNumber = details?.payer.payer_id;
								body.userId = localData?._id;
								body.amount = price;
								body.planId = id;

								transactionAdd(body)
									.then((res) => {
										if (res?.data?.success) {
											let planId = {
												packageName: plans,
												price: price,
												_id: id,
											};

											let finalDat = {
												...localData,
												planId,
											};
											console.log(finalDat, "final data");
											localStorage.setItem(
												"user",
												JSON.stringify(finalDat)
											);
											swal(
												" Thank you, " +
													details?.payer?.name
														?.given_name,
												res?.data?.message,
												"success"
											);
										}
									})
									.catch((err) => {});
							});
						}}
					></PayPalButtons>
				</PayPalScriptProvider>
			</>
		)
	);
};

export default ExpressCheckout;
