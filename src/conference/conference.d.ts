export {}

type Glagol={
	connection: Promise,
	peerConnection: RTCPeerConnection,
	strophe: any,
	domain: string,
	userNode: string,
	roomDomain: string,
	roomName: string
}
declare global {
	var glagol: Partial<Glagol>
}

