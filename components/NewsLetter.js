import { useState } from "react";
import { toast } from "react-toastify";
import { userNewsLetter } from "../services/auth-service";
import Button from "./Button";
import { ImSpinner9 } from "react-icons/im";

import TextInput from "./TextInput";

const NewsLetter = () => {
	const [dataEmail, setDataEmail] = useState({
		email: "",
	});
	const [spinner, setSpinner] = useState(false);

	const handleValidation = () => {
		if (dataEmail.email === "") {
			toast.error("NewsLetter mail cannot be empty");
			return false;
		}
		return true;
	};
	const handleSubmit = () => {
		if (handleValidation()) {
			setSpinner(true);
			userNewsLetter(dataEmail)
				.then((res) => {
					if (res.data.success === true) {
						setSpinner(false);

						setDataEmail({
							email: "",
						});
						toast.success(res?.data?.message);
					} else {
						toast.error(res?.data?.error);
						setSpinner(false);
					}
				})

				.catch((err) => {
					toast.error(err);
					setSpinner(false);
				});
		}
	};
	//   const handleChange = (e) => {
	//     const newData = { ...data };
	//     newData[e.target.id] = e.target.value;
	//     setDataEmail(newData);
	//     console.log(data);
	//   };
	return (
		<>
			{spinner && (
				<div className="fixed z-50 w-full">
					<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 bg-transparent fixed"></div>
					<div className="z-50 h-[530px] w-[600px] rounded-xl m-auto  top-[55px] relative">
						<div className="flex justify-center h-full items-center">
							<ImSpinner9 className="z-50 text-[50px] animate-spin" />
						</div>
					</div>
				</div>
			)}

			<div className="!justify-center lg:flex md:py-10 lg:py-40 lg:w-[70%]   m-auto">
				<div className="relative  ">
					<div className="z-40 lg:rounded-l-[75px] lg:rounded-r-[0px] mx-3 mb-5 lg:mb-0 md:mx-10 lg:mx-0 rounded-3xl lg:rounded-3xl bg-[#F4F9FF]  h-72">
						<div className="flex flex-col ">
							<h1 className="text-primary font-bold text-3xl pt-5 lg:pt-[104px] md:px-10  text-center ">
								Subscribe Newsletter
							</h1>
							<p className="md:px-10 md:py-5 text-center py-5">
								We will update you with good news and promotions.
							</p>
						</div>
						<div className="lg:hidden h-12 w-[85%]  m-auto p-3 bg-white rounded-full">
							<input
								value={dataEmail.email}
								onChange={(e) =>
									setDataEmail({ ...dataEmail, email: e.target.value })
								}
								placeholder="Enter your email address... "
								className="px-2 w-full outline-none"
								type="text"
							/>
							<div className="flex justify-center">
								<Button
									// onClick={handleSubmit}
									customClass="font-normal text-base w-36 mt-10 !h-10 rounded-full bg-primary text-white"
									text="Contact Now"
								/>
							</div>
						</div>
					</div>
					<div className="hidden lg:block -z-10 absolute bottom top-32 left-[-38px] pt-5">
						<img src="/images/Rectangle 32.png" alt="" />
					</div>
				</div>

				<div className="w-[450px]  relative bg-[#FAFAFA] rounded-r-[75px] ">
					<img
						className="h-72  hidden lg:block"
						src="/images/Rectangle 31.png"
						alt=""
					/>
					{/* style=
					{{
						boxShadow:
							"rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;",
					}} */}
					<div
						style={{ boxShadow: "10px 20px 50px rgba(0, 0, 0, 0.15)" }}
						className="hidden lg:block h-12 absolute bg-white rounded-full top-[110px]  p-1 bottom left-[-40px]"
					>
						<input
							value={dataEmail.email}
							onChange={(e) =>
								setDataEmail({ ...dataEmail, email: e.target.value })
							}
							placeholder="Enter your email address... "
							className=" px-2 outline-none "
							type="text"
						/>
						<Button
							text="Subscribe"
							// onClick={handleSubmit}
							customClass="font-normal text-base !w-28 !h-10 py-2 rounded-full bg-primary whitespace-nowrap text-white"
						/>
					</div>
					<div className="hidden lg:block -z-10 absolute bottom top-[-80px] right-[-35px] pt-5">
						<img src="/images/Group 73.png" alt="" />
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsLetter;
