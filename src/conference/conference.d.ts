export {}

type Glaol={
	connection: Promise,
	peerConnection: RTCPeerConnection,
	strophe: any,
	domain: string,
	userNode: string
}
declare global {
	var glagol: Partial<Glagol>
}

