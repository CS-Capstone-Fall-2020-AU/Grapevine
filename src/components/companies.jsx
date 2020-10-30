
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Popup, Checkbox, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import { fetchProducts, postCompanies} from "../store/actions/companyActions";
import { connect } from "react-redux";
import CompanyPage from './companyPage';
import App from '../App'



//so if the ssid is 1 then i want to fetch the spectral data, go to the first entry and collect the spectral data
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
	handleCompanySubmit = (e) =>{
		e.preventDefault();
		//we have to send the post dispatch
		console.log("do we even get here");
		console.log("this is the logo", this.state.logoURL)
		this.props.startPost(this.state.company, this.state.logoURL, this.state.email);	
	}

	 handleReviewClick = (co) =>{
		//go to the review page for that company
		 //save the state to redux
		 //this.props.storeCurrentCompanyName(co);
		
	}


	render() {

		const { error, loading, products } = this.props;

		return (
			<Segment basic>
				
				<Modal
					size='tiny'
					onClose={() => this.setState({ setOpen: false })}
					onOpen={() => this.setState({ setOpen: true })}
					open={this.state.open}
					dimmer='inverted'
				>
					<Modal.Header className='add-company-modal'>Sumbit an Internship/company</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								<span>We are adding more internships everyday! Please complete fields, and we will approve this addition momentarily.</span>
								<Divider />
								<Form.Field required>
								<label style={{'float': 'left'}}>Email</label><Popup content='We only use email to notify you when the company is added' trigger={<Button style={{'margin-left': '1%'}}size="mini" compact={true} icon='info' />} />
									<input placeholder='Email' onChange={_ = (event) => { this.setState({ email: event.target.value }); }} />
								</Form.Field>
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
							content="Send it"
							labelPosition='right'
							icon='checkmark'
							onClick={_ =(event) => {this.setState({ open: false }); this.handleCompanySubmit(event)}}
							positive
						/>
					</Modal.Actions>
				</Modal>

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
						{(error) ? <div>Error! {error.message}</div> : console.log()}
						{(loading) ? <Icon loading name='spinner' /> : console.log()}
						{products.map(product => (
							
							<List.Item >
								{(product.imgLogoUrl === '') ? <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar /> : <Image src={product.imgLogoUrl} avatar />}

								<List.Content  href = {`/ratings/${product.companyName}`} >
									<List.Header as='a'>{product.companyName}</List.Header>
									<List.Description>Contains {product.numOfRatings} reviews</List.Description>
								</List.Content>
							</List.Item>
						))}
					</List>

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
		startPost: (dataValueCompany, dataValueLogoURL, dataValueEmail) => dispatch(postCompanies(dataValueCompany, dataValueLogoURL, dataValueEmail)),
		//storeCurrentCompanyName: (coName) => dispatch(storeCurrentCompany(coName)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies)

