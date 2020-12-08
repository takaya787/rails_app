import React from "react"
import PropTypes from "prop-types"
import './signup.scss'

class GuestButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      keyword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.controllClick = this.controllClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }
  handleSubmit(event) {
    console.log(this.event.state)
    event.preventDefault();
  }
  controllClick() {
    this.setState({
      isClicked: !this.state.isClicked,
    })
  }
  render() {
    return (
      <>
        { this.state.isClicked && (
          <div className="modal">
            <form
              className="form"
              onSubmit={this.handleSubmit}
              action={this.props.check}
              acceptCharset="UTF-8" method="post"
            >
              <button className="close" onClick={this.controllClick}>✕</button>
              <h2 className="form_title">目的の場所を入力！</h2>
              <input type="hidden" name="authenticity_token"
                value={this.props.authenticityToken} />
              <label htmlFor="keyword">検索したい地名を入力してください。</label>
              <input className="form_input" type="text" name="keyword" id="keyword" value={this.state.keyword} onChange={this.handleChange} />

              <input className="form_submit" type="submit" name="submit" value="レビュー閲覧" />
            </form>
          </div>
        )}
        {!this.state.isClicked && (
          <button className="initial" onClick={this.controllClick}>{this.props.title}</button>
        )}
      </>
    );
  }
}
GuestButton.propTypes = {
  check: PropTypes.string,
  authenticityToken: PropTypes.string,
  title: PropTypes.string,
}

export default GuestButton
