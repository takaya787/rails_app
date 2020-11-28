import React from "react"
import PropTypes from "prop-types"
//Eachreview.jsxの子コンポーネント
class ReviewEditform extends React.Component {
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
  };
  handleSubmit(event) {
    console.log(this.state);
    fetch("/reviews/" + this.props.id, {
      method: 'PATCH',
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
      })
    }).then(
      //reviewEditformをpostした後indexからjson読み込んでstateを更新
      this.props.parentFetchreviews
    )
    //変更を送信後にformを閉じる
    this.props.Editcontroll();
    // event.preventDefaultは最後に置く
    event.preventDefault();
  };
  componentDidMount() {
    //元のreviewの内容をvalueに設定
    this.setState({
      review_reason: this.props.reason,
      review_duration: this.props.duration,
      review_food: this.props.food,
      review_convenient: this.props.convenient,
      review_favorite: this.props.favorite,
      review_advice: this.props.advice,
      review_score: this.props.score,
    });
  }
  //ほぼReviewform componentと同じでcssも共通
  render() {
    return (
      <div className="draft">
        <button className="draft_button" onClick={this.props.Editcontroll}>✕</button>
        <form
          className="draft_form"
          // onSubmit={this.handleSubmit}
          //form自体は提出しないので、actionいらない
          action="" acceptCharset="UTF-8" method="post" data-remote="true">
          <h3>変更内容を入力してください</h3>
          {/* ここでまとめて隠し要素設置*/}
          <input type="hidden" name="authenticity_token"
            value={this.props.authenticityToken}
          />
          {/* ここまで隠し要素*/}
          <label htmlFor="review_reason">滞在理由(30字以内）<span className="required">＊必須</span></label>
          <input className="form" type="text" name="review[reason]" id="review_reason" value={this.state.review_reason} onChange={this.handleChange} required />

          <label className="labelnumber" htmlFor="review_duration">滞在期間(月)<span className="required">＊必須</span></label>
          <input className="form number" type="number" name="review[duration]" id="review_duration" value={this.state.review_duration} onChange={this.handleChange} required />

          <label htmlFor="review_food">食生活について教えてください(150字以内)</label>
          <textarea className="form textarea" name="review[food]" id="review_food" value={this.state.review_food} onChange={this.handleChange} />

          <label htmlFor="review_convenient">インフラなどの利便性について教えてください(150字以内)</label>
          <textarea className="form textarea" name="review[convenient]" id="review_convenient" value={this.state.review_convenient} onChange={this.handleChange} />

          <label htmlFor="review_favorite">お気に入りものについて(150字以内）</label>
          <textarea className="form textarea" name="review[favorite]" id="review_favorite" placeholder="現地でのお気に入りの物やお店について" value={this.state.review_favorite} onChange={this.handleChange}
          />

          <label htmlFor="review_advice">次に来る人へのアドバイス(150字以内)</label>
          <textarea className="form textarea" name="review[advice]" id="review_advice" value={this.state.review_advice} onChange={this.handleChange} />

          <label htmlFor="review_score">住み心地はいかがでしたか？　<span className="required">＊必須</span></label>
          <input className="form" type="number" name="review[score]" id="review_score" value={this.state.review_score} onChange={this.handleChange} required />

          <button className="form_submit" type="button" name="submit" onClick={this.handleSubmit}>変更する</button>
        </form>
      </div>
    );
  }
}
ReviewEditform.propsTypes = {
  //review内容
  id: PropTypes.number,
  reason: PropTypes.string,
  duration: PropTypes.number,
  good: PropTypes.string,
  bad: PropTypes.string,
  advice: PropTypes.string,
  score: PropTypes.number,
  // その他
  authenticityToken: PropTypes.string,
  parentFetchreviews: PropTypes.func,
  Editcontroll: PropTypes.func,
}
export default ReviewEditform
