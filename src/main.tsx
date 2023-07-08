import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import route from "./route/route"
import { Provider } from "react-redux"
import store from "./store/store"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<RouterProvider router={route} ></RouterProvider>
	</Provider>
)
