import Post from "./post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar.jsx";
import DisplayError from "../components/DisplayError";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../assets/indexLoading.json";
const Index = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getUserDetails = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/v1/me",
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);
				setUser(response.data);
				localStorage.setItem("user", JSON.stringify(response.data));
			} catch (error) {
				console.log(error);
				setError(error.response.data);
				setIsLoading(false);
				navigate("/signin");
			}
		};
        getUserDetails();
	}, []);

	useEffect(() => {
	  const getPosts = async () => {
		try {
		  const response = await axios.get(
			"http://localhost:3000/api/v1/users/posts",
			{
			  headers: {
				Authorization: `Bearer ${JSON.parse(
				  localStorage.getItem("token")
				)}`,
			  },
			}
		  );
		  setPosts(response.data);
		  setIsLoading(false);
		}
		catch (error) {
		  console.log(error);
		  setError(error.response.data);
		}
	  };
	  getPosts();	  
	}, [])
	
	
	const viewPost = (postId) => {
        navigate(`/post/${postId}`);
    }
    
    if(isLoading){
        return <Player
        className="w-1/2 h-1/2"
		src={loading}
		loop
		autoplay
		speed={1}
	  />;
    }
    if(error){
        return <DisplayError message={error.message} />
    }
	return (
		<div className="flex flex-col mt-5">
			
			<Navigation />
			
			<h1 className="text-4xl text-center mt-10">{user.username}'s Home Feed</h1>
			
			<div className="mt-10">
				{
					posts.map((post, idx) => (
						<Post key={idx} {...post} onClick={() => viewPost(post.postId)}/>
					))
				}
			</div>
		</div>
	);
};

export default Index;
