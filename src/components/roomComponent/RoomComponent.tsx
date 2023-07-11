import { useEffect } from "react"
import { useSelector } from "react-redux";
import conferenceMaster from "../../conference/conferenceMaster";

function startWebRTC() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {
		const peerConnection=conferenceMaster.getPeerConnection()
		conferenceMaster.setStream(stream)
		stream.getTracks().forEach((track: MediaStreamTrack) => {
			peerConnection.addTrack(track)
		});
		peerConnection.createOffer().then((offer: RTCOfferOptions) => {
			console.info(peerConnection, 'PEER');
			peerConnection.setLocalDescription(offer)
		})
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


	useEffect(() => {
		console.log();
		history.replaceState({}, '', conferenceMaster.getRoomName())
	}, [])
	return (
		<div>RoomComponent</div>
	)
}
