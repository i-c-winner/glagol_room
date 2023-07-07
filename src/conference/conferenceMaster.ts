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

	doSignaling() {
		// var pres=$pres({ to: this.roomName+'@conference.prosolen.net/'+'ddfdfdf' }).c("x", { xmlns: XMPP.NS_MUC })
		const locDescription=this.codingMessage(this.peerConnection.localDescription)
		const message=new this.strophe.Strophe.Builder('message', {
			to: `${this.roomName}@conference.prosolen.net/focus`,
			type: 'chat',
		}).c('body').t(locDescription)
		console.log(message);
		this.connection.send(message)
	}
	roomOn() {
		console.info(this.roomName, this.connection);
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
