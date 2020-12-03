import React from "react"
import PropTypes from "prop-types"

//ReactStarsRatingを用いてscoreを表す
import ReactStars from './ReactStars.js'
//Eachreview.jsxの子コンポーネント
class Reviewhoverpop extends React.Component {
  render() {
    return (
      <div className="windowinfo">
        <div className="windowinfo_text">
          <p className="inline">滞在理由:</p>
          <p className="inline blue"> Clickで詳細表示！</p>
          <p className="answer">{this.props.reason}</p>
          <p className="windowinfo_score">住み心地: <span className="answer">{this.props.score}</span></p>
          <div className="windowinfo_star"><ReactStars value={this.props.score} isEdit={false} size={20} /></div>
        </div>
      </div>
    );
  }
}
Reviewhoverpop.propTypes = {
  reason: PropTypes.string,
  address: PropTypes.string,
  score: PropTypes.number,
}
export default Reviewhoverpop
