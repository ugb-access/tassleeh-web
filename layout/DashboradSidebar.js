import React, { useState } from "react";
import SidebarLink from "../components/dashboard/sidebarLink";
import { HiMenu, HiOutlineArrowSmLeft } from "react-icons/hi";

const Sidebar = ({ dashSideData }) => {
	const [openSidebar, setOpenSidebar] = useState("slideHide");
	const handleOpenSidebar = () => {
		if (openSidebar === "slideHide") {
			setOpenSidebar("slideShow");
		} else if (openSidebar === "slideShow") {
			setOpenSidebar("slideHide");
		}
	};

	return (
		<div className="">
			<div className="fixed sm:static h-screen sm:h-full w-[16%] sm:w-full z-50 sm:z-0 top-2">
				<div
					className={`main-div-sidebar absolute sm:static !w-full sm:!w-full sm:bg-white bg-purple-100 sm:z-0 z-30 sm:block ${openSidebar} md:!w-56 lg:!w-56`}
				>
					<div className="ico-menu border-0 bg-purple-100 sm:hidden right-[-16px] absolute z-40 w-full flex justify-end ">
						<HiMenu
							className="text-2xl text-primary"
							onClick={handleOpenSidebar}
						/>
					</div>

					<div className="">
						{dashSideData.map((items, index) => {
							return (
								<SidebarLink
									key={index}
									sideLink={items.barIink}
									sideIcon={items.barIcon}
									sideText={items.barText}
								/>
							);
						})}
					</div>
					<div className="hidden " onClick={handleOpenSidebar}>
						<HiOutlineArrowSmLeft className="text-2xl text-[#B1B1B1] mx-auto" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
