import React from "react"
import PropTypes from "prop-types"

//ReactStarsRatingを用いてscoreを表す
import ReactStars from './ReactStars.jsx'
// Eachreview.jsxの子コンポーネント
class Reviewfullcontent extends React.Component {
  render() {
    return (
      <div className="contents">
        <button className="button" onClick={this.props.Reviewcontroll}>✕</button>
        <div className="content">
          <p className="content_title">住み心地</p>
          <p className="content_score">{this.props.score}</p>
          <div className="content_star"><ReactStars value={this.props.score} isEdit={false} size={20} /></div>
          <p className="content_title">理由</p>
          <p className="content_text">{this.props.reason}</p>
          <p className="content_title">滞在期間</p>
          <p className="content_text">{this.props.duration}ヵ月</p>
          <p className="content_title">食生活</p>
          <p className="content_text">{this.props.food}</p>
          <p className="content_title">インフラなどの利便性</p>
          <p className="content_text">{this.props.convenient}</p>
          <p className="content_title">お気に入り</p>
          <p className="content_text">{this.props.favorite}</p>
          <p className="content_title">アドバイス</p>
          <p className="content_text">{this.props.advice}</p>
        </div>
        {/* reviewの編集ボタンはUserとcurrentUserが等しい時のみ表示 */}
        {this.props.User == this.props.currentUser && (
          <button className="editbutton" onClick={this.props.Editcontroll}>編集する</button>
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
