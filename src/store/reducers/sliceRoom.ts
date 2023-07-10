import { createSlice } from "@reduxjs/toolkit";
import getRandomText from "../../plugins/getRandomText";
const sliceRoom=createSlice({
	name: 'sliceRoom',
	initialState: {
		nameRoom: getRandomText(5)
	},
	reducers: {
		changeNameRoom: ((state: any, action: Payload<string>) => {
			state.nameRoom=action.payload
		})
	}
})

export const { changeNameRoom }=sliceRoom.actions
export default sliceRoom.reducer