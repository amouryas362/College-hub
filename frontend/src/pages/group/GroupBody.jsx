import Post from "../post/Post";

//TODO: fetch the posts from the backend and render them here
//TODO: add the logic to display few posts at a time or find a way to fetch posts on scroll

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

const posts = POSTS.map((post, index) => {
	return <Post key={index} idx={index} {...post} />;
});

const GroupBody = () => {
	return (
		<div>
			<h2 className="text-xl text-center font-semibold my-10">
				All Posts
			</h2>
      		{ posts }
		</div>
	);
};

export default GroupBody;
