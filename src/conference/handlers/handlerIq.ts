function handlerIq(params: any) {
	const { connection, displayName, Strophe, domain, roomName, node }=params
	const callback=() => {
		console.log(params);
		console.info(params.displayName());
	}
	connection.addHandler(callback, null, 'iq')
}

export default handlerIq