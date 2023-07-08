import { configureStore } from "@reduxjs/toolkit";
import sliceGlagol from "./reducers/sliceGlagol";

const store=configureStore({
	reducer: {
		sliceGlagol
	}
})

export default store