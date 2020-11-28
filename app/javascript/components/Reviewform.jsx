import React from "react"
import PropTypes from "prop-types"
//ReactStarsRatingを用いた評価用のcomponent
import ReactStars from './ReactStars.jsx'

//hoverpin.jsxの子コンポーネント
class Reviewform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review_reason: '',
      review_duration: 1,
      review_food: '',
      review_convenient: '',
      review_favorite: '',
      review_advice: '',
      review_score: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scoreChange = this.scoreChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  handleSubmit(event) {
    console.log(this.state);
    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.props.authenticityToken,
      },
      body: JSON.stringify({
        /* reviewのストロングパラメーターを設定する */
        review: {
          reason: this.state.review_reason,
          duration: this.state.review_duration,
          food: this.state.review_food,
          convenient: this.state.review_convenient,
          favorite: this.state.review_favorite,
          advice: this.state.review_advice,
          score: this.state.review_score
        },
        lat: this.props.lat,
        lng: this.props.lng,
      })
    }).then(
      //reviewformをpostした後indexからjson読み込んでstateを更新
      this.props.parentFetchreviews
    );
    //投稿を送信後にformを閉じる
    this.props.formClose();
    // event.preventDefaultは最後に置く
    event.preventDefault();
  }
  //review_scoreを更新するための関数
  scoreChange(value) {
    //console.log(value);
    this.setState({
      review_score: value,
    });
  }

  render() {
    return (
      <div className="draft">
        <button className="draft_button" onClick={this.props.formClose}>✕</button>
        <form
          className="draft_form"
          // onSubmit={this.handleSubmit}
          action={this.props.url} acceptCharset="UTF-8" method="post" data-remote="true">
          <h3>投稿内容を入力してください</h3>
          {/* ここでまとめて隠し要素設置*/}
          <input type="hidden" name="authenticity_token"
            value={this.props.authenticityToken}
          />
          <input type="hidden" name="lat"
            value={this.props.lat}
          />
          <input type="hidden" name="lng"
            value={this.props.lng}
          />
          {/* ここまで隠し要素*/}
          <label htmlFor="review_reason">滞在理由について(30字以内）<span className="required">＊必須</span></label>
          <input className="form" type="text" name="review[reason]" id="review_reason" value={this.state.review_reason} onChange={this.handleChange} required
            placeholder="滞在した理由や目的について"
          />

          <label className="labelnumber" htmlFor="review_duration">滞在期間(月)<span className="required">＊必須</span></label>
          <input className="form number" type="number" name="review[duration]" id="review_duration" value={this.state.review_duration} onChange={this.handleChange} required />

          <label htmlFor="review_food">食生活について(150字以内)</label>
          <textarea className="form textarea" name="review[food]" id="review_food" value={this.state.review_food} onChange={this.handleChange}
            placeholder="現地での食生活や食事で困ったことなど" />

          <label htmlFor="review_convenient">利便性について(150字以内)</label>
          <textarea className="form textarea" name="review[convenient]"
            placeholder="インフラや公共交通機関について"
            id="review_convenient" value={this.state.review_convenient} onChange={this.handleChange} />

          <label htmlFor="review_favorite">お気に入り(150字以内）</label>
          <textarea className="form textarea" name="review[favorite]" id="review_favorite" placeholder="現地でのお気に入りの物や場所について" value={this.state.review_favorite} onChange={this.handleChange}
          />
          <label htmlFor="review_advice">次に来る人へのアドバイス(150字以内)</label>
          <textarea className="form textarea" name="review[advice]" id="review_advice" value={this.state.review_advice} onChange={this.handleChange} placeholder="何か気をつけたほうがいいことなど" />

          <label htmlFor="review_score">住み心地はいかがでしたか？　<span className="required">＊必須</span></label>
          <ReactStars
            parentscoreChange={this.scoreChange}
            size={25}
          // value={3}
          // isEdit={false}
          />
          {/*　scoreformは隠し要素にして問題ないはず */}
          <input className="form" type="hidden" name="review[score]" id="review_score" value={this.state.review_score} onChange={this.handleChange} required />

          <button className="form_submit" type="button" name="submit" onClick={this.handleSubmit}>投稿を送信</button>
        </form>
      </div>
    );
  }
}

Reviewform.propTypes = {
  url: PropTypes.string,
  authenticityToken: PropTypes.string,
  formClose: PropTypes.func,
  parentFetchreviews: PropTypes.func,
  lat: PropTypes.number,
  lng: PropTypes.number,
};
export default Reviewform
