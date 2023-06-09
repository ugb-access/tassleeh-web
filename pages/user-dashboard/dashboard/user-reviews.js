import React from "react";
import ReviewCard from "../../../components/common/review-card";

const UserReviews = ({ data }) => {
	return (
		<div className="mt-7 bg-[#FFFFFF] p-6 rounded-lg">
			<h1 className="font-bold">Reviews</h1>
			{data?.map((item, index) => {
				return <ReviewCard item={item} key={index} />;
			})}
		</div>
	);
};

export default UserReviews;
