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



export default class Homepage extends Component {
	render() {
		return (
<span>
			<Grid divided='vertically' centered inverted id="front-grid">
				<Grid.Row columns={3} id='first-div'>
					<Grid.Column >
						<Fade bottom={true}><Image id='logo' src={Logo} size='medium'/></Fade>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row >
					<Main />
				</Grid.Row>
			</Grid>
			

			
			</span>
			


		);
	}
}

