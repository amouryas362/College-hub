import signup from "../assets/signinImage.jpg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form.jsx";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input.jsx";
import { Toaster } from "../components/ui/toaster";
import { toast } from "../components/ui/use-toast";

const signupSchema = z
	.object({
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(6, { message: "Password should be of at least 6 characters" }),
	})
	.strict();

const Signin = () => {
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values) => {
		try {
			const res = await axios.post(
				"http://localhost:3000/api/v1/signin",
				values,
			);
			localStorage.setItem("token", JSON.stringify(res.data.token));
			navigate("/");
		} catch (err) {
			console.log("Error: ", err);
			toast({
				title: "Uh oh! Something went wrong.",
				description: err.response.data.message,
			});
		}

		form.reset();
	};

	return (
		<div className="flex h-screen">
			<img src={signup} alt="signup" />
			<div className="flex flex-col mx-auto mt-20">
				<h1 className="text-center text-3xl mb-10">
					Login to The College Hub
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 mx-auto w-full flex flex-col">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Email"
											{...field}
											required
										/>
									</FormControl>
									<FormDescription>
										Your registered Email here
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="password"
											{...field}
											required
										/>
									</FormControl>
									<FormDescription>
										Your password here
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="self-center w-[80%]" type="submit">
							Sign in
						</Button>
					</form>

					<div className="flex items-center my-5">
						<hr className="flex-grow border-t border-gray-300" />
						<span className="px-3 text-gray-500">
							Don't have an account?
						</span>
						<hr className="flex-grow border-t border-gray-300" />
					</div>

					<Button
						onClick={(e) => navigate("/signup")}
						className="self-center w-[80%]"
						type="submit">
						Sign Up
					</Button>
					<Toaster />
				</Form>
			</div>
		</div>
	);
};

export default Signin;
