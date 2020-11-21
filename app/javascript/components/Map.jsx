import React from "react"
import PropTypes from "prop-types"

//cssはmap.scssに共通で書いて反映させる
import './Map.scss';

//{yarn add dotenv}でダウンロードし、.envにkeyを追加
require('dotenv').config()
const API_KEY = process.env.GOOGLE_API_KEY

//{yarn add google-map-react}をコンテナ内で入力して、packageをダウンロードする必要がある
import GoogleMapReact from 'google-map-react'

//Hoverpin.jsxをimport
import Hoverpin from './Hoverpin.jsx'
//Checkform.jsxをimport
import Checkform from './Checkform.jsx'
//Allreviews.jsxをimport
import Eachreview from './Eachreview.jsx'

//fullscreen解除用
const defaultMapOptions = {
  fullscreenControl: false,
};

//map parent component
class Map extends React.Component {
  //set the default props
  constructor(props) {
    super(props);
    this.state = {
      center: { center: { lat: 0, lng: 0 } },
      reviews: [],
    };
    //bind(this)はthisを固定してどの関数で呼び出しても同じthisになる
    this.fetchCenter = this.fetchCenter.bind(this);
    this.MapfetchReviews = this.MapfetchReviews.bind(this);
  }
  static defaultProps = {
    /* propsはMapでは使われないが念の為おいておく
    center: {
      lat: 34.4111,
      lng: 135.3112
    },*/
    zoom: 10
  };
  //new.jsonからcenter情報を取得して、stateのcenterを更新する
  fetchCenter() {
    fetch("/reviews/new.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            center: {
              lat: result.lat,
              lng: result.lng
            }
          });
        },
        (error) => {
          this.setState({
            error: error
          })
        }
      )
  };
  //index.jsonから作成されているreviewデータを取得する
  MapfetchReviews() {
    fetch("/reviews.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(
        (data) => {
          console.log(data)
          this.setState(
            { reviews: data }
          );
        }
      )
  };
  componentDidMount() {
    //立ち上げ時に情報を更新
    //centerの情報を取得して、
    this.fetchCenter()
    //reviewsのデータを取得する
    this.MapfetchReviews()
  }

  render() {
    //stateのreviews配列のデータからEachreviewcomponentを作成する関数
    const buildEachreview = this.state.reviews.map((review) => (
      <Eachreview
        key={review.id}
        reason={review.reason}
        duration={review.duration}
        good={review.good}
        bad={review.bad}
        advice={review.advice}
        address={review.address}
        lat={review.lat}
        lng={review.lng}
      />
    ));
    //ここまで

    if (this.state.error) {
      return (<div>Error: {this.state.error.message}</div>)
    }
    else {
      return (
        // Important! Always set the container height explicitly
        <div className="Googlemap">
          <GoogleMapReact
            bootstrapURLKeys={{
              //API_KEYは絶対に直接入力しない　過去のものは変更済み
              key: API_KEY
            }}
            //defaultCenter・defaultZoomは値が固定されるので避けるべき
            center={this.state.center}
            zoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            defaultOptions={defaultMapOptions}
          >
            <Hoverpin
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              authenticityToken={this.props.authenticityToken}
            />
            {/* この関数でEachreviews componentを全て作成 */}
            {buildEachreview}
          </GoogleMapReact>
          <Checkform
            url="/reviews/check"
            authenticityToken={this.props.authenticityToken}
            parentMethod={this.fetchCenter}
          />
        </div>
      );
    }
  }
}
Map.propTypes = {
  authenticityToken: PropTypes.string
};
export default Map
