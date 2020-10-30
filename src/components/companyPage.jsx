
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Popup, Checkbox, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';
import { Feed } from 'semantic-ui-react'
import { fetchProducts, postCompanies, fetchReviews } from "../store/actions/companyActions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { company } from 'faker';

let titleOfCompany;
let companyInfo;
let imglink = '';
let overallGrade = '';
let ratingsNum = 0;
class CompanyPage extends Component {

	// componentDidMount() {
	// 	this.props.fetchCompanies();
	// 	titleOfCompany = this.props.data.match.params.id;
	// 	console.log(titleOfCompany);

	// }
	componentWillMount() {
		this.props.fetchCompanies();
		titleOfCompany = this.props.data.match.params.id;
		console.log(titleOfCompany);
	}

	render() {
		companyInfo = this.props.products.find(element => element.companyName === titleOfCompany);
		{ console.log(companyInfo) }

		{
			if (companyInfo && companyInfo.imgLogoUrl) {
				imglink = companyInfo.imgLogoUrl;
				overallGrade = companyInfo.overallRatingGrade;
				ratingsNum = companyInfo.numOfRatings;
			}
		}
		return (
			//need to grab reviews by the company name
			//fetch from two places: first from company, then from reviews, so pull data from company
			//THIS IS NOT AS EFFICIENT AS IT CAN BE DO COME BACK HERE
			<Segment attached basic style={{ 'backgroundColor': '#c3becc' }}>

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
									<Header as='h2' textAlign='center'>{overallGrade}</Header>
								</Table.Cell>
								{/* this is all the grades added up divided by ratingsnum */}
								{/* num of ratings needs to be replaced by how many reviews there are */}
								<Table.Cell textAlign='right'>91% <br /><a href='#'>{ratingsNum} interns</a></Table.Cell>
								<Table.Cell>
									Learned a lot, informational presentations, strong networking (need to make function that does this)
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Divider />


					<Container textAlign='right'><Button size='tiny' primary><Icon style={{ 'margin': 'auto' }} name='add circle' /></Button>Add Review</Container>

					<Feed>

						<Feed.Event>
							<Feed.Label>
								<Icon name='user secret' />
							</Feed.Label>
							<Feed.Content>
								<Feed.Summary>
									<Feed.User>Anonymous #001</Feed.User>
									<Feed.Date>1 Hour Ago</Feed.Date>
								</Feed.Summary>

								<Feed.Meta>
									<Feed.Like>
										<Icon name='thumbs up' />4 Agree
          							</Feed.Like>
								</Feed.Meta>

								<Table celled className='ratings-table' color='green'>
									<Table.Header inverted>
										<Table.Row>
											<Table.HeaderCell singleLine width={2}>Rating</Table.HeaderCell>
											<Table.HeaderCell width={2}>Position</Table.HeaderCell>
											<Table.HeaderCell>Comments</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<Header as='h2' textAlign='center'>A-</Header>
											</Table.Cell>

											<Table.Cell textAlign='right'>
												Data Science
								</Table.Cell>
											<Table.Cell>
												<p>At first my expectations were low because of having to do the internship virtually, but I Learned
												the people are so nice! If you are not interested in the projects they've assigned, they try to
												peak your interest in other areas in the company with club-like meetings to show off other
												deptms/projs. It's good for strong netowrking too.
									</p>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
								<Button size='tiny'><Icon style={{ 'margin': 'auto' }} name='thumbs up' /></Button><Button size='tiny'><Icon style={{ 'margin': 'auto' }} name='thumbs down' /></Button>
							</Feed.Content>
						</Feed.Event>

					</Feed>

				</Container>

			</Segment>
		);
	}
}


const mapStateToProps = state => ({
	products: state.products.items,
	loading: state.products.loading,
	error: state.products.error
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanies: () => dispatch(fetchProducts()),
		fetchReviews: () => dispatch(fetchReviews())
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage)


