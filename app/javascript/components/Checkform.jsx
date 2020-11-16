import React from "react"
import PropTypes from "prop-types"
class Checkform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
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
    console.log(this.event.state)
    event.preventDefault();
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
        action={this.props.url} acceptCharset="UTF-8" method="post"
        remote="true">

        <input type="hidden" name="authenticity_token"
          value={this.props.authenticityToken} />

        <input className="form" type="text" name="keyword" id="keyword" value={this.state.keyword} placeholder="場所を入力してください" onChange={this.handleChange} />

        <input className="form_submit" type="submit" name="submit" value="検索" />
      </form>
    );
  }
}

Checkform.propTypes = {
  url: PropTypes.string,
  authenticityToken: PropTypes.string,
  //: PropTypes.func,
};

export default Checkform
