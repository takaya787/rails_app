import React from "react"
import PropTypes from "prop-types"
//{yarn add dotenv}でダウンロードし、.envにkeyを追加
require('dotenv').config()
const API_KEY = process.env.GOOGLE_API_KEY
//{yarn add google-map-react}をコンテナ内で入力して、packageをダウンロードする必要がある
import GoogleMapReact from 'google-map-react'

import './Map.scss'

//Hoverpin.jsxをimport
import Hoverpin from './Hoverpin.jsx'

//map parent component
class Map extends React.Component {
  //set the default props
  static defaultProps = {
    center: {
      lat: 34.4111,
      lng: 135.3112
    },
    zoom: 10
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="Googlemap" style={{ height: '90vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <Hoverpin
            lat={this.props.center.lat}
            lng={this.props.center.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
Map.propTypes = {
  center: PropTypes.object
};
export default Map
