import { useState } from "react"
import CreateRoomComponent from "../components/createrRoomComponent/CreateRoomComponent"
import CreaterNameComponent from "../components/createrNameComponent/CreaterNameComponent"
import RoomComponent from "../components/roomComponent/RoomComponent"
import getRandomText from "../plugins/getRandomText"

export default function Main() {
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
		<div className="main">
			{state.createdNameCompnonent? <CreaterNameComponent action={actionCreateNameComponent} />:null}
			{state.createrRoomComponent? <CreateRoomComponent action={actionCreateRoomComponent} />:null}
			{state.roomComponent? <RoomComponent roomName={roomName} user={user} />:null}
		</div>
	)
}
