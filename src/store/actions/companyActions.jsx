import _ from 'lodash';
import { ResponsiveEmbed } from 'react-bootstrap';

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
let ro;
let reviewResults;
let innerReview;
let theExactReview =[];
let revs = [];
function getReviews(thatNameFinal) {
	fetch("http://localhost:4000/reviews")
	  .then(handleErrors)
	  .then(res => res.json())
	  .then(_ = (res) => {
		reviewResults = Object.values(res.data);
		
		
		for (let ir = 0; ir < reviewResults.length; ir++){
			if (String(reviewResults[ir].companyName).includes(thatNameFinal)){
				theExactReview.push(reviewResults[ir]);
			}
		}

		for (ro = 0; ro < theExactReview.length; ro++){
			if (reviewResults && reviewResults[ro] && reviewResults[ro].companyName){
			innerReview = {
				reviewID: theExactReview[ro].reviewID,
				userID: theExactReview[ro].userID,
				internshipRating: theExactReview[ro].internshipRating,
				role: theExactReview[ro].role,
				companyName: theExactReview[ro].companyName,
				comments: theExactReview[ro].comments,
				agreeVotes: theExactReview[ro].agreeVotes,
				location: theExactReview[ro].location, 
				dateOfReview: theExactReview[ro].dateOfReview,
				isAnonymous: theExactReview[ro].isAnonymous,
				username: theExactReview[ro].username,
			}
			if (revs.length < theExactReview.length) {
				revs.push(innerReview);
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
  
  function fakeGetReviews(thatNameDetail) {
	getReviews(thatNameDetail)
	return new Promise(resolve => {
	  // Resolve after a timeout so we can see the loading indicator
	  setTimeout(
		() =>
		  resolve({
			revs
		  }),
		100
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

  export function fetchReviews(thatName) {
	return dispatch => {
	  dispatch(fetchReviewsBegin());
	  return fakeGetReviews(thatName)
		.then(json => {
			//console.log("anyone", json.revs);
		  dispatch(fetchReviewsSuccess(json.revs));
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

  function postTheAgrees(r_id) {
	  console.log("after we got here");
		fetch('http://localhost:4000/reviews', {
		method: 'PUT',
		 body: JSON.stringify({
		 	agreeVotesID: r_id,
		 }),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(function (response) {
			 console.log("this is the response:", response)
			// return response.json();
		
		}).then(function (body) {
			console.log(body);
		});

}

  export function fakePostAgreeVotes(riddd) {
	  console.log("and then we got here");
	postTheAgrees(riddd);
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
export function postAgreeVotes(ridd) {
	console.log("incrementing agree thing");
	fakePostAgreeVotes(ridd);
	return dispatch => {
	  //dispatch(PostAgreeVotesBegin());
	  //return fakePostAgreeVotes(ridd)
		//.then(json => {
		  //dispatch(PostAgreeVotesSuccess());
		  	//return 'Success';
		//})
		// .catch(error =>
		//   dispatch(PostAgreeVotesFailure(error))
		// );
	}
}
function postReview(titlesss, useridsss, ratingsss, rolesss, commentsss, locationsss, isanosss, usernamesss) {
	fetch('http://localhost:4000/reviews', {
		method: 'POST',
		body: JSON.stringify({
			reviewID: 0,
			companyName: titlesss,
			userID: useridsss,
			internshipRating: ratingsss,
			role: rolesss,
			comments: commentsss,
			location: locationsss,
			isAnonymous: isanosss,
			username: usernamesss,
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
function fakePostReview(titless, useridss, ratingss, roless, commentss, locationss, isanoss, usernamess) {
	postReview(titless, useridss, ratingss, roless, commentss, locationss, isanoss, usernamess);
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

export function postAddReview(titles, userids, ratings, roles, comments, locations, isanos, usernames) {
	return dispatch => {
	  dispatch(PostAddReviewBegin());
	  return fakePostReview(titles, userids, ratings, roles, comments, locations, isanos, usernames)
		.then(json => {
		  dispatch(PostAddReviewSuccess());
		  //fetchReviews(titles)
		  	return 'Success';
		})
		.catch(error =>
		  dispatch(PostAddReviewFailure(error))
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
  export const FETCH_REVIEWS_BEGIN = "FETCH_REVIEWS_BEGIN";
  export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
  export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
  export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
  export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
  export const POST_COMPANIES_BEGIN = "POST_COMPANIES_BEGIN";
  export const POST_COMPANIES_SUCCESS = "POST_COMPANIES_SUCCESS";
  export const POST_COMPANIES_FAILURE = "POST_COMPANIES_FAILURE";
  export const POST_AGREE_VOTES_BEGIN = "POST_AGREE_VOTES_BEGIN";
  export const POST_AGREE_VOTES_SUCCESS = "POST_AGREE_VOTES_SUCCESS";
  export const POST_AGREE_VOTES_FAILURE = "POST_AGREE_VOTES_FAILURE";
  export const POST_ADD_REVIEW_BEGIN = "POST_ADD_REVIEW_BEGIN";
  export const POST_ADD_REVIEW_SUCCESS = "POST_ADD_REVIEW_SUCCESS";
  export const POST_ADD_REVIEW_FAILURE = "POST_ADD_REVIEW_FAILURE";

  export const fetchReviewsBegin = () => ({
	type: FETCH_REVIEWS_BEGIN
  });
  
  export const fetchProductsBegin = () => ({
	type: FETCH_PRODUCTS_BEGIN
	
  });
  export const PostAddReviewBegin = () => ({
	type: POST_ADD_REVIEW_BEGIN,
  });
  export const PostAddReviewSuccess = () => ({
	type: POST_ADD_REVIEW_SUCCESS,

  });
  export const PostAddReviewFailure = (error) => ({
	type: POST_ADD_REVIEW_FAILURE,
	payload: { error }
  });
  
  export const PostCompaniesBegin = () => ({
	type: POST_COMPANIES_BEGIN,
  });
  
  export const fetchReviewsSuccess = (reviews) => ({
	type: FETCH_REVIEWS_SUCCESS,
	payload: reviews 
  });

  export const fetchProductsSuccess = products => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: { products }
  });

  export const PostCompaniesSuccess = () => ({
	type: POST_COMPANIES_SUCCESS,
	//payload: { products }
  });

  export const PostAgreeVotesBegin = () => ({
	type: POST_AGREE_VOTES_BEGIN,
	//payload: { products }
  });
  
  export const PostAgreeVotesSuccess = () => ({
	type: POST_AGREE_VOTES_SUCCESS,
	payload: { products }
  });
  
  export const PostAgreeVotesFailure = (error) => ({
	type: POST_AGREE_VOTES_FAILURE,
	payload: { error }
  });
  
  
  export const fetchProductsFailure = error => ({
	type: FETCH_PRODUCTS_FAILURE,
	payload: { error }
  });

  export const PostCompaniesFailure = error => ({
	type: POST_COMPANIES_FAILURE,
	payload: { error }
  });
  
  