import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../components/ui/avatar.jsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card.jsx";

import loading from "../../assets/postLoading.json";
import { Player } from "@lottiefiles/react-lottie-player";

const UserComments = () => {
	const { id: username } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const postComments = await axios.get(
					`http://localhost:3000/api/v1/comment/user/${username}`,
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);
				setComments(postComments.data);
				setIsLoading(false);
			} catch (error) {
				//add a error component thing here
				setError(error.response.data);
				setIsLoading(false);
			}
		};

		fetchComments();
	}, []);

	if (isLoading) {
		return (
			<Player
				src={loading}
				className="mx-auto mt-10 w-1/2"
				loop
				autoplay
				speed={1}
			/>
		);
	}

	if (error) {
		return <DisplayError message={error.message} />;
	}

	return (
		<>
            <h2 className="text-xl font-bold text-center">All Comments</h2>
			<Card className="w-3/4 mx-auto my-10 flex flex-col">
				<CardHeader>
					<CardTitle>Comments</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col">
					{comments.length === 0 ? (
						<h2 className="text-lg text-center my-5">
							{" "}
							No comments yet...{" "}
						</h2>
					) : (
						comments.map((comment, idx) => {
							return (
								<CommentLine
									key={idx}
									username={comment.user.username || "user"}
									body={comment.body}
                                    postId={comment.postId}
								/>
							);
						})
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default UserComments;

const CommentLine = (props) => {
    const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/post/${props.postId}`)} className="flex items-center gap-4 hover:bg-orange-200 p-5 rounded-md cursor-pointer">
			<Avatar className="hidden h-9 w-9 sm:flex">
				<AvatarImage src="/avatars/01.png" alt="Avatar" />
				<AvatarFallback>
					{props.username.slice(0, 1).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="grid gap-1">
				<p className="text-sm font-medium leading-none">
					{props.username}
				</p>
				<p className="text-sm text-muted-foreground">{props.body}</p>
			</div>
		</div>
	);
};
