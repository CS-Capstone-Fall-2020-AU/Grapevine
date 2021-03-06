import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main';
import Navigation from './components/navigation';
import { Button, Modal, Label, List, Menu, Input, Segment, Divider, Search, Grid, Header, Icon, Dropdown, Image, GridColumn } from 'semantic-ui-react';
import Logo from './images/grLogo.png';
import rev1 from './images/fakerev4.png';
import rev2 from './images/fakerev7.png';
import rev3 from './images/fakerev8.png';
import TopRatings from './components/companies';
import mysound from './images/sound1.mp3';
import About from './components/about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './components/homepage'
import Companies from './components/companies'
import CompanyPage from './components/companyPage';
import Login from './components/login';




function App() {
  return (
    
    <div className="App">
      
      <Router>
      <Navigation />
        <Switch>
          <Route path='/about' exact component={About} />
          <Route path='/companies' exact component={Companies} />
          <Route path='/'exact component={Homepage} />
          <Route path='/ratings/:id'  render = {(id) => <CompanyPage data={id} />} />
          <Route path='/login' exact component={Login} />
        </Switch>






      </Router>
    </div>
  );
}

export default App;
