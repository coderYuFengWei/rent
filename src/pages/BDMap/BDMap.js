import React, {Component,Fragment} from 'react';

class BDMap extends Component {
  componentDidMount() {
    const BMap = window.BMap;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      var myGeo = new BMap.Geocoder();
      myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
        console.log(result)
        alert(result.address)
      })
    })
  }
  render() {
    return ( 
      <Fragment >

      </Fragment>
    )
  }
}

export default BDMap;