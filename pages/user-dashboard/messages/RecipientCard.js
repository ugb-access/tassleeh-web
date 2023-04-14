import moment from "moment";
import { AVATAR } from "../../../services/images";

export default ({ item, onSelect, online, bg }) => {
	const sender = item?.sender;
	console.log(item);
	return (
		<button onClick={onSelect} className={` chat-btn hover:bg-white ${bg}`}>
			<div className="top-hand items-center px-3 py-2">
				<div className="hand">
					<div className="flex items-center gap-5" style={{ position: "" }}>
						{!!online && (
							<div
								style={{
									width: 10,
									height: 10,
									borderRadius: 5,
									background: "green",
									border: "1px solid #FFF",
								}}
							/>
						)}
						<img className="recipient-img" src={sender?.avatar || AVATAR}></img>
					</div>

					<div className="chat-side">
						<p className="name-chat">
							{sender?.userName}
							{/* {sender?.userName?.length > 10
								? sender?.userName?.substring(0, 10).concat("...")
								: sender?.userName?.substring(0, 10) ||
								  sender?.email?.length < 10
								? sender?.email?.substring(0, 10).concat("...")
								: sender?.email?.substring(0, 10)} */}
						</p>
						<p className="chat-msg whitespace-nowrap">
							{item?.lastMessage?.message?.length > 15
								? item?.lastMessage.message?.substring(0, 22).concat("...")
								: item?.lastMessage?.message?.substring(0, 20)}
						</p>
					</div>
				</div>
				<div className="bottom-hand ">
					{/* <p className="min-ago">{item?.ago}</p> */}
					{!!item?.unread && (
						<p className="text-xs text-[#74788D]">
							{"05 min"}
							{/* {moment(item?.message?.createdAt).format("hh:mm A")} */}
							{/* {item?.unread} */}
						</p>
					)}
				</div>
			</div>
			<hr />
			{/* <div className='line'></div> */}
		</button>
	);
};
