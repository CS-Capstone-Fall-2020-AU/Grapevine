import React from 'react';
import logo from '../logo.svg';
import { Component } from 'react';
import Main from './main';
import Navigation from './navigation';
import { Button, Container, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import Logo from '../images/fourth.png';
import rev1 from '../images/fakerev4.png';
import rev2 from '../images/fakerev7.png';
import rev3 from '../images/fakerev8.png';
import TopRatings from './topRatings';
import stock from '../images/stockfootage.mp4';

import About from './about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reveal from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';



export default class Homepage extends Component {
	render() {
		return (

			<Grid divided='vertically' centered inverted >
				<Grid.Row columns={1} >

					<Grid.Column className='first-div'>

						<Image id='logo' src={Logo} size='small' />
						{/* <Image id='rev1' src={rev1} /> <Image id='rev2' src={rev2} /> <Image id='rev3' src={rev3} /> */}

					</Grid.Column>
				</Grid.Row>

				<Grid.Row columns={1}>
					<Grid.Column className='second-div'>
						<Main />
					</Grid.Column>
				</Grid.Row>


				<Grid.Row columns={1} className='third-div'>
					<Grid.Column>

					</Grid.Column>
				</Grid.Row>



				<Segment className='whole-footer'>


					{/* <Container className='whole-footer' textAlign='left' > */}

					<Container textAlign='center' >


						<Image style={{ 'float': 'left' }} src={Logo} size='tiny' />

						<Grid columns={2} padded='horizontally'>
							<Grid.Column>
								<Container textAlign='center'><Header as='h4'>Contact</Header></Container>
								<Divider />
									For business inquiries or site concerns:
									<br />
									Email: elisabettag80@gmail.com
									<br/>
									
      						</Grid.Column>

							<Grid.Column>
								<Container textAlign='center'><Header as='h4'>Follow us</Header></Container>
								<Divider />
								<Icon link name='twitter' size='large' />
								<Icon link name='facebook' size='large' />
								<Icon link name='instagram' size='large' />
							</Grid.Column>
							
						</Grid>
					</Container>







				</Segment>



			</Grid>


		);
	}
}

