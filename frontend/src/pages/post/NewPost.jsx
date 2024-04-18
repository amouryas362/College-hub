import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../../assets/postPageLoading.json";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../components/ui/form.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Toaster } from "../../components/ui/toaster.jsx";
import { toast } from "../../components/ui/use-toast.js";
import { Textarea } from "../../components/ui/textarea.jsx";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select.jsx";


const postSchema = z
	.object({
        groupName: z.string().min(3, {
			message: "Invalid group name",
		}),
		title: z.string().min(3, {
			message: "Title should be of at least 3 characters",
		}),
		type: z.enum(["news", "event", "meme", "discussion", "general"], {
			message: "Invalid post type",
		}),
		body: z.string().min(3, {
			message: "body should be of at least 3 characters",
		}),
		
	})
	.strict();

const NewPost = () => {
	const navigate = useNavigate();

	const [groups, setGroups] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const fetchedGroups = await axios.get(
					`http://localhost:3000/api/v1/users/groups`,
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);

				setGroups(fetchedGroups.data);
				setIsLoading(false);
			} catch (error) {
				console.log("Error: ", error);
			}
		};
		fetchGroups();
	}, []);

	const form = useForm({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: "",
			body: "",
			type: "",
			groupName: "",
		},
	});

	const onSubmit = async (values) => {
        console.log(values);
		try {
			const token = JSON.parse(localStorage.getItem("token"));

			const res = await axios.post(
				"http://localhost:3000/api/v1/post/new",
				values,
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);
            form.reset();
			navigate(`/group/${values.groupName}`);
		} catch (err) {
			console.log("Error: ", err);
			toast({
				title: "Uh oh! Something went wrong.",
				description: err.response.data.message,
			});
		}
	};
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
	return (
		<>
			<div className="flex flex-col mx-auto mt-20 w-1/2 border-2 p-20 rounded-lg shadow-sm ">
				<h1 className="text-center text-3xl mb-10">Create a Post</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 mx-auto w-full flex flex-col">
						<FormField
							control={form.control}
							name="groupName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Group Name</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										required>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Group Name" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{groups.map((group, idx) => (
												<SelectItem
													key={idx}
													value={group}>
													{group}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									<FormDescription>
										Choose the group you want to post to...
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Post Title"
											{...field}
											required
										/>
									</FormControl>
									<FormDescription>
										The title of your post goes here...
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="body"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Post Body</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter your post here..."
											{...field}
											required
										/>
									</FormControl>
									<FormDescription>
										Post's content goes here
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Post Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										required>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Group Name" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="news">
												news
											</SelectItem>
											<SelectItem value="event">
												event
											</SelectItem>
											<SelectItem value="meme">
												meme
											</SelectItem>
											<SelectItem value="discussion">
												discussion
											</SelectItem>
											<SelectItem value="general">
												general
											</SelectItem>
										</SelectContent>
									</Select>

									<FormDescription>
										Categorise your post
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button className="self-center w-[80%]" type="submit">
							Create
						</Button>
					</form>

					<Toaster />
				</Form>
			</div>
		</>
	);
};

export default NewPost;
