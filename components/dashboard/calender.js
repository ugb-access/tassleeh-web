// import React, { useState } from "react";
// import { DayPickerRangeController } from "react-dates";
// import { START_DATE } from "react-dates/constants";
// import "react-dates/initialize";
// import moment from "moment";
// import "react-dates/lib/css/_datepicker.css";
// import { differenceInDays } from "date-fns";

// const Calender = () => {
// 	const [startDate, setStartDate] = useState(null); //moment()
// 	const [endDate, setEndDate] = useState(null); //moment().add(1, "day")
// 	const [focusedInput, setFocusedInput] = useState(START_DATE);
// 	const [diffInDays, setDiffInDays] = useState(0);
// 	const handleDate = ({ startDate, endDate }) => {
// 		setStartDate(startDate);
// 		setEndDate(endDate);
// 		const diff = differenceInDays(endDate?._d, startDate?._d);
// 		console.log(diff, "diff");
// 		setDiffInDays(diff);
// 	};
	
// 	return (
// 		<div>
// 			{calenderOpen ? (
// 				<>
// 					<div className="fixed z-50 h-fit w-fit rounded-xl m-auto top-[0] left-0 bottom-0 right-0  bg-[#b53131]">
// 						<div>
// 							<DayPickerRangeController
// 								startDate={startDate}
// 								endDate={endDate}
// 								onDatesChange={handleDate}
// 								focusedInput={focusedInput}
// 								// onFocusChange={setFocusedInput}
// 								onFocusChange={(f) => {
// 									setFocusedInput(!f ? START_DATE : f);
// 								}}
// 								// orientation={"horizontal"}
// 								// numberOfMonths={
// 								// 	windowSize <= 1100 || billingTerm == "long" ? 1 : 2
// 								// }
// 								showClearDates
// 								// minimumNights={2}
// 							/>
// 						</div>
// 					</div>
// 					<div
// 						onClick={() => SetCalenderOpen(false)}
// 						className="fixed w-full h-full top-0 left-0  "
// 					></div>
// 				</>
// 			) : null}
// 			<div className="flex items-center  rounded-md p-1 mb-4 bg-[#eae8e8] w-fit">
// 				<p className="text-xs flex">
// 					Date and Time is Last&nbsp;
// 					{!diffInDays ? (
// 						<div> &nbsp;---&nbsp;Days</div>
// 					) : (
// 						<span> {diffInDays} Days</span>
// 					)}
// 				</p>
// 				&nbsp;
// 				<img className="cursor-pointer" src="/images/Delete.png" alt="delete" />
// 			</div>
// 		</div>
// 	);
// };

// export default Calender;
