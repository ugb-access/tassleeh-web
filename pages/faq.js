import NewsLetter from "../components/NewsLetter";
import Head from "next/head";
import Button from "../components/Button";
import HowWorksBtn from "../components/HowWorksBtn";
import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const FAQ = () => {
	const router = useRouter();
	const [data, setData] = useState(null);
	useEffect(() => {
		const gettingData = localStorage.getItem("user");
		const userData = JSON.parse(gettingData);
		setData(userData);
	}, []);
	return (
		<div>
			<Head>
				<title> FAQ - Job-Locator </title>
			</Head>
			{/* -------------------------FAQ-------------------------- */}
			<section>
				<div className="md:px-6">
					<div className="!justify-center md:text-center lg:text-left md:flex  md:flex-wrap lg:flex-nowrap md:gap-24 py-2   md:py-4">
						<div className="lg:basis-[50%] md:w-full px-5">
							<h1 className="font-semibold text-2xl lg:text-left text-center py-4 sm:text-3xl md:font-bold md:text-4xl lg:font-bold lg:text-5xl lg:pt-8 text-secondary md:!leading-[1.5]">
								FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>{" "}
							</h1>
							<p className="font-base text-base lg:font-normal lg:leading-9 md:text-lg sm:text-lg text-secondary text-opacity-70">
								Job Locator is where you can find the right person or the right
								job. Have a look at most frequently asked questions on our
								platform by other valuable users that might be helpful for you.
							</p>
							<div className="mt-8 flex justify-center md:justify-centre lg:justify-start items-center">
								<Button
									onClick={() => {
										if (data === null) {
											router.push("/signin");
										} else if (data.type === "user") {
											router.push("/employee/dashboard");
										} else if (data.type === "business") {
											router.push("/business/dashboard");
										}
									}}
									text="GET STARTED"
									customClass="bg-primary rounded-md p-2 text-sm font-semibold whitespace-nowrap text-white w-40 !h-12"
								/>
							</div>
						</div>

						<div className="flex gap-5 mt-4 justify-center lg:basis-[50%]">
							<div className="relative z-[1]">
								<img
									className="py-5 px-5 w-auto m-auto"
									src="/images/international.png"
									alt=""
								/>
							</div>
							<div className="absolute hidden lg:block right-[265px] bottom-[140px] z-[-1]">
								<img className="h-[185px]" src="/images/Dot (5).png" alt="" />
							</div>
							<div className="absolute right-[108px] hidden lg:block top-[145px] z-[-1]">
								<img className="h-[185px]" src="/images/Dot (5).png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* --------------------------------img--------------------------------- */}
			<div className="flex justify-center  md:pt-28 pt-5">
				<img src="/images/faq.png" alt="" />
			</div>
			{/* ------------------------------FAQ-QA--------------------------- */}
			<section>
				<div className="pt-20">
					<h1 className="uppercase text-secondary sm:text-3xl text-lg  font-semibold text-center line w-max m-auto">
						frequently asked <span className="text-primary ">questions</span>
					</h1>
				</div>
				<div
					className="rounded-3xl py-8 px-3 md:p-12 mx-3 md:mx-12 mt-12"
					style={{
						boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
					}}
				>
					<h3 className="text-[#3A3A3A] text-xl  font-bold text-center md:text-left">
						Job Seekers
					</h3>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full flex justify-between items-center py-4 md:py-6 mt-3">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											How do I search for jobs on Job Locator?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6 text-base">
									<p className="mb-2">
										Searching for jobs on Job Locator is quick and easy !{" "}
									</p>
									<ul className="list-disc pl-6">
										<li>
											Enter a Keyword or Title- As you type, a list of suggested
											titles (type ahead) will appear, and you can either choose
											from the list or continue entering your keyword or job
											title.
										</li>
										<li>
											Enter a Location – Enter the location that you are
											currently looking for and click to add it to the location
											field.
										</li>
										<li>Click on the Search button- </li>
										<li className="list-[circle] list-inside mt-1">
											This will bring you to a list of jobs based on your search
											criteria.
										</li>
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold text-left">
											Can I search by company name on Job Locator?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									Yes! When you start to type a keyword in the search bar, you
									can choose if you are searching by job title or company name.
									Please keep in mind that you have to search for the exact
									company name in order for a  search to be successful.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold  text-left">
											When viewing a job, I no longer see the Estimated Salary
											if the Employer did not provide one?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									<ul className="list-disc pl-4">
										<li>This information will be added in a future release</li>
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-3">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											How do I apply to a job?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									<p className="font-bold mb-2">
										Applying to a job through Job Locator is quick and easy by
										following these steps:
									</p>
									<ul className="list-disc pl-6">
										<li>
											Search for your job! Find a match by adding information
											and review the details.
										</li>
										<li>
											When you find the job that’s right for you, you can chose
											to apply using your Job Locator Professional profile or
											you can upload your resume to be sent to the employer.
										</li>
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											Can I see the jobs I’ve applied to?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									<ul>
										<li>
											Yes, click on the dashborad at the top of the screen where
											you access your profile. You will see this page offers a
											view into your <span className="font-bold">Saved</span>{" "}
											jobs, <span className="font-bold">Recommended</span> jobs,
											and jobs you’ve <span className="font-bold">Applied</span>{" "}
											to. Click on the Applied tab to view the jobs you’ve
											applied to.
										</li>
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6">
										<p className="text-[#3A3A3A] md:text-lg text-sm text-left font-semibold">
											Can I update my application or reapply to the same job
											once it is submitted?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									<ul className="list-disc pl-4">
										<li>
											Once you have completed your application and clicked on
											the submit button for a job you are unable to make
											updates. The apply button on the job posting will no
											longer be active.
										</li>
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6">
										<p className="text-[#3A3A3A] text-left md:text-lg text-sm font-semibold">
											What is the benefit of having a professionally-written
											resume?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									Even the most qualified applicants can get passed over for
									positions for which they are a perfect fit because of a poorly
									written or keyword-poor resume. After all, recruiters and
									hiring managers will never see a resume that doesn’t pass the
									online screening filters.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
				</div>
				{/* ------------------------fa1-card-2--------------------- */}
				<div
					className="card-2 rounded-3xl py-4 px-3 md:p-12 mx-3 md:mx-12 my-8"
					style={{
						boxShadow: "0px 2px 40px rgba(138, 149, 158, 0.2)",
					}}
				>
					<h3 className="text-[#3A3A3A] text-xl  font-bold text-center md:text-left">
						Employers
					</h3>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center text-left py-4 md:py-6 mt-3">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											Where do job seekers go after clicking on my job posting?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									When a person clicks on your job posting on Job Locator,
									they’ll be able to see the full job description and a button
									to apply. Candidates can then upload their resume if they’re
									interested in the role.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6 text-left">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											Is it free to post a job on Job Locator?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									Most jobs on Job Locator can be posted for free. But if you
									want a larger number of applicants, sponsoring your job
									through any of the subscription packages offered under Job
									Locator policies will surely give your job post better
									visibility to job seekers.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6 text-left">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											Can a subscription be shared among multiple recruiters?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									Each subscription can only be assigned to one person/company
									at a time. However, you can freely move non-expired
									subscriptions between linked accounts.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6 text-left">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											Are virtual interviews on Job Locator live or
											pre-recorded?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6">
									Job Locator is a platform for live video interviewing, which
									means both the interviewer and the candidate have to be
									present at the same time for the interview to take place. Once
									you’re connected, you’ll be able to see and speak with the
									candidate in real time.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className={"w-full"}>
									<div className=" w-full qa-1 flex justify-between items-center py-4 md:py-6 text-left">
										<p className="text-[#3A3A3A] md:text-lg text-sm font-semibold">
											Who can edit my Company Page?
										</p>
										{open ? (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												-
											</div>
										) : (
											<div className="mx-[2px] text-4xl sm:text-5xl text-primary ">
												+
											</div>
										)}
									</div>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 pb-6 ">
									Once you claim your Company Page, you can customize your
									profile with a logo, company description, location, industry,
									links to your website and social profiles.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<hr />
				</div>
			</section>
			{/* --------------------------newsletter------------------------ */}
			<div>
				<NewsLetter />
			</div>
		</div>
	);
};

export default FAQ;
