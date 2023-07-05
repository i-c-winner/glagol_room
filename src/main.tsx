import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import route from "./route/route"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={route} ></RouterProvider>
)
