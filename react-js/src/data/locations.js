import axios from "axios";

module.exports = {
  getLocations: function() {        
    let requestUrl = 'https://s3-eu-west-1.amazonaws.com/omnifi/techtests/locations.json';    
    return axios.get(requestUrl).then((res) => {
      if(res.data) {
        return res.data;                
      } else {
        throw new Error('Error: Data not loaded');
      }
    },(err) => {
      throw new Error(err, 'Error: Data not loaded');
    });
  }
}