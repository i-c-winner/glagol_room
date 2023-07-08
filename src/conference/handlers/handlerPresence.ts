import { connect } from "http2"

const handlerPresence=(stanza: any) => {
	const from=stanza.getAttribute('from').split('/')[1]
	const x=stanza.getElementsByTagName('x')

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
			const { connection, strophe, userNode, roomName, roomDomain }=window.glagol
			const message=new strophe.Strophe.Builder('iq', {
				id: userNode,
				to: `${roomName}@${roomDomain}`,
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
			if (from===window.glagol.userNode) {
				console.log('this is current');
			}
			break;
	}

	return true
}
export default handlerPresence