import postImage from "../../assets/postimage.webp";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

import axios from "axios";

import { ThumbsDown, ThumbsUp } from "lucide-react";


//dummy posts
const POSTS = [
	{
		title: "Bridging Divides: Open Communication and Diverse Solutions ",
		body: "Let's discuss this important topic together. Open communication and diverse perspectives are the cornerstones of progress. Don't hesitate to share your thoughts, questions, or even anxieties. We can all learn from each other and work towards a deeper understanding. This collaborative approach fosters empathy and breaks down barriers. Remember, there are no bad ideas in this space. Every voice adds a valuable piece to the puzzle. By actively listening and engaging in respectful discourse, we can uncover innovative solutions and pave the way for positive change. So, let's roll up our sleeves, share our insights, and collectively tackle this challenge",
		type: "discussion",
		likes: 251,
		dislikes: 7,
	},
	{
		title: "Title 2",
		body: "This meme cracked me up! Take a look!",
		type: "meme",
		likes: 376,
		dislikes: 3,
	},
	{
		title: "The Allure of the Clickbait: Navigating the Sea of Online News",
		body: `The internet has become an ocean of information, and news articles are like buoys bobbing in the waves. With just a click, we can access stories from around the globe, from groundbreaking scientific discoveries to heartwarming tales of human kindness. But amidst this vast sea lies a constant struggle: the battle against clickbait.

        Clickbait headlines are like sirens, luring us in with sensational promises and exaggerated claims. They often rely on emotional triggers, exploiting our curiosity, fear, or outrage. "You Won't Believe What Happened Next!" or "This One Weird Trick Will Change Your Life Forever!" These headlines are designed to be irresistible, prompting us to click without fully understanding what lies beneath. However, the content that follows rarely lives up to the hype. The articles themselves may be poorly researched, lacking depth or factual accuracy. Often, they lead to websites filled with advertisements or even malicious content.
        
        The allure of clickbait is undeniable. In our fast-paced world, we're constantly bombarded with stimuli, and these attention-grabbing headlines offer a quick escape. They tap into our desire for instant gratification, promising a glimpse into something shocking, bizarre, or simply different. But by succumbing to clickbait, we not only risk wasting our time on misleading information, but we also contribute to the spread of misinformation.`,
		type: "news",
		likes: 419,
		dislikes: 10,
	},
	{
		title: "Title 4",
		body: "Join us for an exciting event happening next week!",
		type: "events",
		likes: 87,
		dislikes: 6,
	},
	{
		title: "Title 5",
		body: "Just sharing some general thoughts with the group.",
		type: "general",
		likes: 127,
		dislikes: 9,
	},
	{
		title: "Title 6",
		body: "Check out this interesting news article I found!",
		type: "news",
		likes: 315,
		dislikes: 0,
	},
	{
		title: "Title 7",
		body: "Let's discuss this important topic together.",
		type: "discussion",
		likes: 154,
		dislikes: 2,
	},
	{
		title: "Title 8",
		body: "This meme cracked me up! Take a look!",
		type: "meme",
		likes: 332,
		dislikes: 4,
	},
	{
		title: "Title 9",
		body: "Just sharing some general thoughts with the group.",
		type: "general",
		likes: 493,
		dislikes: 6,
	},
	{
		title: "Title 10",
		body: "Join us for an exciting event happening next week!",
		type: "events",
		likes: 499,
		dislikes: 3,
	},
];





export default Post = (props) => {
	const { title, body, type, likes, dislikes } = props.data;
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