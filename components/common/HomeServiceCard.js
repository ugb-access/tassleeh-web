import Button from "../Button";

const HomeServiceCard = ({
	item,
	title,
	description,
	icon,
	services = [""],
}) => {
	return (
		<>
			<div className="service-card rounded-2xl sm:p-10 p-6 md:w-[450px] md:h-[400px] w-[350px] bg-white">
				<div className="flex justify-between">
					<div className="sm:h-72">
						<div className="flex items-center">
							<div className="flex flex-col">
								<div className="text-[#2f2c4a] sm:text-xl text-lg font-semibold">{item?.title}</div>

								<div className="pt-4 sm:w-80 w-64 text-sm sm:text-base text-[#656464]">{item?.description}</div>
							</div>
						</div>
						<ul className="pt-4 px-5">
							{item?.services.map((service, index) => {
								return (
									<li className="list-disc text-primary py-1" key={index}>
										<p className="text-[#171648] font-semibold text-sm sm:text-base">{service}</p>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="border flex justify-center items-center h-10 sm:h-16 w-10 sm:w-16 rounded-3xl bg-primary">
						<div className="h-6 w-6">
							<img className="" src={item?.icon}></img>
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center mt-10">
					<Button
						customClass={
							"border border-primary text-secondary !w-[100px] !h-[35px] rounded-lg"
						}
						text={"Try Now"}
					/>
				</div>
			</div>
		</>
	);
};

export default HomeServiceCard;
