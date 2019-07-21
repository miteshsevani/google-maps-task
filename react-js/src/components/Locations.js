import React, { Component } from 'react';

export default class Locations extends Component {  
  render() {
    const {data} = this.props;
    return (
        <div className="pins">
        <h3>Locations</h3>
        <ul id="locations">
          {data.map((location, key) => {            
            return (
              <li key={key}>{location.name}</li>
            );
          })}
        </ul>
      </div>
    )
  }
}