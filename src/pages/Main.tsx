import { useState } from "react"
import CreateRoomComponent from "../components/createrRoomComponent/CreateRoomComponent"
import CreaterNameComponent from "../components/createrNameComponent/CreaterNameComponent"
import RoomComponent from "../components/roomComponent/RoomComponent"

export default function Main() {
	const [ state, setState ]=useState({
		createrRoomComponent: true,
		createdNameCompnonent: false,
		roomComponent: false
	})
	function actionCreateRoomComponent() {
		setState({
			createrRoomComponent: false,
			createdNameCompnonent: false,
			roomComponent: true
		})
	}
	return (
		<div className="main">
			{state.createdNameCompnonent? <CreaterNameComponent />:null}
			{state.createrRoomComponent? <CreateRoomComponent action={actionCreateRoomComponent} />:null}
			{state.roomComponent? <RoomComponent />:null}
		</div>
	)
}
