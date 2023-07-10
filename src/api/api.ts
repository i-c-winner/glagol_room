import config from "../config"
const api={
	getConnection: () => {
		return new Promise((resolve, reject) => {
			const { Strophe }=window.global
			//@ts-ignore
			resolve(new Strophe.Connection(config.xmppUrls))
		})
	},
	send: (send: any) => send
}

export default api