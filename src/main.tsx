import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import route from "./route/route"
import theme from "./Ui/themes/theme"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider theme={theme}>
		<RouterProvider router={route} ></RouterProvider>
	</ThemeProvider>
)
