import config from "../config"
import *as strophe from 'strophe.js'
import handlerMessage from "./handlers/handlerMessage"
import handlerIq from "./handlers/handlerIq"
import { getDomain, getNode } from "./functions/function"
import setRegister from "./register"

const { Strophe }=window.global
interface Conference extends Partial<ConferenceMaster> {
	initConference: Promise<any>,
	doSignalingCandidate: (sigal: string) => void,
	addHandlers: (connection: any) => void,
	roomOn: () => void
}
const conferenceMaster: Conference={
	initConference: new Promise((resolve: any, reject: any) => {
		setRegister(strophe)
		//@ts-ignore
		const connection=new strophe.Strophe.Connection(config.xmppUrls)
		resolve(connection)
	}),
	addHandlers: function(connection) {
		const handlerPresence=(stanza: any) => {
			debugger
			const from=stanza.getAttribute('from').split('/')[1]
			const x=stanza.getElementsByTagName('x')
			console.log(stanza);
			const status=() => {
				try {
					return x[1].getElementsByTagName('status')
				} catch {
					console.log('error');
					return undefined
				}
			}
			switch (status().length) {
				case 3:
					console.log('creater Room');
					const messageCreateRoom=new Strophe.Builder('iq', {
						id: getNode(this.jid),
						to: `${this.roomName}@conference.${getDomain(this.jid)}`,
						type: 'set'
					}).c('query', {
						xmlns: 'http://jabber.org/protocol/muc#owner'
					}).c('x', {
						xmlns: 'jabber:x:data',
						type: 'submit'
					})
					this.conference.send(messageCreateRoom)

					break;
				case 2:
					console.log('this is from moderator');

				default:
					console.log('this is current');
					const messageHaveRoom=new Strophe.Builder('message', { to: 'admin_cs@prosolen.net/in', type: 'chat' })
						.c('x', {
							xmlns: 'jabber:x:conference',
							jid: `roomName@conference.prosolen.net`
						})
						.up()
						.c('nick', { xmlns: 'http://jabber.org/protocol/nick' }).t(this.displayName||'unknown user').up()
						.c('jimble').t('inviteMessageB64-AUdio-Video-Setup')
					this.conference.send(messageHaveRoom)
					break;
			}
			return true
		}

		const handlerIq=(stanza: any) => {
			const type=stanza.getAttribute('type')
			if (type==='result') {
				var invitation={
					action: "INVITATION",
					localTracks: { audio: true, video: true }
				}
				const inviteMessageB64=window.btoa(JSON.stringify(invitation))


				const message=new Strophe.Builder('message', { to: 'admin_cs@prosolen.net/in', type: 'chat' })
					.c('x', {
						xmlns: 'jabber:x:conference',
						jid: connection.jid
					}).up()
					.c('nick', { xmlns: 'http://jabber.org/protocol/nick' }).t(this.displayName||'unknown user').up()
					.c('jimble').t(inviteMessageB64)
				this.conference.send(message)
			}
		}


		connection.addHandler(handlerIq, null, 'iq')
		connection.addHandler(handlerMessage, null, 'message')
		connection.addHandler(handlerPresence, null, 'presence')
	},

	doSignalingCandidate: function(signal: any) {
		if (signal) {
			const message=new Strophe.Builder('message', {
				to: `${this.roomName}@conference.${getDomain(this.jid)}/focus`,
				type: 'chat'
			}).c('body').t(signal)
			this.conference.send(message);
			console.log('candidateB64 sent')
		}
		else { console.log('candidateB64 is empty'); }
	},
	roomOn: function() {
		const message=new Strophe.Builder('presence', {
			to: `${this.roomName}@conference.prosolen.net/${this.id})`
		}).c('x', {
			xmlns: 'http://jabber.org/protocol/muc'
		})
		this.conference.send(message)

	}

}
export default conferenceMaster

