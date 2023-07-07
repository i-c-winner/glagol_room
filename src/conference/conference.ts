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

function getMedia() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream: MediaStream) => {
		mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
			peerConnection.addTrack(track)
		})
		peerConnection.createOffer().then((offer: RTCOfferAnswerOptions) => {
			peerConnection.setLocalDescription(offer)
		})
	})
}

connection.then((connection: any) => {
	conferenceMaster.init({ peerConnection, strophe, connection })
	const callbackRegistry=(status: any) => {
		if (status===strophe.Strophe.Status.REGISTER) {
			// fill out the fields
			connection.register.fields.username='name';
			connection.register.fields.password='pas';
			// calling submit will continue the registration process
			connection.register.submit();
		} else if (status===strophe.Strophe.Status.REGISTERED) {
			console.info("registered!");
			// calling login will authenticate the registered JID.
			connection.authenticate();
		} else if (status===strophe.Strophe.Status.CONFLICT) {
			connection.connect("name@prosolen.net", 'pas', () => {
				getMedia()
			})
			console.info("Contact already existed!");
		} else if (status===strophe.Strophe.Status.NOTACCEPTABLE) {
			console.info("Registration form not properly filled out.")
		} else if (status===strophe.Strophe.Status.REGIFAIL) {
			console.info("The Server does not support In-Band Registration")
		} else if (status===strophe.Strophe.Status.CONNECTED) {
			console.info('connected OK');
			getMedia()
		}
	}
	connection.register.connect("@prosolen.net", callbackRegistry)

})

enablingHandlersPeerConnection(peerConnection)
window.glagol={
	connection,
	peerConnection
}