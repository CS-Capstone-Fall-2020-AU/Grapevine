
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Popup, Checkbox, Message, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';
import { Feed } from 'semantic-ui-react'
import { fetchProducts, postCompanies, fetchReviews, postAgreeVotes } from "../store/actions/companyActions";
import { getLogins } from "../store/actions/loginActions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { company } from 'faker';
//things that dont work, 
//contains how many reviews in companies list page
//terms and conditions on sign up page
//top descriptors
//add review
//login
//company login
//company dashboard
//search
//everything on front page
//rate anon
//drews stuff
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
		reviewLoggedIn: false,
		reviewButtonClicked: false,


	}

	componentWillMount() {
		this.props.fetchCompanies();
		titleOfCompany = this.props.data.match.params.id;
		this.props.fetchRevs(titleOfCompany);
	}


	handleAddReviewClick = (Event) => {
		console.log("maade it");
		this.setState({ reviewButtonClicked: true })
		if ((!(this.props.usersLoginsLoading)) && (this.props.usersLogins !== 'error')) {
			console.log("you are logged in and you can do it");
			this.setState({ reviewLoggedIn: true })
			// this.setState({loggedIn: true})
			// this.setState({addReviewButtonClick: true})
			//they are logged in, grab their username
			//they can add the review spawn add review form
			//once we submit the form there is gonna be `reviewID`, `userID`, `internshipRating`, `role`, `companyName`, `comments`, `agreeVotes`, `location`, `dateOfReview`
			//we'd have to do a get to logins, cross reference userid with their username and anon setting and do it that way

		}
		else {
			//they are not logged in
			console.log("you are not logged in");
			this.setState({ reviewLoggedIn: false })

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

			avg = total / (this.props.reviews.length);
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

		return (

			//need to grab reviews by the company name
			//fetch from two places: first from company, then from reviews, so pull data from company
			//THIS IS NOT AS EFFICIENT AS IT CAN BE DO COME BACK HERE
			// style={{ 'backgroundColor': '#c3becc' }}
			<Segment attached basic>

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

								<Table.Cell textAlign='right'>{(avg ? avg : '')}% <br /><a href='#'>{this.props.reviews.length} interns</a></Table.Cell>
								<Table.Cell>
									Learned a lot, informational presentations, strong networking (need to make function that does this)
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Divider />


					<Button onClick={this.handleAddReviewClick} style={{ 'float': 'right' }} size='tiny' primary><Icon style={{ 'margin': 'auto' }} name='add circle' /> Add Review</Button>
					{((this.state.reviewLoggedIn === false) && (this.state.reviewButtonClicked)) ? <Message warning size='mini'>
						<Message.Header>You must Login or go anonymous before you can add a review!</Message.Header>
						<p>Visit our <a href ='/login'>login</a> page, then try again.</p>
					</Message>:''}
					{((this.state.reviewLoggedIn === true) && (this.state.reviewButtonClicked)) ? console.log("opening your modal in a sec"):''}
					<Feed>

						{/* for each review in reviews map a feed section */}
						{(this.props.reviewsError) ? <div>Error! {this.props.reviewsError.message}</div> : console.log()}
						{(this.props.reviewsLoading) ? <Icon loading name='spinner' /> : console.log()}
						{this.props.reviews.map(review => (

							<Feed.Event>
								<Feed.Label>
									{/* determined by userid, then determined my isanon 0,1 */}
									{/* go to user id where user id is 0, and then see isanon */}
									{/* so we need reviews from this company page by name,
									then for each review we need each user id's info */}
									{/* so first get the reviews from this company */}
									<Icon name='user secret' />
								</Feed.Label>
								<Feed.Content>
									<Feed.Summary>
										<Feed.User>Anonymous #001</Feed.User>

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

			</Segment>
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
		updateAgree: (rid) => dispatch(postAgreeVotes(rid))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage)


