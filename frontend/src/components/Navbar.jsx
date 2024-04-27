import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/iconicon.png";

import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../components/ui/avatar.jsx";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu.jsx";

import { LogOut, User, Settings, Search } from "lucide-react";

const Navbar = (props) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
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

				setIsLoading(false);
				setUser(response.data);
				
			} catch (error) {
				console.log(error);
				navigate("/signin");
				setError(error.response.data);
				setIsLoading(false);
			}
		};
        if(!localStorage.getItem('user')) getUserDetails();
		else{
			setUser(JSON.parse(localStorage.getItem('user')));
			setIsLoading(false);
		}
	}, []);
	
	return (
		<>
			<nav className="flex justify-between items-center mt-5 px-20 pb-3 border-b-2">
				<div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
					<img className="w-10 mr-3" src={logo} alt="logo" />
					<h1 className="text-2xl font-bold">Hub</h1>
				</div>
				<div className="flex ml-auto mr-5 justify-end">
					{/* <Input
						className="mr-5 rounded-full"
						type="text"
						placeholder="Search Groups..."
					/>
					<Button className="flex justify-evenly items-center w-40 rounded-full ">
						<Search className="w-4 h-4 font-bold" />
						<span>Search</span>
					</Button> */}
					<Button variant="link" className="mr-5" onClick={() => navigate('/group/new')}>Create A Group</Button>
					<Button variant="link" className="mr-5" onClick={() => navigate('/group/all')}>View All Groups</Button>
					<Button variant="link" onClick={() => navigate('/post/new')}>Create A Post</Button>
				</div>

				<div className="flex items-center">
					<p className="mr-3 text-lg">Hello, {user === null ? " ": user.username}</p>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="w-8 h-8">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel className="flex justify-start items-center">
								{" "}
								<User className="mr-2 w-4 h-4" /> {user === null ? " ": user.username}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => {localStorage.removeItem('token'); navigate('/signin')}}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>

							<DropdownMenuItem onClick={() => navigate(`/user/${user.username}`)}>
								<Settings className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>

			<Outlet />
		</>
	);
};

export default Navbar;
