import _ from 'lodash';

let companyResults;
let co;
let innerProduct;
let products = [];
function getProducts() {
	fetch("http://localhost:4000/companies")
	  .then(handleErrors)
	  .then(res => res.json())
	  .then(_ = (res) => {
		companyResults = Object.values(res.data);
		
		for (co = 0; co < companyResults.length + 1; co++){
			if (companyResults && companyResults[co] && companyResults[co].companyName){
			innerProduct = {
				companyName: companyResults[co].companyName,
				numOfRatings: companyResults[co].numOfRatings,
				overallRatingGrade: companyResults[co].overallRatingGrade,
				imgLogoUrl: companyResults[co].imgLogoUrl
			}
			if (products.length < companyResults.length) {
				products.push(innerProduct);
			  }
		}
		else{
			console.log();
		}
	}
		
  })
}

  function fakeGetProducts() {
	getProducts()
	return new Promise(resolve => {
	  // Resolve after a timeout so we can see the loading indicator
	  setTimeout(
		() =>
		  resolve({
			products
		  }),
		300
	  );
	});
  }
  
  export function fetchProducts() {
	return dispatch => {
	  dispatch(fetchProductsBegin());
	  return fakeGetProducts()
		.then(json => {
		  dispatch(fetchProductsSuccess(json.products));
		  return json.products;
		})
		.catch(error =>
		  dispatch(fetchProductsFailure(error))
		);
	};
  }

  export function fetchReviews() {
	return dispatch => {
	  dispatch(fetchProductsBegin());
	  return fakeGetProducts()
		.then(json => {
		  dispatch(fetchProductsSuccess(json.products));
		  return json.products;
		})
		.catch(error =>
		  dispatch(fetchProductsFailure(error))
		);
	};
  }
//-----------------------------------------------------------------------------------------------

function postProducts(argCO, argLO, argEM) {
	fetch('http://localhost:4000/companies', {
		method: 'POST',
		body: JSON.stringify({
			companyName: argCO,
			imageLogoUrl: argLO,
			numOfRatings: 0,
			//we also have an email to send notification too
		}),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(function (response) {
			//this is the line that is giving me the error
			return response.json()
		}).then(function (body) {
			console.log(body);
		});

}
  export function fakePostCompanies(argC, argL, argE) {
	  postProducts(argC, argL, argE);
	return new Promise(resolve => {
		// Resolve after a timeout so we can see the loading indicator
		setTimeout(
		  () =>
			resolve({
			  
			}),
		  10
		);
	  });
  }

  export function postCompanies(dataCompany, dataLogo, dataEmail) {
	return dispatch => {
	  dispatch(PostCompaniesBegin());
	  return fakePostCompanies(dataCompany, dataLogo, dataEmail)
		.then(json => {
		  dispatch(PostCompaniesSuccess());
		  	return 'Success';
		})
		.catch(error =>
		  dispatch(PostCompaniesFailure(error))
		);
	}
}
  //--------------------------------------------------------------------------------------
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
	if (!response.ok) {
	  throw Error(response.statusText);
	}
	return response;
  }
  
  export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
  export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
  export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
  export const POST_COMPANIES_BEGIN = "POST_COMPANIES_BEGIN";
  export const POST_COMPANIES_SUCCESS = "POST_COMPANIES_SUCCESS";
  export const POST_COMPANIES_FAILURE = "POST_COMPANIES_FAILURE";
  
  export const fetchProductsBegin = () => ({
	type: FETCH_PRODUCTS_BEGIN
	
  });

  export const PostCompaniesBegin = () => ({
	type: POST_COMPANIES_BEGIN,
  });
  
  export const fetchProductsSuccess = products => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: { products }
  });

  export const PostCompaniesSuccess = () => ({
	type: POST_COMPANIES_SUCCESS,
	//payload: { products }
  });
  
  
  export const fetchProductsFailure = error => ({
	type: FETCH_PRODUCTS_FAILURE,
	payload: { error }
  });

  export const PostCompaniesFailure = error => ({
	type: POST_COMPANIES_FAILURE,
	payload: { error }
  });
  
  