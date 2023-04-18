import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
// import dummy from "../../assets/dummyimage.png";
// import send from "../../../assets/send.png";
import { getUnReadCount } from "../../../services/helper";
import MessageCard from "./MessageCard";
import RecipientCard from "./RecipientCard";
import socket from "../../../services/socket";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
// import { AVATAR } from "../../../services/images";
import Button from "./../../../components/Button";
// import { addRecipientMethod } from "../../api/apiMethods";

import middleware from "../../../store/middleware";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useLocation } from "react-router-dom";

// import Header from "../../Componenets/Header";
const mes = [
	{
		sender: {
			_id: "1",
			userName: "Zain Ali Here",
			email: "alilohar20@gmail.com",
		},
		to: { _id: 1, userName: "Hasham is here", email: "alilohar20@gmail.com" },
		lastMessage: { message: "This was the last message " },
		message: "hy there",
	},
];
const Chat = ({
	user,
	recipients,
	_getRecipients,
	_readMessages,
	...props
}) => {
	let scrollRef = "";
	const uid = user?._id;
	// const location = useLocation();
	const [channelID, setChannelID] = useState(false);
	const [senderID, setSenderID] = useState("");
	const [open, setOpen] = useState(false);

	const [selectedUser, setSelectedUser] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [socketMessages, setSocketMessage] = useState([]);
	const [messageData, setMessageData] = useState(Array(10).fill(mes));
	const [sortedRecipients, setSortedRecipients] = useState([]);
	const [filterSortedRecipients, setFilterSortedRecipients] = useState([
		{
			sender: {
				_id: "1",
				userName: "Zain Ali",
				email: "alilohar20@gmail.com",
				avatar: "/images/mess-profile.png",
			},
			to: { _id: 1, userName: "zain is here", email: "alilohar20@gmail.com" },
			lastMessage: { message: "This was the last message " },
			unread: 10,
		},
		{
			sender: {
				_id: "2",
				userName: "Hasham tanveer ",
				email: "hashamtanveer140@gmail.com",
				avatar: "/images/mess-profile.png",
			},
			to: {
				_id: 1,
				userName: "Hasham ",
				email: "hashamtanveer140@gmail.com",
			},
			lastMessage: { message: "This was the last message " },
			unread: 7,
		},
	]);

	useEffect(() => {
		// getNewData();
		// socket.on("message", (msgs) => setSocketMessage(msgs));
	}, []);
	useEffect(() => {
		if (!socketMessages.length) return;
		const { sender, to } = socketMessages[0];
		if (
			(sender?._id === senderID && uid === to._id) ||
			(sender?._id === uid && senderID === to._id)
		) {
			_readMessages(channelID);
			setMessageData(sorted(socketMessages));
		} else {
			_getRecipients();
		}
	}, [socketMessages]);

	useEffect(() => {
		scrollToBottom();
	}, [messageData]);

	useEffect(() => {
		handleRecipients();
	}, [recipients]);

	useEffect(() => {
		if (location.state?.selectedUser) {
			onSelect(location.state?.selectedUser);
		}
		onSelect(
			filterSortedRecipients[0].sender,
			filterSortedRecipients[0].lastMessage?.channel
		);
	}, []);
	useEffect(() => {
		senderID && socket.emit("getAllMessages", { sID: senderID, rID: uid });
	}, [senderID]);

	useEffect(() => {
		channelID && _readMessages(channelID);
	}, [channelID]);

	const handleRecipients = () => {
		let sorted = [];
		if (recipients?.temp) {
			for (let i = 0; i < recipients.temp.length; i++) {
				let lastMessages = recipients.newar[i];
				let obj = {
					lastMessages: lastMessages,
					lastMessage: lastMessages[0],
					recipients: recipients.temp[i],
					unread: getUnReadCount(lastMessages, uid),
					ago: !lastMessages?.length
						? ""
						: timeSince(new Date(lastMessages[0]?.createdAt)),
					time: lastMessages[0]?.createdAt,
					sender:
						uid === recipients.temp[i]?.user1?._id
							? recipients.temp[i]?.user2
							: recipients.temp[i].user1,
				};
				sorted.push(obj);
			}
			sorted = sorted.sort((a, b) => new Date(b.time) - new Date(a.time));

			setSortedRecipients(sorted);
			setFilterSortedRecipients(sorted);
		}
	};

	const getNewData = () => _getRecipients();

	function scrollToBottom() {
		try {
			scrollRef.scrollIntoView({ behavior: "smooth" });
		} catch (error) {}
	}

	function timeSince(date) {
		var seconds = Math.floor((new Date() - date) / 1000);

		var interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + " years";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + " months";
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + " days";
		}
		interval = seconds / 3600;
		if (interval > 1) {
			if (Math.floor(interval) > 1) {
				return Math.floor(interval) + " hours";
			} else {
				return Math.floor(interval) + " hour";
			}
		}
		interval = seconds / 60;
		if (interval > 1) {
			if (Math.floor(interval) > 1) {
				return Math.floor(interval) + " minutes";
			} else {
				return Math.floor(interval) + " minute";
			}
		}
		return Math.floor(seconds) + " seconds";
	}

	function sorted(arr = []) {
		return arr.reduce((acc, item, itemIndex) => {
			const date = item.createdAt.slice(0, 16);
			if (!!acc.length) {
				const accLast = acc[acc.length - 1];

				const sameLastMessageSender = accLast.sender._id === item.sender._id;
				if (sameLastMessageSender) {
					const foundIndex = acc.findIndex(
						(i) =>
							i?.createdAt.slice(0, 16) === date &&
							i.sender._id === item.sender._id
					);

					acc.push({ ...item, date: foundIndex === -1 ? true : false });
				} else acc.push({ ...item, date: true });
			} else acc.push({ ...item, date: true });

			return acc;
		}, []);
	}

	const sendMessage = async () => {
		return;
		if (!message) {
			return toast.warn("write something");
		}

		const messageObj = {
			message,
			sender: uid,
			to: senderID,
			channel: channelID,
		};

		if (socket.connected) {
			if (!!channelID) {
				socket.emit("message", messageObj);
			} else {
				let res = await addRecipientMethod({ user1: senderID, user2: uid });

				if (res?.success) {
					setChannelID(res.cid);
					socket.emit("message", {
						...messageObj,
						channel: res.cid,
					});
				} else {
					alert("An error occurred");
				}
			}
			scrollToBottom();
			setMessage("");
			getNewData();
		} else alert("No internet found.");
		//  setState({ input: "" });
	};

	const onSearch = ({ target: { value: searchKey } }) => {
		if (searchKey) {
			// console.log(searchKey);
			const resp = sortedRecipients.filter(
				({ sender }) =>
					sender?.userName
						?.replace(/\s+/g, "")
						?.toLowerCase()
						?.includes(searchKey?.replace(/\s+/g, "")?.toLowerCase()) ||
					sender?.email
						?.replace(/\s+/g, "")
						?.toLowerCase()
						?.includes(searchKey?.replace(/\s+/g, "")?.toLowerCase())
			);
			console.log(resp);
			// console.log( state.sortedRecipients.filter(({ sender }) => (sender.firstName)));
			//  setState({ filterSortedRecipients: resp });
			setFilterSortedRecipients(resp);
		} else {
			//  setState({ filterSortedRecipients:  state.sortedRecipients });
			setFilterSortedRecipients(sortedRecipients);
		}
	};

	const onSelect = (sender, cid) => {
		if (sender._id === senderID) return;
		// setMessageData([]);
		setSenderID(sender._id);
		setSelectedUser(sender);
		cid && setChannelID(cid);
	};

	const state = {};

	const { totalHeight = "100vh", searchKey } = state;

	return (
		<React.Fragment>
			{/* <Header
				head={"Chat"}
				paraDash={"Conversation with customer, service provider and other."}
			/> */}
			<div style={{ flexDirection: "column" }}>
				<div>
					<p className="text-2xl text-[#2F2C4A] font-bold mb-3">Messages</p>
				</div>
				<div className="chat-main-div" style={{ display: "flex" }}>
					<div className={`left-side pr-5 h-[${totalHeight}]`}>
						<div className="flex  justify-between">
							<div className="flex gap-5 items-center">
								<div>
									<img className="h-10" src="/images/mess-profile.png" alt="" />
								</div>
								<div>
									<p className="font-medium">
										{selectedUser?.userName || selectedUser?.email}
									</p>
									<div className="flex items-center text-[#74788D] gap-2">
										<div
											style={{
												width: 10,
												height: 10,
												borderRadius: 5,
												background: "#34C38F",
												border: "1px solid #FFF",
											}}
										/>
										Active
									</div>
								</div>
							</div>
							<div>
								<img src="/images/Notification.png" alt="" />
							</div>
						</div>

						<div className=" hidden md:flex bg-white items-center my-5 border-white border  rounded-full hover:border hover:border-primary ">
							{/* <AiOutlineSearch className="h-8 w-5 mx-2 cursor-pointer hover:text-primary" /> */}
							<img
								className="h-5 mx-2 cursor-pointer"
								src="/images/shape.png"
								alt="search"
							/>
							<input
								type="text"
								placeholder="Search..."
								value={searchKey}
								onChange={onSearch}
								className="rounded-full border border-none py-2"
							/>
						</div>

						{/* <input
							className="chat-input"
							placeholder="Search..."
							value={searchKey}
							onChange={onSearch}
						></input> */}
						<br />
						<div style={{ display: "flex" }}>
							<div>
								{" "}
								<p className="conver">
									<b>Recent</b>
								</p>
							</div>
							{/* <div style={{ marginLeft: "1%" }}>
								<p className="coverLeng text-[#006dea]">
									<b>({sortedRecipients?.length})</b>
								</p>
							</div> */}
						</div>
						<div
							className="recipients-main-div "
							style={{ display: "flex", flexDirection: "column" }}
						>
							{filterSortedRecipients.map((item, index) => {
								return (
									<RecipientCard
										item={item}
										openPopup={setOpen}
										online={true}
										selectedUser={item?.sender?._id === selectedUser?._id}
										key={item?.sender?._id}
										onSelect={
											() => {
												setOpen(true);
												onSelect(item.sender, item.lastMessage?.channel);
											}
											//  setState(
											//     {
											//         selectedUser: item.sender,
											//         rID: item.sender._id,
											//         channel: item?.lastMessage?.channel,
											//         cid: item?.lastMessage?.channel
											//     },
											//     () => {

											//          getNewData();
											//         socket.on("message", (msgs) => {
											//              setMessages(msgs);
											//         })

											//     }
											// )
										}
									/>
								);
							})}
						</div>
					</div>
					{/* <div className="straight-line"></div> */}
					{!!open ? (
						<div className="block md:hidden bg-white z-50 h-[100vh] w-screen fixed left-0 top-0 ">
							{!!selectedUser ? (
								<div className="">
									<div className="">
										<div className="flex  justify-between px-5 py-[14px]">
											<div className="flex gap-5 items-center">
												<div>
													<div className="flex items-center gap-2">
														<div onClick={() => setOpen(false)}>
															<BiArrowBack />
														</div>
														<p className="font-medium text-sm whitespace-nowrap text=[#495057]">
															{selectedUser?.userName || selectedUser?.email}
														</p>
													</div>
													<div className="flex items-center text-[#74788D] gap-2">
														<div
															style={{
																width: 10,
																height: 10,
																borderRadius: 5,
																background: "#34C38F",
																border: "1px solid #FFF",
															}}
														/>
														Active
													</div>
												</div>
											</div>
											<div className="flex items-center md:gap-5 gap-1.5">
												<div>
													<Button
														text={"+ Create Request"}
														customClass={
															"md:w-full  whitespace-nowrap text-primary font-semibold text-xs sm:text-base"
														}
													/>
												</div>
												<div className="bg-[#EFF2F7] p-2 rounded-full w-full">
													<img src="/images/searchmessico.png" alt="" />
												</div>
												<div className="bg-[#EFF2F7] p-2 rounded-full w-full">
													<img src="/images/messhead (2).png" alt="" />
												</div>
												<div className="bg-[#EFF2F7] py-3.5 px-2 w-full rounded-full">
													<img src="/images/messhead (1).png" alt="" />
												</div>
											</div>
										</div>
									</div>

									<div className="flex items-center px-5">
										<hr className="w-full" />
										<div className="px-2">Today</div>
										<hr className="w-full" />
									</div>

									<div className="scrolldiv">
										<text style={{ paddingTop: 10 }} />
										{messageData.map((m, index) => (
											<MessageCard
												userName={selectedUser?.userName || selectedUser?.email}
												message={m}
												avatar={
													uid === m?.sender?._id
														? user?.avatar
														: selectedUser?.avatar
												}
												// isUser={uid === m?.sender?._id}
												isUser={index % 2 === 0}
												key={m?._id}
											/>
										))}
										<text
											ref={(ref) => (scrollRef = ref)}
											style={{ paddingBottom: 10 }}
										/>
									</div>
									<div>
										<div className="send-div flex gap-5">
											<input
												className="send-input"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														sendMessage();
													}
												}}
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												placeholder="Enter Message..."
												// onKeyDownCapture={(e) =>
												//     e.code === "Enter" && sendMessage()
												// }
											/>
											<div
												onClick={() => sendMessage()}
												className="bg-primary flex gap-3 h-[2.5rem] px-3  rounded-full items-center cursor-pointer"
											>
												<div className="text-white leading-5 ">Send</div>
												<div>
													<img
														className="h-3  w-7"
														src="/images/sendIcon.png"
														alt="send"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div style={{ marginLeft: 10 }}>
									<text>Tap any chat </text>
								</div>
							)}
						</div>
					) : null}
					{/*  */}
					{!!selectedUser ? (
						<div
							// style={{
							//     display: "flex",
							//     flex: 1,
							//     flexDirection: "column",
							//     height: totalHeight,
							//     position: "relative",
							//     overflow: "scroll"
							// }}

							className="right-side"
						>
							<div className="">
								{/* <img
									className="active-img"
									src={selectedUser?.avatar || AVATAR}
								/> */}

								{/* <div>
									<p className="">
										<b>{selectedUser?.userName || selectedUser?.email}</b>
									</p>
								</div> */}
								<div className="flex  justify-between px-5 py-[14px]">
									<div className="flex gap-5 items-center">
										<div>
											<p className="font-medium text=[#495057] whitespace-nowrap">
												{selectedUser?.userName || selectedUser?.email}
											</p>
											<div className="flex items-center text-[#74788D] gap-2">
												<div
													style={{
														width: 10,
														height: 10,
														borderRadius: 5,
														background: "#34C38F",
														border: "1px solid #FFF",
													}}
												/>
												Active
											</div>
										</div>
									</div>
									<div className="flex items-center gap-5">
										<div>
											<Button
												text={"+ Create Request"}
												customClass={
													"w-full whitespace-nowrap text-primary font-semibold !text-base"
												}
											/>
										</div>
										<div className="bg-[#EFF2F7] p-3 rounded-full w-full">
											<img src="/images/searchmessico.png" alt="" />
										</div>
										<div className="bg-[#EFF2F7] p-5 rounded-full w-full">
											<img src="/images/messhead (2).png" alt="" />
										</div>
										<div className="bg-[#EFF2F7] p-5 py-6  w-full rounded-full ">
											<img src="/images/messhead (1).png" alt="" />
										</div>
									</div>
								</div>
							</div>

							<div className="flex items-center px-5">
								<hr className="w-full" />
								<div className="px-2">Today</div>
								<hr className="w-full" />
							</div>

							<div className="scrolldiv">
								<text style={{ paddingTop: 10 }} />
								{messageData.map((m, index) => (
									<MessageCard
										userName={selectedUser?.userName || selectedUser?.email}
										message={m}
										avatar={
											uid === m?.sender?._id
												? user?.avatar
												: selectedUser?.avatar
										}
										// isUser={uid === m?.sender?._id}
										isUser={index % 2 === 0}
										key={m?._id}
									/>
								))}
								<text
									ref={(ref) => (scrollRef = ref)}
									style={{ paddingBottom: 10 }}
								/>
							</div>
							<div>
								<div className="send-div flex gap-5 ">
									<input
										className="send-input"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												sendMessage();
											}
										}}
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Enter Message..."
										// onKeyDownCapture={(e) =>
										//     e.code === "Enter" && sendMessage()
										// }
									/>
									<div
										onClick={() => sendMessage()}
										className="bg-primary flex gap-3 h-[2.8rem]   lg:px-10 rounded-full items-center cursor-pointer"
									>
										<div className="text-white leading-5">Send</div>
										<div>
											<img
												className="h-3  w-7"
												src="/images/sendIcon.png"
												alt="send"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div style={{ marginLeft: 10 }}>
							<text>Tap any chat </text>
						</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default connect((s) => s, middleware)(Chat);
