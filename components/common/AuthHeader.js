import Link from "next/link";
const AuthHeader = ({ text }) => {
	return (
		<div className="flex justify-between items-center px-4 sm:px-14 pt-8">
			<div>
				<h1 className="text-[#0a093d] sm:text-2xl font-bold">{text}</h1>
			</div>
			<Link href={"/"}>
				<div className="flex items-center text-center gap-2">
					<img className="" src="/images/Vector (6).png" alt="" />
					<p className="text-primary sm:text-base text-sm">Go back</p>
				</div>
			</Link>
		</div>
	);
};

export default AuthHeader;
