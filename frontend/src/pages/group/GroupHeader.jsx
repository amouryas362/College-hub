import { Button } from "../../components/ui/button";
import { Settings } from "lucide-react";
import axios from "axios";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";






export default GroupHeader = ({ groupName, description }) => {



    const [groupData, setGroupData] = useState({});
	const [groupPosts, setGroupPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id: groupName } = useParams();

    //TODO: use react-query to fetch data from the backend, this is to be done so as to standardize the fetching logic

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const group = await axios.get(
					`http://localhost:3000/api/v1/group/${groupName}/settings`,
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("token"),
							)}`,
						},
					},
				);
				const data = {
					groupName: group.data.groupName,
					description: group.data.description,
					visibility: group.data.visibility,
				};
				setGroupData(data);
				setIsLoading(false);
			} catch (error) {
				//add a error component thing here
				console.log(error)
				// setError(error.response.data);
				setError(error.data);
				setIsLoading(false);
			}
		};
		fetchGroups();
	}, []);





    return (
		<>
			<div className="flex justify-between items-center mb-5">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="description">
						<AccordionTrigger>
							<h2 className="text-xl font-bold">{groupName}</h2>
						</AccordionTrigger>
						<AccordionContent className="italic">
							{description}
							<div className="flex justify-end items-center mt-3">
								<Button
									className="rounded-lg mr-3"
									variant="outline">
									Leave
								</Button>
								<Button className="rounded-lg">
									<Settings />
								</Button>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<h2 className="text-xl text-center font-semibold my-10">
				All Posts
			</h2>
		</>
	);
};