import React from "react"
import PropTypes from "prop-types"
import Reviewform from "./Reviewform";
// Eachreview.jsxの子コンポーネント
class Reviewfullcontent extends React.Component {
  render() {
    return (
      <div className="contents">
        <button className="button" onClick={this.props.Reviewcontroll}>✕</button>
        <div className="content">
          <p className="content_title">理由</p>
          <p className="content_text">{this.props.reason}</p>
          <p className="content_title">期間</p>
          <p className="content_text">{this.props.duration}ヵ月</p>
          <p className="content_title">行った良かった点</p>
          <p className="content_text">{this.props.good}</p>
          <p className="content_title">残念だった点</p>
          <p className="content_text">{this.props.bad}</p>
          <p className="content_title">アドバイス</p>
          <p className="content_text">{this.props.advice}</p>
        </div>
        {/* reviewの編集ボタンはUserとcurrentUserが等しい時のみ表示*/}
        {this.props.User == this.props.currentUser && (
          <button onClick={this.props.Editcontroll}>投稿を編集</button>
        )}
      </div>
    );
  }
}
Reviewfullcontent.propTypes = {
  reason: PropTypes.string,
  duration: PropTypes.number,
  good: PropTypes.string,
  bad: PropTypes.string,
  advice: PropTypes.string,
  Reviewcontroll: PropTypes.func,
  //address: PropTypes.string,
  //edit form関連
  User: PropTypes.number,
  currentUser: PropTypes.number,
  Editcontroll: PropTypes.func,
};
export default Reviewfullcontent
