

const JobCard = ({jobImg,jobTitle,applicant,jobLocation,onclick,tagIndex}) => {
	
	return (
		<>
			<div onClick={onclick} id={tagIndex} className="border-2 z-50  focus:border-spacing-5 border-solid border-[#E3E3E3] rounded-2xl py-3 h-56 w-48">
				<div className="mx-3 h-[100px] w-[150px]">
					<img src={jobImg} className="h-[100px] w-[150px] rounded-md" alt="" />
				</div>
				<div className="flex gap-1 items-center mt-2 py-1 px-3">
					<h2 className="text-[#CA0928] text-xs whitespace-nowrap ">Job Title:</h2>
					<p className="text-[#444444] text-xs whitespace-nowrap truncate	">{jobTitle}</p>
				</div>
				<div className="flex gap-1 items-center py-1 px-3">
					<h2 className="text-[#CA0928] text-xs whitespace-nowrap">Description:</h2>
					<p className="text-[#444444] text-xs whitespace-nowrap truncate">{applicant}</p>
				</div>
				<div className="flex gap-1 items-center py-1 px-3">
					<h2 className="text-[#CA0928] text-xs whitespace-nowrap ">Location:</h2>
					<p className="text-[#444444] text-xs whitespace-nowrap truncate">{jobLocation}</p>
				</div>
			</div>
		</>
	);
};

export default JobCard;
