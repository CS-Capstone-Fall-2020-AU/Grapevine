
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import faker from 'faker';
import { Button, Container, Accordion, Table, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'

import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Shake';
import { connect } from 'react-redux';
import { fetchProducts } from "../store/actions/companyActions";

let opts2;
let source2;
let highestReviewsTableProductsArray;
let highLimit = 4;

const panels = [
	{
		key: 'more-positions',
		title: {
			content: '',
			icon: 'ellipsis horizontal',
			
		},
		content: {
			content: (
			<List bulleted style={{'paddingLeft': '0px', 'marginLeft': '0px', 'paddingTop':'0px', 'marginTop':'0px'}}>
				<List.Item href='/positionReviews/Computer Networking'>Computer Networking</List.Item>
				<List.Item href='/positionReviews/Technology Consultant'>Technology Consultant</List.Item>
				<List.Item href='/positionReviews/UX UI Design'>UI UX Design</List.Item>
			</List>

			),
		},
	},
]

class Main extends Component {
	state = {
	}

	componentDidMount() {
		this.props.fetchCompanies();
	}


	handleSearchChange2 = (e, data) => {
		this.props.startSearch(data.value)
		source2 = (this.props.products.map(pr => (
			{
				title: pr.companyName,
				image: pr.imgLogoUrl,
				description: pr.numOfRatings + ' ' + 'reviews',
			}
		)))

		setTimeout(() => {
			if (data.value.length === 0) {
				this.props.cleanQuery();
				return;
			}
			let re = new RegExp(_.escapeRegExp(data.value), 'i');
			let isMatch = (result) => re.test(result.title);
			this.props.finalSearch(isMatch);
		}, 100)
	}

	render() {
		console.log("products", this.props.products);
		return (
			<Grid style={{ 'width': '90%', 'margin': 'auto'}}>
				{/* //do a fetch products where you order by numofreview
				// this.props.fetchProducts('main') array.sort*/}
				<Grid.Row columns='equal' style={{ 'paddingTop': '0px' }}>
					<Grid.Column >
						<Fade bottom cascade={true}>
							<Table>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell >Most Reviewed Companies</Table.HeaderCell>
										<Table.HeaderCell>Reviews</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{highestReviewsTableProductsArray = this.props.products,
										highestReviewsTableProductsArray = highestReviewsTableProductsArray.sort((a, b) => parseFloat(b.numOfRatings) - parseFloat(a.numOfRatings)),
										highestReviewsTableProductsArray.slice(0, highLimit).map(item =>
											<Table.Row>
												<Table.Cell selectable>
													<a href={`/ratings/${item.companyName}`}>
														<Header as='h4' image>
															<Image src={item.imgLogoUrl} rounded size='mini' />
															<Header.Content>
																{item.companyName}
															</Header.Content>
														</Header>
													</a>
												</Table.Cell >
												<Table.Cell>{item.numOfRatings}</Table.Cell>
											</Table.Row>
										)}
								</Table.Body>
							</Table>
						</Fade>
					</Grid.Column>


					<Grid.Column id='main-search'>

						<Search fluid={true} placeholder='Search companies here' 

							loading={this.props.search.loading2}
							onResultSelect={(e, data) => {
								this.props.updateSelection(data.result.title);
								let destination = data.result.title;
								window.location.href = '/ratings/' + destination;
							}
							}
							onSearchChange={this.handleSearchChange2}

							results={this.props.search.results2}
							value={this.props.search.value2}

						/>
					</Grid.Column>

					<Grid.Column >
						<Fade bottom cascade={true}>
							<List bulleted>
								<List.Header style={{'paddingBottom': '2px'}}><b>Recent Internship Positions</b></List.Header>
								<List.Item href='/positionReviews/Software Engineer'>Software Engineer</List.Item>
								<List.Item href='/positionReviews/Solutions Engineer'>Solutions Engineer</List.Item>
								<List.Item href='/positionReviews/Data Scientist'>Data Scientist</List.Item>
								<List.Item href='/positionReviews/Cybersecurity'>Cybersecurity</List.Item>
								<Accordion fluid panels={panels} />
							</List>
						</Fade>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		search: state.search,
		products: state.products.items,
		loading: state.products.loading,
		error: state.products.error,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanies: () => dispatch(fetchProducts()),
		startSearch: (dataValue) => dispatch({ type: 'START_SEARCH2', query: dataValue }),
		cleanQuery: () => dispatch({ type: 'CLEAN_QUERY2' }),
		finalSearch: (isMatching) => dispatch({ type: 'FINISH_SEARCH2', results: _.filter(source2, isMatching) },),
		updateSelection: (dataTitlesValue) => dispatch({ type: 'UPDATE_SELECTION2', selection: dataTitlesValue }),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)