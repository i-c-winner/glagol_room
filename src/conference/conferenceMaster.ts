class ConferenceMaster {
	connection: any
	peerConnection: any
	init(connection: any, pc: any) {
		this.connection=connection
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
	getConnection() {
		return this.connection
	}
	getPeerConnection() {
		return this.peerConnection
	}
}

export default new ConferenceMaster()
