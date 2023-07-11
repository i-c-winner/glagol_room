import { useDispatch, useStore, useSelector } from "react-redux"
import * as strophe from 'strophe.js'
import Main from "../pages/Main"
import setRegister from "./register"
import api from "../api/api"
import getRandomText from "../plugins/getRandomText"
import { changeXMPPConnected } from "../store/reducers/sliceGlagol"
import conferenceMaster from "./conferenceMaster"
import config from "../config"

setRegister(strophe)
const { Strophe }=window.global
export default function Conference() {
	const userNode=getRandomText(5)
	const userPassword=getRandomText(9)
	const store=useStore()
	const dispatch=useDispatch()
	const { roomName }=useSelector((state: any) => state.room)
	initConference(dispatch, store.getState(), api)
	function initConference(dispatch: any, state: any, { getConnection }: any) {
		getConnection().then((connection: any) => {
			const callback=function(status: number) {
				if (status===Strophe.Status.REGISTER) {
					// fill out the fields
					connection.register.fields.username=userNode;
					connection.register.fields.password=userPassword;
					// calling submit will continue the registration process
					connection.register.submit();
				} else if (status===Strophe.Status.REGISTERED) {
					console.log("registered!");
					// calling login will authenticate the registered JID.
					connection.authenticate();
				} else if (status===Strophe.Status.CONFLICT) {
					console.log("Contact already existed!");
				} else if (status===Strophe.Status.NOTACCEPTABLE) {
					console.log("Registration form not properly filled out.")
				} else if (status===Strophe.Status.REGIFAIL) {
					console.log("The Server does not support In-Band Registration")
				} else if (status===Strophe.Status.CONNECTED) {
					console.log('connected');
					const pc=new RTCPeerConnection({
						iceServers: [
							{ urls: [config.peerServer] }
						]
					})
					dispatch(changeXMPPConnected())

					conferenceMaster.init(connection, pc, roomName)

					// do something after successful authentication
				} else {
					// Do other stuff
				}
			};

			connection.register.connect("prosolen.net", callback);
		})

	}
	return (
		<Main />
	)
}
