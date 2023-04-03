const RequestDescription = ({ item, descriptionText, data }) => {
	return (
		<div className="header0  bg-[#ffffff] py-6 px-4">
			<div>
				<p>Description:</p>
				<p>{descriptionText}</p>
			</div>
			<div>
				<p>Gallery</p>
				<div className="grid grid-cols-4">
					{data?.map((item, index) => {
						console.log(item);
						return <img className="w-full h-full" src={item?.image} alt="" />;
					})}
				</div>
			</div>
		</div>
	);
};

export default RequestDescription;
