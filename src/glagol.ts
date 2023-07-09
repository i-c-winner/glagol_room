import { setConnection } from "./store/reducers/sliceGlagol";
function glagol() {
	return ((dispatch: any, state: any, { getConnection }: any) => {
		getConnection().then((params: any) => {
			const { connect, strophe }=params
			const callbackRegistry=(status: any) => {
				console.log(status);
				if (status===strophe.Strophe.Status.REGISTER) {
					// fill out the fields
					connect.register.fields.username='dfdffd';
					connect.register.fields.password='eerer';
					// calling submit will continue the registration process
					connect.register.submit();
				} else if (status===strophe.Strophe.Status.REGISTERED) {
					console.info("registered!");
					// calling login will authenticate the registered JID.
					connect.authenticate();
				} else if (status===strophe.Strophe.Status.CONFLICT) {
					connect.connect("name@prosolen.net", 'pas', () => {
					})
					console.info("Contact already existed!");
				} else if (status===strophe.Strophe.Status.NOTACCEPTABLE) {
					console.info("Registration form not properly filled out.")
				} else if (status===strophe.Strophe.Status.REGIFAIL) {
					console.info("The Server does not support In-Band Registration")
				} else if (status===strophe.Strophe.Status.CONNECTED) {
					console.info('connected OK');
				}
			}
			connect.register.connect("prosolen.net", callbackRegistry)
			dispatch(setConnection(connect))
		})
	})
}
export default glagol