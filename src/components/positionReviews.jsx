
import React from 'react';
import { Component, useRef } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import faker from 'faker'
import { Button, Popup, Checkbox, Feed, Message, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import { NavLink, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchProducts2 } from "../store/actions/mainPageActions";
import { postAgreeVotes } from '../store/actions/companyActions'
import { postAnonSignup, gettingAnonSignup } from '../store/actions/loginActions';
import { getLogins } from "../store/actions/loginActions";
import searchReducer from '../store/reducers/searchReducer';
import { PURGE } from 'redux-persist';
import persistConfig from '../store/reducers/rootReducer'
import { persistor } from '../index.jsx'
import Jump from 'react-reveal/Tada';


let positionSelected;

class PositionReviews extends Component {
	//shake and then turn the app dark
	state = {
		agreeVoteFakeState2: 0,
	}

	componentDidMount() {
		positionSelected = this.props.match.params.item;
		this.props.fetchProductsBasedOnPosition(positionSelected);
	}

	render() {
		let len = this.props.positionReviews.length;
		return (
			<Container textAlign='justified' style={{ 'minHeight': '-webkit-fill-available', 'height': 'fit-content', 'background': 'white', 'background': '-webkit-linear-gradient(to left, #f4e9e3, #ffffff)', 'background': 'linear-gradient(to left, #f4e9e3, #ffffff)' , 'borderRadius': '10px', 'padding': '2%', 'marginTop':'2%' }}>
				<Header>Reviews for <u>{positionSelected}</u> Intern : ({len})</Header> 
				<span>Note: To add a review, please go to the company page you want to review.</span>
	
				<Feed>

					{/* for each review in reviews map a feed section */}
					{(this.props.positionReviewsError) ? <div>Error! {this.props.positionReviewsError.message}</div> : ''}
					{(this.props.positionReviewsLoading) ? <Icon loading name='spinner' /> : ''}
					{this.props.positionReviews.map(review => (

						<Feed.Event>
							<Feed.Label>
								{(review.isAnonymous === 0) ? <Icon name='user' /> : <Icon name='user secret' />}
							</Feed.Label>
							<Feed.Content>
								<Feed.Summary>
									<Feed.User>{(review.isAnonymous === 0) ? review.username : 'Anonymous ' + review.userID}</Feed.User>

									<Feed.Date>{review.dateOfReview.split("").slice(0, (review.dateOfReview.indexOf("T"))).join("")}</Feed.Date>
								</Feed.Summary>

								<Feed.Meta>
									<Feed.Like>
										{(review.reviewID === this.state.agreeVoteFakeState2) ? <p><Icon name='thumbs up' />{review.agreeVotes + 1} Agree</p> : <p><Icon name='thumbs up' />{review.agreeVotes} Agree</p>}
									</Feed.Like>
								</Feed.Meta>

								<Table celled className='ratings-table' color='green'>
									<Table.Header inverted>
										<Table.Row>
											<Table.HeaderCell singleLine width={2}>Company Name</Table.HeaderCell>
											<Table.HeaderCell singleLine width={2}>Rating</Table.HeaderCell>
											<Table.HeaderCell width={2}>Position</Table.HeaderCell>
											<Table.HeaderCell width={2}>Location</Table.HeaderCell>
											<Table.HeaderCell>Comments</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<Header as='h4' textAlign='center'>{review.companyName}</Header>
											</Table.Cell>

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
												<p>{(review.comments === null || review.comments === 'undefined') ? 'n/a' : review.comments}
												</p>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
								<Button size='tiny' onClick={_ = () => { this.props.updateAgree2(review.reviewID); this.setState({ buttonClick: true }); this.setState({ agreeVoteFakeState2: review.reviewID }) }}><Icon style={{ 'margin': 'auto' }} name='thumbs up' /></Button>

								{/* <Button size='tiny'><Icon style={{ 'margin': 'auto' }} name='thumbs down' /></Button> */}
							</Feed.Content>

						</Feed.Event>

					))}

				</Feed>
			</Container>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		//search: state.search,
		// 	reviews: state.reviews.items,
		// reviewsError: state.reviews.error,
		// reviewsLoading: state.reviews.loading,
		positionReviews: state.positions.items,
		positionReviewsError: state.positions.error,
		positionReviewsLoading: state.positions.loading,


	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		//fetchCompanies: () => dispatch(fetchProducts()),
		fetchProductsBasedOnPosition: (positionSelected2) => dispatch(fetchProducts2(positionSelected2)),
		updateAgree2: (rid) => dispatch(postAgreeVotes(rid)),


	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionReviews)
