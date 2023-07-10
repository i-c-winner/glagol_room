import { configureStore } from "@reduxjs/toolkit";
import sliceGlagol from "./reducers/sliceGlagol";
import sliceUser from "./reducers/sliceUser";
import sliceRoom from "./reducers/sliceRoom";
import api from "../api/api";

const store=configureStore({
	reducer: {
		glagol: sliceGlagol,
		room: sliceRoom,
		user: sliceUser
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			// serializableCheck: false,
			thunk: {
				extraArgument: {
					getConnection: api.getConnection,
				}
			}
		})

})

export default store