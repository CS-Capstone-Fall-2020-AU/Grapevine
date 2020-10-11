
import React from 'react';
import { Component, useRef } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import faker from 'faker'
import { Button, Sticky, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import { NavLink, Link } from 'react-router-dom';
import Logo from '../images/fourth.png';
import { connect } from 'react-redux';
import searchReducer from '../store/reducers/searchReducer';

var activeItem;

const source = _.times(5, () => ({
	title: faker.company.companyName(),
	description: faker.company.catchPhrase(),
	image: faker.internet.avatar(),
	price: faker.finance.amount(0, 100, 2, '$'),
}))


class Navigation extends Component {

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	handleSearchChange = (e, data) => {
		//   clearTimeout(timeoutRef.current)
		this.props.startSearch(data.value);

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



	render() {
		return (
			<Sticky>
			<Menu id="nav-menu">
				<Menu.Item
					name='Grapevine'
					active={activeItem === 'Grapevine logo'}
					onClick={this.handleItemClick}
					href='/'>
					<img src={Logo} alt="Grapevine logo" />

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
				/>

				<Menu.Item
					name='About'
					active={activeItem === 'about'}
					onClick={this.handleItemClick}
					href='/about'
				/>

				{/* search by company, search by rating, search by location */}
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
						<Button secondary>Rate Anonymously</Button>
					</Menu.Item>

					<Menu.Item>
						<Button primary>Sign Up/Login</Button>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			</Sticky>

		);
	}
}


const mapStateToProps = (state) => {
	return {
		search: state.search
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		startSearch: (dataValue) => dispatch({ type: 'START_SEARCH', query: dataValue }),
		cleanQuery: () => dispatch({ type: 'CLEAN_QUERY' }),
		finalSearch: (isMatching) => dispatch({ type: 'FINISH_SEARCH', results: _.filter(source, isMatching) },),
		updateSelection: (dataTitlesValue) => dispatch({ type: 'UPDATE_SELECTION', selection: dataTitlesValue })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
