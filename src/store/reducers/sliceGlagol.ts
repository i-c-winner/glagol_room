import { createSlice } from "@reduxjs/toolkit";

const sliceGlagol=createSlice({
	name: 'sliceGlagol',
	initialState: {
		connecting: null
	},
	reducers: {
		setConnection: ((state, action) => {
			state.connecting=action.payload
		})
	}
})
export const { setConnection }=sliceGlagol.actions
export default sliceGlagol.reducer