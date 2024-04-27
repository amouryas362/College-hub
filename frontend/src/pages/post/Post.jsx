import { useState } from "react";
import { Link } from "react-router-dom";
// import postImage from "../../assets/postimage.webp";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

import axios from "axios";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Toaster } from "../../components/ui/toaster.jsx";
import { toast } from "../../components/ui/use-toast";

const Post = (props) => {
	const { title, body, type, likes, dislikes, groupName, postImage } = props;
	const [reaction, setReaction] = useState(null);
	const [like, setLike] = useState(likes);
	const [dislike, setDislike] = useState(dislikes);
	const handleClick = () => {
		if (props.onClick) {
			return props.onClick();
		}
	};

	const likePost = async () => {
		try {
			if (reaction !== null) {
				setLike(likes);
				setReaction(null);
			}
			const res = await axios.post(
				`http://localhost:3000/api/v1/post/${props.postId}/like`,
				null,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("token"),
						)}`,
					},
				},
			);
			setReaction("like");
			setLike((prevLikes) => prevLikes + 1);
		} catch (error) {
			console.log("Error: ", err);
			toast({
				title: "Uh oh! Something went wrong.",
				description: err.response.data.message,
			});
		}
	};
	const dislikePost = async () => {
		try {
			if (reaction !== null) {
				setDislike(dislikes);
				setReaction(null);
			}
			const res = await axios.post(
				`http://localhost:3000/api/v1/post/${props.postId}/dislike`,
				null,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("token"),
						)}`,
					},
				},
			);
			setReaction("dislike");
			setDislike((prevDislikes) => prevDislikes + 1);
		} catch (error) {
			console.log("Error: ", err);
			toast({
				title: "Uh oh! Something went wrong.",
				description: err.response.data.message,
			});
		}
	};

	return (
		<div
			onClick={handleClick}
			className="flex flex-col items-center justify-between border-2 shadown-lg rounded-sm w-[60vw] mx-auto mb-5 overflow-hidden hover:border-orange-500 hover:cursor-pointer transition-all">
			<div className="flex justify-between items-center w-full p-5 font-bold border-b-2">
				<div className="flex">
					<h3 className="text-xl mr-3">{title}</h3>
					<Badge>{type}</Badge>
				</div>
				<Link
					to={`/group/${groupName}`}
					className="text-base font-light mr-3">
					{groupName}
				</Link>
			</div>
			{body && <p className="font-thin w-full p-5">{body}</p>}
			{postImage && <img src={postImage} alt="post image" />}
			<div className="flex items-center bg-slate-100 w-full p-2 font-base">
				<Button
					onClick={likePost}
					variant="outline"
					className={`mr-3 flex items-center ${
						reaction === "like" ? "bg-orange-200" : ""
					}`}>
					<ThumbsUp className="mr-2 w-4 h-4" /> {like}
				</Button>
				<Button
					onClick={dislikePost}
					variant="outline"
					className={`mr-3 flex items-center ${
						reaction === "dislike" ? "bg-orange-200" : ""
					}`}>
					<ThumbsDown className="mr-2 w-4 h-4" /> {dislike}
				</Button>
			</div>
			<Toaster />
		</div>
	);
};

export default Post;
