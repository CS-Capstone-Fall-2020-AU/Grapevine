
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Popup, Checkbox, Message, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';
import { Feed } from 'semantic-ui-react'
import { fetchProducts, postCompanies, fetchReviews, postAgreeVotes, postAddReview, sendingReviewLength} from "../store/actions/companyActions";
import { getLogins } from "../store/actions/loginActions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { company } from 'faker';
//aphabetize the comany list 
//make the search work
//things that dont work, 
//contains how many reviews in companies list page
//terms and conditions on sign up page
//top descriptors

//company login
//company dashboard
//search
//everything on front page
//rate anon
//drews stuff
let options = [
	{ text: 'Software Engineer', value: 'Software Engineer' },
	{ text: 'Solutions Engineer', value: 'Solutions Engineer' },
	{ text: 'Data Scientist', value: 'Data Scientist' },
	{ text: 'Cybersecurity', value: 'Cybersecurity' },
	{ text: 'Computer Networking', value: 'Computer Networking' },
	{ text: 'Technology Consultant', value: 'Technology Constultant' },
	{ text: 'Other', value: 'Other' },
]

let avg = 0;
const gradesDict = {
	'A+': '100',
	'A': '95',
	'A-': '90',
	'B+': '85',
	'B': '80',
	'B-': '75',
	'C+': '70',
	'C': '65',
	'C-': '60',
	'D+': '55',
	'D': '50',
	'D-': '45',
	'F': '40'
}
let titleOfCompany;
let companyInfo;
let imglink = '';
let overallGrade = '';
let ratingsNum = 0;
let reviews;
let finalOverallGrade = '';
let activeIndex;
let iconDef;
class CompanyPage extends Component {
	state = {
		agreeVoteFakeState: 0,
		buttonClick: false,
		addReviewModal: false,
		warningMessage: false,
		addRole: '',
		addRating: '',
		addComment: '',
		addLocation: '',
		reviewSuccessMessage: false,


	}

	componentWillMount() {
		this.props.fetchCompanies();
		titleOfCompany = this.props.data.match.params.id;
		this.props.fetchRevs(titleOfCompany);
		
	}
	// getSnapshotBeforeUpdate(){
	// 	console.log("properrr length", this.props.reviews.length);
	// }

	handleAddedReviewSuccess = () => {
		this.props.sendReviewAmountToCompany(titleOfCompany); 
		this.setState({ reviewSuccessMessage: true })
		//wait five seconds then refresh
		//send updated amount of reviews to company
	
		setTimeout(() => window.location.reload(), 800);
		

	}

	handleAddReviewClick = (Event) => {
		console.log("maade it");
		this.setState({ reviewButtonClicked: true })
		if ((!(this.props.usersLoginsLoading)) && (this.props.usersLogins !== 'error')) {
			console.log("you are logged in and you can do it");
			this.setState({ addReviewModal: true })

			//review id: dont have to send anything
			//userid: get it from this.props.userLogins....with user id get the anonym or the username
			//internshipRating: String(input)
			//role: not required, or string(input), dropdown
			//companyName: titleOfCompany
			//comments: string(input)
			//agreevotes: 0 default
			//location: optional, string(input)
			//dateofreview: automatically input
			//isAnonymous: grab that from 0 is false, this.props.usersLogin
			//username: grab it if it is there from this.props.usersLogin

			//once we submit the form there is gonna be `reviewID`, `userID`, `internshipRating`, `role`, `companyName`, `comments`, `agreeVotes`, `location`, `dateOfReview`
			//we'd have to do a get to logins, cross reference userid with their username and anon setting and do it that way

		}
		else {
			//they are not logged in
			console.log("you are not logged in");
			this.setState({ warningMessage: true })

		}
		//check if they are logged in
		//how do we know if they are logged in, gonna need a global state
		//if they are logged or if they are anonymous, then give them a form to fill out
	}



