import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "../../components/ui/button";
import DisplayError from "../../components/DisplayError";

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
			clearTimeout(timeoutFlag);
		};
	}, [groupName]);

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

								<Button className="rounded-lg">
									<Settings />
								</Button>
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
