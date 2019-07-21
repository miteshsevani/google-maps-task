import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    center: {},
    zoom: 3
  };    
  
  getMarkers(data) {
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
      showingInfoWindow: true,
      center: props.position,
      zoom: 4      
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
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
        onClick = { this.onMapClick }
        zoom={this.state.zoom}
        style={mapStyles}
        initialCenter={{lat: 47,lng: 29}}     
        center={this.state.center}   
      >        

        { this.getMarkers(this.props.data) }

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