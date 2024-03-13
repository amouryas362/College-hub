import { Route, Routes } from "react-router-dom";

import Navigation from "./components/Navbar";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreateGroup from "./pages/CreateGroup"

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={ <Navigation name={ {firstName: "hello", lastName: "moto"} } />  } />
				<Route path='/signup' element={ <Signup /> } />
				<Route path='/signin' element={ <Signin /> } />
				<Route path="/group/new" element={ <CreateGroup /> } />
			</Routes>
		</>
	);
};
export default App;
