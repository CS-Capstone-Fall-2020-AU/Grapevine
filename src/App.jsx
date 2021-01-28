import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main';
import Navigation from './components/navigation';
import { Button, Modal, Label, List, Menu, Container, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';

import About from './components/about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './components/homepage'
import Companies from './components/companies'
import CompanyPage from './components/companyPage';
import Login from './components/login';
import Footing from './components/footing'
import PositionReviews from './components/positionReviews'





function App() {
  return (
    <div style={{'minHeight':'max-content', 'height': '100%', 'width': 'initial'}}>
      <Router>
        <Switch>
          <Route path='/about' exact component={About} />
          <Route path='/companies' exact component={Companies} />
          <Route path='/' exact component={Homepage} />
          <Route path='/ratings/:id' render={(id) => <CompanyPage data={id} />} />
          <Route path='/login' exact component={Login} />
          <Route path='/positionReviews/:item' exact component={PositionReviews} />
        </Switch>
      </Router>
      <br />
      <Divider hidden />
      <Footing />
    </div>

  );
}

export default App;
