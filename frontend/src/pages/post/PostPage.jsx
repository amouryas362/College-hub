import { useEffect, useState } from "react";
import Post from "../post/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
import DisplayError from "../../components/DisplayError.jsx";
import Comment from '../Comment.jsx'
import { Player } from '@lottiefiles/react-lottie-player';
import loading from "../../assets/postPageLoading.json";



const GroupBody = () => {
	//fetch all the post and display them
    
	const { id: postId } = useParams();
	const [post, setPost] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const post = await axios.get(
					`http://localhost:3000/api/v1/post/${postId}`,
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);

				setPost(post.data);
				setIsLoading(false);
			} catch (error) {
				//add a error component thing here
				setError(error.response.data);
				setIsLoading(false);
			}
		};
		fetchPosts();
	}, []);

    

	if (isLoading) {
		return <Player
		src={loading}
		className="mx-auto mt-10 w-1/2"
		loop
		autoplay
		speed={1}
	  />;
	}

	if (error) {
		return <DisplayError message={error.message} />;
	}


	return (
		<div className="flex flex-col mt-20">
      		<Post {...post} />
            <Comment />
		</div>
	);
};

export default GroupBody;
