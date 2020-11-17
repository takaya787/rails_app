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
//Checkform.jsxをimport
import Checkform from './Checkform.jsx'

//map parent component
class Map extends React.Component {
  //set the default props
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      center: { center: { lat: 0, lng: 0 } },
    };
    //bind(this)はthisを固定してどの関数で呼び出しても同じthisになる
    this.fetchCenter = this.fetchCenter.bind(this);
  }
  static defaultProps = {
    /* propsはMapでは使われないが念の為おいておく
    center: {
      lat: 34.4111,
      lng: 135.3112
    },*/
    zoom: 10
  };
  fetchCenter() {
    fetch("http://127.0.0.1:3000/reviews/new.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            lat: result.lat,
            lng: result.lng,
          });
        },
        (error) => {
          this.setState({
            error: error
          })
        }
      )
  };
  componentDidMount() {
    fetch("http://127.0.0.1:3000/reviews/new.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            center: { lat: result.lat, lng: result.lng }
          });
        },
        (error) => {
          this.setState({
            error: error
          })
        }
      )
  }
  render() {
    if (this.state.error) {
      return (<div>Error: {this.state.error.message}</div>)
    }
    else {
      return (
        // Important! Always set the container height explicitly
        <div className="Googlemap" style={{ height: '90vh' }}>
          <div> {this.state.center.lat}</div>
          <div> {this.state.center.lng}</div>

          <Checkform //子のcheckformがsubmitされるたびに子コンポーネントがmountされるのでcomponentdidMountも自動的にMountされる
            url="http://127.0.0.1:3000/reviews/check"
            authenticityToken={this.props.authenticityToken}
            parentMethod={this.fetchCenter}
          />
          <GoogleMapReact
            bootstrapURLKeys={{
              key: API_KEY
            }}
            //defaultCenter・defaultZoomは値が固定されるので避けるべき
            center={this.state.center}
            zoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            <Hoverpin
              lat={this.state.center.lat}
              lng={this.state.center.lng}
            />
          </GoogleMapReact>
        </div>
      );
    }
  }
}
Map.propTypes = {
  authenticityToken: PropTypes.string
};
export default Map
