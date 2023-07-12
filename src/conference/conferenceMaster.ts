import config from "../config"
import *as strophe from 'strophe.js'
import handlerMessage from "./handlers/handlerMessage"
import handlerIq from "./handlers/handlerIq"
import handlerPresence from "./handlers/handlerPresence"

interface Conference extends Partial<ConferenceMaster> {
	initConference: Promise<any>,
}
const conferenceMaster: Conference={
	initConference: new Promise((resolve: any, reject: any) => {
		//@ts-ignore
		const connection=new strophe.Strophe.Connection(config.xmppUrls)
		connection.addHandler(handlerIq, null, 'iq')
		connection.addHandler(handlerMessage, null, 'message')
		connection.addHandler(handlerPresence, null, 'presence')
		resolve(connection)
	}),


}
export default conferenceMaster

