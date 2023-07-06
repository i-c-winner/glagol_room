function enablingHandlersPeerConnection(pc: RTCPeerConnection) {
	pc.ontrack=(event: Event) => {
		console.info(event, 'ADD TRACK EVENT')
	}
	pc.onicecandidate=(event: Event) => {
		console.info(event, "ONICECANDIDATTE");
	}
}
export default enablingHandlersPeerConnection