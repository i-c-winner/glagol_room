import conferenceMaster from "./conferenceMaster";
function enablingHandlersPeerConnection(pc: RTCPeerConnection) {
	pc.ontrack=(event: any) => {
		console.info(event, 'ADD TRACK EVENT')
	}
	pc.onicecandidate=(event: RTCPeerConnectionIceEvent) => {
		if (event.candidate===null) {
			conferenceMaster.doSignaling()
		}
	}
}
export default enablingHandlersPeerConnection