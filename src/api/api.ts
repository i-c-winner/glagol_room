import config from "../config"
const api={
	getConnection: () => {
		return new Promise((resolve, reject) => {
			const { Strophe }=window.global
			//@ts-ignore
			resolve(new Strophe.Connection(config.xmppUrls))
		})
	},
}

export default api