import React from "react"
import PropTypes from "prop-types"
class Reviewform extends React.Component {
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
    event.preventDefault();
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
          good: this.state.review_good,
          bad: this.state.review_bad,
          advice: this.state.review_advice,
        },
        lat: this.props.lat,
        lng: this.props.lng,
      })
    }).then(
      //reviewformをpostした後indexからjson読み込んでstateを更新
      this.props.parentFetchreviews
    )
  }
  render() {
    return (
      <div className="draft">
        <button className="draft_button" onClick={this.props.formclose}>✕</button>
        <form
          className="draft_form"
          onSubmit={this.handleSubmit}
          action={this.props.url} acceptCharset="UTF-8" method="post" data-remote="true">
          <h3>reviewを入力してください</h3>
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
          <label htmlFor="review_reason">滞在理由</label>
          <input className="form" type="text" name="review[reason]" id="review_reason" value={this.state.review_reason} onChange={this.handleChange} required />

          <label htmlFor="review_duration">期間(月)</label>
          <input className="form" type="number" name="review[duration]" id="review_duration" value={this.state.review_duration} onChange={this.handleChange} required />

          <label htmlFor="review_good">Good:</label>
          <textarea className="form textarea" name="review[good]" id="review_good" value={this.state.review_good} onChange={this.handleChange} />

          <label htmlFor="review_bad">Bad:</label>
          <textarea className="form textarea" name="review[bad]" id="review_bad" value={this.state.review_bad} onChange={this.handleChange} />
          <label htmlFor="review_advice">次に来る人へのアドバイス</label>
          <textarea className="form textarea" name="review[advice]" id="review_advice" value={this.state.review_advice} onChange={this.handleChange} />

          <input className="form_submit" type="submit" name="submit" value="Submit" />
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
