import { useEffect } from "react"
import { useSelector } from "react-redux";
import conferenceMaster from "../../conference/conferenceMaster";

function startWebRTC() {
	const peerConnection=conferenceMaster.getPeerConnection()
	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {
		conferenceMaster.setStream(stream)
		stream.getTracks().forEach((track: MediaStreamTrack) => {
			peerConnection.addTrack(track)
		});
		peerConnection.createOffer().then((offer: RTCOfferOptions) => {
			peerConnection.setLocalDescription(offer)
		})
	})

}
function RoomComponent() {
	const { XMPPConnected }=useSelector((state: any) => state.glagol)
	useEffect(() => {
		if (XMPPConnected) {
			startWebRTC()
		}
	}, [XMPPConnected])
	console.info(XMPPConnected);


	useEffect(() => {
		history.replaceState({}, '', conferenceMaster.getRoomName())
	}, [])
	return (
		<div>RoomComponent</div>
	)
}
export default RoomComponent
