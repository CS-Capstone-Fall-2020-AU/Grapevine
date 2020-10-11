
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import faker from 'faker';
import { Button, Container, Table, Rating, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import App from '../App'
import rev4 from '../images/dividerVine4.png';
import rev5 from '../images/dividerVine4.png';
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Shake';




//so if the ssid is 1 then i want to fetch the spectral data, go to the first entry and collect the spectral data
export default class Main extends Component {



	render() {
		return (

			<Container textAlign='justified'>
				<Grid>

					<Grid.Row columns='equal'>
						<Grid.Column className='column' >
							<Fade bottom cascade={true}>
								<Table collapsing>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell >Company</Table.HeaderCell>
											<Table.HeaderCell>Reviews</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										<Table.Row>
											<Table.Cell collapsing>
												<Header as='h4' image>
													<Image src='https://i.pcmag.com/imagery/reviews/05UyOgWkeofWVPlLbDVk0m7-11.1569471426.fit_scale.size_1028x578.jpg' rounded size='mini' />
													<Header.Content>
														Salesforce
									</Header.Content>
												</Header>
											</Table.Cell >
											<Table.Cell collapsing>44</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell collapsing>
												<Header as='h4' image>
													<Image src='https://pbs.twimg.com/profile_images/654642053356351488/hwcKbeVj_400x400.png' rounded size='mini' />
													<Header.Content>
														Freddie Mac
									</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell collapsing>21</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell collapsing>
												<Header as='h4' image>
													<Image src='https://media.glassdoor.com/sqll/5634/the-aerospace-corporation-squarelogo-1532918709192.png' rounded size='mini' />
													<Header.Content>
														Aerospace Corporation
									</Header.Content>
												</Header>
											</Table.Cell >
											<Table.Cell collapsing>12</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell collapsing>
												<Header as='h4' image>
													<Image src='https://www.renaissancecapital.com/logos/PALAN.RC_logo_fb.jpg' rounded size='mini' />
													<Header.Content>
														Palantir
									</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell collapsing>11</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Fade>
						</Grid.Column>


						{/* 	<Image src={rev4} size='small' /> */}



						<Grid.Column className='column'>

							<Search fluid={true} size={"huge"} defaultValue='Search here' className='search-box' size='medium'></Search>
						</Grid.Column>

						{/* 			<Image src={rev5} size='small' /> */}




						<Grid.Column className='column'>
							<Fade bottom cascade={true}>
								<List ordered>
									<List.Header>Recent Positions</List.Header>
									<List.Item as='a'>Software Engineer</List.Item>
									<List.Item as='a'>Solutions Engineer</List.Item>
									<List.Item as='a'>Data Scientist</List.Item>
									<List.Item as='a'>Technology Consultant</List.Item>
								</List>

							</Fade>

						</Grid.Column>
					</Grid.Row>

				</Grid>
			</Container>
		);
	}
}



