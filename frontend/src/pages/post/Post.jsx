import postImage from "../../assets/postimage.webp";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

import axios from "axios";

import { ThumbsDown, ThumbsUp } from "lucide-react";


const Post = (props) => {
	const { title, body, type, likes, dislikes } = props;
	return (
		<div className="flex flex-col items-center justify-between border-2 shadown-lg rounded-sm w-[60%] mx-auto mb-5 overflow-hidden hover:border-orange-500 hover:cursor-pointer transition-all">
			<div className="flex items-center w-full p-5 font-bold">
				<h3 className="text-xl mr-3">{title}</h3>
				<Badge>{type}</Badge>
			</div>
			<p className="font-thin w-full p-5">{body}</p>
			{props.idx % 2 === 1 ? (
				<img src={postImage} alt="post image" />
			) : null}
			<div className="flex items-center bg-slate-100 w-full p-2 font-base">
				<Button variant="outline" className="mr-3 flex items-center">
					<ThumbsUp className="mr-2 w-4 h-4" /> {likes}
				</Button>
				<Button variant="outline" className=" flex items-center">
					<ThumbsDown className="mr-2 w-4 h-4" /> {dislikes}
				</Button>
			</div>
		</div>
	);
};

export default Post;