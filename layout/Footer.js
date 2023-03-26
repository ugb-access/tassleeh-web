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
					toast.error(err);
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
							src="/images/logo.png"
							alt="Logo"
						/>
						<p className="mb-3 md:w-[500px] leading-9 hover:opacity-70">
							The first step into your next career. We are the link to helping
							you find a job with our unique geolocation software we open you up
							to a whole new world of job openings within your vicinity.
						</p>
						<div className="social-media-icons flex items-center mb-3">
							<Link
								target="_blank"
								href="https://www.facebook.com/ukjoblocator?mibextid=LQQJ4d"
							>
								<img
									className="cursor-pointer hover:opacity-80"
									src="/images/fb.png"
									alt="fb"
								/>
							</Link>

							<Link
								target="_blank"
								href="https://instagram.com/ukjoblocator?igshid=YmMyMTA2M2Y="
							>
								<img
									className="mx-1 cursor-pointer hover:opacity-80"
									src="/images/insta.png"
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
									src="/images/Group (7).png"
									alt="linkdein"
								/>
							</Link>
						</div>
					</div>
					{/* <hr className="mt-6 mb-6" /> */}

					<hr className="mt-6 mb-6" />
					<div className="col-3">
						<p className="text-primary text-lg font-semibold cursor-pointer hover:opacity-70">
							Quick Links
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
							<Link href={"/about"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">
									About Us
								</li>
							</Link>
							<Link href={"/contact"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">
									Contact
								</li>
							</Link>
							{/* <Link href={"/blogs"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">Blogs</li>
							</Link> */}
							<Link href={"/terms-&-conditions"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">
									Terms and Conditions
								</li>
							</Link>
							<Link href={"/privacy-policy"}>
								<li className="mt-6 cursor-pointer hover:opacity-70">
									Privacy Policy
								</li>
							</Link>
							{/* <Link href={"/contact-us"}>
								<li className="mt-2 cursor-pointer hover:opacity-70">
									Contact Us
								</li>
							</Link> */}
						</ul>
					</div>
					<hr className="mt-6 mb-6" />
					<div className="col-4">
						<p className="text-primary text-lg font-semibold cursor-pointer hover:opacity-70">
							Why Us
						</p>
						<ul>
							<li className="mt-6 cursor-pointer hover:opacity-70">
								Trusted & Quality Job
							</li>
							<li className="mt-6 cursor-pointer hover:opacity-70">
								Top Companies
							</li>
							<li className="mt-6 cursor-pointer hover:opacity-70">
								No Extra Charge
							</li>
							<li className="mt-6 cursor-pointer hover:opacity-70">
								International Job
							</li>
						</ul>
					</div>
					<hr className="mt-6 mb-6" />
					<div className="flex flex-col justify-end lg:block">
						<p className="text-primary text-lg font-semibold mb-3 cursor-pointer hover:opacity-70">
							Subscribe
						</p>
						<p className="w-64 leading-8">
							Subscribe to get latest property, blog news from us.
						</p>
						<div className="relative pt-8 ">
							<input
								className="border-2 border-gray-400 px-2 py-6 h-[50px] sm:w-72 w-72 rounded-xl outline-none"
								type="text"
								value={dataEmail?.email}
								onChange={(e) =>
									setDataEmail({ ...dataEmail, email: e.target.value })
								}
								placeholder="Email Address"
							/>
							<div onClick={() => handleSubmit()} className="cursor-pointer">
								<img
									className="absolute md:top-[35px] top-[35px] md:right-[16px] left-[215px]"
									src="/images/Ellipse 1.png"
									alt=""
								/>
								<img
									className="absolute md:top-[47px] top-[46px] md:right-[28px] left-[225px]"
									src="/images/arrow.png"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<section className="bg-primary lg:w-full">
				<div className="copyright py-4 sm:px-6 flex !items-center px-2 justify-between">
					<div>
						<a
							className=" text-white text-center sm:text-sm text-xs whitespace-nowrap"
							href="https://www.afssquare.com/"
							target={"_blank"}
						>
							The Job Locator © 2021 Developed by AFS Square
						</a>
					</div>
					<img
						onClick={goToBtn}
						className="sm:h-4.5 h-3.5"
						src="/images/Vector.png"
						alt=""
					/>
				</div>
			</section>
		</div>
	);
};

export default Footer;
