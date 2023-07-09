import { configureStore } from "@reduxjs/toolkit";
import sliceGlagol from "./reducers/sliceGlagol";
import api from "../api/api";

const store=configureStore({
	reducer: {
		Glagol: sliceGlagol
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			// serializableCheck: false,
			thunk: {
				extraArgument: {
					getConnection: api.getConnection
				}
			}
		})

})

export default store