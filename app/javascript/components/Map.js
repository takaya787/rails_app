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
import Hoverpin from './Hoverpin.js'
//Checkform.jsxをimport
import Checkform from './Checkform.js'
//Allreviews.jsxをimport
import Eachreview from './Eachreview.js'

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
      zoom: 6.0,
    };
    //bind(this)はthisを固定してどの関数で呼び出しても同じthisになる
    this.fetchCenter = this.fetchCenter.bind(this);
    this.MapfetchReviews = this.MapfetchReviews.bind(this);
    this.zoomin = this.zoomin.bind(this);
    this.Goup = this.Goup.bind(this);
    this.Godown = this.Godown.bind(this);
    this.Goright = this.Goright.bind(this);
    this.Goleft = this.Goleft.bind(this);
  }
  //reviewを投稿できるので、zoom少し大きめ
  zoomin() {
    this.setState({
      zoom: 9.0,
    });
  };
  /*ここからHoverpinを移動させるためのの関数４つ続く*/
  //1  上に行く
  Goup() {
    let latitude = this.state.center.lat;
    latitude += 0.01
    this.setState({
      center: {
        lat: latitude,
        lng: this.state.center.lng,
      }
    });
    console.log({ latitude });
  };
  //2  下に行く
  Godown() {
    let latitude = this.state.center.lat;
    latitude -= 0.01
    this.setState({
      center: {
        lat: latitude,
        lng: this.state.center.lng,
      }
    });
    console.log({ latitude });
  };
  //3  右に行く
  Goright() {
    let longitude = this.state.center.lng;
    longitude += 0.01
    this.setState({
      center: {
        lat: this.state.center.lat,
        lng: longitude,
      }
    });
    console.log({ longitude });
  };
  //4  左に行く
  Goleft() {
    let longitude = this.state.center.lng;
    longitude -= 0.01
    this.setState({
      center: {
        lat: this.state.center.lat,
        lng: longitude,
      }
    });
    console.log({ longitude });
  };
  /*ここまでHoverpinを移動させる関数*/
  //new.jsonからcenter情報を取得して、stateのcenterを更新する
  fetchCenter() {
    fetch("/reviews/new.json")
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
    //stateのreviews配列のデータからEachreviewcomponentを作成する関数
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
        currentUser={this.props.currentUser}
        User={review.user_id}
        authenticityToken={this.props.authenticityToken}
        parentFetchreviews={this.MapfetchReviews}
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
            zoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
          /* これをonにしたらfull画面ボタンoffになる */
          //defaultOptions={defaultMapOptions}
          >
            <Hoverpin
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              authenticityToken={this.props.authenticityToken}
              parentFetchreviews={this.MapfetchReviews}
              MapGoup={this.Goup}
              MapGodown={this.Godown}
              MapGoright={this.Goright}
              MapGoleft={this.Goleft}
            />
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
}
Map.propTypes = {
  authenticityToken: PropTypes.string,
  currentUser: PropTypes.number,
};
export default Map
