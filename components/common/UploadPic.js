// import React, { useState } from "react";
// import Axios from "axios";
// // import { Image } from "cloudinary-react";

// const UploadPic = () => {
// 	const [show, setShow] = useState(true)
// 	const [imageSelected, setImageSelected] = useState();
// 	const [imageArr, setImageArr] = useState([]);
// 	const UploadImage = () => {
// 		const formData = new FormData();
// 		formData.append("file", imageSelected);
// 		formData.append("upload_preset", "piewi6ye");
// 		Axios.post(
// 			"https://api.cloudinary.com/v1_1/dr85uf4fz/image/upload",
// 			formData
// 		).then((response) => {
// 			let images = [...imageArr];
// 			images.push({
// 				img_url: response.data.secure_url,
// 				id: response.data.asset_id,
// 			});
// 			setImageArr(images);
// 		});
// 	};
// 	return (
// 		<div>
// 			<div className="flex">

// 				<div className="flex justify-center items-center ">
// 					<label for="dropzone-file" className="flex flex-col justify-center items-center w-[200px] h-[200px] bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bg-white dark:bg-white hover:bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white">
// 						<div className="flex flex-col justify-center items-center pt-5 pb-6">
// 							<svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
// 							<p className="mb-2 text-sm dark:text-gray-900"><span className="font-semibold">Click to add aphoto</span></p>

// 						</div>
// 						<input id="dropzone-file" class="hidden" type="file"
// 							onChange={(event) => {
// 								setImageSelected(event.target.files[0]);
// 							}}
// 							accept="image/*" />
// 					</label>

// 				</div>
// 				<div className="flex" >
// 					{imageArr.map(
// 						(img) => {
// 							console.log(img, "img in map");
// 							return (

// 								<div className="App">
// 									<input  onClick={() => setShow(!show)} type="radio" />
// 									{
// 										show ?
// 											<img
// 												style={{ marginLeft: 4, width: 200, height: 200 }}
// 												src={img.img_url}
// 												key={img.asset_id}
// 												className=" object-contain border border-gray-500 rounded"
// 											/>
// 											: null
// 									}
// 								</div>

// 							);
// 						}
// 					)}
// 				</div>
// 				{/* <input
// 				type="file"
// 				onChange={(event) => {
// 					setImageSelected(event.target.files[0]);
// 				}}
// 				accept="image/*"
// 			/> */}

// 				<div className="">

// 				</div>
// 			</div>

// 			<button
// 				className="border py-2 px-4 border-gray-500 mt-5 rounded-lg"
// 				onClick={UploadImage}
// 			>
// 				Upload
// 			</button>
// 		</div>
// 	);
// };

// export default UploadPic;

import React from "react";
// import { Image } from "cloudinary-react";
// import Axios from "axios";

const UploadPic = ({ onChange, selectedImages, deleteHandler, ref ,id}) => {
	// const [imageSelected, setImageSelected] = useState();

	// const UploadImage = () => {
	// 	const formData = new FormData();
	// 	formData.append("file", imageSelected);
	// 	formData.append("upload_preset", "piewi6ye");
	// 	Axios.post(
	// 		"https://api.cloudinary.com/v1_1/dr85uf4fz/image/upload",
	// 		formData
	// 	)
	// }

	return (
		<div className="flex-col items-center ">
			<div className="flex gap-2 justify-center">
				<div >
					<label id="hideItem" className="flex  flex-col h-32 w-48 zoomInput bg-white rounded-lg cursor-pointer ">
						<div className="flex flex-col justify-center items-center pt-5 mt-7 pb-6">
							<svg
								aria-hidden="true"
								className="mb-3 w-10 h-10 text-gray-900"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								></path>
							</svg>
							<p className="mb-2 text-sm dark:text-gray-900">
								<span className="font-semibold">Click to add a photo</span>
							</p>
						</div>
						<input
							type="file"
							id="dropzone-file"
							onChange={onChange}
							multiple
							ref={ref}
							accept="image/*"
							className="hidden"
						/>
					</label>
				</div>
				{selectedImages &&
					selectedImages.map((image) => {
						return (
							<div key={image} className="self-start mb-5">
								<span className="relative ">
									<svg
										onClick={() => deleteHandler(image)}
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className=" w-6 h-6 z-10 absolute left-[11.2rem] top-[-7px] rounded-full bg-red-900 text-white "
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</span>
								<img
									className=" border border-gray-400 rounded-md h-48  w-48  object-contain"
									src={image}
									alt="upload"
								></img>
							</div>
						);
					})}
			</div>
			<div className="flex mx-auto h-12   w-48">
				<label className="flex flex-col cursor-pointer h-12  text-center w-48 zoomInput bg-white rounded-lg border-2">
					<span className="font-bold py-2 ">Select From Computer</span>
					<input
						type="file"
						id={id}
						onChange={onChange}
						multiple
						ref={ref}
						accept="image/*"
						className="hidden"
					/>
				</label>
			</div>
		</div>
	);
};

export default UploadPic;
