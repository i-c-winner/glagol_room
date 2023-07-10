import { createSlice } from "@reduxjs/toolkit";

const sliceGlagol=createSlice({
	name: 'sliceGlagol',
	initialState: {
		XMPPConnected: false,
		send: null,
		peerConnection: null,
		connection: null
	},
	reducers: {
		changeXMPPConnected: ((state) => {
			state.XMPPConnected=true
		}),
		changeSend: ((state, action) => {
			state.send=action.payload
		}),
		setPeerConnection: ((state, action) => {
			state.peerConnection=action.payload
		}),
		setConnection: ((state, action) => {
			state.connection=action.payload
		})
	},
})


export const { changeXMPPConnected, changeSend, setPeerConnection, setConnection }=sliceGlagol.actions
export default sliceGlagol.reducer