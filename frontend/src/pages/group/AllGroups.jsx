import { useEffect, useState } from "react";

import axios from "axios";

import GroupCard from "./components/GroupCard";
import DisplayError from "../../components/DisplayError";

import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";


const AllGroups = () => {

	const [groups, setGroups] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const groups = await axios.get(
					"http://localhost:3000/api/v1/group/all",
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);

				setGroups(groups.data);
				setIsLoading(false);
			} catch (error) {
				//add a error component thing here
				setError(error.response.data);
				setIsLoading(false);
			}
		};
		fetchGroups();
	}, []);

	return (
		<div className="flex flex-col sm:px-10 md:px-20 md:mt-20 sm:mt-10">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold mb-1">All Groups</h1>
					<p className="text-base text-slate-500">Find groups to join!</p>
				</div>
				<div className="mt-5 flex w-1/2">
					<Input
						className="mr-5 rounded-full"
						type="text"
						placeholder="Search Groups..."
					/>
					<Button className="flex justify-evenly items-center w-40 rounded-full ">
						Search Group
					</Button>
				</div>
			</div>
			
			{ isLoading ? <p className="text-3xl mt-5 text-center">Loading groups</p> : null }

			{ !isLoading && error ? <DisplayError message={error.message} /> : null }

			{ !isLoading && !error && <GroupCards groups={groups} />}

		</div>
	);
};

const GroupCards = (props) => {

	if(props.groups.length === 0){
		return <h2 className="text-3xl text-center" >No Group exists...you can create a group</h2>
	}
	const groups = props.groups.map((group, index) => {
		//map the group details here
		return <GroupCard
			key={index}
			groupName={group.groupName}
			description={group.description}
		/>
	});
	return (
		<div className="md:mt-20 grid md:grid-cols-4 md:gap-4 sm:grid-cols-1">
			{ groups }
		</div>
	);
};

export default AllGroups;
