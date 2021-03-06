import {
	FETCH_LOGINS_BEGIN,
	FETCH_LOGINS_SUCCESS,
	POST_SIGNUP_BEGIN,
	POST_SIGNUP_SUCCESS,
	POST_SIGNUP_FAILURE,

} from "../actions/loginActions";

const initialState = {
	items: [],
	loading: false,
	error: null,
	logins: [],
	loginsLoading: true,
};

export default function productReducer(
	state = initialState,
	action
) {
	switch (action.type) {

		case FETCH_LOGINS_BEGIN:
			// Mark the state as "loading" so we can show a spinner or something
			// Also, reset any errors. We're starting fresh.
			return {
				...state,
				loading: true,
				loginsLoading: true,
				error: null
			};

		case FETCH_LOGINS_SUCCESS:
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			console.log("crt", action.payload);
			return {
				...state,
				loading: false,
				loginsLoading: false,
				logins: action.payload
			};

		case POST_SIGNUP_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case POST_SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload,
				error: null

			};
		case POST_SIGNUP_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};
		// return {
		// 	...state,
		// 	loading: false,
		// 	items: action.payload
		// 	// All done: set loading "false".
		// 	// Also, replace the items with the ones from the server
		// 	return {
		// 	  ...state,
		// 	  loading: false,
		// 	  items: action.payload.products
		// 	};



		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}
