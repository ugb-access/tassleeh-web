import React, { useEffect, useState } from "react";
import ProfileSidebar from "../../../components/dashboard/profileSidebar";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import MiniHeader from "../../../components/dashboard/mini-header";
const ResetPassword = () => {
	const [spinner, setSpinner] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [showPassNew, setShowPassNew] = useState(false);
	const [showPassCon, setShowPassCon] = useState(false);
	const router = useRouter();
	const [data, setData] = useState({
		oldPassword: "",
		newPassword: "",
		id: "",
	});
	const [conPassword, setConPassword] = useState("");
	const [accountImage, setAccountImage] = useState("");
	const validate = () => {
		if (data.oldPassword === "") {
			toast.error("Please enter your old password");
			setSpinner(false);
			return false;
		} else if (data.newPassword === "") {
			toast.error("Please enter your new password");
			setSpinner(false);

			return false;
		} else if (conPassword === "") {
			toast.error("Please enter your confirm password");
			setSpinner(false);

			return false;
		} else if (data?.newPassword !== conPassword) {
			toast.error(
				"Your new password and confirm password should must be same."
			);
			setSpinner(false);
			return false;
		}
		return true;
	};
	const ChangePassword = () => {
		if (validate()) {
			let id = data.id;
			setSpinner(true);
			// adminChangepassword(data, id)
			// 	.then((res) => {
			// 		if (res?.data?.success) {
			// 			setSpinner(false);
			// 			toast.success(res?.data?.message);

			// 			setConPassword("");
			// 			setData({
			// 				oldPassword: "",
			// 				newPassword: "",
			// 				id: "",
			// 			});
			// 		} else {
			// 			setSpinner(false);
			// 			toast.error(res?.data?.message);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		// console.log(err, "err");
			// 		toast.error("Something went wrong");
			// 		setSpinner(false);
			// 	});
		}
	};
	const fetchLocalStorage = () => {
		let stdata = localStorage.getItem("auth_admin");
		let admin = JSON.parse(stdata);
		setData({ ...data, id: admin?._id });
		setAccountImage(admin?.image);
	};
	useEffect(() => {
		fetchLocalStorage();
	}, []);

	return (
		<>
			<div>
				<MiniHeader headerText={"Settings"} />
			</div>
			<div className="flex lg:flex-nowrap flex-wrap justify-center ">
				<div>
					<ProfileSidebar image={accountImage}></ProfileSidebar>
				</div>
				<div className="basis-full bg-white px-5 lg:ml-7">
					<h5 className="py-5 font-semibold text-xl text-[#110229]">
						Change Password
					</h5>
					<div className=" items-end gap-5 pt-3">
						<div className="lg:w-1/2 relative">
							<TextInput
								value={data?.newPassword}
								onChange={(e) => {
									setData({ ...data, newPassword: e.target.value });
								}}
								type={showPassNew ? "text" : "password"}
								inputStyle={`${
									spinner ? "!bg-transparent !border-transparent" : ""
								}`}
								placeholder="New Password"
							/>
							{showPassNew ? (
								<AiOutlineEye
									onClick={() => setShowPassNew(false)}
									className="absolute right-4 top-5 cursor-pointer"
								/>
							) : (
								<AiOutlineEyeInvisible
									onClick={() => setShowPassNew(true)}
									className="absolute right-4 top-5 cursor-pointer"
								/>
							)}
						</div>
						<div className="lg:w-1/2 relative">
							<TextInput
								value={conPassword}
								onChange={(e) => {
									setConPassword(e.target.value);
								}}
								type={showPassCon ? "text" : "password"}
								inputStyle={`${
									spinner ? "!bg-transparent !border-transparent" : ""
								}`}
								placeholder="Confirm Password"
							/>
							{showPassCon ? (
								<AiOutlineEye
									onClick={() => setShowPassCon(false)}
									className="absolute right-4 top-5 cursor-pointer"
								/>
							) : (
								<AiOutlineEyeInvisible
									onClick={() => setShowPassCon(true)}
									className="absolute right-4 top-5 cursor-pointer"
								/>
							)}
						</div>
					</div>
					<div className="flex justify-center my-8 lg:mr-28">
						<Link href="/user-dashboard/account-setting">
							<Button
								// onClick={ChangePassword}
								text="CONFIRM"
								customClass="tracking-wider bg-primary rounded-xl  text-sm font-semibold text-white !w-28 !h-12"
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
