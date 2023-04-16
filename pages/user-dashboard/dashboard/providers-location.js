import React from "react";
import PropTypes from "prop-types";
import LoadMap from "./googleMap";
import MiniHeader from "../../../components/dashboard/mini-header";

const ProvidersLocation = () => {
	return (
		<div>
			<MiniHeader headerText={"Service providers near you"} showIcon />
			<LoadMap mapLink={"/user-dashboard/dashboard/mechanic-profile"} />
		</div>
	);
};

export default ProvidersLocation;
