import React from "react";
 import { AiFillHome,} from "react-icons/ai";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";

const Sidebar = () => {
	return (
		<div className="main-div-sidebar">
			<div className="logo-flex"></div>
			<div className="link-sidebar">
				<div
				className="text-icon-sel"
					// className={path === "/" ? "text-icon-sel" : 'text-icon'}
					// onClick={() => navigate("/")}
				>
					<div
					className="side-bar-icon-sel"
					// className={path === "/" ? "side-bar-icon-sel" : 'side-bar-icon'}
					>
						<AiFillHome />
					</div>
					<p
					className="icon-para-sel"
					// className={path === "/" ? "icon-para-sel" : 'icon-para'}
					>
						Dashboard
						{/* {props.lang === "en" ? "Dashboard" : "Tableau de bord"} */}
					</p>
				</div>
				<div
				className="text-icon-sel"
					//  className={path === "/asignroles" ? "text-icon-sel" : 'text-icon'}
					onClick={() => navigate("/asignroles")}
				>
					<div
					className="side-bar-icon-sel"
					// className={path === "/asignroles" ? "side-bar-icon-sel" : 'side-bar-icon'}
					>
						<RiUserSettingsFill />
					</div>
					<p
					className="icon-para-sel"
					// className={path === "/asignroles" ? "icon-para-sel" : 'icon-para'}
					>
						Assign Roles
						{/* {props.lang === "en" ? "Assign Roles" : "Attribuer des rôles"} */}
					</p>
				</div>
				<div
				className="text-icon-sel"
					// className={
					// 	path === "/customerSupport" ? "text-icon-sel" : "text-icon"
					// }
					onClick={() => navigate("/customerSupport")}
				>
					<div
					className="side-bar-icon-sel"
					// className={
					// 	path === "/customerSupport"
					// 		? "side-bar-icon-sel"
					// 		: "side-bar-icon"
					// }
					>
						<RiCustomerService2Fill />
					</div>
					<p
					className="icon-para-sel"
					// className={
					// 	path === "/customerSupport" ? "icon-para-sel" : "icon-para"
					// }
					>
						Customer Support
						{/* {props.lang === "en" ? "Customer Support" : "Service client"} */}
					</p>
				</div>
				<div
				className="text-icon-sel"
					// className={
					// 	path === "/emergencydetails" ? "text-icon-sel" : "text-icon"
					// }
					// onClick={() => navigate("/emergencydetails")}
				>
					<div
					className="side-bar-icon-sel"
					// className={
					// 	path === "/emergencydetails"
					// 		? "side-bar-icon-sel"
					// 		: "side-bar-icon"
					// }
					>
						<AiFillAlert />
					</div>
					<p
					className="icon-para-sel"
					// className={
					// 	path === "/emergencydetails" ? "icon-para-sel" : "icon-para"
					// }
					>
						Emergency Details
						{/* {props.lang === "en" ? "Emergency Details" : "Détails d'urgence"} */}
					</p>
				</div>
				<div
				className="text-icon-sel"
					// className={path === "/users" ? "text-icon-sel" : "text-icon"}
					onClick={() => navigate("/users")}
				>
					<div
					className="side-bar-icon-sel"
					// className={
					// 	path === "/users" ? "side-bar-icon-sel" : "side-bar-icon"
					// }
					>
						<FaUser />
					</div>
					<p
					className="icon-para-sel"
					// className={path === "/users" ? "icon-para-sel" : "icon-para"}
					>
						Users
						{/* {props.lang === "en" ? "Users" : "Utilisateurs"} */}
					</p>
				</div>
				{/* <div className={path === "/earnings" ? "text-icon-sel" : 'text-icon'} onClick={() => navigate("/earnings")}>
                    <div className={path === "/earnings" ? "side-bar-icon-sel" : 'side-bar-icon'}><AiFillDollarCircle /></div>
                    <p className={path === "/earnings" ? "icon-para-sel" :'icon-para'}>Earnings</p>
                </div>
                <div className={path === "/assignRoles" ? "text-icon-sel" : 'text-icon'} onClick={() => navigate("/assignRoles")}>
                    <div className={path === "/assignRoles" ? "side-bar-icon-sel" : 'side-bar-icon'}><ImUserPlus /></div>
                    <p className={path === "/assignRoles" ? "icon-para-sel" :'icon-para'}>Assign Role</p>
                </div>
                <div className={path === "/serviceProviders" ? "text-icon-sel" : 'text-icon'} onClick={() => navigate("/serviceProviders")}>
                    <div className={path === "/serviceProviders" ? "side-bar-icon-sel" : 'side-bar-icon'}><MdOutlineMiscellaneousServices /></div>
                    <p className={path === "/serviceProviders" ? "icon-para-sel" :'icon-para'}>Service Providers</p>
                </div>
                <div className={path === "/customers" ? "text-icon-sel" : 'text-icon'} onClick={() => navigate("/customers")}>
                    <div className={path === "/customers" ? "side-bar-icon-sel" : 'side-bar-icon'}><ImUsers /></div>
                    <p className={path === "/customers" ? "icon-para-sel" :'icon-para'}>Customer</p>
                </div> */}
				{/* <div onClick={logout} className="text-icon">
					<div className="side-bar-icon">
						<RiLogoutBoxRFill />
					</div>
					<p className="icon-para">
						{props.lang === "en" ? "Logout" : "Se déconnecter"}
					</p>
				</div> */}
			</div>
		</div>
	);
};

export default Sidebar;
