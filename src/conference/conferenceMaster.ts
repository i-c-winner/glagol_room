import config from "../config"
import *as strophe from 'strophe.js'
import handlerMessage from "./handlers/handlerMessage"
import handlerIq from "./handlers/handlerIq"
import handlerPresence from "./handlers/handlerPresence"
import { getDomain } from "./functions/function"
import setRegister from "./register"

interface Conference extends Partial<ConferenceMaster> {
	initConference: Promise<any>,
	doSignalingCandidate: (sigal: string) => void,
	addHandlers: (connection: any) => void
}
const conferenceMaster: Conference={
	initConference: new Promise((resolve: any, reject: any) => {
		setRegister(strophe)
		//@ts-ignore
		const connection=new strophe.Strophe.Connection(config.xmppUrls)
		resolve(connection)
	}),
	addHandlers(connection) {
		connection.addHandler(handlerIq, null, 'iq')
		connection.addHandler(handlerMessage, null, 'message')
		connection.addHandler(handlerPresence, null, 'presence')
	},
	doSignalingCandidate: function(signal) {
		if (signal) {
			const { $msg }=window.global
			const messageCandi=$msg({ to: `${this.roomName}@${getDomain(this.jid)}/focus`, type: 'chat' }).c('body').t(signal)
			this.conference.send(messageCandi);
			console.log('candidateB64 sent')
		}
		else { console.log('candidateB64 is empty'); }
	}

}
export default conferenceMaster

