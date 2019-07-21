import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Locations from './Locations';
import MapWrapper from './MapWrapper';

const url = 'https://s3-eu-west-1.amazonaws.com/omnifi/techtests/locations.json'

export default class App extends Component {

  state = {
    locations: []
  }
  
  componentDidMount() {
    axios.get(url)
      .then(res => {
        if(res.data) {
          const locations = res.data;
          this.setState({ locations });
        } else {
          throw new Error('Error: No datat loaded');
        }
      },(err) => {
        throw new Error(err);
      })
  }

   render() {
     /* #######
     Can only use if CORS is disable din the browser due to CORS policy: No 'Access-Control-Allow-Origin'
     //const data = this.state.locations;
     ######## */
     const data = require('../data/locations.json');
    return (
      <div>
        <Header />
        <Locations data={ data } />
        <MapWrapper data={ data } />        
      </div>
    );
  }
}