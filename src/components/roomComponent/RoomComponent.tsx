import { useEffect } from "react"
import { useSelector } from "react-redux";

export default function RoomComponent() {
	const { nameRoom }=useSelector((state: any) => {
		console.log(state.room);
		return state.room
	})

	useEffect(() => {
		console.log();
		history.replaceState({}, '', nameRoom)
	}, [])
	return (
		<div>RoomComponent</div>
	)
}
