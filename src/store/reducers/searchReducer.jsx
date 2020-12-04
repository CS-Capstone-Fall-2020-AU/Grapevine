const initState = {
	loading: false,
	results: [],
	value: '',
	loading2: false,
	results2: [],
	value2: '',
}

const searchReducer = (state = initState, action) => {

	switch (action.type) {
		case 'CLEAN_QUERY':
			return initState
		case 'START_SEARCH':
			return { ...state, loading: true, value: action.query }
		case 'FINISH_SEARCH':
			return { ...state, loading: false, results: action.results }
		case 'UPDATE_SELECTION':
			return { ...state, value: action.selection }

		case 'START_SEARCH2':
			return { ...state, loading2: true, value2: action.query }
		case 'CLEAN_QUERY2':
			return initState
		case 'FINISH_SEARCH2':
			return { ...state, loading2: false, results2: action.results }
		case 'UPDATE_SELECTION2':
			return { ...state, value2: action.selection }
		default:
			return state
	}
}

export default searchReducer;