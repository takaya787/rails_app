import React from "react"
import PropTypes from "prop-types"
//Eachreview.jsxの子コンポーネント
class ReviewEditform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review_reason: '',
      review_duration: 1,
      review_good: '',
      review_bad: '',
      review_advice: '',
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
          good: this.state.review_good,
          bad: this.state.review_bad,
          advice: this.state.review_advice,
        },
      })
    }).then(
      //reviewformをpostした後indexからjson読み込んでstateを更新
      this.props.parentFetchreviews
    )
    event.preventDefault();
  }
  //onClickにeditcloseとhandklesubmitを追加しておく

  render() {
    return (
      <div className="draft">
        <button className="draft_button" onClick={this.props.Editcontroll}>✕</button>
        <form
          className="draft_form"
          // onSubmit={this.handleSubmit}
          action={this.props.url} acceptCharset="UTF-8" method="post" data-remote="true">
          <h3>変更内容を入力してください</h3>
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

          <label htmlFor="review_duration">期間(月)<span className="required">＊必須</span></label>
          <input className="form" type="number" name="review[duration]" id="review_duration" value={this.state.review_duration} onChange={this.handleChange} required />

          <label htmlFor="review_good">住んで良かったこと(150字以内)</label>
          <textarea className="form textarea" name="review[good]" id="review_good" value={this.state.review_good} onChange={this.handleChange} />

          <label htmlFor="review_bad">住んで嫌だったこと(150字以内)</label>
          <textarea className="form textarea" name="review[bad]" id="review_bad" value={this.state.review_bad} onChange={this.handleChange} />
          <label htmlFor="review_advice">次に来る人へのアドバイス(150字以内)</label>
          <textarea className="form textarea" name="review[advice]" id="review_advice" value={this.state.review_advice} onChange={this.handleChange} />

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
  address: PropTypes.string,
  // その他
  authenticityToken: PropTypes.string,
  parentFetchreviews: PropTypes.func,
  Editcontroll: PropTypes.func,
}
export default ReviewEditform
