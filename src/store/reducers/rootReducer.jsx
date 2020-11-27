import searchReducer from './searchReducer';
import reviewsReducer from './reviewsReducer';
import companyReducer from './companyReducer';
import addCompanyReducer from './addCompanyReducer';
import loginReducer from './loginReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({

	addCompanies: addCompanyReducer,
	products: companyReducer,
	search: searchReducer,
	reviews: reviewsReducer,
	users: loginReducer,

})

export default rootReducer; 