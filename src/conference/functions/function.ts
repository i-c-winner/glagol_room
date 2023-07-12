function getDomain(jid: string|undefined) {
	if (jid!==undefined) {
		return window.global.Strophe.getDomainFromJid(jid)
	}
	return undefined
}

export { getDomain }