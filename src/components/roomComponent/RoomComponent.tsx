import { useEffect } from "react"
import { useSelector } from "react-redux";
import conferenceMaster from "../../conference/conferenceMaster";

function startWebRTC() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {
		conferenceMaster.setStream(stream)
		console.log(stream);
	})
}
export default function RoomComponent() {
	const { XMPPConnected }=useSelector((state: any) => state.glagol)
	useEffect(() => {
		if (XMPPConnected) {
			startWebRTC()
		}
	}, [XMPPConnected])
	console.info(XMPPConnected);
	const { nameRoom }=useSelector((state: any) => {
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
