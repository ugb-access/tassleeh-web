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
			<div className="service-card rounded-2xl p-10 w-[450px] h-[400px] bg-white">
				<div className="flex justify-between">
					<div className="h-72">
						<div className="flex items-center">
							<div className="flex flex-col">
								<div className="text-[#2f2c4a] text-xl font-semibold">{item?.title}</div>

								<div className="pt-4 w-80 text-[#656464]">{item?.description}</div>
							</div>
						</div>
						<ul className="pt-4 px-5">
							{item?.services.map((service, index) => {
								return (
									<li className="list-disc text-primary py-1" key={index}>
										<p className="text-[#171648] font-semibold text-base">{service}</p>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="border flex justify-center items-center h-16 w-16 rounded-3xl bg-primary">
						<div className="">
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
