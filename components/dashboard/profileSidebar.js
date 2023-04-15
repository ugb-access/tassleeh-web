// import { HiOutlineLogin, HiOutlineUser } from "react-icons/hi";
// import { useState, useEffect } from "react";

import { useState } from "react";

// import { useRouter } from "next/router";
const ProfileSidebar = ({ img, getImage, getCheckImage, image, data }) => {
	// const router = useRouter();
	const [title, setTitle] = useState("");

	// const imageHandler = (e) => {
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		if (reader.readyState === 2) {
	// 			getImage(reader.result);
	// 			getCheckImage(e.target.files[0]);
	// 		}
	// 	};
	// 	// setImage(e.target.files[0])

	// 	reader.readAsDataURL(e.target.files[0]);
	// };
	// const fecthAuthAdmin = () => {
	// 	let stData = localStorage.getItem("user");
	// 	let userData = JSON.parse(stData);
	// 	let fullName = userData?.firstName + " " + userData?.lastName;
	// 	// console.log(userData);
	// 	if (userData.type === "user") {
	// 		setTitle(fullName);
	// 	}
	// 	if (userData.type === "business") {
	// 		setTitle(userData.fullName);
	// 	}
	// };
	// useEffect(() => {
	// 	fecthAuthAdmin();
	// }, [image, data]);
	return (
		<div className="w-full md:!w-64 lg:!h-[550px] lg:bg-white">
			<div className="relative flex justify-center py-5">
				<img
					src="/images/proDummy.png"
					className="rounded-full border h-32 w-32"
				/>
				<div className="absolute bottom-8 left-[150px] cursor-pointer">
					<img
						src="/images/profileicon.png"
						className="cursor-pointer"
						alt=""
					/>
					<div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer opacity-0">
						<input
							// onChange={imageHandler}
							className="w-[40px] cursor-pointer"
							type="file"
						/>
					</div>
				</div>
			</div>
			<div className="text-center">
				<p className="leading-5 font-semibold text-[#272B41] text-base">
					{title || "Andrew Smith"}
				</p>
				<p className="text-[#A8A8A8] text-sm font-normal py-2">Normal User</p>
			</div>
			<hr className="my-4" />
		</div>
	);
};

export default ProfileSidebar;
