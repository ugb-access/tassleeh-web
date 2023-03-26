import Button from "../Button"; 

const Demo = () => {
	return (
		<div className="bg-[#F4F9FF] md:mt-32 m-auto">
			<div className="text-center pt-12">
				<h4 className=" text-primary mb-2 text-base font-bold">
					Ready to dive in?
				</h4>
				<p className="text-[#110229] text-3xl font-bold ">
					Hundreds of independents already{" "}
					<span className="text-primary">convinced</span>
				</p>
			</div>
			{/* --------------flexdiv-------------- */}
			<div className=" md:m-20 md:flex md:flex-wrap lg:flex-nowrap justify-center">
				<div className="md:relative md:block z-[1]">
					<img className="h-[395px] m-auto" src="/images/Girl.png" alt="" />
					<div className="hidden md:block absolute z-[-1] bottom-[168px] left-[31px]">
						<img className="h-[100px]" src="/images/Ellipse 94.png" alt="" />
					</div>
					<div className="relative hidden md:block left-[245px] bottom-[393px] z-[-1]">
						<img className="h-[100px]" src="/images/Dot (2).png" alt="" />
					</div>
				</div>
				<div className="p-5 lg:w-[25%] lg:px-5 lg:mt-24 text-center lg:text-left ">
					<h4 className="text-2xl  font-semibold text-[#110229]">
						Emily Clark
					</h4>
					<p className="mt-2 text-base font-normal text-[#000000] text-opacity-70">
						It was amazing experience to work on this platform its gives you a
						special chance to gain the same perks as workers.
					</p>
					<Button
						text="Request a Demo"
						customClass="mt-[12px] bg-primary rounded-md py-2 text-xs font-semibold whitespace-nowrap  text-white w-[110px] !h-[37px]"
					/>
				</div>
				<div>
					<div className="relative z-[1] px-5 md:px-0 md:mb-16 lg:mb-0">
						<img className="h-[323px] w-auto m-auto" src="/images/Group 71 (1).png" alt="" />
						<div className="absolute z-[-1] left-[32px] bottom-[62px] ">
							<img className="h-[156px] hidden md:block" src="/images/bluecircle.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Demo;
