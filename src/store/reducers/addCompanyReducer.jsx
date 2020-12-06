import {
	POST_COMPANIES_BEGIN,
	POST_COMPANIES_SUCCESS,
	POST_COMPANIES_FAILURE
  } from "../actions/companyActions";

  const initialState = {
	items: [],
	loading: false,
	error: null
  };

  export default function postCompanyReducer(
	state = initialState,
	action
  ) {
	switch (action.type) {
	  case POST_COMPANIES_BEGIN:
		// Mark the state as "loading" so we can show a spinner or something
		// Also, reset any errors. We're starting fresh.
		
		return {
		  ...state,
		  loading: true,
		  error: null
		};
  
	  case POST_COMPANIES_SUCCESS:
		// All done: set loading "false".
		// Also, replace the items with the ones from the server
		return {
		  ...state,
		  loading: false,
		  //items: action.payload.products
		};
  
	  case POST_COMPANIES_FAILURE:

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
  