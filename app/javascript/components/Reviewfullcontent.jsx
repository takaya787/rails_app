import React from "react"
import PropTypes from "prop-types"
import Reviewform from "./Reviewform";
class Reviewfullcontent extends React.Component {
  render() {
    return (
      <div className="contents">
        <button className="button" onClick={this.props.Reviewcontroll}>✕</button>
        <div className="content">
          <p>理由　{this.props.reason}</p>
          <p>期間　{this.props.duration}ヵ月</p>
          <p>行った良かった点　{this.props.good}</p>
          <p>残念だった点　{this.props.bad}</p>
          <p>アドバイス　{this.props.advice}</p>
        </div>
      </div>
    );
  }
}
Reviewfullcontent.PropTypes = {
  reason: PropTypes.string,
  duration: PropTypes.number,
  good: PropTypes.string,
  bad: PropTypes.string,
  advice: PropTypes.string,
  //address: PropTypes.string,
  Reviewcontroll: PropTypes.func,
};
export default Reviewfullcontent
