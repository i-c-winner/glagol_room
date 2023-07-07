import conferenceMaster from "./conferenceMaster";
function enablingHandlersPeerConnection() {
	const pc=window.glagol.peerConnection
	if (pc) pc.ontrack=(event: any) => {
		console.info(event, 'ADD TRACK EVENT')
	}
	if (pc) pc.onicecandidate=(event: RTCPeerConnectionIceEvent) => {
		if (event.candidate) {
			conferenceMaster.doSignalingCandidate(event)
		}
	}
}
export default enablingHandlersPeerConnection
