///<reference path='./conference.d.ts'/>
import * as strophe from 'strophe.js';
import enablingHandlersPeerConnection from "./enablingHandlersPeerConnection"
import setRegister from './register'
import conferenceMaster from "./conferenceMaster";

setRegister(strophe)

const connection=new Promise((resolve, reject) => {
	//@ts-ignore
	resolve(new strophe.Strophe.Connection("https://xmpp.prosolen.net:5281/http-bind"))
})
const peerConnection=new RTCPeerConnection({
	iceServers: [{
		urls: 'stun:stun.l.google.com:19302'
	}]
})




enablingHandlersPeerConnection(peerConnection)
window.glagol={
	connection,
	peerConnection,
	strophe: strophe
}