import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";

const route=createBrowserRouter([
	{
		path: '/',
		element: <Main />
	}
]
)

export default route