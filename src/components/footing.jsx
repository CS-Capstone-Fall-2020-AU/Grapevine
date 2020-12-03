import React from 'react';
import logo from '../logo.svg';
import { Component } from 'react';
import Main from './main';
import Navigation from './navigation';
import { Button, Container, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import Logo from '../images/jv7000.png';
import TopRatings from './companies';
import About from './about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reveal from 'react-reveal/Jump';
import Fade from 'react-reveal/Zoom';


export default class Footing extends Component {
	render() {
		return (

			<Grid columns={3} className='footer' padded='horizontally' style={{ 'backgroundColor': 'rgba(161, 151, 170, 0.288)' }}>
				<Grid.Column>
					<Image style={{ 'float': 'left' }} src={Logo} size='tiny' />
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

						<Icon link name='twitter' size='large' />
						<Icon link name='facebook' size='large' />
						<Icon link name='instagram' size='large' /></Container>

				</Grid.Column>
			</Grid>
		

		);
	}
}
