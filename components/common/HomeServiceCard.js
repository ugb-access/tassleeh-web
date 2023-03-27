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
			<div className="shadow-lg p-10 w-[500px] h-[380px] ">
				<div className="h-72">
					<div className="flex justify-between items-center">
						<div className="flex flex-col">
							<div>{item?.title}</div>

							<div className="pt-4">{item?.description}</div>
						</div>

						<div className="border py-2 px-1.5 rounded-lg bg-primary">
							<img src={item?.icon}></img>
						</div>
					</div>
					<div className="pt-4 ">
						{item?.services.map((service, index) => {
							return <div key={index}>{service}</div>;
						})}
					</div>
				</div>
				<div className="flex justify-center items-center">
					<Button
						customClass={
							"border border-primary text-primary !w-[100px] !h-[30px] rounded-lg"
						}
						text={"Try Now q"}
					/>
				</div>
			</div>
		</>
	);
};

export default HomeServiceCard;
