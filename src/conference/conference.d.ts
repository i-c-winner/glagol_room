export {}

type Glagol={
	connection: Promise,
	peerConnection: RTCPeerConnection,
	strophe: any,
	domain: string,
	userNode: string,
	roomDomain: string
}
declare global {
	var glagol: Partial<Glagol>
}

