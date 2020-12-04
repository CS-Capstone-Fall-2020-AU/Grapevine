import React from 'react';
import logo from '../logo.svg';
import { Component } from 'react';
import Main from './main';
import Navigation from './navigation';
import { Button, Container, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import Logo from '../images/16000.png';
import TopRatings from './companies';
import About from './about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reveal from 'react-reveal/Jump';
import Fade from 'react-reveal/Zoom';


export default class Footing extends Component {
	render() {
		return (

			<Grid columns={3} style={{ 'backgroundColor': 'rgba(161, 151, 170, 0.288)'}}>
				<Grid.Column><Container textAlign='center'>
					<Image src={Logo} size='tiny' style={{'margin': 'auto'}} />
					</Container>
				</Grid.Column>
				<Grid.Column>
					<Container textAlign='center'><Header as='h4'>Contact</Header>
				For business inquiries or site concerns:
				<br />
				Email: grapevine.internships@gmail.com
				<br /></Container>


				</Grid.Column>

				<Grid.Column>
					<Container textAlign='center'><Header as='h4'>Follow us</Header>

						<a href='https://twitter.com/grapevineinter1'><Icon name='twitter' size='large' /></a>
						<a href='https://www.facebook.com/Grapevine_internships-108858171077586'><Icon name='facebook' size='large' /></a>
						<a href='https://www.instagram.com/grapevine.internships/'><Icon name='instagram' size='large' /></a>
					</Container>

				</Grid.Column>
			</Grid>

		

		);
	}
}

