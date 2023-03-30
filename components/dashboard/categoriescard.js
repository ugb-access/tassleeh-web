import Button from "../Button";

const CategoriesCard = ({ item }) => {
	return (
		<>
			<div>
				<div>
					<div>{item?.icon}</div>
					<div>
						{item?.title}
						{item?.description}
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

export default CategoriesCard;