	render() {

		if (this.props.products) {
			companyInfo = this.props.products.find(element => element.companyName === titleOfCompany);
		}

		{
			if (companyInfo && companyInfo.imgLogoUrl) {
				imglink = companyInfo.imgLogoUrl;
				overallGrade = companyInfo.overallRatingGrade;
				ratingsNum = companyInfo.numOfRatings;
			}
		}

		//fetch the reviews associated with company name


		let total = 0;

		if (this.props.reviews) {
			for (let rCount = 0; rCount < this.props.reviews.length; rCount++) {
				//see what each grade is
				let curGrade = this.props.reviews[rCount].internshipRating;

				let gradeTranslation = Number(gradesDict[curGrade]);
				total += gradeTranslation;
			}

			avg = (total / (this.props.reviews.length)).toFixed(2);;
			//if its 80 or + or - 4 than its a b
			for (let [key, value] of Object.entries(gradesDict)) {
				//console.log(key, value);
				if (Number(value) === avg) {
					finalOverallGrade = key;
				}
				else if ((Number(value) >= avg - 4) && (Number(value) <= avg + 4)) {
					finalOverallGrade = key;

				}
				else {
					continue;
				}

			}
		}
//this.props.reviews.length should be posted to company in reviews
		return (

			//need to grab reviews by the company name
			//fetch from two places: first from company, then from reviews, so pull data from company
			//THIS IS NOT AS EFFICIENT AS IT CAN BE DO COME BACK HERE
			// style={{ 'backgroundColor': '#c3becc' }}
			<span>
				{console.log("reviews, here", this.props.reviews)}
				<Container textAlign='justified' style={{ 'backgroundColor': 'white', 'borderRadius': '10px', 'padding': '2%' }}>
					<Header><Image src={imglink} avatar />{titleOfCompany}</Header>
					

					<Table celled >
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell singleLine width={2}>Overall Internship Rating</Table.HeaderCell>
								<Table.HeaderCell width={2}>Consensus</Table.HeaderCell>
								<Table.HeaderCell>Top Descriptors</Table.HeaderCell>
							</Table.Row>
						</Table.Header>


						<Table.Body>
							<Table.Row>
								<Table.Cell>
									{/* this is now irrelevant, we need to calculate the overallgrade */}
									<Header as='h2' textAlign='center'>{finalOverallGrade}</Header>
								</Table.Cell>
								{/* this is all the grades added up divided by ratingsnum */}
								{/* for each grade, convert it into a value */}
								{/* {this.props.sendReviewLengthToCompany(this.props.reviews.length)} */}
								<Table.Cell textAlign='right'>{(avg ? avg : '')}% <br /><a href='#'>{this.props.reviews.length} interns</a></Table.Cell>
								<Table.Cell>
									Learned a lot, informational presentations, strong networking (need to make function that does this)
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Divider />

					{/* -------------------------------------- */}

					{/* ------------------------------------------------ */}

					<Button onClick={this.handleAddReviewClick} style={{ 'float': 'right' }} size='tiny' primary><Icon style={{ 'margin': 'auto' }} name='add circle' /> Add Review</Button>
					{(this.state.warningMessage) ? <Message warning size='mini'>
						<Message.Header>You must Login or go anonymous before you can add a review!</Message.Header>
						<p>Visit our <a href='/login'>login</a> page or go anonymous, then try again.</p>
					</Message> : ''}
					{(this.state.reviewSuccessMessage) ? <Message
						success
						header='Your review was added!'
						content='Your review is now accessible on this page.'
					/> : ''}
					<Modal
						open={this.state.addReviewModal}
						onClose={() => { this.setState({ addReviewModal: false }) }}
						onOpen={() => console.log("open")}
					>
						<Modal.Header>Add Internship Review</Modal.Header>
						<Modal.Content image scrolling>
							{/* //review id: dont have to send anything
				//companyName: titleOfCompany]]
			//userid: get it from this.props.userLogins....with user id get the anonym or the username
			//internshipRating: String(input)
			//role: not required, or string(input), dropdown
			//comments: string(input)
			//agreevotes: 0 default SKIPPEDDDDDDDDDDDDDDDDDDDDDD
			//location: optional, string(input)
			//dateofreview: automatically input SKIPPPEDDDDDDDDDDDDDDDDDDDDDD
			//isAnonymous: grab that from 0 is false, this.props.usersLogin
			//username: grab it if it is there from this.props.usersLogin */}
							{/* this.props.postAddReview(titleOfCompany, this.props.usersLogins.userID, this.state.addRating, this.state.addRole, this.state.addComment, this.state.addLocation, this.props.usersLogin.isAnonymous, this.props.userslogin.username) */}

							<Modal.Description>
								<Form>
									<Form.Input required fluid label='Company' placeholder={titleOfCompany} value={titleOfCompany} />
									<Form.Input required fluid label='Internship Rating' placeholder='Rating: A+,C-,F, etc.' onChange={_ = (event) => { this.setState({ addRating: event.target.value }) }} />
									<Form.Input
										label="Role:"
									>
										<Dropdown
											fluid
											label='Role'
											selection
											options={options}
											placeholder='Role'
											onChange={_ = (event) => { this.setState({ addRole: event.target.textContent }); }}
										/>
									</Form.Input>

									<Form.TextArea required label='Comments' placeholder='Tell us more about how your experience went...' onChange={_ = (event) => { this.setState({ addComment: event.target.value }) }} />
									<Form.Input fluid label='Location' placeholder='San Francisco, CA' onChange={_ = (event) => { this.setState({ addLocation: event.target.value }) }} />
									<br />

								</Form>
							</Modal.Description>
						</Modal.Content>
						<Modal.Actions>
							<Button onClick={() => { this.setState({ addReviewModal: false }) }}>Cancel</Button>
							<Button positive onClick={_ = () => { this.setState({ addReviewModal: false }); this.props.postingAddReview(titleOfCompany, this.props.usersLogins.userID, this.state.addRating, this.state.addRole, this.state.addComment, this.state.addLocation, this.props.usersLogins.isAnonymous, this.props.usersLogins.username); this.handleAddedReviewSuccess() }} primary>
								Submit
							</Button>

						</Modal.Actions>
					</Modal>

					<Feed>

						{/* for each review in reviews map a feed section */}
						{(this.props.reviewsError) ? <div>Error! {this.props.reviewsError.message}</div> : console.log()}
						{(this.props.reviewsLoading) ? <Icon loading name='spinner' /> : console.log()}
						{this.props.reviews.map(review => (

							<Feed.Event>
								<Feed.Label>
								{(review.isAnonymous === 0)? <Icon name='user'/> : <Icon name='user secret'/>}
								</Feed.Label>
								<Feed.Content>
									<Feed.Summary>
								<Feed.User>{(review.isAnonymous === 0)? review.username: 'Anonymous ' + review.userID}</Feed.User>

										<Feed.Date>{review.dateOfReview.split("").slice(0, (review.dateOfReview.indexOf("T"))).join("")}</Feed.Date>
									</Feed.Summary>

									<Feed.Meta>
										<Feed.Like>
											{(review.reviewID === this.state.agreeVoteFakeState) ? <p><Icon name='thumbs up' />{review.agreeVotes + 1} Agree</p> : <p><Icon name='thumbs up' />{review.agreeVotes} Agree</p>}
										</Feed.Like>
									</Feed.Meta>

									<Table celled className='ratings-table' color='green'>
										<Table.Header inverted>
											<Table.Row>
												<Table.HeaderCell singleLine width={2}>Rating</Table.HeaderCell>
												<Table.HeaderCell width={2}>Position</Table.HeaderCell>
												<Table.HeaderCell width={2}>Location</Table.HeaderCell>
												<Table.HeaderCell>Comments</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											<Table.Row>
												<Table.Cell>
													<Header as='h2' textAlign='center'>{review.internshipRating}</Header>
												</Table.Cell>

												<Table.Cell textAlign='right'>
													{review.role}
												</Table.Cell>
												<Table.Cell textAlign='right'>
													{(review.location) ? review.location : 'N/A'}
												</Table.Cell>
												<Table.Cell>
													<p>{review.comments}
													</p>
												</Table.Cell>
											</Table.Row>
										</Table.Body>
									</Table>
									{/* for thumbs up come back and use cookies to save state */}
									<Button size='tiny' onClick={_ = () => { this.props.updateAgree(review.reviewID); this.setState({ buttonClick: true }); this.setState({ agreeVoteFakeState: review.reviewID }) }}><Icon style={{ 'margin': 'auto' }} name='thumbs up' /></Button>

									{/* <Button size='tiny'><Icon style={{ 'margin': 'auto' }} name='thumbs down' /></Button> */}
								</Feed.Content>

							</Feed.Event>

						))}

					</Feed>


				</Container>

				</span>
		);
	}
}


const mapStateToProps = state => ({
	reviews: state.reviews.items,
	reviewsError: state.reviews.error,
	reviewsLoading: state.reviews.loading,
	products: state.products.items,
	loading: state.products.loading,
	error: state.products.error,
	usersLogins: state.users.logins,
	usersLoginsLoading: state.users.loginsLoading,
});
//might have to send up to a state and have agree votes as a state
const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanies: () => dispatch(fetchProducts()),
		fetchRevs: (theCName) => dispatch(fetchReviews(theCName)),
		updateAgree: (rid) => dispatch(postAgreeVotes(rid)),
		postingAddReview: (title, userid, rating, role, comment, location, isano, username) => dispatch(postAddReview(title, userid, rating, role, comment, location, isano, username)),
		sendReviewAmountToCompany: (c)=> dispatch(sendingReviewLength(c)),
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage)


