import React, { useCallback, useState } from "react";
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "80vh",
};

const LoadMap = () => {
	const [map, setMap] = useState(null);
	const [center, setCenter] = useState({
		lat: 33.6844,
		lng: 73.0479,
	});
	const [toggleInfoWindow, setToggleInfoWindow] = useState(false);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDZpy-p-5laOeZQcRD_FZSTc0MITID2zKo",
		id: "google-map-script",
	});
	// const onLoad = useCallback(function callback(map) {
	// 	const bounds = new window.google.maps.LatLngBounds(center);
	// 	map.fitBounds(bounds);
	// 	setMap(map);
	// }, []);
	// const onUnmount = useCallback(function callback(map) {
	// 	setMap(null);
	// }, []);
	return (
		<div>
			{isLoaded && (
				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
					{/* <div> */}
					<Marker
						icon={{
							url: "/images/mapmarker.png",
						}}
						position={{
							lat: 33.6844,
							lng: 73.0479,
						}}
						animation="drop"
						onClick={() => {
							setToggleInfoWindow(true);
							setCenter({
								lat: 33.6844,
								lng: 73.0479,
							});
						}}
					/>
					{toggleInfoWindow && (
						<InfoWindow
							onCloseClick={() => setToggleInfoWindow(false)}
							position={{
								lat: 33.6844,
								lng: 73.0479,
							}}
						>
							<div className="flex gap-4 items-center">
								<div>
									<img src="/images/map-pic.png" alt="" />
								</div>
								<div>
									<div className="font-semibold text-[#404040]">
										Andrew Smith
									</div>
									<div className="text-[#AEAEAE] mt-1">20 minutes away</div>
								</div>
							</div>
						</InfoWindow>
					)}
					{/* </div> */}
				</GoogleMap>
			)}
		</div>
	);
};

export default LoadMap;
