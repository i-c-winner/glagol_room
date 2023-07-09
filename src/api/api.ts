import * as strophe from 'strophe.js'
import setRegister from "../conference/register"
const api={
	getConnection: () => {
		const connect=new Promise((resolve, reject) => {
			let a=false
			//@ts-ignore
			const connect=new strophe.Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind"')
			setRegister(strophe)
			resolve(connect)
		})
		connect.then((connection: any) => {
			const callbackRegistry=(status: any) => {
				if (status===strophe.Strophe.Status.REGISTER) {
					// fill out the fields
					connection.register.fields.username='sdsd';
					connection.register.fields.password='ssdfdf';
					// calling submit will continue the registration process
					connection.register.submit();
				} else if (status===strophe.Strophe.Status.REGISTERED) {
					console.info("registered!");
					// calling login will authenticate the registered JID.
					connection.authenticate();
				} else if (status===strophe.Strophe.Status.CONFLICT) {
					connection.connect("name@prosolen.net", 'pas', () => {
					})
					console.info("Contact already existed!");
				} else if (status===strophe.Strophe.Status.NOTACCEPTABLE) {
					console.info("Registration form not properly filled out.")
				} else if (status===strophe.Strophe.Status.REGIFAIL) {
					console.info("The Server does not support In-Band Registration")
				} else if (status===strophe.Strophe.Status.CONNECTED) {
					return true
					console.info('connected OK');
				}
			}
			connection.register.connect("prosolen.net", callbackRegistry)
		})

	}
}

export default api