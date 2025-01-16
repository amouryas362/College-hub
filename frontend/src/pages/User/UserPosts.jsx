import { useEffect, useState } from "react";
import Post from "../post/Post";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DisplayError from "../../components/DisplayError.jsx";
import { Player } from '@lottiefiles/react-lottie-player';
import loading from "../../assets/postLoading.json";

const UserPosts = () => {
	const navigate = useNavigate();
	const { id: username } = useParams();
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const groups = await axios.get(
					`http://localhost:3000/api/v1/post/user/${username}`,
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);

				setPosts(groups.data);
				setIsLoading(false);
			} catch (error) {
				//add a error component thing here
				setError(error.response.data);
				setIsLoading(false);
			}
		};
		fetchPosts();
	}, []);

	const viewPost = (postId) => {
        navigate(`/post/${postId}`);
    }


	if (isLoading) {
		return <Player
		src={loading}
		className="mx-auto mt-10"
		loop
		autoplay
		speed={1}
	  />;
	}

	if (error) {
		return <DisplayError message={error.message} />;
	}

	const groupPosts = posts.map((post, index) => {
		return <Post onClick={() => viewPost(post.postId)} key={index} idx={index} {...post} />;
	});

	return (
		<div>
			<h2 className="text-xl text-center font-semibold mb-5">
				All Posts
			</h2>
      		{ groupPosts.length > 0 ? groupPosts : <h1 className="text-center text-3xl">No posts yet</h1>}
		</div>
	);
};

export default UserPosts;
