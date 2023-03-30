import Tbody from "../../../components/dashboard/job-Applicants-data";
import { HiOutlineX, HiRefresh } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import EyeCard from "../../../components/dashboard/eye-popup-card";
import EditCard from "../../../components/dashboard/edit-popup-card";
import {
	getJobApplications,
	getJobApplicationsBusiness,
} from "../../../services/auth-service";
import Header from "../../../layout/DashboardHeader";
import { ImSpinner9 } from "react-icons/im";
import moment from "moment";

const Users = ({}) => {
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [date, setDate] = useState(null);
	const [jobsData, setJobsData] = useState([]);
	const [search, setSearch] = useState("");
	const [currentItems, setCurrentItems] = useState(null);
	const [filterData, setFilterData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [selUser, setSelUser] = useState(null);
	const [spinner, setSpinner] = useState(false);

	const fetchJobs = () => {
		// setSpinner(true);
		const gettingData = localStorage.getItem("user");
		const signData = JSON?.parse(gettingData);
		let ID = signData?._id;
		// console.log(ID);
		setSpinner(true);
		getJobApplicationsBusiness(ID)
			.then((res) => {
				// if(date){
				// 	let response = res?.filter((item,index)=>)
				// }
				let revData = res?.data.reverse();
				setJobsData(revData);
				setFilterData(revData);
				setCurrentItems(revData);
				setSpinner(false);
			})
			.catch((err) => {
				setSpinner(false);
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
			item?.jobId?.jobTitle?.toLowerCase().includes(val.toLowerCase())
		);
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(res?.length / itemsPerPage));
		setCurrentItems(res?.slice(itemOffset, endOffset));
		setSearch(val);
	};
	// date filter
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
			<Header
				headerTitle={"List of Candidates"}
				headerDiscription={"Get details about the applied jobs."}
				searchPlaceHolder={"Search by job title"}
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
			{/* -------------------------------edit-card-popup-------------------------------- */}
			<div className="fixed w-full">
				{edit ? (
					<>
						<div
							className="h-full w-[200%] z-40 right-0 bottom-0 bg-[#1112174b] fixed "
							onClickButton={() => setEdit(false)}
						></div>
						<EditCard onClickButton={() => setEdit(!true)}></EditCard>
					</>
				) : null}
			</div>
			{/* ----------------------------------edit-card-end-------------------------------- */}
			{/* ---------------------------eye-card-popup---------------------------- */}
			<div className="fixed w-full">
				{open ? (
					<>
						<div
							className="h-full w-[500%] my-auto z-40 right-0  bottom-0 bg-[#1112174b] fixed "
							onClickButton={() => setOpen(false)}
						></div>
						<EyeCard
							curUser={selUser}
							onClickButton={() => setOpen(!true)}
						></EyeCard>
					</>
				) : null}
			</div>
			{/* -------------------------------eye-card-popup-end--------------------------- */}
			<div className="px-5">
				<div className="flex justify-between items-center">
					<h1 className="flex items-center font-semibold text-xl py-5 ">
						My Jobs Applicants
					</h1>
					<div className="flex items-center gap-5">
						{/* <button className="border border-solid text-sm rounded-md px-2 py-1  border-[#AEAEAE]">
							<p className="text-[#404040]">Add Filter</p>
						</button> */}
						<button
							onClick={handleRefresh}
							className="border border-solid rounded-md px-5 py-1.5  border-primary bg-primary"
						>
							<HiRefresh id="refreshBtn" className="text-white text-xl" />
						</button>
					</div>
				</div>
				<div className="border border-black cursor-pointer bg-[#eae8e8] w-48 flex items-center justify-between mb-4 px-2">
					<button className="flex items-center">
						<input
							className="bg-[#eae8e8]"
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
								<th className="" style={{ color: "#404040" }}>
									Applied At
								</th>

								<th className="" style={{ color: "#404040" }}>
									Job Title
								</th>
								<th className="" style={{ color: "#404040" }}>
									Name
								</th>
								<th className="" style={{ color: "#404040" }}>
									Candidate
								</th>
								<th style={{ color: "#404040", textAlign: "center" }}>
									Status
								</th>
								<th className="text-center" style={{ color: "#404040" }}>
									Action
								</th>
								<th className="text-center" style={{ color: "#404040" }}>
									Cv
								</th>
							</tr>
						</thead>

						{currentItems?.length > 0 &&
							currentItems?.map((item, index) => {
								console.log(item, "job applicants data");

								return (
									<Tbody
										key={index}
										_id={item._id}
										appliedAt={
											moment(item?.createdAt).format("HH:mm A") +
											", " +
											moment(item?.createdAt).format("DD/MM/YYYY")
										}
										idNumb={item?.cv}
										jobTitle={item?.jobId?.jobTitle}
										userName={item?.applicantUser?.userName}
										candidate={
											item?.applicantUser?.isFeatured
												? "Featured Candidate"
												: "Not Featured Candidate"
										}
										statusS={item?.status}
										click={() => {
											setOpen(!open);
											setSelUser(item);
										}}
										onLoading={(e) => setSpinner(e)}
										getApplicant={() => fetchJobs()}
										// edit={() => setEdit(!open)}
										index={index}
										// activeIcon={item.activeIcon}
									/>
								);
							})}
					</table>
					{currentItems?.length === 0 && (
						<div className="text-red-500 flex items-center  justify-center  w-full h-[160px]">
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
			{/* ---------- Pagination End --------------------- */}
		</>
	);
};

export default Users;
