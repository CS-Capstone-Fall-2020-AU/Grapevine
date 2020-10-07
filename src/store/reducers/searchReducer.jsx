const initState = {
	loading: false,
	results: [4, 3, 2],
	value: '',
  }

const searchReducer = (state=initState, action) => {

	switch (action.type) {
		case 'CLEAN_QUERY':
		  return initState
		case 'START_SEARCH':
		  return { ...state, loading: true, value: action.query }
		case 'FINISH_SEARCH':
		  return { ...state, loading: false, results: action.results }
		case 'UPDATE_SELECTION':
		  return { ...state, value: action.selection }
	
		default:
		  return state
	  } 
}

export default searchReducer;