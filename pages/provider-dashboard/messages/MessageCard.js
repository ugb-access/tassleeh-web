import moment from "moment";
import { AVATAR } from "../../../services/images";
import { AiOutlineClockCircle } from "react-icons/ai";

const MessageCard = ({ message, isUser, avatar, userName }) => {
	return (
		<div
			className="msg-top !mb-14 md:mb-0"
			style={{
				flexDirection: isUser ? "row-reverse" : "row",
				alignSelf: isUser ? "flex-end" : "flex-start",
			}}
		>
			<div className="msg-inner">
				{message?.date && <img src={avatar || AVATAR} className="msg-img" />}
			</div>
			<div
				className="real-msg !text-sm text-[#495057]"
				style={{
					color: isUser ? "black" : "#000",
					background: isUser ? "rgba(3, 160, 203, 0.05)" : "#EBF5FF",
					flexWrap: "wrap",
				}}
			>
				<div className="mb-1 text-[#03A0CB] font-semibold">
					{isUser ? "Steven Franklin" : userName || "Steven Franklin"}
				</div>
				{message?.message || "Hi, How are you? What about our next meeting?"}
				<text className="flex pt-3 !items-center gap-1 text-[#495057] justify-end !basis-[100%]">
					<AiOutlineClockCircle className="text-xs" />
					<div className=" text-[#495057] text-xs">
						{moment(message?.createdAt).format("hh:mm A")}
					</div>
				</text>
			</div>
		</div>
	);
};

export default MessageCard;
