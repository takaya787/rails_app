import React from "react"
import PropTypes from "prop-types"
import './signup.scss'
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      user_name: '',
      user_email: '',
      user_password: '',
      user_password_confirmation: '',
    };
    this.modalcontroll = this.modalcontroll.bind(this);
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

  modalcontroll(event) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    if (this.state.isModalOpen) {
      return (
        <form
          className="form"
          onSubmit={this.handleSubmit}
          action={this.props.url} acceptCharset="UTF-8" method="post"
          remote="true">
          <button onClick={this.modalcontroll}>✕</button>

          <input type="hidden" name="authenticity_token"
            value={this.props.authenticityToken} />

          <label htmlFor="user_name">Name:</label>
          <input className="form" type="text" name="user[name]" id="user_name" value={this.state.user_name} onChange={this.handleChange} />

          <label htmlFor="user_email">Email:</label>
          <input className="form" type="text" name="user[email]" id="user_email" value={this.state.user_email} onChange={this.handleChange} />
          <label htmlFor="user_password">password</label>
          <input className="form" type="password" name="user[password]" id="user_password" value={this.state.user_password} onChange={this.handleChange} />
          <label htmlFor="user_password_confirmation">password_confirmation</label>
          <input className="form" type="password" name="user[password_confirmation]" id="user_password_confirmation" value={this.state.user_password_confirmation} onChange={this.handleChange} />

          <input className="form_submit" type="submit" name="submit" value="Submit" />

          <a href="/auth/google_oauth2">GoogleでSign in</a>

          <a href="/">Back</a>
        </form>
      );
    } else {
      return (
        <button onClick={this.modalcontroll}>Sign up</button>
      );
    }
  }
}

Signup.propTypes = {
  url: PropTypes.string,
  authenticityToken: PropTypes.string
};
export default Signup
