
import React from 'react';
import { Component, useRef } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import faker from 'faker'
import { Button, Sticky, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import { NavLink, Link } from 'react-router-dom';
import Logo from '../images/jv7000.png';
import { connect } from 'react-redux';
import { fetchProducts } from "../store/actions/companyActions";
import { getLogins } from "../store/actions/loginActions";
import searchReducer from '../store/reducers/searchReducer';
// import { PURGE, REHYDRATE } from 'redux-persist';
// import { persistor } from '../index.jsx'
import { PURGE } from 'redux-persist';
import persistConfig from '../store/reducers/rootReducer'
import {persistor} from '../index.jsx'
//check signup for persistor problems


var activeItem;

const source = _.times(5, () => ({
	title: faker.company.companyName(),
	description: faker.company.catchPhrase(),
	image: faker.internet.avatar(),
	price: faker.finance.amount(0, 100, 2, '$'),
}))

class Navigation extends Component {
	//shake and then turn the app dark
	state = {
		anon: false,

	}
	handleRateAnon = () => {
		this.setState({ anon: true });
	}
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	handleSearchChange = (e, data) => {
		//   clearTimeout(timeoutRef.current)
		this.props.fetchCompanies(data.value);

		setTimeout(() => {
			if (data.value.length === 0) {
				this.props.cleanQuery();

				return
			}

			const re = new RegExp(_.escapeRegExp(data.value), 'i')
			const isMatch = (result) => re.test(result.title)

			this.props.finalSearch(isMatch);
		}, 300)
	}
	onPurgeStoredState(e) { 

		alert("making our way here");
		persistor.purge();
	
   }


	render() {
		return (
			<span>
				<Sticky>
				<Menu >
					<Menu.Item
						name='Grapevine'
						active={activeItem === 'Grapevine logo'}
						onClick={this.handleItemClick}
						href='/'>
						<img style={{'width':'4em'}} src={Logo} size='medium' alt="Grapevine logo" />

					</Menu.Item>

					<Menu.Item
						name='Companies'
						active={activeItem === 'Internship Companies'}
						onClick={this.handleItemClick}
						href='/companies'
					/>
					<Menu.Item
						name='Ratings'
						active={activeItem === 'ratings'}
						onClick={this.handleItemClick}
						href='/ratings'
					/>

					<Menu.Item
						name='About'
						active={activeItem === 'about'}
						onClick={this.handleItemClick}
						href='/about'
					/>

				
					<Menu.Item >
						<Search
							loading={this.props.search.loading}
							onResultSelect={(e, data) =>
								this.props.updateSelection(data.result.title)

							}
							onSearchChange={this.handleSearchChange}
							results={this.props.search.results}
							value={this.props.search.value}
						/>

					</Menu.Item>


					<Menu.Menu position='right'>
						<Menu.Item>
							<Button secondary onClick={this.handleRateAnon}>Rate Anonymously</Button>
						</Menu.Item>
					
						{(!(this.props.usersLoginsLoading)) && (this.props.usersLogins !== 'error') ?
							<Menu.Item href='/login' onClick={this.onPurgeStoredState}>
								<Button primary><Icon name='user circle'></Icon>{this.props.usersLogins.username}</Button>
							</Menu.Item> :
							<Menu.Item href='/login'>
								<Button primary>Sign Up/Login</Button>
							</Menu.Item>}



					</Menu.Menu>
				</Menu></Sticky>
				</span>

		);
	}
}


const mapStateToProps = (state) => {
	return {
		search: state.search,
		products: state.products.items,
		loading: state.products.loading,
		error: state.products.error,
		usersLogins: state.users.logins,
		usersLoginsLoading: state.users.loginsLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanies: (value) => dispatch(fetchProducts(value)),
		startSearch: (dataValue) => dispatch({ type: 'START_SEARCH', query: dataValue }),
		cleanQuery: () => dispatch({ type: 'CLEAN_QUERY' }),
		finalSearch: (isMatching) => dispatch({ type: 'FINISH_SEARCH', results: _.filter(source, isMatching) },),
		updateSelection: (dataTitlesValue) => dispatch({ type: 'UPDATE_SELECTION', selection: dataTitlesValue }),
	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
