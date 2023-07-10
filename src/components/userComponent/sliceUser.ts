import { createSlice } from "@reduxjs/toolkit";
import getRandomText from "../../plugins/getRandomText";


const sliceUser=createSlice({
	name: 'user',
	initialState: {
		userNode: getRandomText(5),
		password: getRandomText(8),
		role: '',
		displayName: ''
	},
	reducers: {
		changeDisplayNode: ((state: any, action: Payload<string>) => {
			state.displayName=action.payload
		}),
		changeUserNode: ((state: any, action: Payload<string>) => {
			state.userNode=action.payload
		})
	}
}
)

export const { changeDisplayNode }=sliceUser.actions
export default sliceUser