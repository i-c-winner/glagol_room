const handlerPresence = (stanza: any) => {
  const from = stanza.getAttribute('from').split('/')[1]
  const x = stanza.getElementsByTagName('x')
  console.log(stanza);
  const status = () => {
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
      const messageCreateRoom = new Strophe.Builder('iq', {
        id: node,
        to: `${roomName()}@conference.${domain}`,
        type: 'set'
      }).c('query', {
        xmlns: 'http://jabber.org/protocol/muc#owner'
      }).c('x', {
        xmlns: 'jabber:x:data',
        type: 'submit'
      })
      sendMessage(messageCreateRoom)

      break;
    case 2:
      console.log('this is from moderator');

    default:
      console.log('this is current');
      const messageHaveRoom = new Strophe.Builder('message', { to: 'admin_cs@prosolen.net/in', type: 'chat' })
        .c('x', {
          xmlns: 'jabber:x:conference',
          jid: `roomName@conference.prosolen.net`
        })
        .up()
        .c('nick', { xmlns: 'http://jabber.org/protocol/nick' }).t(displayName).up()
        .c('jimble').t('inviteMessageB64-AUdio-Video-Setup')
      sendMessage(messageHaveRoom)
      break;
  }

  return true
}


export default handlerPresence