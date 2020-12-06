
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Popup, Checkbox, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import { fetchProducts, postCompanies } from "../store/actions/companyActions";
import { connect } from "react-redux";
import CompanyPage from './companyPage';
import App from '../App'


class Companies extends Component {
	state = {
		open: false,
		setOpen: false,
		email: '',
		company: '',
		logoURL: ''

	}
	componentDidMount() {
		this.props.fetchCompanies();
		//when you click on a company, fetch the review that has that company name
	}
	handleAddCompanyClick = () => {
		this.setState({ open: true })
	}
	handleCompanySubmit = (e) => {
		e.preventDefault();
		this.props.startPost(this.state.company, this.state.logoURL, this.state.email);
	}


	render() {
		const { error, loading, products } = this.props;
		return (
			<span>
				<Modal
					size='tiny'
					onClose={() => this.setState({ setOpen: false })}
					onOpen={() => this.setState({ setOpen: true })}
					open={this.state.open}
					dimmer='inverted'
				>
					<Modal.Header>Sumbit an Internship/company</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								<span>We are adding more internships everyday! Please complete fields, and we will approve this addition momentarily.</span>
								<Divider />

								<Form.Field required>
									<label>Company Name</label>
									<input placeholder='Company Name' onChange={_ = (event) => { this.setState({ company: event.target.value }); }} />
								</Form.Field>
								<Form.Field >
									<label>Company Logo URL</label>
									<input placeholder='Logo URL' onChange={_ = (event) => { this.setState({ logoURL: event.target.value }); }} />
								</Form.Field>
							</Form>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color='black' onClick={() => this.setState({ open: false })}>
							Cancel
					  </Button>
						<Button
							positive
							content="Send it"
							labelPosition='right'
							icon='checkmark'
							onClick={_ = (event) => { this.setState({ open: false }); this.handleCompanySubmit(event) }}

						/>
					</Modal.Actions>
				</Modal>
				<br />
				<Container textAlign='center'>	<Header>Find a company </Header></Container>

				<Container textAlign='right'>
					<Label as='a' onClick={this.handleAddCompanyClick}>
						Don't see your company?
				</Label>


				</Container>
				<Container textAlign='justified'>
					<b>Computer Science Internships/Companies</b>
					<Divider />
					<List divided relaxed>
						{(error) ? <div>Error! {error.message}</div> : ''}
						{(loading) ? <Icon loading name='spinner' /> : ''}
						{products.map(product => (

							<List.Item >
								{(product.imgLogoUrl === '') ? <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar /> : <Image src={product.imgLogoUrl} avatar />}

								<List.Content href={`/ratings/${product.companyName}`} >
									<List.Header as='a'>{product.companyName}</List.Header>
									<List.Description>Contains {product.numOfRatings} reviews</List.Description>
								</List.Content>
							</List.Item>
						))}
					</List>
				</Container>
			</span>
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
		startPost: (dataValueCompany, dataValueLogoURL, dataValueEmail) => dispatch(postCompanies(dataValueCompany, dataValueLogoURL, dataValueEmail)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies)

