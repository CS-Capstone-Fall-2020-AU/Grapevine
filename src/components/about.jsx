
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Jumbotron, Carousel } from 'react-bootstrap';
import { Button, Container, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn, SegmentInline } from 'semantic-ui-react';
import App from '../App'


export default class About extends Component {
	render() {
		return (
			<div>
				<br />
				<Header as='h2' textAlign='center'>What is Grapevine?</Header>
				<Container textAlign='center'>Our Vision</Container>
				<Container textAlign='justified'>
					<b>Heard it through the...</b>
					<Divider />
					<p>
						Grapevine will be a place where students, both undergraduate and
						graduate, can collectively build knowledge on different internships that are available. Users will
						be able to create internship pages for a company, and then post ratings so that
						other students doing research can make more informed decisions when deciding between offers
						or even just researching the kind of work that they would like to do. Conversely, universities can
						utilize these company pages as resources when advertising recruiting events to let students
						know what other students liked about working at that company.
      				</p>
					<p>
						COVID-19 has made internships even more difficult than they already are for students. A
						place where knowledge about internships can be organized will aid students in this difficult
						process, as well as allow for easier feedback to companies and universities about the internship
						process as a whole.
					</p>
				</Container>
				<br />
				<br />
				<Container textAlign='justified'>
					<Header as='h2' textAlign='center'>Meet the creators of Grapevine</Header>
					<Divider />
					<br />
					<Grid>
						<Grid.Column width={6}>
							<Image style={{ 'margin': 'auto', 'padding': '0 !important' }} size='medium' src='https://pbs.twimg.com/profile_images/1303503587629297664/CgCeWBVk_400x400.jpg' circular />
						</Grid.Column>
						<Grid.Column width={10} style={{ 'margin': 'auto', 'padding-right': '10%' }}>
							<strong>Elisabetta Gabriele</strong> is a software engineer, currently pursuing a BS in Computer Science at American University.
						Upon graduating, she will continue her work as a software engineer, endeavoring to aid individuals where possible through programming. Elisabetta is also
						a passionate advocate for women in stem.
					</Grid.Column>
					</Grid>
					<Divider />
					<Grid>
						<Grid.Column width={10} style={{ 'margin': 'auto', 'paddingLeft': '10%' }}>
							<strong>Drew Meseck </strong>is currently pursuing a BS in Computer Science and Economics at American University.
						Upon graduating, he will work for Freddie Mac and continue working on projects involving data science and analytics.
					</Grid.Column>
						<Grid.Column width={6}>
							<Image style={{ 'margin': 'auto', 'padding': '0 !important' }} size='medium' src='https://media-exp1.licdn.com/dms/image/C5603AQFLhCMCbQKPiA/profile-displayphoto-shrink_400_400/0?e=1607558400&v=beta&t=vWDgy6pcq8PvKhNdDZfiiExUgqcvD0WR6lOb27gj8bs' circular />
						</Grid.Column>
					</Grid>
				</Container>
			</div>
		);
	}
}



