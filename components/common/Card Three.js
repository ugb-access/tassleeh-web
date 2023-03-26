import Button from "../Button";

const CardThree = ({cardthreepic, cardH}) => {
	return (
		<div>
			<div className="p-5 flex flex-col items-center border-2 border-solid rounded-2xl border-[#DCDCEB] w-[220px] h-56">
				<div>
					{cardthreepic}
				</div>
				<div className="pt-4 text-base font-semibold">
					{cardH}
				</div>
				<div className="flex pt-3">
					<img src="/images/icon6.png" alt="" />
					<p className="mx-2 text-xs font-semibold">Islamabad</p>
				</div>
				<div className="pt-4">
					<Button
						text="VIEW PROFILE"
						customClass="bg-primary rounded p-3 text-xs font-semibold text-white w-28 !h-12"
					/>
				</div>
			</div>
		</div>
	);
};

export default CardThree;
