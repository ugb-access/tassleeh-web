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
			{/* <div className="sm:hidden block absolute z-[51]">
				<HiMenu className="text-xl text-primary" onClick={handleOpenSidebar} />
			</div> */}
			<div className="fixed sm:static h-screen sm:h-full w-[16%] sm:w-full z-50 sm:z-0">
				<div
					className={`main-div-sidebar absolute sm:static !w-full sm:!w-full sm:bg-white bg-purple-100 sm:z-0 z-30 sm:block ${openSidebar} md:!w-56 lg:!w-56`}
				>
					<div className="md:!hidden p-4">
						<img src="/images/responsivelogo.png" alt="Logo" />
					</div>
					<hr />
					<div className="ico-menu border-0 bg-purple-100 sm:hidden right-[-16px] absolute z-[51] w-full flex justify-end ">
						<HiMenu
							className="text-2xl text-primary"
							onClick={handleOpenSidebar}
						/>
					</div>
					<div className="logo-sidebar">
						<div className="">
							<img
								className="!lg:h-16 !h-10  logo-sidebar !mt-4 "
								src="/images/logo-main.png"
								alt="Logo"
							/>
						</div>
					</div>
					<div>
						{dashSideData.map((items, index) => {
							// console.log(items, "item");

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
					<div className="block sm:hidden " onClick={handleOpenSidebar}>
						<HiOutlineArrowSmLeft className="text-2xl text-[#B1B1B1] mx-auto" />
					</div>
					{/* 			
			{cardsData.map((item, index) => {
				console.log(item, "item");
				return (
					<Card
						key={index}
						heading={item.CardHead}
						number={item.CardNum}
						span={item.CardSpan}
						img={item.CardImg}
					/>
				);
			})} */}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
