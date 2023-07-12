import config from "../../config";
import { useEffect } from "react"
import { useSelector } from "react-redux";
import conferenceMaster from "../../conference/conferenceMaster";

function RoomComponent() {

	function startWebRTC() {
		conferenceMaster.peerConnection=new RTCPeerConnection({
			iceServers: [
				{ urls: [config.peerServer] }
			]
		})

		const peerConnection=conferenceMaster.peerConnection
		peerConnection.onicecandidate=(event: any) => {
			console.info(conferenceMaster);
			console.log('iceCandidate');
		}

		peerConnection.ontrack=(event: any) => {
			console.log(event, 'track');
		}

		console.log(conferenceMaster.peerConnection);
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {

			stream.getTracks().forEach((track: MediaStreamTrack) => {
				conferenceMaster.peerConnection.addTrack(track)
			});
			peerConnection.createOffer().then((offer: RTCOfferOptions) => {
				peerConnection.setLocalDescription(offer)
			})
		})
	}

	useEffect(() => {
		history.replaceState({}, '', conferenceMaster.roomName)
		conferenceMaster.initConference.then((connect) => {
			conferenceMaster.conference=connect
			startWebRTC()
		})
		console.info(conferenceMaster);
	}, [])
	return (
		<div>RoomComponent</div>
	)
}
export default RoomComponent
