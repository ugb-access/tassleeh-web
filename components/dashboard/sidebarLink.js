import Link from "next/link";
import { useRouter } from "next/router";
const SidebarLink = ({ sideLink, sideText, sideIcon }) => {
	const router = useRouter();
	return (
		<div className="">
			<Link href={sideLink}>
				<div className={`text-icon  w-full `}>
					<div
						className={`side-bar-icon-sel ${
							router.asPath.includes(sideLink) && "!text-primary"
						} `}
					>
						{sideIcon}
					</div>
					<p
						className={`icon-para-sel ${
							router.asPath.includes(sideLink) && "!text-primary !font-bold"
						} `}
					>
						{sideText}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default SidebarLink;
