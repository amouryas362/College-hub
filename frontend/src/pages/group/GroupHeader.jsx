import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "../../components/ui/button";
import {
	RadioGroup,
	RadioGroupItem,
} from "../../components/ui/radio-group.jsx";
import { Label } from "../../components/ui/label";
import DisplayError from "../../components/DisplayError";
import { Textarea } from "../../components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../components/ui/alert-dialog.jsx";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../components/ui/sheet.jsx";

import { Toaster } from "../../components/ui/toaster.jsx";
import { toast } from "../../components/ui/use-toast";

import { Settings } from "lucide-react";

let timeoutFlag;
const GroupHeader = () => {
	const { id: groupName } = useParams();
	const navigate = useNavigate();
	const [groupData, setGroupData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [member, setMember] = useState(true);
	const [forceUpdate, setForceUpdate] = useState(false);
	useEffect(() => {
		//TODO: use react-query to fetch data from the backend, this is to be done so as to standardize the fetching logic
		const fetchGroups = async () => {
			try {
				const groupDetails = await axios.get(
					`http://localhost:3000/api/v1/group/${groupName}/membership`,
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);

				setMember(groupDetails.data.isMember);
				setGroupData(groupDetails.data.group);
				setIsLoading(false);
			} catch (error) {
				timeoutFlag = setTimeout(() => {
					console.log("executing background refresh");
					fetchGroups();
				}, 10000);

				setError(error.data);
				setIsLoading(false);
			}
		};
		fetchGroups();
		() => {
			return clearTimeout(timeoutFlag);
		};
	}, [groupName, forceUpdate]);

	const updateMembership = async () => {
		const action = member ? "leave" : "join";
		try {
			await axios.post(
				`http://localhost:3000/api/v1/group/${groupName}/${action}`,
				null,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("token"),
						)}`,
					},
				},
			);

			setMember((prevMember) => !prevMember);
		} catch (error) {
			console.log(error);
			toast({
				title: "Uh oh! Something went wrong.",
				description: err.response.data.message,
			});
		}
	};
	// useEffect(() => {
	// console.log('second use effect');
	// console.log(member);
	// if (!member) {
	// 	navigate("/");
	// }
	//for now we will not navigate to another page because the groups are public.
	//when private groups will get implemented then we will show a page that will ask the user to join the group
	// }, [member]);

	if (isLoading) {
		return <h1 className="text-3xl text-center">Loading...</h1>;
	}

	if (error) {
		return <DisplayError message={error.message} />;
	}

	// if(groupData.visibility !== 'public'){
	// 	return <p className="text-3xl text-center"> Group is private...you can view it if you join </p>
	// }

	return (
		<>
			<div className="flex justify-between items-center mb-5">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="description">
						<AccordionTrigger>
							<h2 className="text-xl font-bold">
								{groupData.groupName}
							</h2>
						</AccordionTrigger>
						<AccordionContent className="italic">
							{groupData.description}
							<div className="flex justify-end items-center mt-3">
								{member ? (
									<ModalAlert
										updateMembership={updateMembership}
									/>
								) : (
									<Button
										onClick={updateMembership}
										className="rounded-lg mr-3"
										variant="outline">
										Join
									</Button>
								)}

								{groupData.userId ===
									JSON.parse(localStorage.getItem("user"))
										.userId && (
									<SheetUpdate
										groupName={groupData.groupName}
										description={groupData.description}
										visibility={groupData.visibility}
										setForceUpdate={setForceUpdate}
									/>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Toaster />
			</div>
		</>
	);
};

export default GroupHeader;

const ModalAlert = (props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="rounded-lg mr-3" variant="outline">
					leave
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						You won't be able to see the posts if the group is
						private
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={props.updateMembership}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

const SheetUpdate = (props) => {
	const [description, setDescription] = useState(props.description);
	const [visibility, setVisibility] = useState(props.visibility);

	const updateDetails = async () => {
		try {
			await axios.put(
				`http://localhost:3000/api/v1/group/${props.groupName}/settings`,
				{
					description,
					visibility,
				},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("token"),
						)}`,
					},
				},
			);
			props.setForceUpdate((prev) => !prev);
		} catch (error) {
			console.log(error);
			<DisplayError message={error.response.data} />;
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="rounded-lg">
					<Settings />
				</Button>
			</SheetTrigger>
			<SheetContent className="W-[40%]">
				<SheetHeader>
					<SheetTitle>Edit Group Info</SheetTitle>
					<SheetDescription>
						Make changes to the group here. Click save when you're
						done.
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col mt-10">
					<div className="flex flex-col mb-10">
						<Label className="mb-3 text-xl" htmlFor="description">
							Group Description
						</Label>
						<Textarea
							id="description"
							className="w-full"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="flex flex-col mb-10">
						<h3 className="text-xl mb-5">Visibility</h3>
						<RadioGroup defaultValue={visibility}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									onClick={() => setVisibility("public")}
									value="public"
									id="r1"
								/>
								<Label htmlFor="r1">Public</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									onClick={() => setVisibility("private")}
									value="private"
									id="r2"
								/>
								<Label htmlFor="r2">Private</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button
							onClick={updateDetails}
							className="w-full"
							type="submit">
							Save changes
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
