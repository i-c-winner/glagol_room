function handlerIq(params: any) {
	const { connection, displayName, Strophe, domain, roomName, node }=params
	const callback=(stanza: any) => {
		const type=stanza.getAttribute('type')
		if (type==='result') {
			const message=new Strophe.Builder('message', { to: 'admin_cs@prosolen.net/in', type: 'chat' })
				.c('x', {
					xmlns: 'jabber:x:conference',
					jid: `roomName@conference.prosolen.net`
				})
				.up()
				.c('nick', { xmlns: 'http://jabber.org/protocol/nick' }, displayName)
				.c('jimble').t('inviteMessageB64-AUdio-Video-Setup')
			debugger
			connection.send(message)
		}

	}
	connection.addHandler(callback, null, 'iq')
}

export default handlerIq