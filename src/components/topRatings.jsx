
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'


import { Button, Table, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';

import App from '../App'


//so if the ssid is 1 then i want to fetch the spectral data, go to the first entry and collect the spectral data
export default class TopRatings extends Component {

  

	render() {
	  return (
		<Segment basic>
			<Header>Top Internships</Header>
			<Table celled id='ratings-table'  >
				
				<Table.Header>
				<Table.Row>
					<Table.HeaderCell singleLine width={3}>Company</Table.HeaderCell>
					<Table.HeaderCell singleLine width={2}>Internship Rating</Table.HeaderCell>
					<Table.HeaderCell width={2}>Role</Table.HeaderCell>
					{/* <Table.HeaderCell>Efficacy</Table.HeaderCell> */}
					<Table.HeaderCell width={2}>Consensus</Table.HeaderCell>
					<Table.HeaderCell>Comments</Table.HeaderCell>
				</Table.Row>
				</Table.Header>

				<Table.Body>
				<Table.Row>
					<Table.Cell>Amazon Web Services</Table.Cell>
					<Table.Cell>
						<Header as='h2' textAlign='center'>A</Header>
					</Table.Cell>
					<Table.Cell singleLine>Software Engineer</Table.Cell>
					{/* <Table.Cell>
					<Rating icon='star' defaultRating={3} maxRating={3} />
					</Table.Cell> */}
					<Table.Cell textAlign='right'>80% <br /><a href='#'>60 interns</a></Table.Cell>
					<Table.Cell>
						Creatine supplementation is the reference compound for increasing
						muscular creatine levels; there is variability in this increase,
						however, with some nonresponders.
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Space X</Table.Cell>
					<Table.Cell>
					<Header as='h2' textAlign='center'>B</Header>
					</Table.Cell>
					<Table.Cell singleLine>UI/UX Designer</Table.Cell>
					{/* <Table.Cell>
					<Rating icon='star' defaultRating={3} maxRating={3} />
					</Table.Cell> */}
					<Table.Cell textAlign='right'>100% <br /><a href='#'>62 interns</a></Table.Cell>
					<Table.Cell>
						Creatine is the reference compound for power improvement, with numbers
						from one meta-analysis to assess potency
					</Table.Cell>
				</Table.Row>
				</Table.Body>
			</Table>
			
		</Segment>
	  );
	}
  }
  
  
  
  