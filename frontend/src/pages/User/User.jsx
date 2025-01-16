import Navbar from "../../components/Navbar";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs.jsx";
import UserComments from "./UserComments";
import UserPosts from "./UserPosts";

const User = () => {
	return (
		<>
			<Navbar />
			<Tabs defaultValue="posts" className="my-10">
				<TabsList className="flex justify-between w-[400px] mx-auto">
					<TabsTrigger value="posts">Posts</TabsTrigger>
					<TabsTrigger value="comments">Comments</TabsTrigger>
				</TabsList>
				<div className="w-3/4 mx-auto mt-10">
					<TabsContent value="posts">
						<UserPosts />
					</TabsContent>
					<TabsContent value="comments">
						<UserComments />
					</TabsContent>
				</div>
			</Tabs>
		</>
	);
};

export default User;
