class ConferenceMaster {
	peerConnection: RTCPeerConnection
	strophe: any
	connection: any

	init(params: { peerConnection: RTCPeerConnection, strophe: any, connection: any }) {
		this.peerConnection=params.peerConnection
		this.strophe=params.strophe
		this.connection=params.connection
	}
	codingMessage(message: unknown) {
		return encodeURI(JSON.stringify(message))
	}

	doSignaling() {
		const locDescription=this.codingMessage(this.peerConnection.localDescription)
		const message=new this.strophe.Strophe.Builder('message', {
			to: 'admin_cs@prosolen.net',
			type: 'chat'
		}).c('body').t(locDescription)
		console.info(message);
		this.connection.send(message)
	}

}

export default new ConferenceMaster()
