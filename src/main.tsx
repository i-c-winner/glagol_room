import ReactDOM from 'react-dom'
import { RouterProvider } from "react-router-dom"
import route from "./route/route"
const container=(document.getElementById('root'))

ReactDOM.render(<RouterProvider router={route} />
	, container)

