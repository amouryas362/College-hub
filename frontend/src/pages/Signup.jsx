import signup from "../assets/signupImage.jpg";
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
		username: z.string().min(3, {
			message: "Username must be at least 3 characters"
		}),
		password: z.string().min(6, { message: "Password must be at least 6 characters" }),
	})
	.strict();

const Signup = () => {
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
		}
	});

	const onSubmit = async (values) => {
		
		try {
		    const res = await axios.post(
		        "http://localhost:3000/api/v1/signup",
		        values
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
		<div className="flex h-screen bg-background">
			<img src={signup} alt="signup" />
			<div className="flex flex-col mx-auto mt-20 border-2 h-fit p-10 rounded-md shadow-md">
				<h1 className="text-center text-3xl mb-10">
					Register on The College Hub
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
										This would be your registered email
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
										This is your password
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<>
									<FormItem>
										<FormLabel>Display Name</FormLabel>
										<FormControl>
											<Input placeholder="Your username here" {...field} required />
										</FormControl>
										<FormDescription>
											Choose Your Username
										</FormDescription>
										<FormMessage />
									</FormItem>
								</>
							)}
						/>

						<Button className="self-center w-[80%]" type="submit">
							Sign up
						</Button>
					</form>

					<Toaster />
				</Form>
			</div>
		</div>
	);
};

export default Signup;
