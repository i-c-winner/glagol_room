///<reference path='./conference.d.ts'/>
import * as strophe from 'strophe.js';
import enablingHandlersPeerConnection from "./enablingHandlersPeerConnection"

//@ts-ignore
const connection=new strophe.Strophe.Connection("https://xmpp.prosolen.net:5281/http-bind")
