import conferenceMaster from "../conferenceMaster";
const handlerPresence=(stanza: any) => {
	if (this!==undefined) console.log(this.connection)
	const Strophe=conferenceMaster.getStrophe()
	console.log(this);
	debugger
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
			const message=new Strophe.Builder('iq', {
				id: this.node,
				to: `${this.roomName}@${this.domain}`,
				type: 'set'
			}).c('query', {
				xmlns: 'http://jabber.org/protocol/muc#owner'
			}).c('x', {
				xmlns: 'jabber:x:data',
				type: 'submit'
			})
			this.connection.send(message)

			break;
		case 2:
			console.log('this is from moderator');

		default:
			if (this!==undefined) {
				if (from===this.undefined) {
					console.log('this is current');
				}
			}

			break;
	}

	return true
}
export default handlerPresence