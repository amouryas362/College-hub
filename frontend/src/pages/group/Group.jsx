import GroupHeader from "./GroupHeader";
import GroupBody from "./GroupBody";



const Group = () => {
	
	
	return (
		<>
			<div className="p-20">
				{isLoading && <p>Loading group Data</p>}
				{!isLoading && error ? (
					<DisplayError message={error.message} />
				) : null}
				{!isLoading && !error && (
					<GroupHeader
						groupName={groupData.groupName}
						description={groupData.description}
					/>
				)}
				
			</div>
		</>
	);
};

export default Group;





