import React, { useState, useEffect } from "react";
import EyeCard from "../../../components/dashboard/eye-popup-card";
import { HiOutlineX, HiRefresh } from "react-icons/hi";
import Tbody from "../../../components/dashboard/appliedData";
// import { SingleDatePicker } from "react-dates";
// import { START_DATE } from "react-dates/constants";
// import "react-dates/initialize";
import ReactPaginate from "react-paginate";
import { getJobApplications } from "../../../services/auth-service";
import "react-dates/lib/css/_datepicker.css";
import { ImSpinner9 } from "react-icons/im";
import Header from "../../../layout/DashboardHeader";
import EmployeeEyeCard from "../../../components/dashboard/employee-applied-card";
import { toast } from "react-toastify";
import moment from "moment";

const AppliedJobs = () => {
	const [filterData, setFilterData] = useState([]);
	const [search, setSearch] = useState("");
	const [jobsData, setJobsData] = useState();
	const [currentItems, setCurrentItems] = useState(null);
	const [spinner, setSpinner] = useState(false);
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [selectedData, setSelectedData] = useState(null);
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState();
	const fetchJobs = () => {
		setSpinner(true);
		const gettingData = localStorage.getItem("user");
		const signData = JSON?.parse(gettingData);
		let ID = signData?._id;
		// console.log(ID);
		getJobApplications(ID)
			.then((res) => {
				// console.log(res);
				let revData = res?.data?.reverse();
				setJobsData(revData);
				setFilterData(revData);
				setSpinner(false);
			})
			.catch((err) => {
				toast.warn(err?.message ? err?.message : "Something went wrong");
			});
	};
	let itemsPerPage = 10;
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % jobsData?.length;
		setItemOffset(newOffset);
	};
	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(jobsData?.length / itemsPerPage));
		setCurrentItems(jobsData?.slice(itemOffset, endOffset));
		// fetchJobs();
	}, [itemOffset, itemsPerPage, jobsData]);
	useEffect(() => {
		fetchJobs();
	}, []);
	const searchHandler = (val) => {
		let res = filterData?.filter((item, index) =>
			item?.jobId?.jobTitle.toLowerCase().includes(val.toLowerCase())
		);
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(res?.length / itemsPerPage));
		setCurrentItems(res?.slice(itemOffset, endOffset));
		setSearch(val);
		// if(val === ""){
		// 	fetchJobs()
		// }
	};
	// console.log(date, "date");
	// date filter
	const searchByDate = () => {
		// console.log(date, "date");
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
		fetchJobs();
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
			fetchJobs();
		}
	}, [date]);
	// date filter
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100%] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
					<div className="z-50  rounded-xl my-auto h-screen sm:right-60  items-center   relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}
			<Header
				headerTitle={"Applied Jobs"}
				headerDiscription={"Get details about the applied jobs."}
				searchPlaceHolder={"Search by title"}
				onChangeSearch={(e) => searchHandler(e)}
				profileLink={"/employee/dashboard/profile"}
			/>
			{/* ---------------------------eye-card-popup---------------------------- */}
			<div className="fixed w-full">
				{open ? (
					<>
						<div
							className="h-full w-[200%] z-40 right-0 bottom-0 bg-[#1112174b] fixed "
							onClickButton={() => setOpen(false)}
						></div>
						<EmployeeEyeCard
							curUser={selectedData}
							onClickButton={() => {
								setOpen(!true), setSelectedData(null);
							}}
						/>
					</>
				) : null}
			</div>
			{/* -------------------------------eye-card-popup-end--------------------------- */}
			<div
				className="sm:mx-5 ml-3 px-4 sm:px-8 rounded-md"
				style={{
					boxShadow: "0px 2px 20px rgba(000, 000, 000, 0.1)",
				}}
			>
				<div className="flex justify-between items-center">
					<h1 className="flex items-center font-semibold text-xl py-5 ">
						Applied Jobs
					</h1>
					<div className="flex items-center gap-5">
						<button
							onClick={handleRefresh}
							className="border-2 border-solid rounded-md px-5 py-1 border-primary bg-primary"
						>
							<HiRefresh id="refreshBtn" className="text-white text-xl" />
						</button>
					</div>
				</div>
				<div className="border border-black cursor-pointer bg-[#eae8e8] h-8 w-48 flex items-center justify-between mb-4 px-2">
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
				<div className="overflow-scroll lg:overflow-auto">
					<table className="table">
						<thead>
							<tr className="whitespace-nowrap">
								<th style={{ color: "#AEAEAE" }}>Applied At</th>
								<th style={{ color: "#AEAEAE" }}>ID</th>
								<th style={{ color: "#AEAEAE" }}>Job Title</th>
								<th style={{ color: "#AEAEAE" }}>Business Name</th>
								<th className="text-center" style={{ color: "#AEAEAE" }}>Status</th>
								<th className="text-center" style={{ color: "#AEAEAE" }}>Action</th>
							</tr>
						</thead>
						{currentItems?.length > 0 &&
							currentItems?.map((item, index) => {
								return (
									<Tbody
										key={index}
										dateTime={
											moment(item?.createdAt).format("HH:mm A") +
											", " +
											moment(item?.createdAt).format("DD/MM/YYYY")
										}
										idNumb={item?.email}
										jobTitle={item?.jobId?.jobTitle}
										businessName={item?.jobOwner?.businessName}
										statusU={item?.status}
										activeIcon={item?.activeIcon}
										click={() => {
											setOpen(!open), setSelectedData(item);
										}}
									/>
								);
							})}
					</table>
					{currentItems?.length === 0 && (
						<div className="text-red-500 flex items-center justify-center w-full h-[160px]">
							<p className="">No Records Found</p>
						</div>
					)}
				</div>
			</div>
			{/* ---------- Pagination Start --------------------- */}
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

export default AppliedJobs;
