export {}
declare global {
	var glagol: {
		XMPPClient: Promise,
		peerConnection: RTCPeerConnection,
		stream: Promise<unknown>
	}
}