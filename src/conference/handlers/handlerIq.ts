
const handlerIq=(stanza: any) => {
	const type=stanza.getAttribute('type')
	if (type==='result') {
		var invitation={
			action: "INVITATION",
			localTracks: { audio: true, video: true }
		}
		const inviteMessageB64=window.btoa(JSON.stringify(invitation))
		// 	$msg({to: 'admin_cs@prosolen.net/in', type: 'chat'})
		// 	.c('x',{xmlns:'jabber:x:conference',
		// 			jid:'firstRoom@conference.prosolen.net'})
		// 	.up()
		// 	.c('nick', { xmlns:'http://jabber.org/protocol/nick' }, "DisplayNick")
		// 	.c('jimble').t('inviteMessageB64-AUdio-Video-Setup')
		// 	как выглядит:
		// <message to='admin_cs@prosolen.net/in'
		// 	 type='chat'
		// 	 xmlns='jabber:client'>
		// 	<x xmlns='jabber:x:conference'
		// 		 jid='firstRoom@conference.prosolen.net'/>
		// 	<nick xmlns='http://jabber.org/protocol/nick'>
		// 		 DisplayNick
		// 	</nick>
		// 	<jimble>
		// 		 inviteMessageB64-AUdio-Video-Setup
		// 	</jimble>
		// </message>

		const message=new Strophe.Builder('message', { to: 'admin_cs@prosolen.net/in', type: 'chat' })
			.c('x', {
				xmlns: 'jabber:x:conference',
				jid: connection.jid
			}).up()
			.c('nick', { xmlns: 'http://jabber.org/protocol/nick' }).t(displayName()).up()
			.c('jimble').t(inviteMessageB64)
		sendMessage(message)
	}
}



export default handlerIq