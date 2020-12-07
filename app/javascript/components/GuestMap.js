import React from "react"
import PropTypes from "prop-types"

//cssはmap.scssに共通で書いて反映させる
import './Map.scss';

//{yarn add dotenv}でダウンロードし、.envにkeyを追加
require('dotenv').config()
const API_KEY = process.env.GOOGLE_API_KEY

//{yarn add google-map-react}をコンテナ内で入力して、packageをダウンロードする必要がある
import GoogleMapReact from 'google-map-react'


//Checkform.jsxをimport
import Checkform from './Checkform.js'
//Allreviews.jsxをimport
import Eachreview from './Eachreview.js'

//fullscreen解除用
const defaultMapOptions = {
  fullscreenControl: false,
};

class GuestMap extends React.Component {
  //set the default props
  constructor(props) {
    super(props);
    this.state = {
      center: { center: { lat: 0, lng: 0 } },
      reviews: [],
      zoom: 10,
    };
    //bind(this)はthisを固定してどの関数で呼び出しても同じthisになる
    this.fetchCenter = this.fetchCenter.bind(this);
    this.MapfetchReviews = this.MapfetchReviews.bind(this);
    this.zoomin = this.zoomin.bind(this);
  }
  //checkformで検索後拡大する
  zoomin() {
    this.setState({
      zoom: 12,
    });
  };
  //guest.jsonからcenter情報を取得して、stateのcenterを更新する
  fetchCenter() {
    fetch("/guest.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            center: {
              lat: result.lat,
              lng: result.lng,
            },
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
    const buildEachreview = this.state.reviews.map((review) => (
      <Eachreview
        key={review.id}
        //reviewの内容
        id={review.id}
        reason={review.reason}
        duration={review.duration}
        food={review.food}
        convenient={review.convenient}
        favorite={review.favorite}
        score={review.score}
        advice={review.advice}
        //ここから位置情報
        address={review.address}
        lat={review.lat}
        lng={review.lng}
        //その他
        currentUser={0}
        User={review.user_id}
        authenticityToken={this.props.authenticityToken}
        parentFetchreviews={this.MapfetchReviews}
      />
    ));
    //ここまで
    return (
      <div className="Googlemap">
        <p className="Googlemap_description">ピンをタッチして、ピンの位置を操作できます。
            <br className="common__sp-only" /> <span><a href="/beginner#index" className="link">詳しい使い方はこちら</a></span></p>
        <GoogleMapReact
          bootstrapURLKeys={{
            //API_KEYは絶対に直接入力しない　過去のものは変更済み
            key: API_KEY
          }}
          //defaultCenter・defaultZoomは値が固定されるので避けるべき
          center={this.state.center}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
        /* これをonにしたらfull画面ボタンoffになる */
        //defaultOptions={defaultMapOptions}
        >
          {/* この関数でEachreviews componentを全て作成 */}
          {buildEachreview}
        </GoogleMapReact>
        <Checkform
          url="/reviews/check"
          authenticityToken={this.props.authenticityToken}
          movetoCenter={this.fetchCenter}
          parentzoomin={this.zoomin}
        />
      </div>
    );
  }
}
GuestMap.propTypes = {
  authenticityToken: PropTypes.string,
  currentUser: PropTypes.number,
};
export default GuestMap
