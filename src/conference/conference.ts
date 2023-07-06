///<reference path='./conference.d.ts'/>
import { client, xml, jid } from '@xmpp/client'
import enablingHandlersPeerConnection from "./enablingHandlersPeerConnection"

const XMPPClient=new Promise((resolve, reject) => {
	resolve(client({
		service: 'https://xmpp.prosolen.net:5281/http-bind'
	}))
})
const peerConnection=new RTCPeerConnection({
	iceServers: [{
		urls: 'stun:stun.l.google.com:19302'
	}]
})
enablingHandlersPeerConnection(peerConnection)
window.glagol={
	XMPPClient,
	peerConnection,
}