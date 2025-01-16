import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DisplayError from "../components/DisplayError";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Send } from "lucide-react";

import loading from "../assets/postPageLoading.json";
import { Player } from "@lottiefiles/react-lottie-player";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../components/ui/avatar.jsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card.jsx";

const Comment = () => {
	const { id: postId } = useParams();

	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [comments, setComments] = useState([]);
  	const [update, setUpdate ] = useState(false);

  useEffect(() => {
		const fetchComments = async () => {
			try {
				const postComments = await axios.get(
					`http://localhost:3000/api/v1/comment/post/${postId}`,
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
	}, [update]);

	const postComment = async () => {
		//post a comment
    try {
      await axios.post(
        `http://localhost:3000/api/v1/comment/${postId}/create`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token"),
            )}`,
          },
        },
      );
      setUpdate((prev) => !prev);
      setComment('');
    } catch (error) {
      setError(error.response.data);
    }
	};

	if (isLoading) {
		return (
			<Player src={loading}
				className="mx-auto mt-10 w-1/2"
				loop
				autoplay
				speed={1}
			/>
		);
	}

  if(error){
    return <DisplayError message={error.message} />;
  }

	return (
		<>
			<h2 className="text-xl text-left w-1/2 mx-auto my-5">
				Post a comment
			</h2>
			<div className="w-1/2 mx-auto flex justify-between">
				<Input
					type="text"
					placeholder="Post a comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<Button className="ml-3" onClick={postComment}>
					<Send className="text-base" />
				</Button>
			</div>
			{/* comments starts here */}
			<Card className="w-3/4 mx-auto my-10">
				<CardHeader>
					<CardTitle>Comments</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-8">
					{
            comments.length === 0 ? <h2 className="text-lg text-center my-5"> No comments yet... </h2> : comments.map((comment, idx) => {
              return <CommentLine key={idx} username={comment.user.username || 'user'} body={comment.body}/>
            })
                
          }
				</CardContent>
			</Card>
		</>
	);
};

export default Comment;

const CommentLine = (props) => {
	return (
		<div className="flex items-center gap-4">
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
