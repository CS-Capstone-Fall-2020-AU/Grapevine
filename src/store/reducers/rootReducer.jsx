import searchReducer from './searchReducer';
import reviewsReducer from './reviewsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	search: searchReducer,
	reviews: reviewsReducer

})

export default rootReducer;