import PaymentData from "../../../components/dashboard/paymentData";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { HiOutlineX, HiRefresh } from "react-icons/hi";
import Header from "../../../layout/DashboardHeader";
import { getBusinessTransactionsById } from "../../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";
import moment from "moment";

const PaymentHistory = () => {
	const [date, setDate] = useState(null);
	const [currentItems, setCurrentItems] = useState([]);
	const [transData, setTransData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [search, setSearch] = useState("");
	const [filterData, setFilterData] = useState([]);
	const [spinner, setSpinner] = useState(false);
	let itemsPerPage = 10;
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % transData?.length;
		setItemOffset(newOffset);
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};
	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(transData?.length / itemsPerPage));
		setCurrentItems(transData?.slice(itemOffset, endOffset));
	}, [itemOffset, itemsPerPage, transData]);
	const userData = () => {
		setSpinner(true);
		const Data = localStorage.getItem("user");
		const localData = JSON.parse(Data);
		let id = localData._id;
		getBusinessTransactionsById(id)
			.then((res) => {
				console.log(res);
				let revData = res?.data.reverse();
				console.log(revData);
				setTransData(revData);
				// setJobsData(revData);
				setFilterData(revData);
				setCurrentItems(revData);
				setSpinner(false);
			})
			.catch((err) => {
				// console.log(err);
				setSpinner(false);
			});
	};
	const searchHandler = (val) => {
		let res = filterData?.filter((item, index) =>
			item?.planId?.packageName?.toLowerCase().includes(val.toLowerCase())
		);
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(res?.length / itemsPerPage));
		setCurrentItems(res?.slice(itemOffset, endOffset));
		setSearch(val);
	};
	const searchByDate = () => {
		let res = filterData?.filter(
			(item, index) =>
				moment(item?.createdAt).format("DD/MM/YYYY") ===
				moment(date).format("DD/MM/YYYY")
		);
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(res?.length / itemsPerPage));
		setCurrentItems(res?.slice(itemOffset, endOffset));
	};
	const handleRefresh = () => {
		userData();
		document.getElementById("refreshBtn").classList.add("animate-spin");
		setTimeout(() => {
			document.getElementById("refreshBtn").classList.remove("animate-spin");
		}, [1000]);
	};
	useEffect(() => {
		if (!(date === null)) {
			searchByDate();
		}
		if (date === "") {
			userData();
		}
	}, [date]);
	useEffect(() => {
		userData();
	}, []);
	return (
		<>
			<Header
				headerTitle={"Payment History"}
				headerDiscription={"Get details about your payment history."}
				searchPlaceHolder={"Search by package name"}
				profileLink={"/employee/dashboard/profile"}
				onChangeSearch={(e) => searchHandler(e)}
			/>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl my-auto h-screen sm:right-60 bottom-28 items-center   relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<div
				className="mx-5 px-8"
				style={{
					boxShadow: "0px 2px 20px rgba(000, 000, 000, 0.1)",
				}}
			>
				{/* {calenderOpen ? (
					<>
						<div className="fixed z-50 h-fit w-fit rounded-xl m-auto top-[0] left-0 bottom-0 right-0  bg-[#b53131]">
							<div>
								<DayPickerRangeController
									startDate={startDate}
									endDate={endDate}
									onDatesChange={handleDate}
									focusedInput={focusedInput}
									// onFocusChange={setFocusedInput}
									onFocusChange={(f) => {
										setFocusedInput(!f ? START_DATE : f);
									}}
									// orientation={"horizontal"}
									// numberOfMonths={
									// 	windowSize <= 1100 || billingTerm == "long" ? 1 : 2
									// }
									showClearDates
									// minimumNights={2}
								/>
							</div>
						</div>
						<div
							onClick={() => SetCalenderOpen(false)}
							className="fixed w-full h-full top-0 left-0  "
						></div>
					</>
				) : null} */}
				<div className="flex justify-between items-center ">
					<h1 className="flex items-center font-semibold text-xl py-5 ">
						Payment History
					</h1>
					<div className="flex items-center gap-5">
						{/* <button
							onClick={() => SetCalenderOpen(true)}
							className="border border-solid text-primary ease-in-out duration-1000 hover:text-white hover:bg-primary rounded-md  p-1 px-2 !h-8 border-primary"
						>
							Add Filter
						</button> */}
						<button
							onClick={handleRefresh}
							className="border-2 border-solid rounded-md px-5 py-2 border-primary bg-primary"
						>
							<HiRefresh id="refreshBtn" className="text-white text-xl" />
						</button>
					</div>
				</div>
				<div className="border border-black cursor-pointer bg-[#eae8e8] w-48 flex items-center justify-between mb-4 px-2">
					<button className="flex items-center">
						<input
							className="bg-[#eae8e8] cursor-pointer"
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</button>
					<HiOutlineX className="text-sm" onClick={() => setDate("")} />
				</div>
				{/* <div className="flex items-center  rounded-md p-1 mb-4 bg-[#eae8e8] w-fit">
					<p className="text-xs flex">
						Date and Time is Last&nbsp;
						{!diffInDays ? (
							<div> &nbsp;---&nbsp;Days</div>
						) : (
							<span> {diffInDays} Days</span>
						)}
					</p>
					&nbsp;
					<img
						className="cursor-pointer"
						src="/images/Delete.png"
						alt="delete"
					/>
				</div> */}
				<div className="overflow-scroll lg:overflow-auto">
					<table className="table">
						<thead>
							<tr className="whitespace-nowrap">
								<th style={{ color: "#AEAEAE" }}>Payment Date</th>
								<th style={{ color: "#AEAEAE" }}>Name</th>
								<th className="!text-center" style={{ color: "#AEAEAE" }}>
									Account Number
								</th>
								<th className="!text-center" style={{ color: "#AEAEAE" }}>
									Contact
								</th>
								<th className="!text-center" style={{ color: "#AEAEAE" }}>
									Package Name
								</th>
								<th className="!text-center" style={{ color: "#AEAEAE" }}>
									Amount
								</th>
							</tr>
						</thead>
						<tbody id="table_body" className="whitespace-nowrap">
							{currentItems?.map((item, index) => {
								return (
									<PaymentData
										key={index}
										paymentDate={
											moment(item?.createdAt).format("HH:mm A") +
											", " +
											moment(item?.createdAt).format("DD/MM/YYYY")
										}
										custName={item?.userId?.fullName}
										custAccountNo={item?.accountNumber}
										phoneNumber={
											item?.userId?.phone
												? item?.userId?.phone
												: item?.userId?.email
										}
										packageName={item?.planId?.packageName}
										packageAmount={"£"+item?.amount}
									/>
								);
							})}
						</tbody>
					</table>
					{currentItems?.length === 0 && (
						<div className="text-red-500 flex items-center justify-center w-full h-[160px]">
							<p className="">No Records Found</p>
						</div>
					)}
				</div>
			</div>
			{/* ---------- Pagination Start --------------------- */}
			{/* <div className="lg:flex"> */}
			<div className="w-[99%] flex justify-end mb-4">
				<div className=" mt-5 w-[210px] justify-between">
					<ReactPaginate
						className="flex justify-between "
						nextLabel={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						}
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageCount={pageCount}
						previousLabel={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						}
						pageClassName="page-item text-black"
						pageLinkClassName="text-center rounded-full"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						containerClassName="pagination"
						activeClassName="active "
						renderOnZeroPageCount={null}
					/>
				</div>
			</div>
			{/* </div> */}
			{/* ---------- Pagination Start --------------------- */}
		</>
	);
};

export default PaymentHistory;
