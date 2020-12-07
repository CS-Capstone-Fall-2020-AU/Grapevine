
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import faker from 'faker';
import { Button, Popup, Checkbox, Form, Table, Message, Container, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Shake';
import { postSignup, getLogins } from "../store/actions/loginActions";
import { connect } from "react-redux";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
var sha1 = require('js-sha1');
//todo: email regex on signup
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let checkedState;
class Login extends Component {
	state = {
		open: false,
		username: '',
		password: '',
		email: '',
		successSignupModal: false,
		loadingIcon: false,
		gotLogins: false,
		givethemerror: false,

	}


	takeMeHome = () => {
		setTimeout(function () {
			window.location.href = '/'
		}, 1000);
	}
	handleSuccessOfSigning = ()=>{
		this.setState({ open: false }); this.props.postingSignup(this.state.username, sha1(this.state.password), this.state.email); if (this.props.usersLoading === false && this.props.usersError === null) { this.setState({ successSignupModal: true }) }; this.setState({ username: '' }); this.setState({ password: '' }); this.setState({ email: '' }) 
	}

	render() {
		return (

			<Segment attached basic id='login-background'>
				<Container textAlign='justified' style={{ 'backgroundColor': 'white', 'borderRadius': '25px', 'padding': '4%' }}>
					<Form>
						<span>Log-in or sign-up to get notifications on posts and interactions!</span>
						{/* <span style={{ 'float': 'right' }}>Sign up as a company? <a href=''>Company Sign-up </a><Popup content='Sign up as a company to see custom dashboards with statistics and key elements of intern reviews.' trigger={<Button size="mini" compact={true} icon='info' />} /> </span> */}
						<Header>Log-in</Header>
						<Divider />
						{(!(this.props.usersLoginsLoading)) && (this.props.usersLogins !== 'error') ? <Message
							header="You're logged in!"
							content='Redirecting you to grapevine'
							onDismiss={this.takeMeHome()}
						/> : ''}
						{((!(this.props.usersLoginsLoading)) && (this.props.usersLogins === 'error')) ?
							<Message negative>
								<Message.Header>User not found</Message.Header>
								<p>Please check that the username and password are correct.</p>
							</Message> : ''}
						<Form.Field required>
							<label>Username</label>
							<input placeholder='Username' onChange={_ = (event) => { this.setState({ username: event.target.value }); }} />
						</Form.Field>
						<Form.Field required>
							<label>Password</label>
							<input type='password' placeholder='password' password onChange={_ = (event) => { this.setState({ password: event.target.value }); }} />
						</Form.Field>
						<br />
						<Button size='tiny' color='black' onClick={() => window.location.href = "/"}>
							Cancel
			  			</Button>
						<Button
							size='tiny'
							content="Log-in"
							labelPosition='right'
							icon='checkmark'
							//make the call to redux dispatch and get go through database values and find username and password and return the usrename in
							//upper right corner can use redux if thing exosts thgen replace nav element
							onClick={_ = (event) => { this.props.gettingLogins(this.state.username, sha1(this.state.password)); this.setState({ open: false }); }}
							positive
						/>

						<Divider />
						{/* ---------------------------------------------------------------sign up------------------------------------------------------------------------ */}

						<Header>Sign-Up</Header>
						{(this.state.successSignupModal) ?
							<div>
								<Form success>
									<Message
										success
										header='Sign-Up Completed'
										content="You're signed up! Email confirmation sent! Please log-in above."
									/>
								</Form>
								<br /></div> :
							<div>
								<Form.Field required>
									<label>Username</label>
									<input placeholder='Username' onChange={_ = (event) => { this.setState({ username: event.target.value }); }} />
								</Form.Field>
								<Form.Field required>
									<label>Password</label>
									<input type='password' placeholder='password' password onChange={_ = (event) => { this.setState({ password: event.target.value }); }} />
								</Form.Field>


								<Form.Field required>
									<label>Email</label>
									<input placeholder='Email' onChange={_ = (event) => { this.setState({ email: event.target.value }); }} />
								</Form.Field>
								{/* should be an option to get email notifications on interactions on posts */}
								{/* <Form.Field>
									<Checkbox onChange={_ = (e, data) => {
										checkedState = data.checked;
										
									}} label='I want to recieve notifications ' />  <Popup content='Get post interaction notifications. Stop recieving notifications by replying to a grapevine email.' trigger={<Button size='tiny' icon='info' />} />

								</Form.Field> */}

								<Form.Field>
									<Checkbox onChange={_ = (e, data) => {
										checkedState = data.checked;
									}} label='I agree to the' /> <a href='https://drive.google.com/file/d/1HqIpf1xQESMcloMaMHmjh78f60PsdZA3/view?usp=sharing'>Terms and Conditions</a>
								</Form.Field>
							</div>}
						{/* <Form.Field required>
								<label style={{ 'float': 'left' }}>First name</label>
								<input placeholder='First name' onChange={_ = (event) => { this.setState({ firstName: event.target.value }); }} />
								</Form.Field>
								<Form.Field required>
								<label style={{ 'float': 'left' }}>Last name</label>
								<input placeholder='Last name' onChange={_ = (event) => { this.setState({ firstName: event.target.value }); }} />
								</Form.Field> */}

					</Form>
					<br />
					<Button size='tiny' color='black' onClick={() => window.location.href = "/"}>
						Cancel
			  		</Button>
					<Button
						size='tiny'
						content="Sign-up"
						labelPosition='right'
						icon='checkmark'
						onClick={_ = (event) => {
						if (this.state.email && this.state.username && this.state.password && checkedState===true){
							this.setState({givethemerror: false});
							this.handleSuccessOfSigning();
							
						} 
						else{
							this.setState({givethemerror:true});
						}
						}
						}
						positive
					/>
					{this.state.givethemerror ? <Message error><span>Please make sure you've entered the fields correctly and accepted the terms & conditions</span></Message> : ''}
				</Container>
			</Segment>

		);
	}
}

const mapStateToProps = state => ({
	usersLoading: state.users.loading,
	usersError: state.users.error,
	usersLogins: state.users.logins,
	usersLoginsLoading: state.users.loginsLoading,
});

const mapDispatchToProps = (dispatch) => {
	return {
		postingSignup: (u, p, e) => dispatch(postSignup(u, p, e)),
		gettingLogins: (lu, lp) => dispatch(getLogins(lu, lp))

	}
}




export default connect(mapStateToProps, mapDispatchToProps)(Login)