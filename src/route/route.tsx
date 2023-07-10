import { createBrowserRouter } from "react-router-dom";
import Conference from "../conference/Conference";

const route=createBrowserRouter([
	{
		path: '/:room',
		element: <Conference />
	},
	{
		path: '/',
		element: <Conference />
	}
]
)

export default route