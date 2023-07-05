import { useEffect } from "react"

export default function RoomComponent(props: any) {
	useEffect(() => {
		history.replaceState({}, '', props.roomName)
	}, [])
	return (
		<div>RoomComponent   {props.roomName} user: {props.user}</div>
	)
}
