import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { ImSpinner9 } from "react-icons/im";
import { userApplyJob } from "../../services/auth-service";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../config/firebaseConfig";
import { GoClippy } from "react-icons/go";
const ApplyForm = () => {
	const router = useRouter();
	const [spinner, setSpinner] = useState(false);
	const [checkImage, setCheckImage] = useState("");
	const [requesting, setRequesting] = useState(false);
	const [percent, setPercent] = useState(0);
	const [image, setImage] = useState("");
	const [data, setData] = useState({
		applicantUser: "",
		jobOwner: "",
		cv: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		experience: "",
		coverLatter: "",
		jobId: "",
		status: "Pending",
	});

	useEffect(() => {
		const gettingUser = localStorage.getItem("user");
		const user = JSON.parse(gettingUser);
		const userId = user?._id;
		// console.log(user);

		const gettingJobId = localStorage.getItem("jobId");
		const JobId = JSON.parse(gettingJobId);
		const createBy = localStorage.getItem("cby");
		const cby = JSON.parse(createBy);
		setData({
			...data,
			jobId: JobId,
			jobOwner: cby,
			applicantUser: userId,
			fullName: user?.fullName,
			email: user?.email,
			phoneNumber: user?.phone,
		});
	}, []);
	const handleValidation = () => {
		if (data?.fullName === "") {
			setSpinner(false);
			toast.error("FullName cannot be set empty");
			return false;
		} else if (data?.email === "") {
			setSpinner(false);
			toast.error("Email cannot be set empty");
			return false;
		} else if (!data?.email.includes("@")) {
			setSpinner(false);
			toast.error("Please enter correct email");
			return false;
		} else if (data?.phoneNumber === "") {
			setSpinner(false);
			toast.error("Phone cannot be set empty");
			return false;
		} else if (data?.experience === "") {
			setSpinner(false);
			toast.error("Experience cannot be set empty");
			return false;
		} else if (data?.coverLatter === "") {
			setSpinner(false);
			toast.error("Cover Latter cannot be set empty");
			return false;
		}
		return true;
	};
	const handleSubmit = (url) => {
		let body = data;
		body.cv = url;
		userApplyJob(body)
			.then((res) => {
				// console.log(res);
				if (res?.data?.success) {
					setSpinner(false);
					localStorage.removeItem("cby");
					localStorage.removeItem("jobId");
					// router.push("/");
					toast.success("Applied Successfully");
					setData({
						...data,
						cv: "",
						experience: "",
						coverLatter: "",
					});
					router.push("/");
				} else {
					toast.warn(res?.data?.message);
					setSpinner(false);
				}
			})
			.catch((err) => {
				toast.error(err?.message ? err?.message : "Something went wrong");
				setSpinner(false);
			});
	};

	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};
	const handleFile = (e) => {
		e.preventDefault();
		setSpinner(true);
		if (handleValidation()) {
			if (image) {
				if (checkImage) {
					const file = checkImage;
					if (file) {
						const preview = URL.createObjectURL(file);
						// setFile({ obj: file, preview });
						// e.target.value = "";
						const storageRef = ref(storage, `/client/resume/${file.name}`);
						//firebase upload and progress
						const uploadTask = uploadBytesResumable(storageRef, file);
						setRequesting(true);
						uploadTask.on(
							"state_changed",
							(snapshot) => {
								const percent = Math.round(
									(snapshot.bytesTransferred / snapshot.totalBytes) * 100
								); // update progress

								setPercent(percent);
							},
							(err) => toast.error(err),
							() => {
								// download url
								getDownloadURL(uploadTask.snapshot.ref)
									.then((url) => {
										handleSubmit(url);
									})
									.catch((err) => setCheckImage(""))
									.finally((res) => setRequesting(false));
							}
						);
					}
				}
			} else {
				toast.warn("Please select your resume");
				setSpinner(false);
			}
		}
	};
	const imageHandler = (e) => {
		setImage(e.target.files[0]);
		setCheckImage(e.target.files[0]);
	};
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 bg-transparent fixed"></div>
					<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}

			<div className="py-10">
				<h3 className="uppercase line w-max m-auto text-[#110229] text-3xl font-semibold text-center pb-16">
					Apply For this <span className="text-primary">Job</span>
				</h3>
				<div className="flex items-center flex-wrap lg:flex-nowrap justify-center gap-6">
					<div className="mb-6 ">
						<input
							onChange={(e) => handleChange(e)}
							type=""
							value={data?.fullName}
							id="fullName"
							className="bg-gray-50 border border-gray-100  text-gray-500 text-sm  h-12  placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-[19rem] sm:w-[35rem] p-2.5 outline-none"
							placeholder="Your Full Name"
							required
						/>
					</div>
					<div className="mb-6 ">
						<input
							onChange={(e) => handleChange(e)}
							value={data?.email}
							id="email"
							className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-[19rem] sm:w-[35rem] p-2.5 outline-none"
							placeholder="Your Email (Required)"
							required
						/>
					</div>
				</div>
				<div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6">
					<div className="mb-6 ">
						<input
							onChange={(e) => handleChange(e)}
							id="phoneNumber"
							value={data?.phoneNumber}
							className="bg-gray-50 border border-gray-100  text-gray-500 text-sm  h-12  placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-[19rem] sm:w-[35rem] p-2.5 outline-none"
							placeholder="Your Phone"
							required
						/>
					</div>
					<div className="mb-6 ">
						<input
							onChange={(e) => handleChange(e)}
							id="experience"
							value={data?.experience}
							className="bg-gray-50 border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-[19rem] sm:w-[35rem] p-2.5 outline-none"
							placeholder="Your Experience"
							required
						/>
					</div>
				</div>
				<div className="mb-6 flex flex-wrap lg:flex-nowrap justify-center ">
					<textarea
						onChange={(e) => handleChange(e)}
						id="coverLatter"
						value={data?.coverLatter}
						rows="6"
						className="bg-gray-50 border-gray-100 text-gray-900 text-sm placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm  w-[19rem] sm:w-[35.5rem] lg:w-[71.5rem] p-2.5 outline-none"
						placeholder="Your Cover Letter Message"
						required
					/>
				</div>
				<div className="h-36 items-center w-[19rem] sm:w-[35.5rem] lg:w-[71.5rem] border-gray-100 border  rounded-lg m-auto">
					{image ? (
						<div className="flex items-center justify-center">
							<GoClippy className="text-7xl" />
						</div>
					) : null}
					<span className="flex whitespace-nowrap pt-8 justify-center font-semibold text-[#898989] text-xs sm:text-sm">
						Upload Your CV/Resume or any other relevant file.
					</span>
					<br />
					<div className="flex justify-center">
						<button className="flex relative border border-primary rounded-md p-2 px-4 gap-3 text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
								/>
							</svg>
							<span className="text-primary text-xs">Upload Your Cv</span>
							<input
								onChange={imageHandler}
								type="file"
								// multiple={false}
								accept=".doc,.docx,.pdf"
								className="absolute top-0 left-0 right-0 opacity-0"
							/>
						</button>
					</div>
				</div>
				{image ? (
					<div className="py-20 flex justify-center">
						<Button
							onClick={handleFile}
							text="APPLY ON JOB"
							customClass="bg-primary rounded-md p-2 text-sm font-semibold text-white !w-36 !h-12"
						/>
					</div>
				) : (
					<div className="py-10 flex justify-center">
						<Button
							onClick={handleFile}
							text="APPLY ON JOB"
							customClass="bg-primary rounded-md p-2 text-sm font-semibold text-white !w-36 !h-12"
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default ApplyForm;
