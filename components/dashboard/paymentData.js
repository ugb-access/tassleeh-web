import { IoIosEye } from "react-icons/io";
const paymentBody = ({
	paymentDate,
	custName,
	custAccountNo,
	phoneNumber,
	packageName,
	packageAmount,
}) => {
	return (
		<>
			{/* <tbody className=""> */}
			<tr className="!gap-2 !text-center">
				<td className="whitespace-nowrap">{paymentDate}</td>
				<td className="w-40">{custName}</td>
				<td className="w-40 !text-center">{custAccountNo}</td>
				<td className="!text-center">{phoneNumber}</td>
				<td className="!text-center">{packageName}</td>
				<td className="!text-center">{packageAmount}</td>
			</tr>
			{/* </tbody> */}
		</>
	);
};

export default paymentBody;
