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
		this.connection.send(message)
	}
	// doSignaling=(...args: [...any[]]) => {
	// 	const message=new Strophe.Builder('message', {
	// 		to: 'admin_cs@prosolen.net',
	// 		type: 'chat'
	// 	}).c('body').t(args[0][0])
	// 	this.connection.send(message)
	// }
}

export default new ConferenceMaster()