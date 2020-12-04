import _ from 'lodash';

var postResult;

export function fakePostSignup(arg0, arg1, arg2) {
	fetch('http://localhost:4000/users', {
		method: 'POST',
		body: JSON.stringify({
			// userID`, `isAnonymous`, `firstName`, `lastName`, `username`, `password`, `email`
			userID: 0,
			isAnonymous: 0,
			username: arg0,
			password: arg1,
			email: arg2,
		}),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(function (response) {
			
			return response.json()
		}).then(function (body) {
			postResult = String(body.message);
			console.log("this is the postresult", postResult);
		});
//---------------------------send email to their email

		fetch('http://localhost:4000/email', {
		method: 'POST',
		body: JSON.stringify({
			// userID`, `isAnonymous`, `firstName`, `lastName`, `username`, `password`, `email`
			username: arg0,
			password: arg1,
			email: arg2,
		}),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(function (response) {
		}).then(function (body) {
		});
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

export function postSignup(use, pass, ema) {
	return dispatch => {
		dispatch(PostSignupBegin());
		return fakePostSignup(use, pass, ema)
		  .then(json => {
			dispatch(PostSingupSuccess(postResult));
				return 'Success';
		  })
		  .catch(error =>
			dispatch(PostSignupFailure(error))
		  );
	  }
}





export function fakePostAnonSignup() {
	fetch('http://localhost:4000/users', {
		method: 'POST',
		body: JSON.stringify({
			// userID`, `isAnonymous`, `firstName`, `lastName`, `username`, `password`, `email`
			userID: 0,
			isAnonymous: 1,
			anonCode: 'goingdark'
		}),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(function (response) {
			
			return response.json()
		}).then(function (body) {
			postResult = String(body.message);
			console.log("this is the postresult", postResult);
		});
//--------------------------
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

let innerLoginInfo;
let getLoginResults;
let loginItemRow;
let userFound = false;

function fakePostAnonSignupGetLogin() {
	fetch("http://localhost:4000/users")
	  .then()//handleerrors
	  .then(res => res.json())
	  .then(_ = (res) => {
		  //need this to output the exact row with all of that information
		getLoginResults = Object.values(res.data);
		let lastUserID = getLoginResults[getLoginResults.length-1].userID;
	
		console.log("this is the last user id plus 1", lastUserID);
		console.log("this is what we get in time", getLoginResults);
		for (let loginItem of getLoginResults){
			if (loginItem.isAnonymous === 1){
				if (loginItem.userID === lastUserID){
					userFound = true;
					loginItemRow = loginItem;
				}
			}
		}
		if (userFound === false){
			console.log("user not found");
			loginItemRow = "error";
		}
		else{
			console.log("user found and logging in");
			console.log("this is the line of wt we found", loginItemRow);
			
		}
  })
}



/////////////////////////////////////////////////////////////////////////////////
export function postAnonSignup() {
	return dispatch => {
		dispatch(PostAnonSignupBegin());
		return fakePostAnonSignup()
		  .then(json => {
			dispatch(postAnonSingupSuccess(postResult));
			//dispatch(fake)
				return 'Success';
				//fakePostAnonSignupGetLogin()
		  })
		  .catch(error =>
			dispatch(PostAnonSignupFailure(error))
		  );
	  }
}

/////////////////

function fakeGetAnonLogins() {
	fakePostAnonSignupGetLogin()
	return new Promise(resolve => {
	  // Resolve after a timeout so we can see the loading indicator
	  setTimeout(
		() =>
		  resolve({
			loginItemRow
		  }),
		100
	  );
	});
  }

export function gettingAnonSignup() {
	return dispatch => {
		dispatch(gettingAnonLoginsBegin());
		return fakeGetAnonLogins()
		  .then(json => {
			  //console.log("anyone", json.revs);
			dispatch(fetchAnonLoginsSuccess(json.loginItemRow)); //json.revs
			return json.loginItemRow
		  })
		  .catch(error =>
			console.log("Err", error)
		  );
	  };
}













function getTheLogins(llluu, lllpp) {
	fetch("http://localhost:4000/users")
	  .then()//handleerrors
	  .then(res => res.json())
	  .then(_ = (res) => {
		  //need this to output the exact row with all of that information
		getLoginResults = Object.values(res.data);
		for (let loginItem of getLoginResults){
			if (loginItem.username === llluu){
				if (loginItem.password === lllpp){
					userFound = true;
					loginItemRow = loginItem;
				}
			}
		}
		if (userFound === false){
			console.log("user not found");
			loginItemRow = "error";
		}
		else{
			console.log("user found and logging in");
			console.log("this is the line of wt we found", loginItemRow);
			

		}
  })
}

function fakeGetLogins(lluu, llpp) {
	getTheLogins(lluu, llpp)
	return new Promise(resolve => {
	  // Resolve after a timeout so we can see the loading indicator
	  setTimeout(
		() =>
		  resolve({
			loginItemRow
		  }),
		100
	  );
	});
  }

export function getLogins(llu, llp) {
	return dispatch => {
		dispatch(fetchLoginsBegin());
		return fakeGetLogins(llu, llp)
		  .then(json => {
			  //console.log("anyone", json.revs);
			 
			dispatch(fetchLoginsSuccess(json.loginItemRow)); //json.revs
			return json.loginItemRow
		  })
		  .catch(error =>
			console.log("Err", error)
		  );
	  };
}
export const FETCH_LOGINS_BEGIN = "FETCH_LOGINS_BEGIN";
export const FETCH_LOGINS_SUCCESS = "FETCH_LOGINS_SUCCESS";
export const POST_SIGNUP_BEGIN = "POST_SIGNUP_BEGIN";
export const POST_SIGNUP_SUCCESS = "POST_SIGNUP_SUCCESS";
export const POST_SIGNUP_FAILURE = "POST_SIGNUP_FAILURE";
export const POST_ANON_SIGNUP_BEGIN = "POST_ANON_SIGNUP_BEGIN";
export const POST_ANON_SIGNUP_SUCCESS = "POST_ANON_SIGNUP_SUCCESS";
export const POST_ANON_SIGNUP_FAILURE = "POST_ANON_SIGNUP_FAILURE";
export const GETTING_ANON_LOGINS_BEGIN = "GETTING_ANON_LOGINS_BEGIN";
export const FETCH_ANON_LOGINS_SUCCESS = "FETCH_ANON_LOGINS_SUCCESS";

export const fetchAnonLoginsSuccess = (logins) => ({
	type: FETCH_ANON_LOGINS_SUCCESS,
	payload: logins
  });

export const gettingAnonLoginsBegin = () => ({
	type: GETTING_ANON_LOGINS_BEGIN
  });

export const fetchLoginsBegin = () => ({
	type: FETCH_LOGINS_BEGIN
  });
  export const fetchLoginsSuccess = (logins) => ({
	type: FETCH_LOGINS_SUCCESS,
	payload: logins
  });


  export const PostAnonSignupBegin = () => ({
	type: POST_ANON_SIGNUP_BEGIN,
  });
  export const postAnonSingupSuccess = (PRR) => ({
	type: POST_ANON_SIGNUP_SUCCESS,
	payload: PRR
  });
  export const PostAnonSignupFailure = (error) => ({
	type: POST_ANON_SIGNUP_FAILURE,
	payload: { error }
  });


export const PostSignupBegin = () => ({
	type: POST_SIGNUP_BEGIN,
  });
export const PostSingupSuccess = (PR) => ({
	type: POST_SIGNUP_SUCCESS,
	payload: PR
  });
  export const PostSignupFailure = (error) => ({
	type: POST_SIGNUP_FAILURE,
	payload: { error }
  });