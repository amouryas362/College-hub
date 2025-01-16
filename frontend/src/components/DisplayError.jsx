import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../assets/404Error.json";
const DisplayError = (props) => {
	return <>
		<Player
			className="w-[300px] h-[300px] mx-auto mt-10"
			src={loading}
			autoplay
			loop
			speed={1}
		/>
		<h1 className="text-3xl text-center">Something went Wrong</h1>
		<h2 className="text-xl text-center mt-3">{props.message}</h2>
	</>;
};

export default DisplayError;