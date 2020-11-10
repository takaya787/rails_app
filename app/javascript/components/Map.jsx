import React from "react"
import PropTypes from "prop-types"
//{yarn add dotenv}でダウンロードし、.envにkeyを追加
require('dotenv').config()
//{yarn add google-map-react}をコンテナ内で入力して、packageをダウンロードする必要がある
import GoogleMapReact from 'google-map-react'
import './Map.scss'
const API_KEY = process.env.GOOGLE_API_KEY
class Map extends React.Component {
  //set the default props
  static defaultProps = {
    center: {
      lat: 34.4111,
      lng: 135.3112
    },
    zoom: 8
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="Googlemap" style={{ height: '100vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        </GoogleMapReact>
      </div>
    );
  }
}
export default Map
