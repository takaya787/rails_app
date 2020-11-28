import React from "react"
import PropTypes from "prop-types"
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
          <label htmlFor="review_reason">滞在理由(30字以内）<span className="required">＊必須</span></label>
          <input className="form" type="text" name="review[reason]" id="review_reason" value={this.state.review_reason} onChange={this.handleChange} required />

          <label htmlFor="review_duration">期間(月)　<span className="required">＊必須</span></label>
          <input className="form" type="number" name="review[duration]" id="review_duration" value={this.state.review_duration} onChange={this.handleChange} required />

          <label htmlFor="review_food">食生活について教えてください(150字以内)</label>
          <textarea className="form textarea" name="review[food]" id="review_food" value={this.state.review_food} onChange={this.handleChange} />

          <label htmlFor="review_convenient">インフラなどの利便性について教えてください(150字以内)</label>
          <textarea className="form textarea" name="review[convenient]" id="review_convenient" value={this.state.review_convenient} onChange={this.handleChange} />

          <label htmlFor="review_favorite">あなたのお気に入りについて教えてください(150字以内）</label>
          <input className="form" type="text" name="review[favorite]" id="review_favorite" placeholder="現地のお気に入りのお店、場所、食べ物について教えてください" value={this.state.review_favorite} onChange={this.handleChange}
          />

          <label htmlFor="review_advice">次に来る人へのアドバイス(150字以内)</label>
          <textarea className="form textarea" name="review[advice]" id="review_advice" value={this.state.review_advice} onChange={this.handleChange} />

          <label htmlFor="review_score">住み心地はいかがでしたか？　<span className="required">＊必須</span></label>
          <input className="form" type="number" name="review[score]" id="review_score" value={this.state.review_score} onChange={this.handleChange} required />

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
