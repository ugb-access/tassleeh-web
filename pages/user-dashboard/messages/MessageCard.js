import moment from "moment";
import { AVATAR } from "../../../services/images";

export default ({ message, isUser, avatar }) => {
	return (
		<div
			className="msg-top"
			style={{
				flexDirection: isUser ? "row-reverse" : "row",
				alignSelf: isUser ? "flex-end" : "flex-start",
			}}
		>
			<div className="msg-inner">
				{message?.date && <img src={avatar || AVATAR} className="msg-img" />}
			</div>
			<div
				className="real-msg"
				style={{
					color: isUser ? "#FFF" : "#000",
					background: isUser ? "#82D616" : "#EBF5FF",
					flexWrap: "wrap",
				}}
			>
				{message?.message || "This is message"}
			</div>
			<text className="date-msg">
				{moment(message?.createdAt).format("hh:mm A")}
			</text>
		</div>
	);
};
