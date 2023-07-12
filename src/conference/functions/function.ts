function getDomain(jid: string|undefined) {
	if (jid!==undefined) {
		return window.global.Strophe.getDomainFromJid(jid)
	}
	return undefined
}
function getNode(jid: string|undefined) {
	if (jid!==undefined) {
		return window.global.Strophe.getNodeFromJid
	}
}
export { getDomain, getNode }