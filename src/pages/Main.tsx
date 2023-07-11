import { useState } from "react"
import { useDispatch } from "react-redux"
import CreateRoomComponent from "../components/createrRoomComponent/CreateRoomComponent"
import CreaterNameComponent from "../components/createrNameComponent/CreaterNameComponent"
import RoomComponent from "../components/roomComponent/RoomComponent"
import { ThemeProvider } from "@emotion/react"
import { darkTheme } from "../Ui/themes/theme"
import { changeNameRoom } from "../store/reducers/sliceRoom"
import { changeDisplayName } from "../store/reducers/sliceUser"
import conferenceMaster from "../conference/conferenceMaster"
import getRandomText from "../plugins/getRandomText"

export default function Main() {
	const dispatch=useDispatch()
	const [theme, setTheme]=useState(darkTheme)
	const [state, setState]=useState({
		createrRoomComponent: true,
		createdNameCompnonent: false,
		roomComponent: false
	})


	function actionCreateRoomComponent(room: string) {
		if (room!=='') {
			conferenceMaster.setRoomName(room)
		} else {
			conferenceMaster.setRoomName(getRandomText(8))
		}
		setState({
			createrRoomComponent: false,
			createdNameCompnonent: true,
			roomComponent: false
		})
	}
	function actionCreateNameComponent(user: string) {
		dispatch(changeDisplayName(user))
		if (user==='') {
			conferenceMaster.setDisplayName('unknown User')
		} else {
			conferenceMaster.setDisplayName(user)
		}
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
				{state.createdNameCompnonent? <CreaterNameComponent action={actionCreateNameComponent} />:null}
				{state.roomComponent? <RoomComponent />:null}
			</div>
		</ThemeProvider>

	)
}
