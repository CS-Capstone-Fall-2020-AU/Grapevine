
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import faker from 'faker';
import { Button, Popup, Checkbox, Form, Table, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Shake';


export default class Login extends Component {
	state = {
		open: false,
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		email: ''


	}

	render() {

		return (

			<Segment attached basic style={{'backgroundColor': '#b5c691'}}>
				<Container textAlign='justified' style={{'backgroundColor': 'white', 'borderRadius': '25px', 'padding': '2%'}}>
				<Form>
					<span>Log-in or sign-up to get notifications on posts and interactions!</span>
					<span style={{'float': 'right'}}>Sign up as a company? <a href=''>Company Sign-up </a><Popup content='Sign up as a company to see custom dashboards with statistics and key elements of intern reviews.' trigger={<Button size="mini" compact={true} icon='info' />}/> </span>
					<Header>Log-in</Header>
					<Divider />
					<Form.Field required>
						<label>Username</label>
						<input placeholder='Username' onChange={_ = (event) => { this.setState({ username: event.target.value }); }} />
					</Form.Field>
					<Form.Field required>
						<label>Password</label>
						<input placeholder='password' password onChange={_ = (event) => { this.setState({ password: event.target.value }); }} />
					</Form.Field>
					<br />
					<Button size = 'tiny' color='black' onClick={() => window.location.reload()}>
						Cancel
			  </Button>
					<Button
					size='tiny'
						content="Log-in"
						labelPosition='right'
						icon='checkmark'
						onClick={_ = (event) => { this.setState({ open: false }); }}
						positive
					/>

					<Divider />


					<Header>Sign-Up</Header>
					<Form.Field required>
						<label style={{ 'float': 'left' }}>First name</label>
						<input placeholder='First name' onChange={_ = (event) => { this.setState({ firstName: event.target.value }); }} />
					</Form.Field>
					<Form.Field required>
						<label style={{ 'float': 'left' }}>Last name</label>
						<input placeholder='Last name' onChange={_ = (event) => { this.setState({ firstName: event.target.value }); }} />
					</Form.Field>
					<Form.Field required>
						<label>Username</label>
						<input placeholder='Username' onChange={_ = (event) => { this.setState({ username: event.target.value }); }} />
					</Form.Field>
					<Form.Field required>
						<label>Password</label>
						<input placeholder='password' password onChange={_ = (event) => { this.setState({ password: event.target.value }); }} />
					</Form.Field>
					<Form.Field >
						<label>Email</label>
						<input placeholder='Email' onChange={_ = (event) => { this.setState({ email: event.target.value }); }} />
					</Form.Field>
					<Form.Field>
      <Checkbox label='I agree to the'/> <a href=''>Terms and Conditions</a> 
    </Form.Field>
				</Form>
				<br />
				
				<Button size='tiny' color='black' onClick={() => window.location.reload()}>
					Cancel
			  </Button>
				<Button
				size='tiny'
					content="Sign-up"
					labelPosition='right'
					icon='checkmark'
					onClick={_ = (event) => { this.setState({ open: false }); }}
					positive
				/>
				</Container>
			</Segment>

		);
	}
}
