import Button from "../Button";
import Link from "next/link";

const BlogCard = ({ title, img, url, id }) => {
	const setBlog = () => {
		localStorage.setItem("blogid", JSON.stringify(id));
	};
	return (
		<div className="flex flex-col py-[20px] items-center rounded-xl border-2 border-solid border-[#DCDCEB] flex-wrap">
			<div className="w-52 pb-6 flex justify-center">
				<img className="max-h-[130px]" src={img} alt="blogcard" />
			</div>
			<div className="pb-4 text-center text-base font-semibold text-secondary w-52">
				<p>{title}</p>
			</div>
			<Link href={`/blogs/${id}`}>
				<div>
					<Button
						onClick={() => setBlog()}
						text="READ MORE"
						customClass="bg-primary rounded p-4 text-xs font-semibold text-white !w-28 !h-12"
					/>
				</div>
			</Link>
		</div>
	);
};

export default BlogCard;
