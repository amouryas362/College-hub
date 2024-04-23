import { Route, Routes } from "react-router-dom";

import Navigation from "./components/Navbar";
import Group from "./pages/group/Group";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreateGroup from "./pages/group/CreateGroup"
import AllGroups from "./pages/group/AllGroups";
import PostPage from "./pages/post/PostPage";
import NewPost from "./pages/post/NewPost";
import Index from "./pages/Index";
import User from "./pages/User/User";
const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={ <Index />  } />
				<Route path='/signup' element={ <Signup /> } />
				<Route path='/signin' element={ <Signin /> } />
				<Route path='/user/:id' element={ <User /> } />


				<Route path="/group"  element={ <Navigation /> }>
					<Route path="new" element={ <CreateGroup /> } />
					<Route path="all" element={ <AllGroups /> } />
					<Route path=":id" element={ <Group /> } />
				</Route>

				<Route path="/post"  element={ <Navigation /> }>
					<Route path="new" element={ <NewPost /> } />
					<Route path=":id" element={ <PostPage /> } />
				</Route>



			</Routes>
		</>
	);
};
export default App;
