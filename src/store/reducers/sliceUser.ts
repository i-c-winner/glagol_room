import { createSlice } from "@reduxjs/toolkit";
import getRandomText from "../../plugins/getRandomText";


const sliceUser=createSlice({
	name: 'sliceUser',
	initialState: {
		userNode: getRandomText(5),
		password: getRandomText(8),
		role: '',
		displayName: 'default Name'
	},
	reducers: {
		changeDisplayName: ((state: any, action: Payload<string>) => {
			state.displayName=action.payload
		}),
		changeUserNode: ((state: any, action: Payload<string>) => {
			state.userNode=action.payload
		})
	}
}
)

export const { changeDisplayName }=sliceUser.actions
export default sliceUser.reducer