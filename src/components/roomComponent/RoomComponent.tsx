import { useEffect } from "react"
import conferenceMaster from "../../conference/conferenceMaster"

export default function RoomComponent(props: any) {
	processingAfterConnected()
	function processingAfterConnected() {
		const { peerConnection }=window.glagol
		conferenceMaster.handlerStopheMessage()
		conferenceMaster.roomOn()
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream: MediaStream) => {
			mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
				peerConnection.addTrack(track)
			})
			peerConnection.createOffer().then((offer: RTCOfferAnswerOptions) => {
				peerConnection.setLocalDescription(offer)
			})
		})

	}

	useEffect(() => {
		history.replaceState({}, '', props.roomName)
	}, [])
	return (
		<div>RoomComponent   {props.roomName} user: {props.user}</div>
	)
}
