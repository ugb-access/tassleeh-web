import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { userNewsLetter } from "../services/auth-service";
const Footer = () => {
	const goToBtn = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	const [dataEmail, setDataEmail] = useState({
		email: "",
	});
	const handleValidation = () => {
		if (dataEmail.email === "") {
			toast.error("NewsLetter mail cannot be empty");
			return false;
		}
		return true;
	};
	const handleSubmit = () => {
		if (handleValidation()) {
			// setSpinner(true);
			userNewsLetter(dataEmail)
				.then((res) => {
					if (res.data.success === true) {
						// setSpinner(false);

						setDataEmail({
							email: "",
						});
						toast.success(res?.data?.message);
					} else {
						toast.error(res?.data?.error);
						// setSpinner(false);
					}
				})

				.catch((err) => {
					// toast.error(err);
					// setSpinner(false);
				});
		}
	};
	return (
		<div>
			<footer className="border-t-2 pt-10 pb-16">
				<div className="footer-wrapper mb-5 md:flex md:justify-between md:flex-wrap md:gap-2 px-10">
					<div className="col-1">
						<img
							className="mb-3 lg:h-[42px] h-8 cursor-pointer hover:opacity-90"
							src="/images/logo-main.png"
							alt="Logo"
						/>
						<p className="mb-3 md:w-[300px] leading-9 hover:opacity-70">
							The little concerns of independence are resolved by TASSLEEH. Let go,
							we genuinely have everything under control!cinity.
						</p>
						<div className="social-media-icons gap-2 flex items-center mb-3">
							<Link
								target="_blank"
								href="https://www.facebook.com/ukjoblocator?mibextid=LQQJ4d"
							>
								<img
									className="cursor-pointer hover:opacity-80"
									src="/images/fb 1.png"
									alt="fb"
								/>
							</Link>

							<Link
								target="_blank"
								href="https://instagram.com/ukjoblocator?igshid=YmMyMTA2M2Y="
							>
								<img
									className="mx-1 cursor-pointer hover:opacity-80"
									src="/images/Vector (2).png"
									alt="insta"
								/>
							</Link>
							{/* <img
								className="mx-1 cursor-pointer hover:opacity-80"
								src="/images/twitter.png"
								alt="twitter"
							/> */}

							<Link
								target="_blank"
								href="https://www.linkedin.com/company/thejoblocator/"
							>
								<img
									className="mx-1 cursor-pointer hover:opacity-80"
									src="/images/Vector (1).png"
									alt="linkdein"
								/>
							</Link>
						</div>
					</div>
					{/* <hr className="mt-6 mb-6" /> */}
					<div className="col-2">
						<p className="hover:opacity-70 cursor-pointer text-[#000000] opacity-80 text-base font-semibold mb-3">
							Get in Touch
						</p>
						<div className="">
							<div className="flex items-center mt-3">
								<img
									className="cursor-pointer hover:opacity-80 h-5"
									src="/images/location 1.png"
									alt=""
								/>
								<p className="mx-2 cursor-pointer hover:opacity-70">
									91 Saggers Road, Australia
								</p>
							</div>
							<div className="flex items-center mt-3">
								<img
									className="h-5 cursor-pointer hover:opacity-80"
									src="/images/Mail.png"
									alt=""
								/>
								<p className="mx-2 cursor-pointer hover:opacity-70">
									tassleeh@gmail.com
								</p>
							</div>
							<div className="flex items-center mt-3">
								<img
									className="h-5 cursor-pointer hover:opacity-80"
									src="/images/phone.png"
									alt=""
								/>
								<p className="mx-2 cursor-pointer hover:opacity-70">
									+61 (08) 9060 9249
								</p>
							</div>
						</div>
					</div>

					<hr className="mt-6 mb-6" />
					<div className="col-3">
						<p className="text-[#000000] opacity-80 text-lg font-semibold cursor-pointer hover:opacity-70">
							Company
						</p>
						<ul>
							{/* <Link href={"/"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">Home</li>
							</Link> */}
							{/* <Link href={"/how-it-works"}>
								<li className="mt-2 cursor-pointer hover:opacity-70">
									How it works
								</li>
							</Link> */}
							<Link href={"/"}>
								<li className="mt-3 cursor-pointer hover:opacity-70">Home</li>
							</Link>
							<Link href={"/services"}>
								<li className="mt-3 cursor-pointer hover:opacity-70">
									Services
								</li>
							</Link>
							{/* <Link href={"/blogs"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">Blogs</li>
							</Link> */}
							{/* <Link href={"/terms-&-conditions"}>
								<li className="mt-3 cursor-pointer hover:opacity-70">
									About Us
								</li>
							</Link> */}
							<Link href={"/contact"}>
								<li className="mt-3 cursor-pointer hover:opacity-70">
									Contact Us
								</li>
							</Link>
							<Link href={"/signin"}>
								<li className="mt-3 cursor-pointer hover:opacity-70">Login</li>
							</Link>
							<Link href={"/signup"}>
								<li className="mt-3 cursor-pointer hover:opacity-70">
									Register
								</li>
							</Link>
						</ul>
					</div>
					<hr className="mt-6 mb-6" />
					<div className="col-4">
						<p className="text-[#000000] opacity-80 text-lg font-semibold cursor-pointer hover:opacity-70">
							Legal
						</p>
						<ul>
							<li className="mt-3 cursor-pointer hover:opacity-70">
								Terms of Service
							</li>
							<li className="mt-3 cursor-pointer hover:opacity-70">FAQ</li>
							<li className="mt-3 cursor-pointer hover:opacity-70">
								Privacy Policy
							</li>
							<li className="mt-3 cursor-pointer hover:opacity-70">
								Acceptional Use
							</li>
						</ul>
					</div>
					<hr className="mt-6 mb-6" />
					<div className="flex flex-col justify-end lg:block">
						<p className="text-[#000000] opacity-80 text-lg font-semibold mb-3 cursor-pointer hover:opacity-70">
							Newsletter
						</p>
						<div className="flex flex-col justify-end lg:block">
							<div className="flex">
								<input
									className="border p-2 h-[50px]  outline-none"
									type="text"
									placeholder="info@gmail.com"
								/>
								<div className="h-[50px] w-16 bg-primary border-2 p-2">
									<img
										className="m-auto p-1 cursor-pointer hover:opacity-70"
										src="/images/send-plane-fill.svg"
										alt="plane"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<section className="bg-primary lg:w-full">
				<div className="copyright py-4 sm:px-14 flex !items-center px-2 justify-between">
					<div>
						<Link
							className=" text-white text-center sm:text-sm text-xs whitespace-nowrap"
							href="https://www.afssquare.com/"
							target={"_blank"}
						>
							TASSLEEH developed by AFS Square © 2023
						</Link>
					</div>
					<img
						onClick={goToBtn}
						className="sm:h-5 h-3.5"
						src="/images/Vector.png"
						alt=""
					/>
				</div>
			</section>
		</div>
	);
};

export default Footer;
