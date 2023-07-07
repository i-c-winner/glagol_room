class ConferenceMaster {
	peerConnection: RTCPeerConnection
	strophe: any
	connection: any
	roomName: string

	init(params: { peerConnection: RTCPeerConnection, strophe: any, connection: any }) {
		this.peerConnection=params.peerConnection
		this.strophe=params.strophe
		this.connection=params.connection
		this.roomName=window.glagol.roomName
	}
	codingMessage(message: unknown) {
		return encodeURI(JSON.stringify(message))
	}

	doSignalingCandidate(event: RTCPeerConnectionIceEvent) {
		const message=new this.strophe.Strophe.Builder('message', {
			to: `${this.roomName}@conference.prosolen.net/focus`,
		}).c('body').t(btoa(JSON.stringify({ "candidate": event.candidate })))
		console.log(message, 'signaling');
		this.connection.send(message)
	}
	roomOn() {
		const { roomName, userNode, strophe, roomDomain }=window.glagol
		const message=new strophe.Strophe.Builder('pres', {
			to: `${roomName}@${roomDomain}/${userNode}`
		}).c('x', {
			xmlns: 'http://jabber.org/protocol/muc'
		})
		console.info(message);
		this.connection.send(message)
	}
	handlerStopheMessage() {
		this.connection.addHandler(this.handlerMessage)
	}

	handlerMessage=((stanza: string) => {
		console.log(stanza);
		return true
	})
}

export default new ConferenceMaster()
