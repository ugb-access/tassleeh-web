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
		<div className="!h-full">
			<div className="!sticky h-screen sm:h-full w-[16%] sm:w-full z-50 sm:z-0 top-[50px]">
				<div
					className={`main-div-sidebar md:sticky absolute bg-[#d3eaf2] md:!bg-white !w-full sm:!w-full sm:bg-white sm:z-0 z-30 sm:block ${openSidebar} h-full md:!w-56 lg:!w-56`}
				>
					<div className="ico-menu border-0 bg-[#d3eaf2] w-[50px] md:hidden right-[-16px] absolute z-40  flex justify-end ">
						<HiMenu
							className="text-2xl text-primary"
							onClick={handleOpenSidebar}
						/>
					</div>

					<div className="bg-[#d3eaf2] md:!bg-white">
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
