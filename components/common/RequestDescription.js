const RequestDescription = ({ item, descriptionText, data }) => {
	return (
		<div className="header0 bg-[#ffffff] py-6 px-6 rounded-lg">
			<div className="lg:flex  gap-2">
				<h1 className="text-base font-semibold">Description:</h1>
				<p className="text-[#656464]">{descriptionText}</p>
			</div>
			<div>
				<h1 className="my-3 text-base font-semibold">Gallery</h1>
				<div className="grid md:grid-cols-4 grid-cols-2 gap-6">
					{data?.map((item, index) => {
						return <img className="w-full h-full" src={item?.image} alt="" />;
					})}
				</div>
			</div>
		</div>
	);
};

export default RequestDescription;
