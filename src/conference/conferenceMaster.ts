import handlerPresence from "./handlers/handlerPresence"
import handlerIq from "./handlers/handlerIq"
import handlerMessage from "./handlers/handkerMessage"
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
	static instance: any
	displayName: string

	constructor() {
		if (ConferenceMaster.instance) {
			return ConferenceMaster.instance
		}
		this.localStream=null
		ConferenceMaster.instance=this
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

	_enablingHandlerPC() {
		this.peerConnection.ontrack=(event: any) => {
			console.info(event, 'ADD TRACK EVENT')
		}
		this.peerConnection.onicecandidate=(event: RTCPeerConnectionIceEvent) => {
			if (event.candidate) {
				this.doSignalingCandidate(event)
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
			to: `${this.roomName}@conference.prosolen.net/${this.node}`
		}).c('x', {
			xmlns: 'http://jabber.org/protocol/muc'
		})
		this.connection.send(message)

	}
	handlerStopheMessage=() => {
		handlerPresence({
			Strophe: this.Strophe,
			connection: this.connection,
			node: this.node,
			domain: this.domain,
			roomName: this.getRoomName
		})
		handlerIq({
			Strophe: this.Strophe,
			connection: this.connection,
			node: this.node,
			domain: this.domain,
			roomName: this.getRoomName,
			displayName: this.getDisplayName
		})
		this.connection.addHandler(handlerMessage, null, 'message')
	}


	handlerMessage=((stanza: string) => {
		return true
	})
	setRoomName(room: string) {
		this.roomName=room
	}

	setStream=(stream: MediaStream) => {
		this.localStream=stream
	}
	setDisplayName(name: string) {
		debugger
		this.displayName=name
	}
	getDisplayName=() => {
		return this.displayName
	}
	getConnection=() => {
		return this.connection
	}
	getPeerConnection=() => {
		return this.peerConnection
	}
	getStrophe=() => {
		return this.Strophe
	}
	getRoomName=() => {
		return this.roomName
	}
}

export default new ConferenceMaster()
