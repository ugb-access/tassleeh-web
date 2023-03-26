const CardTwo = ({ cardtwopic, cardtwoH, cardtwopara }) => {
	return (
		<div>
			<div className="p-5 flex flex-col items-center border-2 border-solid rounded-2xl border-[#DCDCEB] w-[200px] h-48">
				<div>{cardtwopic}</div>
				<div className="pt-4 text-2xl font-bold">{cardtwoH}</div>
				<div className="pt-4 text-sm font-semibold">{cardtwopara}</div>
			</div>
		</div>
	);
};

export default CardTwo;
