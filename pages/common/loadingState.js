import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function LoadingState() {
	return (
		<div>
			<div className="fixed z-50 w-full">
				<div className="h-[100vh] w-[200%] z-50 right-0 bottom-0 backdrop-blur-sm fixed"></div>
				<div className="z-50 h-[530px] sm:w-[600px] rounded-xl m-auto  top-[55px] relative">
					<div className="flex justify-center h-full items-center">
						<ImSpinner9 className="z-50 text-[50px] animate-spin" />
					</div>
				</div>
			</div>
		</div>
	);
}
