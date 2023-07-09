import { createSlice } from "@reduxjs/toolkit";

const sliceGlagol=createSlice({
	name: 'sliceGlagol',
	initialState: {
		XMPPConnected: false,
		send: undefined,
		peerConnection: undefined
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
		})
	},
})


export const { changeXMPPConnected, changeSend, setPeerConnection }=sliceGlagol.actions
export default sliceGlagol.reducer