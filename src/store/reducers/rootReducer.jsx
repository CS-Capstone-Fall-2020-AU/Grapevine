import searchReducer from './searchReducer';
import reviewsReducer from './reviewsReducer';
import companyReducer from './companyReducer';
import addCompanyReducer from './addCompanyReducer';
import loginReducer from './loginReducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//local storage

const persistConfig = {
	key:'root',
	storage,
	whitelist: ['users'],
};

const rootReducer = combineReducers({

	addCompanies: addCompanyReducer,
	products: companyReducer,
	search: searchReducer,
	reviews: reviewsReducer,
	users: loginReducer,

})

export default persistReducer(persistConfig, rootReducer); 