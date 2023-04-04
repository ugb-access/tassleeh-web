import { AVATAR } from "../../../services/images";

export default ({ item, onSelect, online }) => {
	const sender = item?.sender;

	return (
		<button onClick={onSelect} className="chat-btn">
			<div className="top-hand">
				<div className="hand">
					<div style={{ position: "relative" }}>
						<img className="recipient-img" src={sender?.avatar || AVATAR}></img>
						{!!online && (
							<div
								style={{
									position: "absolute",
									top: 55,
									right: 5,
									width: 10,
									height: 10,
									borderRadius: 5,
									background: "green",
									border: "1px solid #FFF",
								}}
							/>
						)}
					</div>

					<div className="chat-side">
						<p className="name-chat">
							<b>
								{sender?.userName?.length > 10
									? sender?.userName?.substring(0, 10).concat("...")
									: sender?.userName?.substring(0, 10) ||
									  sender?.email?.length > 10
									? sender?.email?.substring(0, 10).concat("...")
									: sender?.email?.substring(0, 10)}
							</b>
						</p>
						<p className="chat-msg">
							{item?.lastMessage?.message?.length > 15
								? item?.lastMessage?.message?.substring(0, 15).concat("...")
								: item?.lastMessage?.message?.substring(0, 15)}
						</p>
					</div>
				</div>
				<div className="bottom-hand">
					<p className="min-ago">{item?.ago}</p>
					{!!item?.unread && <p className="unread">{item?.unread} </p>}
				</div>
			</div>
			{/* <div className='line'></div> */}
		</button>
	);
};
