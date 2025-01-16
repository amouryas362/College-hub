import Navbar from "../../components/Navbar.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosHeaders } from "axios";
import { useNavigate } from "react-router-dom";

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
	RadioGroup,
	RadioGroupItem,
} from "../../components/ui/radio-group.jsx";

const signupSchema = z
	.object({
		groupName: z.string().min(3, {
			message: "Name should be of at least 3 characters",
		}),
		description: z.string().min(3, {
			message: "Description should be of at least 3 characters",
		}),
		visibility: z.enum(["private", "public"], {
			message: "Group should be either private or public",
		}),
	})
	.strict();

const Signin = () => {
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			groupName: "",
			description: "",
			visibility: "public",
		},
	});

	const onSubmit = async (values) => {
		try {
			const token = JSON.parse(localStorage.getItem("token"));

			const res = await axios.post(
				"http://localhost:3000/api/v1/group/create",
				values,
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			navigate(`/group/${values.groupName}`, { state: values });
		} catch (err) {
			console.log("Error: ", err);
			toast({
				title: "Uh oh! Something went wrong.",
				description: err.response.data.message,
			});
		}
	};

	return (
		<>

			<div className="flex flex-col mx-auto mt-20 w-1/2 border-2 p-20 rounded-lg shadow-sm ">
				<h1 className="text-center text-3xl mb-10">Create a Group</h1>
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
									<FormControl>
										<Input
											type="test"
											placeholder="Group Name here"
											{...field}
											required
										/>
									</FormControl>
									<FormDescription>
										Enter the name of your group..make sure
										it is not already taken
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Group Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter the group's description"
											{...field}
											required
										/>
									</FormControl>
									<FormDescription>
										Group's description goes here
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="visibility"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Group Visibility</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1">
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="public" />
												</FormControl>
												<FormLabel className="font-normal">
													Public
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="private" />
												</FormControl>
												<FormLabel className="font-normal">
													Private
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
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

export default Signin;
