class ConferenceMaster {
	connect: any
	peerConnection: any
	init(connect: any, pc: any) {
		this.connect=connect
		this.peerConnection=pc
		this._enablingHandlerPC()
	}
	_enablingHandlerPC() {
		console.log(this.peerConnection);
		this.peerConnection.ontrack=(event: any) => {
			console.info(event, 'ADD TRACK EVENT')
		}
		this.peerConnection.onicecandidate=(event: RTCPeerConnectionIceEvent) => {
			if (event.candidate) {
				// conferenceMaster.doSignalingCandidate(event)
			}
		}
	}
}

export default new ConferenceMaster()
