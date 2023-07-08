import handlerPresence from "./handlers/handlerPresence"
import handlerIq from "./handlers/handlerIq"
class ConferenceMaster {
	peerConnection: RTCPeerConnection
	strophe: any
	connection: any
	roomName: string
	userNode: string|undefined
	roomDomain: string|undefined

	init(params: { peerConnection: RTCPeerConnection, strophe: any, connection: any }) {
		this.peerConnection=params.peerConnection
		this.strophe=params.strophe
		this.connection=params.connection
		this.roomName=window.glagol.roomName??'testroom'
		this.userNode=window.glagol.userNode
		this.roomDomain=window.glagol.roomDomain
	}
	codingMessage(message: unknown) {
		return encodeURI(JSON.stringify(message))
	}

	doSignalingCandidate(event: RTCPeerConnectionIceEvent) {
		const message=new this.strophe.Strophe.Builder('message', {
			to: `${this.roomName}@conference.prosolen.net/focus`,
			type: 'chat'
		}).c('body').t(btoa(JSON.stringify({ "candidate": event.candidate })))
		this.connection.send(message)
	}
	roomOn() {
		const { roomName, userNode, strophe, roomDomain }=window.glagol
		const message=new strophe.Strophe.Builder('presence', {
			to: `${roomName}@${roomDomain}/${userNode}`
		}).c('x', {
			xmlns: 'http://jabber.org/protocol/muc'
		})
		this.connection.send(message)
	}
	handlerStopheMessage() {
		this.connection.addHandler(handlerPresence, null, 'presence')
		this.connection.addHandler(this.handlerMessage, null, 'message')
		this.connection.addHandler(handlerIq, null, 'iq')
	}


	handlerMessage=((stanza: string) => {
		return true
	})
}

export default new ConferenceMaster()
