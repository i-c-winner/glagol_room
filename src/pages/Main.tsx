import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CreateRoomComponent from "../components/createrRoomComponent/CreateRoomComponent"
import CreaterNameComponent from "../components/createrNameComponent/CreaterNameComponent"
import RoomComponent from "../components/roomComponent/RoomComponent"
import getRandomText from "../plugins/getRandomText"
import { ThemeProvider } from "@emotion/react"
import { darkTheme } from "../Ui/themes/theme"
import { changeNameRoom } from "../store/reducers/sliceRoom"

export default function Main() {
	const dispatch=useDispatch()
	const [theme, setTheme]=useState(darkTheme)
	const [state, setState]=useState({
		createrRoomComponent: true,
		createdNameCompnonent: false,
		roomComponent: false
	})

	const [user, setUser]=useState<string>('Terra Name')

	function actionCreateRoomComponent(room: string) {
		if (room!=='') {
			dispatch(changeNameRoom(room))
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
				{state.createrRoomComponent? <CreateRoomComponent action={actionCreateRoomComponent} />:null}
				{/*	{state.createdNameCompnonent? <CreaterNameComponent roomName={roomName} action={actionCreateNameComponent} />:null}
				{state.roomComponent? <RoomComponent roomName={roomName} user={user} />:null} */}
			</div>
		</ThemeProvider>

	)
}
