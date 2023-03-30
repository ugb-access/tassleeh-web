import Link from "next/link";
import { useRouter } from "next/router";
const SidebarLink = ({ sideLink, sideText, sideIcon }) => {
	const router = useRouter();
	return (
		<div className="">
			<Link href={""}>
				<div
					className={`text-icon ${
						router.asPath == sideLink && ""
					} `}
				>
					<div
						className={`side-bar-icon-sel ${
							router.asPath == sideLink && "!text-primary"
						} `}
					>
						{sideIcon}
					</div>
					<p
						className={`icon-para-sel mt-1 ${
							router.asPath == sideLink && "!text-primary !font-bold"
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
