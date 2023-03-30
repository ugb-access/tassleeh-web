import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TextInput from "../../../components/TextInput";
import ProfileDetails from "../../../components/common/ProfileDetails";
import Button from "../../../components/Button";
import {  BsFillPhoneFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
const CvPrint = () => {
	const handleImport = () => {
		const prints = document.getElementById("downloadPDF");
		// convert convas into string url
		html2canvas(prints, {}).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			// console.log(imgData);
			const pageWidth = 210;
			const pageHeight = 300;
			const height = (canvas.height * pageWidth) / canvas.width;
			const pdf = new jsPDF("p", "mm", "a4");
			pdf.addImage(imgData, "PNG", 0, 0, pageWidth, height);
			pdf.save("Resume.pdf");
		});
	};

	return (
		<>
			<div>
				<div id="downloadPDF" className=" w-[97%] m-auto rounded-md pb-10 ">
					<div>
						<div className="h-[100px] p-6">
							<h1 className="text-primary text-4xl font-bold">JEREMY TORRES</h1>
							<p className="text-primary text-xl font-semibold">
								GRAPHIC DESIGNER
							</p>
						</div>
						<div className="bg-primary p-6 relative h-full">
							<div className="absolute right-10 top-[-60px] ">
								<img
									className="max-h-[160px] rounded-md"
									src="/images/proDummy.png"
									alt="dummy"
								/>
							</div>
							<h1 className="text-white text-xl">Objective</h1>
							<p className="text-white text-sm w-1/2 pt-4">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Reprehenderit illo commodi quidem. Facere animi illo
								voluptatibus minima quibusdam a atque laborum ut dolorum rerum
								odit nesciunt reiciendis nulla ea, iusto beatae quia quod id!
							</p>
							<div className="mt-16 ">
								<div className="flex justify-between px-6 flex-wrap">
									<div className="w-1/3 flex items-center">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<BsFillPhoneFill />
										</div>
										<p className="text-white pl-2">098786785765</p>
									</div>
									<div className="w-1/3 flex items-center">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<AiFillHome />
										</div>
										<p className="text-white pl-2 ">Faisalabad</p>
									</div>
									<div className="w-1/3 flex items-center">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<FaCity />
										</div>
										<p className="text-white pl-2 ">Canal Road Faisalabad</p>
									</div>
									{/* <div className="w-1/3 flex items-center pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<BsFillPersonFill />
										</div>
										<p className="text-white pl-2">May 19 1992</p>
									</div>
									<div className="w-1/3 flex items-center pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<BsFillPersonFill />
										</div>
										<p className="text-white pl-2">Jeremy@123.com</p>
									</div>
									<div className="w-1/3 flex items-center pt-6">
										<div className="rounded-full h-[30px] w-[30px] bg-white flex justify-center items-center ">
											<BsFillPersonFill />
										</div>
										<p className="text-white pl-2">New York,America</p>
									</div> */}
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="flex justify-between flex-wrap mt-6">
							<div className="w-1/2 p-4">
								<h1 className="text-xl font-bold text-primary border-b-2 border-b-primary">
									Education
								</h1>
								<div>
									<div className="flex justify-between">
										<h5 className="text-xl text-primary font-semibold">
											Institute Name
										</h5>
										<p className="text-sm font-bold text-primary">
											<span>Start Year</span>
											{" - "}
											<span>End Year</span>
										</p>
									</div>
									<h5>Degree</h5>
									<h5>Field of Study</h5>
									<p className="text-sm">
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Reprehenderit expedita, totam ab inventore recusandae
										praesentium perspiciatis voluptatibus deserunt commodi
										assumenda optio harum id doloribus delectus adipisci in
										neque blanditiis non.
									</p>
								</div>
							</div>
							<div className="w-1/2 p-4">
								<h1 className="text-xl font-bold text-primary border-b-2 border-b-primary">
									Proffessional Experience
								</h1>
								<div>
									<div className="flex justify-between">
										<h5 className="text-xl text-primary font-semibold">
											Company Name
										</h5>
										<p className="text-sm font-bold text-primary">
											<span>Start Year</span>
											{" - "}
											<span>End Year</span>
										</p>
									</div>
									<h5>Position</h5>
								</div>
							</div>
							<div className="w-1/2 p-4">
								<h1 className="text-xl font-bold text-primary border-b-2 border-b-primary">
									Skills
								</h1>
								<div>
									<ul className="list-disc">
										<li>Computer</li>
										<li>Computer</li>
										<li>Computer</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-center my-8">
					<Button
						onClick={handleImport}
						// onClick={handleFile}
						text="Print"
						customClass="bg-primary rounded-md  text-sm font-semibold text-white !w-24 !h-10"
					/>
				</div>
			</div>
		</>
	);
};

export default CvPrint;
