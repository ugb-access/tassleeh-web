import JobCard from "../../../components/dashboard/my-job-card";
import Button from "../../../components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteJob, getJobData } from "../../../services/auth-service";
import { ImSpinner9 } from "react-icons/im";
import Header from "../../../layout/DashboardHeader";
import swal from "sweetalert";
import { toast } from "react-toastify";
const MyJobs = () => {
	const [filterData, setFilterData] = useState([]);
	const [search, setSearch] = useState("");
	const [jobsData, setJobsData] = useState();
	const [borderColor, setBorderColor] = useState(null);
	const [spinner, setSpinner] = useState(false);

	const [itemID, setItemId] = useState(null);
	const handleValidation = () => {
		if (itemID === undefined) {
			return false;
		}

		return true;
	};
	const deletePost = () => {
		if (handleValidation()) {
			swal({
				title: "Alert?",
				text: "Are you sure to delete this job?",
				icon: "warning",
				showCancelButton: true,
				dangerMode: true,
				buttons: [true, "ok"],
			})
				.then(async (willDelete) => {
					setSpinner(true);
					if (willDelete) {
						deleteJob(itemID).then((res) => {
							// console.log(res);
							document.getElementById("disbtn").disabled = true;
							document.getElementById("disbtn").style.cursor = "not-allowed";
							if (res?.data?.success === true) {
								setSpinner(false);
								swal("Deleted!", "Job Deleted Successfully!", "success");
								fetchJobs();
								document.getElementById(borderColor).style.border =
									"1px solid #E3E3E3";
							} else {
								toast.warn(res?.data?.message);
							}
						});
					} else {
						setSpinner(false);
					}
				})
				.catch((err) => {
					setSpinner(false);
				});
		}
	};
	const fetchJobs = () => {
		const gettingData = localStorage.getItem("user");
		const signData = JSON.parse(gettingData);
		let userId = signData?._id;
		// console.log(userId);
		// console.log(signData);
		setSpinner(true);
		getJobData(userId).then((res) => {
			let revData = res?.data?.reverse();
			setJobsData(revData);
			setFilterData(revData);
			// console.log(res);
			if (res.status === 200) {
				setSpinner(false);
			}

			// console.log(res.data, "sd");
		});
	};
	useEffect(() => {
		fetchJobs();
	}, []);
	const checkState = () => {
		if (!(itemID === undefined)) {
			document.getElementById("disbtn").disabled = false;
			document.getElementById("disbtn").style.cursor = "pointer";
			document.getElementById("editbtn").style.cursor = "pointer";
			document.getElementById("editbtn").disabled = false;
		}
		if (itemID === null) {
			document.getElementById("disbtn").disabled = true;
			document.getElementById("disbtn").style.cursor = "not-allowed";
			document.getElementById("editbtn").style.cursor = "not-allowed";
			document.getElementById("editbtn").disabled = true;
		}
	};
	useEffect(() => {
		checkState();
	}, [itemID]);
	const searchHandler = (val) => {
		let res = filterData?.filter((item, index) =>
			item?.jobTitle?.toLowerCase().includes(val.toLowerCase())
		);
		setSearch(val);
		setJobsData(res);
	};
	return (
		<>
			<Header
				headerTitle={"My Jobs"}
				headerDiscription={"Get details about all posted jobs and applicants."}
				searchPlaceHolder={"Search by title"}
				onChangeSearch={(e) => searchHandler(e)}
				profileLink={"/employee/dashboard/profile"}
			/>
			<div>
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
				<div className="flex justify-between sm:flex-nowrap flex-wrap  px-5 py-5">
					<h1 className="text-2xl text-[#252F40] font-semibold">My Jobs</h1>
					<div className="">
						<div className="flex items-center mb-4 gap-3">
							<div className="flex items-center gap-3 ">
								<div>
									<Button
										id="disbtn"
										onClick={deletePost}
										img={<img src="/images/del.png"></img>}
										text="Delete"
										customClass="bg-primary cursor-not-allowed  flex gap-2 items-center rounded-md p-2 text-xs font-normal text-white !w-22 !h-8"
									/>
								</div>
								<Link href={"edit-my-job"}>
									{" "}
									<div>
										<Button
											id="editbtn"
											disabled="disabled"
											img={<img src="/images/edit.png"></img>}
											text="Edit"
											customClass="bg-primary cursor-not-allowed flex gap-2 items-center rounded-md p-2 text-sm font-normal text-white !w-22 !h-8"
										/>
									</div>
								</Link>
								<div>
									<Link href="/user/dashboard/post-jobs">
										<Button
											img={<img src="/images/add.png"></img>}
											text="Create Job"
											customClass="bg-primary flex gap-2 items-center rounded-md p-2 text-sm font-normal text-white !w-22 !h-8"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex !flex-wrap justify-center md:justify-start   gap-10 sm:flex-nowrap  px-5">
					{jobsData?.map((item, index) => {
						// const imgp = "/images/Rectangle 3211.png";
						// console.log(item, "jobs");
						return (
							<JobCard
								key={index}
								jobImg={item?.image}
								jobTitle={item?.jobTitle}
								applicant={item?.jobDescription}
								jobLocation={item?.address}
								tagIndex={index}
								onclick={() => {
									let peritem = item?._id;
									// console.log(peritem, "perirem");
									setItemId(peritem);
									// console.log(itemID, "itemID");
									checkState();
									localStorage?.setItem("itemData", JSON.stringify(item));
									if (!(borderColor === null)) {
										document.getElementById(borderColor).style.border =
											"1px solid #E3E3E3";
										setBorderColor(null);
										document.getElementById(index).style.border =
											"1px solid red";
										setBorderColor(index);
									} else if (borderColor) {
										document.getElementById(borderColor).style.border =
											"1px solid red";
										setBorderColor(index);
									} else {
										document.getElementById(index).style.border =
											"1px solid red";
										setBorderColor(index);
									}
									// }
								}}
							/>
						);
					})}
					<Link href={"/user/dashboard/post-jobs"}>
						<div className="border-2 border-solid border-[#E3E3E3] rounded-2xl py-3 h-56 w-48">
							<div className="flex flex-col items-center h-full justify-center">
								<div className="pb-5">
									<img src="/images/plus-sign.png" alt="" />
								</div>
								<div>
									<p className="text-xs font-semibold text-[#AEAEAE]">
										Post New Job
									</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default MyJobs;
