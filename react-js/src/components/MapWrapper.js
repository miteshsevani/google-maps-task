import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const data = require('../data/locations.json');

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  getMarkers() {
    return data.map((location, key) => {          
      return (
        <Marker
          key={key}
          onClick={this.onMarkerClick}
          name={location.name}
          position={{
            lat: location.latitude,
            lng: location.longitude
          }}
        />
      )
    })
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

   render() {
    return (
      <Map google={this.props.google}
        zoom={3}
        style={mapStyles}
        initialCenter={{ lat: 47, lng: 29}}
      >        

        { this.getMarkers() }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUhy6mdGjpm3QadNfSQwIX7qtCz1yYTwk'
})(MapContainer);