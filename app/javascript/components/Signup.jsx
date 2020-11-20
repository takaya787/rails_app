import React from "react"
import PropTypes from "prop-types"
import './signup.scss'

//react-iconsをダウンロード
import { FcGoogle } from 'react-icons/fc';
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
        <div className="modal">
          <form
            className="form"
            onSubmit={this.handleSubmit}
            action={this.props.url} acceptCharset="UTF-8" method="post"
            remote="true">
            <button onClick={this.modalcontroll}>✕</button>
            <h2 className="form_title">まずはSign up!</h2>
            <input type="hidden" name="authenticity_token"
              value={this.props.authenticityToken} />

            <label htmlFor="user_name">お名前</label>
            <input className="form_input" type="text" name="user[name]" id="user_name" value={this.state.user_name} onChange={this.handleChange} />

            <label htmlFor="user_email">Eメール</label>
            <input className="form_input" type="text" name="user[email]" id="user_email" value={this.state.user_email} onChange={this.handleChange} />
            <label htmlFor="user_password">パスワード</label>
            <input className="form_input" type="password" name="user[password]" id="user_password" value={this.state.user_password} onChange={this.handleChange} />
            <label htmlFor="user_password_confirmation">パスワード確認用</label>
            <input className="form_input" type="password" name="user[password_confirmation]" id="user_password_confirmation" value={this.state.user_password_confirmation} onChange={this.handleChange} />

            <input className="form_submit" type="submit" name="submit" value="提出する" />

            <a className="form_google" href="/auth/google_oauth2">
              <FcGoogle size={20} />
              <span className="description" >GoogleアカウントでLog in</span>
            </a>
          </form>
        </div>
      );
    } else {
      return (
        <button className="initial-button" onClick={this.modalcontroll}>はじめる</button>
      );
    }
  }
}

Signup.propTypes = {
  url: PropTypes.string,
  authenticityToken: PropTypes.string
};
export default Signup
