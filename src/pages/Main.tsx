import { useState } from "react"
import CreateRoomComponent from "../components/createrRoomComponent/CreateRoomComponent"
import CreaterNameComponent from "../components/createrNameComponent/CreaterNameComponent"
import RoomComponent from "../components/roomComponent/RoomComponent"

export default function Main() {
	const [state, setState]=useState({
		createrRoomComponent: true,
		createdNameCompnonent: false,
		roomComponent: false
	})
	const [roomName, setRoomName]=useState<string>('')

	function actionCreateRoomComponent(room: string) {
		setRoomName(room)
		setState({
			createrRoomComponent: false,
			createdNameCompnonent: true,
			roomComponent: false
		})
	}
	function actionCreateNameComponent() {
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
			{state.roomComponent? <RoomComponent roomName={roomName} />:null}
		</div>
	)
}
