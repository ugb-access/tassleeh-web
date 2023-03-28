import Link from "next/link";
const AuthHeader = ({ text }) => {
	return (
		<div className="flex justify-between items-center p-4">
			<div>
				<h1 className="text-[#0a093d] text-2xl font-bold">{text}</h1>
			</div>
			<Link href={"/"}>
				<div className="flex items-center gap-2">
					<img className="" src="/images/Vector (6).png" alt="" />
					<p className="text-primary">Go back</p>
				</div>
			</Link>
		</div>
	);
};

export default AuthHeader;
