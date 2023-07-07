import conferenceMaster from "./conferenceMaster";
function enablingHandlersPeerConnection() {
	const pc=window.glagol.peerConnection
	pc.ontrack=(event: any) => {
		console.info(event, 'ADD TRACK EVENT')
	}
	pc.onicecandidate=(event: RTCPeerConnectionIceEvent) => {
		if (event.candidate) {
			conferenceMaster.doSignalingCandidate(event)
		}
	}
}
export default enablingHandlersPeerConnection
