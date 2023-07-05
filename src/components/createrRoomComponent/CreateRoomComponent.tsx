import { useEffect, useState } from 'react'
import getRandomText from "../../plugins/getRandomText"

export default function createRoomComponent(props: any) {
	const [room, setRoom]=useState(window.location.pathname.split('/')[1])
	useEffect(() => {
		if (room!=="") {
			props.action(room)
		}
	}, [])
	function switcher() {
		props.action()
	}
	return (
		<div onClick={switcher}>createRoomComponent</div>
	)
}
