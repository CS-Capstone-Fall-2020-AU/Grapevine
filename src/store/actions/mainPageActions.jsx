import _ from 'lodash';
import { ResponsiveEmbed } from 'react-bootstrap';
let reviewResults2;
let theExactReview2 = [];
let innerReview2;


export function fetchProducts2(positionName) {
	return dispatch => {
	  dispatch(fetchProducts2Begin());
	  return fakeGetProducts2(positionName)
		.then(json => {
		
		  dispatch(fetchProducts2Success(json.revs2));
		  return json.products;
		})
		.catch(error =>
		  dispatch(fetchProducts2Failure(error))
		);
	};
  }

//   export function fetchReviews(thatName) {
// 	return dispatch => {
// 	  dispatch(fetchReviewsBegin());
// 	  return fakeGetReviews(thatName)
// 		.then(json => {
// 			//console.log("anyone", json.revs);
// 		  dispatch(fetchReviewsSuccess(json.revs));
// 		  return json.products;
// 		})
// 		.catch(error =>
// 		  dispatch(fetchProductsFailure(error))
// 		);
// 	};
//   }
let revs2 =[];
  function fakeGetProducts2(posName) {
	getProducts2(posName)
	return new Promise(resolve => {
	  // Resolve after a timeout so we can see the loading indicator
	  setTimeout(
		() =>
		  resolve({
			revs2
		  }),
		200
	  );
	});
  }


  function getProducts2(PoName) {
	fetch("http://localhost:4000/reviews")
	  .then(handleErrors)
	  .then(res => res.json())
	  .then(_ = (res) => {
		reviewResults2 = Object.values(res.data);
	
		
		
		for (let ir2 = 0; ir2 < reviewResults2.length; ir2++){
			if (String(reviewResults2[ir2].role).includes(PoName)){
				theExactReview2.push(reviewResults2[ir2]);
			}
		}
	

		for (let ro2 = 0; ro2 < theExactReview2.length; ro2++){
			if (reviewResults2 && reviewResults2[ro2] && reviewResults2[ro2].role){
			innerReview2 = {
				reviewID: theExactReview2[ro2].reviewID,
				userID: theExactReview2[ro2].userID,
				internshipRating: theExactReview2[ro2].internshipRating,
				role: theExactReview2[ro2].role,
				companyName: theExactReview2[ro2].companyName,
				comments: theExactReview2[ro2].comments,
				agreeVotes: theExactReview2[ro2].agreeVotes,
				location: theExactReview2[ro2].location, 
				dateOfReview: theExactReview2[ro2].dateOfReview,
				isAnonymous: theExactReview2[ro2].isAnonymous,
				username: theExactReview2[ro2].username,
			}
	
			if (revs2.length < theExactReview2.length) {
				revs2.push(innerReview2);
			
			  }
		}
	}
	
		
  })

}
function handleErrors(response) {
	if (!response.ok) {
	  throw Error(response.statusText);
	}
	return response;
  } 


  export const FETCH_PRODUCTS2_BEGIN = "FETCH_PRODUCTS2_BEGIN";
  export const FETCH_PRODUCTS2_SUCCESS = "FETCH_PRODUCTS2_SUCCESS";
  export const FETCH_PRODUCTS2_FAILURE = "FETCH_PRODUCTS2_FAILURE";


  export const fetchProducts2Begin = () => ({
	type: FETCH_PRODUCTS2_BEGIN
	
  });

  export const fetchProducts2Success = reviews2 => ({
	type: FETCH_PRODUCTS2_SUCCESS,
	payload: { reviews2 }
  });

  export const fetchProducts2Failure = error => ({
	type: FETCH_PRODUCTS2_FAILURE,
	payload: { error }
  });