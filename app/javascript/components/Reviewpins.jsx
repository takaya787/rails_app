import React from "react"
import PropTypes from "prop-types"

//Eachreview.jsxをimport
import Eachreview from './Eachreview.jsx'

class Reviewpins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    this.fetchReviews = this.fetchReviews.bind(this);
  }
  //index.jsonからreviewsのデータを取得して、stateに設定
  fetchReviews() {
    fetch(this.props.url)
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
    this.fetchReviews()
  }

  render() {
    //stateのreviews配列のデータからeachreviewcomponentを作成
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
        lon={review.lon}
      />
    ));
    return (
      <div>
        {buildEachreview}
      </div>
    );
  }
}
Reviewpins.propTypes = {
  url: PropTypes.string,
};
export default Reviewpins
