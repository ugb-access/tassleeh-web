import React, { useCallback, useState } from "react";
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import Link from "next/link";

const containerStyle = {
	width: "100%",
	height: "80vh",
};

// const center = {
// 	lat: 33.6844,
// 	lng: 73.0479,
// };
const LoadMap = ({ mapLink }) => {
	const [map, setMap] = useState(null);
	const [center, setCenter] = useState({
		lat: 33.6844,
		lng: 73.0479,
	});
	const [toggleInfoWindow, setToggleInfoWindow] = useState(true);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyCTeuajYJW22KJe7Ae-tOq_10n0D52CP_0",
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
	const markers = [
		{
			lat: 33.6844,
			lng: 73.0479,
		},
		{
			lat: 35.6844,
			lng: 63.0479,
		},
		{
			lat: 23.6844,
			lng: 78.0479,
		},
	];
	return (
		<div>
			{isLoaded && (
				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
					{/* <div> */}
					{markers.map((p, i) => {
						return (
							<>
								<Marker
									icon={{
										url: "/images/mapmarker.png",
									}}
									position={p}
									animation="drop"
									onClick={() => {
										setToggleInfoWindow(i);
										setCenter(p);
									}}
								/>
								{toggleInfoWindow === i && (
									<Link href={mapLink}>
										<InfoWindow
											className="mb-10"
											style={{ margin: "10" }}
											onCloseClick={() => setToggleInfoWindow(-1)}
											position={p}
										>
											<div className="flex gap-4 items-center cursor-pointer">
												<div>
													<img src="/images/map-pic.png" alt="" />
												</div>
												<div>
													<div className="font-semibold text-[#404040]">
														Andrew Smith
													</div>
													<div className="text-[#AEAEAE] mt-1">
														20 minutes away
													</div>
												</div>
											</div>
										</InfoWindow>
									</Link>
								)}
							</>
						);
					})}

					{/* </div> */}
				</GoogleMap>
			)}
		</div>
	);
};

export default LoadMap;
