function handlerPresence(params: any) {
	const { Strophe, node, domain, connection, roomName }=params
	const callback=(stanza: any) => {
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
				const message=new Strophe.Builder('iq', {
					id: node,
					to: `${roomName()}@conference.${domain}/${node}`,
					type: 'set'
				}).c('query', {
					xmlns: 'http://jabber.org/protocol/muc#owner'
				}).c('x', {
					xmlns: 'jabber:x:data',
					type: 'submit'
				})
				connection.send(message)

				break;
			case 2:
				console.log('this is from moderator');

			default:
				console.log('this is current');

				break;
		}

		return true
	}
	connection.addHandler(callback, null, 'presence')
}

export default handlerPresence