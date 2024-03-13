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
	//TODO: fix
		const firstName = "Ankur";
		const lastName = 'Nawik'
	
	return (
		<>
			<nav className="flex justify-between items-center mt-5 px-20 pb-3 border-b-2">
				<div className="flex items-center ">
					<img className="w-10 mr-3" src={logo} alt="logo" />
					<h1 className="text-2xl font-bold">Hub</h1>
				</div>
				<div className="flex w-[32rem]">
					<Input
						className="mr-5 rounded-full"
						type="text"
						placeholder="Search Groups..."
					/>
					<Button className="flex justify-evenly items-center w-40 rounded-full ">
						<Search className="w-4 h-4 font-bold" />
						<span>Search</span>
					</Button>
				</div>

				<div className="flex items-center">
					<p className="mr-3 text-lg">Hello, {firstName}</p>
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
								<User className="mr-2 w-4 h-4" /> {firstName}{" "}
								{lastName}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>

							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
