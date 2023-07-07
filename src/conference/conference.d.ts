export {}

type Glaol={
	connection: Promise,
	peerConnection: RTCPeerConnection,
	strophe: any,
	domain: string
}
declare global {
	var glagol: Partial<Glagol>
}

