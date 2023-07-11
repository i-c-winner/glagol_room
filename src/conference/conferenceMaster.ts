import handlerPresence from "./handlers/handlerPresence"
import handlerIq from "./handlers/handlerIq"
class ConferenceMaster {
	connection: any
	peerConnection: any
	$msg: (attrs?: Record<string, string>|undefined) => Strophe.Builder
	$iq: (attrs?: Record<string, string>|undefined) => Strophe.Builder
	$pres: (attrs?: Record<string, string>|undefined) => Strophe.Builder
	Strophe: typeof Strophe
	node: string
	resorce: string
	full: string
	domain: string
	roomName: string
	localStream: null|MediaStream

	constructor() {
		this.localStream=null
	}

	init(connection: any, pc: any) {
		this.connection=connection
		this.peerConnection=pc
		this._enablingHandlerPC()
		this.Strophe=window.global.Strophe
		this.$msg=window.global.$msg
		this.$iq=window.global.$iq
		this.$pres=window.global.$pres
		this.node=this.Strophe.getNodeFromJid(this.connection.jid)
		this.full=this.Strophe.getBareJidFromJid(this.connection.jid)
		this.resorce=this.Strophe.getResourceFromJid(this.connection.jid)
		this.domain=this.Strophe.getDomainFromJid(this.connection.jid)
		this.handlerStopheMessage()
	}

	setStream(stream: MediaStream) {
		this.localStream=stream
	}
	_enablingHandlerPC() {
		this.peerConnection.ontrack=(event: any) => {
			console.info(event, 'ADD TRACK EVENT')
		}
		this.peerConnection.onicecandidate=(event: RTCPeerConnectionIceEvent) => {
			if (event.candidate) {
				// conferenceMaster.doSignalingCandidate(event)
			}
		}
	}
	codingMessage(message: unknown) {
		return encodeURI(JSON.stringify(message))
	}


	doSignalingCandidate(event: RTCPeerConnectionIceEvent) {
		const message=new this.Strophe.Builder('message', {
			to: `${this.roomName}@conference.prosolen.net/focus`,
			type: 'chat'
		}).c('body').t(btoa(JSON.stringify({ "candidate": event.candidate })))
		this.connection.send(message)
	}
	roomOn() {
		const message=new this.Strophe.Builder('presence', {
			to: `${this.roomName}@${this.domain}/${this.node}`
		}).c('x', {
			xmlns: 'http://jabber.org/protocol/muc'
		})
		this.connection.send(message)

	}
	handlerStopheMessage=() => {
		this.connection.addHandler(handlerPresence, null, 'presence')
		this.connection.addHandler(handlerIq, null, 'iq')
	}


	handlerMessage=((stanza: string) => {
		return true
	})

	getConnection() {
		return this.connection
	}
	getPeerConnection() {
		return this.peerConnection
	}
	getStrophe() {
		return this.Strophe
	}
}

export default new ConferenceMaster()
