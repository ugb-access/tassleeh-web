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

const center = {
	lat: 33.6844,
	lng: 73.0479,
};
const LoadMap = () => {
	const [map, setMap] = useState(null);
	const [toggleInfoWindow, setToggleInfoWindow] = useState("");

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDZpy-p-5laOeZQcRD_FZSTc0MITID2zKo",
		id: "google-map-script",
	});
	const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);
	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);
	return (
		<div>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={3}
					onLoad={onLoad}
					onUnmount={onUnmount}
				>
					{/* <div> */}
					<Marker
						icon={{
							url: "/images/mapmarker.png",
						}}
						// style=
						position={{
							lat: 33.6844,
							lng: 73.0479,
						}}
						animation="drop"
					/>
					{toggleInfoWindow && (
						<InfoWindow
							onCloseClick={() => setToggleInfoWindow("")}
							position={{
								lat: item?.lat,
								lng: item?.long,
							}}
						>
							<div></div>
						</InfoWindow>
					)}
					{/* </div> */}
				</GoogleMap>
				// <GoogleMap
				// 	// ref={mapRef}
				// 	style={{}}
				// 	// onCenterChanged={()=> mapRef.current.panTo(center)}
				// 	center={center}
				// 	zoom={11}
				// 	mapContainerStyle={{
				// 		width: "100%",
				//
				// 	}}
				// 	onClick={() => setToggleInfoWindow("")}
				// >
				// 	{filterData?.map((item, index) => {
				// 		// console.log(item, "item");
				// 		return (
				// 			<div key={index}>
				// 				<Marker
				// 					icon={{
				// 						url: "/images/liveicon.png",
				// 					}}
				// 					position={{
				// 						lat: mapCenter?.lat,
				// 						lng: mapCenter?.long,
				// 					}}
				// 				/>
				// 				<Marker
				// 					onMouseOver={() => {
				// 						handleMarkerSize(item?._id);
				// 					}}
				// 					onMouseOut={() => {
				// 						handleMarkerSize("");
				// 					}}
				// 					key={item?._id}
				// 					icon={{
				// 						url: "/images/pointer.png",
				// 						scaledSize: new google.maps.Size(
				// 							toggleMarkerSize === item?._id ? 32 : 30,
				// 							toggleMarkerSize === item?._id ? 32 : 30
				// 						),
				// 					}}
				// 					position={{
				// 						lat: item?.lat,
				// 						lng: item?.long,
				// 					}}
				// 					animation="drop"
				// 					onClick={() => {
				// 						openInfoWindow(item?._id);
				// 					}}
				// 				/>
				// 				{toggleInfoWindow === item?._id && (
				// 					<InfoWindow
				// 						onCloseClick={() => setToggleInfoWindow("")}
				// 						position={{
				// 							lat: item?.lat,
				// 							lng: item?.long,
				// 						}}
				// 					>
				// 						<div></div>
				// 					</InfoWindow>
				// 				)}
				// 			</div>
				// 		);
				// 	})}
				// </GoogleMap>
			)}
		</div>
	);
};

export default LoadMap;
