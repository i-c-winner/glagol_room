import { useState } from "react"
import CreateRoomComponent from "../components/createrRoomComponent/CreateRoomComponent"
import CreaterNameComponent from "../components/createrUserComponent/CreaterUserComponent"
import RoomComponent from "../components/roomComponent/RoomComponent"
import getRandomText from "../plugins/getRandomText"
import { ThemeProvider } from "@emotion/react"
import { darkTheme } from "../Ui/themes/theme"

export default function Main() {
	const [theme, setTheme]=useState(darkTheme)
	const [state, setState]=useState({
		createrRoomComponent: true,
		createdNameCompnonent: false,
		roomComponent: false
	})
	const [roomName, setRoomName]=useState<string>('')
	const [user, setUser]=useState<string>('Terra Name')

	function actionCreateRoomComponent(room: string) {
		if (room==='') {
			setRoomName(() => getRandomText(9))
		} else {
			setRoomName(room)
		}
		setState({
			createrRoomComponent: false,
			createdNameCompnonent: true,
			roomComponent: false
		})
	}
	function actionCreateNameComponent(user: string) {
		setUser(user)
		setState({
			createrRoomComponent: false,
			createdNameCompnonent: false,
			roomComponent: true
		})
	}
	return (
		<ThemeProvider theme={theme}>
			<div className="main">
				{/* {state.createdNameCompnonent? <CreaterNameComponent roomName={roomName} action={actionCreateNameComponent} />:null}
				{state.createrRoomComponent? <CreateRoomComponent roomName={roomName} action={actionCreateRoomComponent} />:null}
				{state.roomComponent? <RoomComponent roomName={roomName} user={user} />:null} */}
			</div>
		</ThemeProvider>

	)
}
