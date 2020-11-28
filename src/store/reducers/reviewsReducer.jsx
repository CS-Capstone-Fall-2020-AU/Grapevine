import {
	FETCH_REVIEWS_BEGIN,
	FETCH_REVIEWS_SUCCESS,
	POST_AGREE_VOTES_BEGIN,
	POST_AGREE_VOTES_SUCCESS,
	POST_AGREE_VOTES_FAILURE,
} from "../actions/companyActions";

const initialState = {
	items: [],
	loading: false,
	error: null
};

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REVIEWS_BEGIN:
			// Mark the state as "loading" so we can show a spinner or something
			// Also, reset any errors. We're starting fresh.
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_REVIEWS_SUCCESS:
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			return {
				...state,
				loading: false,
				items: action.payload
			};
		case POST_AGREE_VOTES_BEGIN:
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			return {
				...state,
				//loading: true,
				error: null
			};
		case POST_AGREE_VOTES_SUCCESS:
			console.log("incrementing agree votes");
			return {
				...state,
			  };
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			// return {
			// 	...state,
			// 	loading: false,
			// 	items: action.payload
			// };
		case POST_AGREE_VOTES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};


		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}

export default reviewsReducer;