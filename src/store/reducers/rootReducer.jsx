import searchReducer from './searchReducer';
import reviewsReducer from './reviewsReducer';
import companyReducer from './companyReducer';
import addCompanyReducer from './addCompanyReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	addCompanies: addCompanyReducer,
	products: companyReducer,
	search: searchReducer,
	reviews: reviewsReducer

})

export default rootReducer;